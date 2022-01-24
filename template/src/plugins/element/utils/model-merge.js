export default (src, target) => {
    Object.keys(src).forEach(v => {
        if (Object.prototype.hasOwnProperty.call(src, v) && Object.prototype.hasOwnProperty.call(target, v)) {
            src[v] = target[v]
        }
    })
}