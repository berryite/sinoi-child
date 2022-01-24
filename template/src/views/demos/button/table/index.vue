<template>
	<el-link type="primary" href="http://git.300.cn/chengbing/qiankun-child/blob/master/src/plugins/element/s-button.md" target="_blank">说明文档</el-link>
	<div class="demo-wrap">
		<!-- 拷贝代码主体 -->
		<s-table :cols="table.cols" :data="table.data">
			<template #form>
				<s-form :model="form" @search="search" inline>
					<s-form-item label="单条文本" prop="name" placeholder="请输入" />
					<s-form-item
						label="下拉选择"
						prop="cate"
						component="s-group"
						:data="options"
						tag="el-select"
					/>
					<s-form-item label="级联" component="s-text" prop="cascader" />
					<s-form-item label="日期" component="el-date-picker" prop="time" />
					<s-form-item
						label="日期范围"
						component="el-date-picker"
						type="daterange"
						prop="daterange"
					/>
					<s-form-item label="">
						<s-button type="primary" run="form.search">查询</s-button>
						<s-button run="form.reset">重置</s-button>
					</s-form-item>
				</s-form>
			</template>
		</s-table>
		<!-- 拷贝代码主体 -->
	</div>
</template>
<script>
import { defineComponent, reactive } from 'vue';

export default defineComponent({
	setup() {
		const search = () => {
			alert(JSON.stringify(form));
		};
		const form = reactive({
			name: '',
			cate: '1',
			checkbox: ['2'],
			radio: '1',
			cascader: '待补充',
			num: 1,
			switch: false,
			time: '',
			daterange: '',
		});
		const options = [
			{
				value: '1',
				label: '黄金糕',
			},
			{
				value: '2',
				label: '双皮奶',
			},
			{
				value: '3',
				label: '蚵仔煎',
			},
			{
				value: '4',
				label: '龙须面',
			},
			{
				value: '5',
				label: '北京烤鸭',
			},
		];
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
		return { search, form, options, table };
	},
});
</script>
<style scoped>
.demo-wrap {
	background: #eee;
	padding: 20px;
}
</style>
