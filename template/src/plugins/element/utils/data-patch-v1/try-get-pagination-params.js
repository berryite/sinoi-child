const keys = ['total', 'count']

import {
	addMatchedPath,
	getDataByImportance
} from './try-get-only-array'

const find = (data, keys, result, basePath = '') => {
	for (let i in data) {
		keys.forEach(key => {
			if (i.toLowerCase().includes(key.toLowerCase())) {
				addMatchedPath(result, i, basePath)
			}
		})
		if (Object.prototype.toString.call(data[i]) === '[object Object]') {
			find(data[i], keys, result, basePath ? basePath + '.' + i : i)
		}
	}
}
export default data => {
	const result = {
		total: undefined,
		matched: {},
		path: '',
		error: false
	}

	find(data, keys, result)
	getDataByImportance(data, result, 'total')
	return result
}
