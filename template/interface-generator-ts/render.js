
const getBody = require('./body')
const getQuery = require('./query')
const getPathParams = require('./path')

const { fillMargin } = require('./util')


function render(data) {


    const all = []
        .concat(getBody(data, 'res_body'))
        .concat(getQuery(data, 'req_query'))
        .concat(getPathParams(data, 'req_params'))
        .concat(getBody(data, 'req_body_other'))
        .filter(v => v.props.length > 0)


    let result = all.map(item => {
        
        let max = (Math.max.apply(null, item.props.map(v => v.key.length)) + 6) * 2
        let str = `export interface ${item.name} {`
        str += '\n'
        item.props.forEach(v => {
            const { key, required, type, example, description } = v
            let row = ''
            row += fillMargin(2)
            row += key
            row += required ? '' : '?'
            row += ':'
            row += ` ${type}`
            row += fillMargin(max - row.length)
            row += example ? `/** ${example} */` : ''
            row += description ? `/** ${description} */` : ''
            row += '\n'
            str += row
        })
        str += '}'
        str += '\n\n'
        return str
    }).join('')


    const requestParams = all
        .filter(v => ['ReqQuery', 'ReqBodyOther', 'ReqParams'].includes(v.name))
        .map(v => v.name)
        .join()

    result += '\n\n'

    if (requestParams) {
        result += `interface RequestParams extends ${requestParams} { }`
    } else {
        result += `interface RequestParams { }`
    }

    result += '\n\n'

    return result
}

module.exports = render
