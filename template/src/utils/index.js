import * as base from "./base"; //基础工具箱
import * as transform from "./transform"; //转换工具箱
import * as date from "./date"; //时间日期工具箱

export default Object.assign(base, 
	transform,
	date
);