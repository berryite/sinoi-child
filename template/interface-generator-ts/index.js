const config = require('./config')
const getBaseInfo = require('./base')
const getRequest = require('./request')
const writeFile = require('./file')
const render = require('./render')

const { baseURL, project, fileName, filter } = config
const http = require('http')



function fetch(url) {
    return new Promise((resolve, reject) => {
        http.get(url, (res) => {
            const { statusCode } = res;
            const contentType = res.headers['content-type'];

            let error;
            if (statusCode !== 200) {
                error = new Error('请求失败。\n' +
                    `状态码: ${statusCode}`);
            } else if (!/^application\/json/.test(contentType)) {
                error = new Error('无效的 content-type.\n' +
                    `期望 application/json 但获取的是 ${contentType}`);
            }
            if (error) {
                reject(error.message);
                // 消耗响应数据以释放内存
                res.resume();
                return;
            }

            res.setEncoding('utf8');
            let rawData = '';
            res.on('data', (chunk) => { rawData += chunk; });
            res.on('end', () => {
                try {
                    const parsedData = JSON.parse(rawData);
                    resolve({
                        data: parsedData
                    })
                } catch (e) {
                    reject(e.message);
                }
            });
        }).on('error', (e) => {
            reject(`错误: ${e.message}`);
        });
    })
}

const getProjectInfo = (token) => fetch(`${baseURL}/api/project/get?token=${token}`)
const getApiDetail = (token, id) => fetch(`${baseURL}/api/interface/get?token=${token}&id=${id}`)
const getAllApi = (token, id) => fetch(`${baseURL}/api/interface/list?token=${token}&project_id=${id}&limit=1000`)


const createInterface = (token, id, projectInfo) => {
    getApiDetail(token, id).then(response => {
        const { data, errcode } = response.data
        if (errcode) return
        const baseInfo = getBaseInfo(data)
        const request = getRequest(data, projectInfo)
        const renderData = render(data)
        let fileData = ''

        fileData += baseInfo
        fileData += renderData
        fileData += request

        writeFile(fileName(data), fileData)
    }).catch(() => {
        console.log(`文档${id}遇到问题，无法自动生成`)
        // console.log(err)
    })
}

const createInterfaceByProject = (token, id) => {
    Promise.all([getProjectInfo(token), getAllApi(token, id)]).then(response => {
        const { data, errcode } = response[1].data
        if (errcode) return
        data.list.forEach(v => {
            if (filter(v)) {
                createInterface(token, v._id, response[0].data.data)
            }
        })
    })
}


Object.keys(project).forEach(v => {
    createInterfaceByProject(project[v], v)
})

