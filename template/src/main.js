import './public-path'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import qkStore from './hooks/qk-store'

// 三方插件
import elementExtend from './plugins/element'
import ElementPlus from 'element-plus'

// 公用组件
import IconSvg from '@/components/icon'

// 国际化
import zhCn from 'element-plus/es/locale/lang/zh-cn'

// 公用样式
import 'element-plus/dist/index.css'
import '@/style'

let instance = null
function render(props = {}) {
	const { container, routerBase } = props
	instance = createApp(App)
	instance.use(store)
	instance.use(router(routerBase))
	instance.use(ElementPlus, { size: 'medium', locale: zhCn })
	instance.use(elementExtend)
	instance.component('c-icon', IconSvg)
	instance.mount(container ? container.querySelector('#app') : '#app')
}

// 独立运行时
if (!window.__POWERED_BY_QIANKUN__) {
	render()
}

export async function bootstrap() {
	console.log('[vue] vue app bootstraped')
}
export async function mount(props) {
  props.qkStore && qkStore.setStore(props.qkStore)
	render(props)
	instance.config.globalProperties.$onGlobalStateChange = props.onGlobalStateChange
	instance.config.globalProperties.$setGlobalState = props.setGlobalState
}

export async function unmount() {
	instance.unmount()
	instance._container.innerHTML = ''
	instance = null
}
