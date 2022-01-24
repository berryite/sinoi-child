
const { firstUpperCase, toCamelCase } = require('./util')
let fragment = []
function parse(obj) {
    const { required = [], properties } = obj
    return Object.keys(properties).map(v => {
        const prop = properties[v]
        // 排除空白的数据对象
        if (prop.type === 'object' && Object.keys(prop.properties).length === 0) {
            prop.type = 'any'
        }

        // 目前api文档只支持单类型，排除多个类型中可能的错误类型
        if (Array.isArray(prop.type)) {
            prop.type = prop.type.filter(v => v !== 'null' && v !== 'undefined')
            if (prop.type.length === 1) {
                prop.type = prop.type[0]
            } else {
                prop.type = 'any'
            }
        }

        const item = {
            key: v,
            required: required.includes(v),
            description: prop.description,
            type: prop.type
        }


        if (item.type === 'integer') {
            item.type = 'number'
        }

        if (item.type === 'object') {
            item.type = `${firstUpperCase(v)}`
            fragment.push({
                name: item.type,
                props: parse(prop)
            })
        }

        if (item.type === 'array') {
            if (prop.items.type === 'object') {
                const name = `${firstUpperCase(v)}Item`
                item.type = `${name}[]`
                fragment.push({
                    name,
                    props: parse(prop.items)
                })
            } else {
                item.type = `${prop.items.type}[]`
            }
        }

        return item
    })
}


function init(data, key) {
    fragment = []
    if (!data[key]) return fragment
    const bodyJSON = JSON.parse(data[key])
    if (bodyJSON.type === 'object') {
        fragment.push({
            name: toCamelCase(key),
            props: parse(bodyJSON)
        })
    }
    if (bodyJSON.type === 'array') {
        if (bodyJSON.items.type === 'object') {
            fragment.push({
                name: `${toCamelCase(key)}`,
                props: [{
                    key: '[index:number]',
                    required: true,
                    description: undefined,
                    type: Object.keys(bodyJSON.items.properties).length ? `${toCamelCase(key)}Item` : 'any'
                }
                ]
            })
            fragment.push({
                name: `${toCamelCase(key)}Item`,
                props: parse(bodyJSON.items)
            })
        }
    }


    return fragment
}

module.exports = init