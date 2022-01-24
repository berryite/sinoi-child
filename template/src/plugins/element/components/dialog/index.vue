<template>
  <slot name="reference" />
  <el-dialog v-bind="$attrs" v-model="isVisible" destroy-on-close>
    <component v-if="component" class="s-dialog-componet" :is="component.default?component.default:component" v-bind="sParams||{}" />
    <slot class="s-dialog-slot" v-else v-bind="sParams||{}" />
  </el-dialog>
</template>
<script>
import { defineComponent, ref, provide, computed, watch } from 'vue'
import { timestamp, uid, event, params } from '../../store/config'
import { useStore } from 'vuex'
export default defineComponent({
	inheritAttrs: false,
	emits: ['open', 'close'],
	props: {
		uid: {
			default: 0,
		},
		component: {
			default: null,
		},
	},
	setup(props, { emit }) {
		const isVisible = ref(false)
		const store = useStore()
		const sTimestamp = computed(() => store.state.dialog[timestamp])
		const sUID = computed(() => store.state.dialog[uid])
		const sEvent = computed(() => store.state.dialog[event])
		const sParams = computed(() => store.state.dialog[params])

		const close = () => {
			isVisible.value = false
			emit('close')
		}

		const open = () => {
			isVisible.value = true
			emit('open', sParams)
		}
		watch(sTimestamp, () => {
			if (sUID.value === props.uid || sUID.value === 'all') {
				if (sEvent.value === 'open') {
					open()
				}
				if (sEvent.value === 'close') {
					close()
				}
			}
		})
		provide('DIALOG_PROVIDE_CLOSE', close)
		provide('DIALOG_PROVIDE_OPEN', open)
		return {
			isVisible,
			sParams,
			close,
		}
	},
})
</script>
