/***
 * item支持格式object string
 * 如果存在key就按照object处理
 */
export default class {
  constructor(arr, key) {
    this.key = key
    if (key) {
      const stringArr = [...new Set(arr.map(v => v[key]))]
      this.arr = stringArr.map(v => arr.filter(c => c[key] === v)[0])
    } else {
      this.arr = arr ? [...new Set(arr)] : []
    }
  }
  has(item, isEvery) {
    if (Array.isArray(item)) {
      return item[isEvery ? 'every' : 'some'](v => this.has(v))
    } else {
      return this.key ? this.arr.some(v => v[this.key] === item[this.key]) : this.arr.includes(item)
    }
  }
  add(item) {
    if (Array.isArray(item)) {
      item.forEach(v => {
        this.add(v)
      })
    } else {
      if (!this.has(item)) {
        this.arr.push(item)
      }
    }
    return this.arr
  }
  delete(item) {
    if (Array.isArray(item)) {
      item.forEach(v => {
        this.delete(v)
      })
    } else {
      const index = this.key ? this.arr.findIndex(v => v[this.key] === item[this.key]) : this.arr.indexOf(item)
      if (index !== -1) {
        this.arr.splice(index, 1)
      }
    }
    return this.arr
  }
}