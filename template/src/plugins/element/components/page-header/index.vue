<template>
	<div class="s-page-header">
		<el-row class="s-page-header__title">
			<el-col :span="8">
				<div class="left">
					<span v-if="showBack" class="back" @click="event">返回</span>
					<div class="left-slot">
						<slot name="left" />
					</div>
				</div>
			</el-col>
			<el-col :span="8">
				<div class="title">
					<slot name="title">
						{{ title }}
					</slot>
				</div>
			</el-col>
			<el-col :span="8">
				<div class="right">
					<slot name="right" />
				</div>
			</el-col>
		</el-row>
		<div class="s-page-header__content">
			<slot>
				{{ content }}
			</slot>
		</div>
	</div>
</template>
<script>
import { defineComponent } from 'vue'
const isFunction = (s) => typeof s === 'function'
export default defineComponent({
  props: {
    showBack: {
      default: true,
    },
    title: {
      default: '',
    },
    content: {
      default: '',
    },
	back: {}
  },
  setup(props) {
    function event() {
		if (isFunction(props.back)) {
			props.back()
		} else {
			history.go(-1)
		}
    }
    return {
		event
    }
  },
})
</script>
<style scoped lang="scss">
.s-page-header {
	background: #fff;
	.s-page-header__title {
		padding: 10px 20px;
		border-bottom: 1px solid #eaeefb;
		.el-col{
			// justify-content:center;
			align-self:center;
		}
		.back{
			font-size: 14px;
			cursor: pointer;
			margin-right: 20px;
		}
		.title {
			text-align: center;
			font-size: 16px;
		}
		.right {
			text-align: right;
		}
		.left-slot{
			display: inline-block;
		}
	}
	.s-page-header__content{
		padding: 20px 0;
	}
}
</style>
