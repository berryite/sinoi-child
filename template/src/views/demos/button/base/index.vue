<template>
	<el-link type="primary" href="http://git.300.cn/chengbing/qiankun-child/blob/master/src/plugins/element/s-button.md" target="_blank">说明文档</el-link>
	<s-button @click="handleClick">自定义点击</s-button>
	<s-button @click="handleClickPromise">自定义点击promise</s-button>
</template>
<script>
import { defineComponent } from 'vue';

export default defineComponent({
	setup() {
		const handleClick = () => {
			alert(1);
		};
		const handleClickPromise = () => {
			return new Promise(function (resolve) {
				setTimeout(function () {
					resolve('成功!');
				}, 2000);
			});
		};
		return { handleClick, handleClickPromise };
	},
});
</script>
