const config = require('./config')
const { baseURL } = config
module.exports = ({ project_id, _id, title, username, up_time }) => {
    const url = `${baseURL}/project/${project_id}/interface/api/${_id}`
    return `
/**
 * 此文件自动生成，请不要修改!!! 
 * 

/**
 * 文档地址：${url}
 * 更新日期：${new Date(up_time * 1000)}
 * 生成类型：Typescript
 * 生成工具版本：0.0.4
 * 接口名称：${title}
 * 创建人：${username}
 */
`
}
