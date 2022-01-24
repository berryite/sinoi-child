<template>
	<el-link type="primary" href="http://git.300.cn/chengbing/qiankun-child/blob/master/src/plugins/element/s-table.md" target="_blank">说明文档</el-link>
	<div class="demo-wrap">
		<!-- 拷贝代码主体 -->
		<s-table :cols="table.cols" :data="table.data" />
		<!-- 拷贝代码主体 -->
	</div>
</template>
<script>
import { defineComponent, reactive } from 'vue';

export default defineComponent({
	setup() {
		const table = reactive({
			data: [
				{
					date: '2016-05-02',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄',
				},
				{
					date: '2016-05-04',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1517 弄',
				},
				{
					date: '2016-05-01',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1519 弄',
				},
				{
					date: '2016-05-03',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1516 弄',
				},
			],
			cols: [
				{
					label: '日期',
					prop: 'date',
				},
				{
					label: '姓名',
					prop: 'name',
				},
				{
					label: '地址',
					prop: 'address',
				},
			],
		});
		return { table };
	},
});
</script>
<style scoped>
.demo-wrap {
	background: #eee;
	padding: 20px;
}
</style>
