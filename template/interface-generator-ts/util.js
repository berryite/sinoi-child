
module.exports = {
    firstUpperCase: ([first, ...rest]) => first.toUpperCase() + rest.join(''),
    fillMargin: (len) => Array(len).fill(' ').join(''),
    toCamelCase: (str) => {
        var pattern = /_([a-z])/g
        str = str.replace(pattern, function (all, letter) {
            return letter.toUpperCase();
        })
        return str.charAt(0).toUpperCase() + str.slice(1)

    }
}