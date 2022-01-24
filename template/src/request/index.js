'use strict'
exports.__esModule = true
const axios_1 = require('axios')
const ele = require('element-plus')
// const qs = require("qs");

const instance = axios_1['default'].create({
	baseURL: process.env.VUE_APP_API_BASE_URL,
})

// cas request
instance.interceptors.request.use(function (config) {
	config.headers.common['X-Requested-With'] = 'XMLHttpRequest'
	config.withCredentials = true

	// config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
	// if(config.data){
	//     config.data=qs.stringify(config.data)
	// }

	return config
})

//cas response
instance.interceptors.response.use(function (response) {
	if (+response.data.status === 996) {
		let _location = decodeURIComponent(response.data.location)
		let len = _location.split('?').length
		let connectSymbol = len > 2 ? '&backurl=' : '?backurl='
		try {
			window.location.href =
				response.data.location +
				encodeURIComponent(connectSymbol + encodeURIComponent(window.location.href))
		} catch (error) {
			return Promise.reject(new Error(error))
		}
	}
	return response
})

// error
instance.interceptors.response.use(
	function (response) {
		if (response.data.code !== 0) {
			let errorMes = response.data.msg || 'error'
			ele.ElMessage({
				type: 'error',
				message: errorMes,
			})
			throw new Error(errorMes)
		}
		return response.data
	},
	function (error) {
		ele.ElMessage({
			type: 'error',
			message: error,
		})
		return Promise.reject(new Error(error))
	},
)
exports['default'] = instance
