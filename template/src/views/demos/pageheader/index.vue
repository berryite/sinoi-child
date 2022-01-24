<template>
	<el-link type="primary" href="http://git.300.cn/chengbing/qiankun-child/blob/master/src/plugins/element/s-pageHeader.md" target="_blank">说明文档</el-link>
	<el-divider content-position="left">默认</el-divider>
	<div class="demo-wrap">
		<s-pageHeader></s-pageHeader>
	</div>

	<el-divider content-position="left">设置 title, content属性</el-divider>
	<div class="demo-wrap">
		<s-pageHeader title="标题" content="内容"></s-pageHeader>
	</div>
	<el-divider content-position="left">隐藏 “返回” 按钮</el-divider>
	<div class="demo-wrap">
		<s-pageHeader :showBack="false">
			<template #left>
				<div>slot(left)</div>
			</template>
			<template #title>
				<div>slot(title)</div>
			</template>
			<template #right>
				<el-link type="primary">slot(right)</el-link>
			</template>
			<!-- 正文主体 -->
			<div>
				slot(content)
			</div>
			<!-- 正文主体 -->
		</s-pageHeader>
	</div>

	<el-divider content-position="left">自定义 “返回” 按钮 事件</el-divider>
	<div class="demo-wrap">
		<s-pageHeader :back="handleBack">
			<template #left>
				<div>slot(left)</div>
			</template>
			<template #title>
				<div>slot(title)</div>
			</template>
			<template #right>
				<el-link type="primary">slot(right)</el-link>
			</template>
			<!-- 正文主体 -->
			<div>
				slot(content)
			</div>
			<!-- 正文主体 -->
		</s-pageHeader>
	</div>

	<el-divider content-position="left">slot</el-divider>
	<div class="demo-wrap">
		<s-pageHeader>
			<template #left>
				<div>slot(left)</div>
			</template>
			<template #title>
				<div>slot(title)</div>
			</template>
			<template #right>
				<el-link type="primary">slot(right)</el-link>
			</template>
			<!-- 正文主体 -->
			<div>
				slot(content)
			</div>
			<!-- 正文主体 -->
		</s-pageHeader>
	</div>
	<div class="demo-wrap">
		<s-pageHeader>
			<template #title>
				<div>标题</div>
			</template>
			<template #left>
				<s-button @click="handleClick" size="mini">left</s-button>
			</template>
			<template #right>
				<s-button @click="handleClick" size="mini">自定义点击</s-button>
				<s-button @click="handleClickPromise" size="mini">自定义点击promise</s-button>
			</template>
			<!-- 正文主体 -->
			<el-descriptions class="margin-top" :column="3" :size="size" border>
				<el-descriptions-item>
					<template v-slot:label>
						<i class="el-icon-user"></i>
						用户名
					</template>
					kooriookami
				</el-descriptions-item>
				<el-descriptions-item>
					<template v-slot:label>
						<i class="el-icon-mobile-phone"></i>
						手机号
					</template>
					18100000000
				</el-descriptions-item>
				<el-descriptions-item>
					<template v-slot:label>
						<i class="el-icon-location-outline"></i>
						居住地
					</template>
					苏州市
				</el-descriptions-item>
				<el-descriptions-item>
					<template v-slot:label>
						<i class="el-icon-tickets"></i>
						备注
					</template>
					<el-tag size="small">学校</el-tag>
				</el-descriptions-item>
				<el-descriptions-item>
					<template v-slot:label>
						<i class="el-icon-office-building"></i>
						联系地址
					</template>
					江苏省苏州市吴中区吴中大道 1188 号
				</el-descriptions-item>
			</el-descriptions>
			<!-- 正文主体 -->
		</s-pageHeader>
	</div>

</template>
<script>
import { defineComponent } from 'vue';

export default defineComponent({
	setup() {
		const handleBack = () => {
			alert('父组件事件定义');
		};
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
		return { handleBack, handleClick, handleClickPromise };
	},
});
</script>

<style scoped>
.demo-wrap {
	background: #eee;
	padding: 20px;
}
</style>
