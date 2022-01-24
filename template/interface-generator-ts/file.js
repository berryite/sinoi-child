const fs = require('fs')
const path = require('path')
const { success, error } = require('./config')

module.exports = (filePath, data) => {
    let file = path.resolve(__dirname, filePath)
    fs.readFile(file, { encoding: 'utf8' }, (notExist, fileData) => {

        if (!notExist && fileData.includes('update-disable')) {
            console.log(`skip ${filePath}`)
            return
        }

        fs.writeFile(file, data, { encoding: 'utf8' }, (err) => {
            if (err) {
                console.log(`${notExist ? 'createError' : 'updateError'} ${filePath}`)
                if (typeof error === 'function') {
                    error(data, filePath)
                }
            } else {
                console.log(`${notExist ? 'create' : 'update'} ${filePath}`)
                if (typeof success === 'function') {
                    success(data, filePath)
                }
            }
        })
    })

}