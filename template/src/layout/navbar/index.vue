<template>
  <div class="navbar">
    <div class="left-nav">
      <div class="left-icon" @click="toggleClick">
        <svg :class="{'is-active':isActive}" class="hamburger" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="26" height="26">
          <path d="M408 442h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zm-8 204c0 4.4 3.6 8 8 8h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56zm504-486H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 632H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM142.4 642.1L298.7 519a8.84 8.84 0 0 0 0-13.9L142.4 381.9c-5.8-4.6-14.4-.5-14.4 6.9v246.3a8.9 8.9 0 0 0 14.4 7z" />
        </svg>
      </div>
    </div>
    <div class="right-menu">
      <el-dropdown @command="handleCommand" trigger="click" class="avatar-container right-menu-item hover-effect" placement="bottom-end">
        <span class="avatar-wrapper">
          <span class="username">{{ user.name }}</span>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item icon="el-icon-edit">修改密码</el-dropdown-item>
          </el-dropdown-menu>
          <el-dropdown-menu>
            <el-dropdown-item command="logout" icon="el-icon-s-tools">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from '@vue/reactivity'
import { useStore } from 'vuex'
export default {
	props: {
		isActive: {
			type: Boolean,
			default: false,
		},
	},
	setup() {
		const store = useStore()

		const user = reactive({
			name: '李大钊',
		})

		const navData = reactive({
			navIndex: 0,
		})

		const handleCommand = command => {
			switch (command) {
				case 'logout':
					console.log('logout!')
					break
				default:
					break
			}
		}

		const toggleClick = () => {
			store.commit('app/toggle_sidebar')
		}

		const selectNav = row => {
			console.log('选中=', row.name)
			navData.navIndex = row.index
		}

		return {
			user,
			handleCommand,
			toggleClick,
			selectNav,
			...toRefs(navData),
		}
	},
}
</script>
<style lang="scss" scoped>
.nav-header {
	.nav-tags {
		height: 44px;
		display: flex;
		align-items: center;
		border-bottom: 1px solid $--color-e0;
		box-sizing: border-box;
		.tag-item {
			flex-shrink: 0;
			display: flex;
			align-items: center;
			justify-content: center;
			cursor: pointer;
			height: 26px;
			// line-height: 28px;
			border: 1px solid #d8dce5;
			color: #495060;
			background: #fff;
			padding: 0 8px;
			font-size: 12px;
			margin-left: 5px;
			text-decoration: none;
			&:first-of-type {
				margin-left: 15px;
			}
			&:last-of-type {
				margin-right: 15px;
			}
			&.active {
				background-color: $--color-ui;
				color: #fff;
				border-color: $--color-ui;
				&::before {
					content: '';
					background: #fff;
					display: inline-block;
					width: 8px;
					height: 8px;
					border-radius: 50%;
					position: relative;
					margin-right: 2px;
				}
			}
			.tag-name {
				padding: 0 5px;
			}
			.tag-guanbi {
				width: 10px;
				height: 10px;
				padding: 3px;
				display: flex;
				justify-content: center;
				align-items: center;
				vertical-align: 2px;
				border-radius: 50%;
				text-align: center;
				transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
				transform-origin: 100% 50%;
				i {
					font-size: 12px;
				}
				i:before {
					display: inline-block;
					-webkit-transform: scale(0.6);
					transform: scale(0.6);
					vertical-align: -2px;
				}
				&:hover {
					background-color: #b4bccc;
					color: #fff;
				}
			}
		}
	}
}
.navbar {
	height: 50px;
	overflow: hidden;
	position: relative;
	background: #fff;
	box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
	padding: 0 10px;
	display: flex;
	justify-content: space-between;
	.left-nav {
		display: flex;
		align-items: center;
		.nav-item {
			height: 48px;
			line-height: 48px;
			padding: 0 18px;
			cursor: pointer;
			&.active {
				color: $--color-ui;
				border-bottom: 2px solid $--color-ui;
			}
		}
	}
	.left-icon {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-right: 20px;
		cursor: pointer;
	}
	.hamburger {
		display: inline-block;
		vertical-align: middle;
		width: 28px;
		height: 28px;
		&.is-active {
			transform: rotate(180deg);
		}
	}

	.right-menu {
		float: right;
		height: 100%;
		line-height: 50px;
		cursor: pointer;
		&:focus {
			outline: none;
		}

		.right-menu-item {
			display: inline-block;
			padding: 0 15px;
			height: 100%;
			font-size: 12px;
			color: #5a5e66;
			vertical-align: text-bottom;

			&.hover-effect {
				cursor: pointer;
				transition: background 0.3s;

				// &:hover {
				//   background: rgba(0, 0, 0, 0.025);
				// }
			}

			.badge-item {
				height: 22px;
				line-height: 25px;
			}
		}

		.avatar-container {
			.avatar-wrapper {
				margin-top: 5px;
				position: relative;

				.user-avatar {
					cursor: pointer;
					vertical-align: top;
					width: 40px;
					height: 40px;
					border-radius: 10px;
				}

				.el-icon-caret-bottom {
					cursor: pointer;
					position: absolute;
					right: -15px;
					top: 18px;
					font-size: 12px;
				}
			}
		}
	}
}
.avatar-container {
	.avatar-wrapper {
		margin-top: 5px;
		display: flex;
		align-items: center;
		position: relative;

		.user-avatar {
			cursor: pointer;
			vertical-align: top;
			font-size: 40px;
			border-radius: 10px;
			color: $--color-f2;
			margin-right: 5px;
		}
		.user-xiala {
			font-size: 12px;
		}

		.username {
			display: inline-block;
			vertical-align: top;
			font-size: 12px;
			margin-right: 2px;
			color: $--color-6;
		}

		.el-icon-caret-bottom {
			cursor: pointer;
			position: absolute;
			right: -15px;
			top: 18px;
			font-size: 12px;
		}
	}
}
</style>