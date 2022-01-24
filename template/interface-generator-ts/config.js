// var exec = require("child_process").exec;
module.exports = {
    baseURL: 'http://10.12.68.224:3000',
    project: {
        42: '782b666d0473d5b4293624e9fd17859e98ddad2209cfd3b8b40891bc893d4317'
    },
    request() {
        return 'import request from "../request"'
    },
    filter(data) {
        return data
        // return [3181].includes(data._id)
    },
    // success(data, filePath) {
    //     return exec(`tsc ${filePath}`)
    // },
    fileName(data) {

        return `../src/api/${data._id}-${data.method.toLocaleLowerCase()}${data.path.toLocaleLowerCase().replace(/\//g, '-')}.ts`
        // return `./api/${data._id}.${data.path.replace(/\//g, '-').replace(/-(\w)/g, (str, $1) => {
        //     return $1.toLocaleUpperCase()
        // })}.${data.method}.ts`
    }
}
