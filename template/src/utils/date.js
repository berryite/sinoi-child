/******* 时间日期工具箱 *******/

/**
 * 返回至少两位数字
 * @param {Number|1} n 传入数字.
 * @return {String|01} 返回数字.
 */
export function formatNumber(n) {
  n = n.toString();
  return n[1] ? n : '0' + n;
}

/**
 * 格式化时间
 * @method dateFormat
 * @param date 需格式化的时间.
 * @param fmt 指定格式化的格式.
 * @return 返回格式化后的时间.
 */
export function dateFormat(date, fmt = 'yyyy-MM-dd') {
  /**
   * 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
   * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
   * 例子：
   * dateFormat(new Date(), 'yyyy-MM-dd hh:mm:ss.S') ==> 2021-07-02 08:09:04.423
   * dateFormat(new Date(), 'yyyy-M-d h:m:s.S')      ==> 2021-7-2 8:9:4.18
   */
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    S: date.getMilliseconds()
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + '').substr(4 - RegExp.$1.length)
    );
  }
  // eslint-disable-next-line no-unused-vars
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1
          ? o[k]
          : ('00' + o[k]).substr(('' + o[k]).length)
      );
    }
  }
  return fmt;
}

/**
 * 推算日期
 *
 * @export
 * @param {*} dateObj      日期对象 
 * @param {*} range        推算范围  默认7天
 * @param {*} calcType     推算类型  +或者-
 * @returns
 */
export function calcDate(dateObj, calcType, range) {
  range = range === 1 ? 2 : range;
  let tempDateObj = new Date();
  if (calcType === '+') {
    tempDateObj.setTime(dateObj.getTime() + 3600 * 1000 * 24 * (range - 1));
  } else if (calcType === '-') {
    tempDateObj.setTime(dateObj.getTime() - 3600 * 1000 * 24 * (range - 1));
  }
  return tempDateObj
}

/*
* 判断开始时间小于结束时间
* */
export function activityDateValidate(start, end) {
  if (start === undefined || start === '' || end === undefined || end === '') {
    return true
  }
  let startTime = new Date(start).getTime()
  let endTime = new Date(end).getTime()
  if (startTime < endTime) {
    return true
  }
  return false
}

/*
* 月份中英文转换
* */

export const month = {
  "01": "Jan",
  "02": "Feb",
  "03": "Mar",
  "04": "Apr",
  "05": "May",
  "06": "Jun",
  "07": "Jul",
  "08": "Aug",
  "09": "Sep",
  "10": "Oct",
  "11": "Nov",
  "12": "Dec",
}
/*
* 星期中英文转换
* */
export const week = {
  1: "Mon",
  2: "Tue",
  3: "Wed",
  4: "Thur",
  5: "Fri",
  6: "Sat",
  0: "Sun"
}

/**
 * 获取上一个月
 * @date 格式为yyyy-mm-dd的日期，如：2021-04-20
 */
export function getPreMonth(date) {
  const oDate = date ? new Date(date) : new Date();
  let year = oDate.getFullYear();
  let month = oDate.getMonth() + 1;

  let preMonth = parseInt(month) - 1;
  if (preMonth == 0) {
    preMonth = 12;
    year -= 1;
  }

  if (preMonth < 10) {
    preMonth = '0' + preMonth;
  }

  return year + '-' + preMonth + '-01';
}

/**
 * 获取下一个月
 * @date 格式为yyyy-mm-dd的日期，如：2021-04-20
 */
export function getNextMonth(date) {
  const oDate = date ? new Date(date) : new Date();
  let year = oDate.getFullYear();
  let month = oDate.getMonth() + 1;

  let nextMonth = parseInt(month) + 1;
  if (nextMonth == 13) {
    nextMonth = 1;
    year += 1;
  }

  if (nextMonth < 10) {
    nextMonth = '0' + nextMonth;
  }

  return year + '-' + nextMonth + '-' + new Date(year, nextMonth, 0).getDate();
}