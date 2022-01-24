# s-page-header 说明文档
主要用于需要有“返回”功能的页面，弹窗。

## attributes

| 参数	 | 说明 | 类型	 | 可选值 | 默认值 |
| :-----| :---- | :---- | :---- | :---- |
| title | 标题 | string |- |- |
| content | 内容 | string |- |- |
| showBack | 是否显示“返回”按钮 | boolean |true/false |true |

## events

| 事件名称	 | 说明 | 回调参数 |
| :-----| :---- | :---- |
| back | 返回事件 | - |

## slots

| 事件名称	 | 说明 
| :-----| :---- |
| title | 标题内容 |
| content | 内容 |
| left | 头部 “返回按钮” 后面内容 |
| right | 头部右侧内容 |
<br />

## example
```html
<!-- 默认 -->
<s-page-header></s-page-header>

<!-- 设置 title, content属性 -->
<s-page-header title="标题" content="内容"></s-page-header>

<!-- 隐藏 “返回” 按钮 -->
<s-page-header :showBack="false"></s-page-header>

<!-- 自定义 “返回” 按钮 事件 -->
<s-page-header :back="handleBack"></s-page-header>

<!-- slot -->
<s-page-header>
	<template #left>
		<div>slot(left)</div>
	</template>
	<template #title>
		<div>slot(title)</div>
	</template>
	<template #right>
		<el-link type="primary">slot(right)</el-link>
	</template>
	<div>
		slot(content)
	</div>
</s-page-header>
```
```javascript
import { defineComponent } from 'vue';

export default defineComponent({
	setup() {
		const handleBack = () => {
			alert('父组件事件定义');
		};
		return { handleBack };
	},
});
```
