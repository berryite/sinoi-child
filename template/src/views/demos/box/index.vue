<template>
	<el-link
		type="primary"
		href="http://git.300.cn/chengbing/qiankun-child/blob/master/src/plugins/element/s-box.md"
		target="_blank"
		>说明文档</el-link
	>
	<el-divider content-position="left">默认</el-divider>
	<div class="demo-wrap">
		<!-- 拷贝代码主体 -->
		<s-box></s-box>
		<!-- 拷贝代码主体 -->
	</div>

	<el-divider content-position="left">设置left，right，content属性</el-divider>
	<div class="demo-wrap">
		<!-- 拷贝代码主体 -->
		<s-box titLeft="标题" titRight="更多" content="内容"></s-box>
		<!-- 拷贝代码主体 -->
	</div>

	<el-divider content-position="left">slot</el-divider>
	<div class="demo-wrap">
		<!-- 拷贝代码主体 -->
		<s-box>
			<template #tit-left> 左侧文本 </template>
			<template #tit-right> 右侧文本 </template>
			<template #content>
				该插槽跟模板的其它地方一样可以访问相同的实例 property
				(也就是相同的“作用域”)，而不能访问 的作用域。例如 url 是访问不到的
			</template>
		</s-box>
		<!-- 拷贝代码主体 -->
	</div>

	<el-divider content-position="left">样式二</el-divider>
	<div class="demo-wrap">
		<!-- 拷贝代码主体 -->
		<s-box type="2">
			<template #tit-left> 左侧文本 </template>
			<template #tit-right> 右侧文本 </template>
			<template #content>
				该插槽跟模板的其它地方一样可以访问相同的实例 property
				(也就是相同的“作用域”)，而不能访问 的作用域。例如 url 是访问不到的
			</template>
		</s-box>
		<!-- 拷贝代码主体 -->
	</div>
</template>
<script>
import { defineComponent } from 'vue'

export default defineComponent({
	setup() {
		return {}
	},
})
</script>
<style scoped>
.demo-wrap {
	background: #eee;
	padding: 20px;
}
</style>
