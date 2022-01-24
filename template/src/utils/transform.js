/******* 转换工具箱 *******/

/**
 * 数值百分比转换
 * @param value
 * @param fmt string , 转换格式
 * demo ->  {{data | percent(2)}}
 */
export function percent (value, fmt) {
  return `${((value || 0) * 100).toFixed(fmt || 2)}%`
}

/* 格式化数字*/
export function formatNumber (num, digits) {
  const si = [
    {value: 1E18, symbol: 'E'},
    {value: 1E15, symbol: 'P'},
    {value: 1E12, symbol: 'T'},
    {value: 1E9, symbol: 'G'},
    {value: 1E6, symbol: 'M'},
    {value: 1E3, symbol: 'k'}
  ]
  for (let i = 0; i < si.length; i++) {
    if (num >= si[i].value) {
      return (num / si[i].value + 0.1).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[i].symbol
    }
  }
  return num.toString()
}