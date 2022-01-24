const { toCamelCase } = require('./util')

let fragment = []

function parse(paramsArr) {
    return paramsArr.map(v => {
        const item = {
            key: v.name,
            required: v.required !== '0',
            description: v.desc,
            type: 'string',
            example: v.example
        }
        return item
    })
}



function init(data, key) {
    fragment = []
    if (Array.isArray(data[key])) {
        fragment.push({
            name: toCamelCase(key),
            props: parse(data[key])
        })
    }
    return fragment
}

module.exports = init


