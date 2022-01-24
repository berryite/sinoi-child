export const URLSearchParams = {
  parse(url) {
    var theRequest = new Object()
    var str = url.charAt() === '?' ? url.substr(1) : url
    var strs = str.split('&')
    for (var i = 0; i < strs.length; i++) {
      theRequest[strs[i].split('=')[0]] = unescape(strs[i].split('=')[1])
    }
    return theRequest
  },
  stringify(o) {
    var str = ''
    Object.keys(o).forEach((v, i) => { str += `${i ? '&' : '?'}${v}=${o[v]}` })
    return str
    
  }
}