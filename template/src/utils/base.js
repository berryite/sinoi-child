/** ***** 公共基础工具箱 *******/


/**
 * 对象深合并
 * @param  {...any}  对象
 * @returns {object} 合并后的对象
 */
export function merge(...arg) {
  let result = {};
  for (let i = 0; i < arg.length; i++) {
    for (let key in arg[i]) {
      if (Object.prototype.hasOwnProperty.call(arg[i], key)) {
        const val = arg[i][key];
        if (typeof result[key] === 'object' && typeof val === 'object') {
          result[key] = merge(result[key], val);
        } else {
          result[key] = val;
        }
      }
    }
  }
  return result;
}

/**
 * 对象深拷贝
 * @param {object} obj 对象
 * @returns {object} 拷贝后的对象
 */
export function clone(obj) {
  // 原始类型直接返回
  if (typeof obj !== 'object' && typeof obj !== 'function') return obj;
  let result = type(obj) === 'array' ? [] : {};
  for (let i in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, i)) {
      result[i] = typeof obj[i] === 'object' ? clone(obj[i]) : obj[i];
    }
  }
  return result;
}

/**
 * 返回数据类型
 * @param {any} val 需要判断的值
 * @returns {string} 数据类型字符串 (英文小写)
 */
export function type(val) {
  const t = typeof val;
  if (t !== 'object') return t;

  let temp = Object.prototype.toString.call(val).split(' ')[1] || '';
  return temp.substr(0, temp.length - 1).toLowerCase();
}

/**
 * 根据 baseURL 获取源地址
 * @param {string} baseURL 请求跟地址
 * @returns {string} 源地址
 */
export function urlOrigin(baseURL = '') {
  // 判断是否 http:// 或 https:// 开头
  if (!/^https?:\/\//.test(baseURL)) return '';
  const u = baseURL.split('/');
  return u[0] + '//' + u[2];
}

/**
 * 合并请求头
 * @param {string} method 请求方式
 * @param {object} header 请求头
 * @returns {object} 处理后的请求头
 */
export function mergeHeader(method, header = {}) {
  return merge(header || {}, header[method.toLowerCase()] || {});
}

/**
 * 拆分路径
 * @param {string} key 路径点结构
 * @returns {object} name & path
 */
export function parsePath(key='') {
	const arr = key.split('.');
	return {
		name: arr.pop(),
		path: arr.join('/')
	}
}