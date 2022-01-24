import Params, { addRule } from '../../utils/params-util'
import { Base64 } from 'js-base64'
import { defineComponent, h, ref, reactive, resolveComponent, mergeProps, inject, provide } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { FORM_LABEL_WIDTH } from '../../CONFIG'

export const COMPONENT_NAME = 'F'

addRule(COMPONENT_NAME, {
	parse(params) {
		return JSON.parse(Base64.decode(decodeURIComponent(params)))
	},
	componentization(params) {
		return encodeURIComponent(Base64.encode(JSON.stringify(params)))
	}
})


export default defineComponent({
	inheritAttrs: false,
	props: {
		uid: {
			default() {
				const uid = inject('TABLE_PROVIDE_UID', null)
				// 如果挂载到table下面，默认使用table的uid
				return uid || 0
			}
		},
	},
	setup(props, context) {

		const tableProvideFormSearch = inject('TABLE_PROVIDE_FORM_SEARCH', null)
		const tableProvideFormReset = inject('TABLE_PROVIDE_FORM_RESET', null)
		const tableProvideFormInit = inject('TABLE_PROVIDE_FORM_INIT', null)


		function getEventHandlerFunction(eventName) {
			eventName = `on${eventName.charAt(0).toUpperCase() + eventName.slice(1)}`
			if (Object.hasOwnProperty.call(context.attrs, eventName) && typeof context.attrs[eventName] === 'function') return context.attrs[eventName]
		}
		function runEventHandlerFunction(eventName, arg) {
			const r = getEventHandlerFunction(eventName)
			if (typeof r === 'function') return r(arg)
		}

		const formRef = ref(null)
		const queryParams = new Params(COMPONENT_NAME, props.uid, useRoute(), useRouter())

		let model = reactive({})
		function setModel(key, value) {
			model[key] = value
		}


		let initialData = {}
		if (context.attrs.model) {
			model = context.attrs.model
			initialData = JSON.parse(JSON.stringify(model))
		}


		// 读取路由上的参数信息进行初始化操作
		const query = queryParams.get()
		if (query) {
			context.emit('init', query)
			if (tableProvideFormInit) {
				tableProvideFormInit(query)
				Object.keys(query).forEach(v => {
					setModel(v, query[v])
				})
			}
		}

		async function getParams() {
			const valid = await formRef.value.validate()
			const params = JSON.parse(JSON.stringify(model))
			return valid ? Promise.resolve(params) : Promise.reject(params)
		}

		async function submit() {
			// return context.emit('submit', await getParams())
			// 这里需要返回函数执行结果配合改变button的loading状态
			return runEventHandlerFunction('submit', await getParams())
		}

		async function search() {
			const res = await getParams()
			// 去除空参数
			Object.keys(res).forEach((v) => {
				if (res[v] === '' || res[v] === undefined || res[v] === null) {
					delete res[v]
				}
			})

			if (Object.keys(res).length !== 0) {
				await queryParams.set(res)
			} else {
				await queryParams.clear()
			}

			// 如果挂载到table下面，触发table下面相应的处理事件

			if (tableProvideFormSearch) {
				tableProvideFormSearch(res)
			}
			// 这里需要返回函数执行结果配合改变button的loading状态
			return runEventHandlerFunction('search', res)
			// return context.emit('search', res)
		}


		function reset() {
			queryParams.clear()
			formRef.value.resetFields()
			context.emit('reset', initialData)
			// 如果挂载到table下面，触发table下面相应的处理事件
			if (tableProvideFormReset) {
				tableProvideFormReset(initialData)
			}
			return context.emit('reset')
		}

		function clear() {
			queryParams.clear()
			formRef.value.resetFields()
			if (tableProvideFormReset) {
				tableProvideFormReset()
			}
			Object.keys(initialData).forEach(v => {
				setModel(v, initialData[v])
			})
			return context.emit('clear')
		}



		provide('FORM_PROVIDE_MODEL', model)
		provide('FORM_PROVIDE_SUBMIT', submit)
		provide('FORM_PROVIDE_SEARCH', search)
		provide('FORM_PROVIDE_RESET', reset)
		provide('FORM_PROVIDE_CLEAR', clear)
		provide('FORM_PROVIDE_SET_MODEL', setModel)

		context.expose({
			formRef,
			submit,
			search,
			reset,
			clear,
			setModel
		})



		return () => {
			const props = mergeProps({
				ref: formRef,
				model: model,
				// 集团账号统一默认配置
				'label-width': context.attrs.inline ? undefined : FORM_LABEL_WIDTH,
				onSubmit(e) {
					e.preventDefault()
				}
			}, context.attrs)
			return h(resolveComponent('el-form'), props, context.slots)
		}
	}
})


