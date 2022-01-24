const { request } = require('./config')
module.exports = (data, { basepath }) => {
    let { path, method } = data
    path = basepath + path

    if (/{([^}]+)}/.test(path)) {
        path = `'${path}'.replace(/{([^}]+)}/g, (r: string, $1: string) => {
            const tmp = typeof params[$1] === 'undefined' ? '' : params[$1]
            // delete params[$1]
            return tmp
        })`
    } else {
        path = `'${path}'`
    }


    let ParamsType = 'POST,PUT,PATCH'.indexOf(method) === -1 ? 'params' : 'data'

    if (Array.isArray(data.req_query) && data.req_query.length) {
        ParamsType = 'params'
    }

    return `${request({ ...data, basepath })}\nexport default (params:RequestParams) => { 
    return request({
        url:${path},
        method:'${method}',
        ${ParamsType}:params
    })
}`

}
