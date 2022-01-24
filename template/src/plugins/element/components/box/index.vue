<template>
	<div :class="'s-box type' + type">
		<div class="s-box-tit clearfix">
			<div class="left"><slot name="tit-left">{{ titLeft }}</slot></div>
			<div class="right"><slot name="tit-right">{{ titRight }}</slot></div>
		</div>
		<div class="s-box-cont">
			<slot name="content">
				{{ content }}
			</slot>
		</div>
	</div>
</template>
<script>
import { defineComponent } from 'vue';
export default defineComponent({
	props: {
		type: {
			default: '1',
		},
		titLeft: {
			default: '',
		},
		titRight: {
			default: '',
		},
		content: {
			default: '',
		},
	},
	setup() {
		return {};
	},
});
</script>

<style scoped lang="scss">
.s-box {
	background: #fff;
	.s-box-tit {
		height: 40px;
		line-height: 40px;
		font-size: 14px;
		border-bottom: 1px solid #eaeefb;
		padding: 0;
		// margin: 0 20px;
		font-weight: normal;
		position: relative;
		.left {
			float: left;
			color: #333;
			padding-left: 20px;
			&::after {
				content: '';
				width: 4px;
				height: 20px;
				background: $--color-theme;
				position: absolute;
				left: 0px;
				top: 50%;
				margin-top: -10px;
			}
		}

		.right {
			float: right;
			font-size: 12px;
			color: #333;
			margin-right: 20px;
		}
	}
	.s-box-cont {
		padding: 20px;
		font-size: 12px;
		line-height: 16px;
	}
	&.type2 {
		.s-box-tit {
			border-bottom: 2px solid #eaeefb;
			.left {
				padding: 0 10px;
				position: relative;
				color: $--color-theme;
				&::after {
					content: '';
					width: 100%;
					height: 2px;
					background: $--color-theme;
					position: absolute;
					left: 0px;
					bottom: -2px;
					top: auto;
				}
			}
		}
		.s-box-cont {
			padding: 20px 0;
		}
	}
}
</style>
