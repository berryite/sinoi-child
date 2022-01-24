<template>
  <el-popconfirm v-if="confirm" v-bind="events" :title="confirm">
    <template v-slot:reference>
      <el-button v-bind="$attrs" :loading="loading">
        <slot />
      </el-button>
    </template>
  </el-popconfirm>
  <el-button v-else v-bind="bindProps" :loading="loading">
    <slot />
  </el-button>
</template>
<script>
import { defineComponent, mergeProps, ref, inject } from 'vue'
import { ElMessageBox } from 'element-plus'

const isPromise = (s) =>
  Object.prototype.toString.call(s) === '[object Promise]'
const isFunction = (s) => typeof s === 'function'
/**
 * form.submit
 * form.reset
 * form.search
 */

export default defineComponent({
  inheritAttrs: false,
  emits: ['click'],
  props: {
    run: {
      type: [String, Array],
    },
    confirm: {
      //如果存在confirm，就打开弹窗提示
      type: String,
    },
    dialogConfirm: {
      type: String,
    },
    onClick: {},
  },
  setup(props, context) {
    const FORM_PROVIDE_SUBMIT = inject('FORM_PROVIDE_SUBMIT', null)
    const FORM_PROVIDE_SEARCH = inject('FORM_PROVIDE_SEARCH', null)
    const FORM_PROVIDE_RESET = inject('FORM_PROVIDE_RESET', null)
    const FORM_PROVIDE_CLEAR = inject('FORM_PROVIDE_CLEAR', null)
    const DIALOG_PROVIDE_OPEN = inject('DIALOG_PROVIDE_OPEN', null)
    const DIALOG_PROVIDE_CLOSE = inject('DIALOG_PROVIDE_CLOSE', null)

    const eventName = props.confirm ? 'onConfirm' : 'onClick'
    const loading = ref(false)

    function runCommand(commands) {
      // debugger
      if (commands.length === 0) return
      const command = commands.shift()
      let provide = null

      switch (command) {
        case 'form.submit':
          provide = FORM_PROVIDE_SUBMIT
          break
        case 'form.search':
          provide = FORM_PROVIDE_SEARCH
          break
        case 'form.reset':
          provide = FORM_PROVIDE_RESET
          break
        case 'form.clear':
          provide = FORM_PROVIDE_CLEAR
          break
        case 'dialog.open':
          provide = DIALOG_PROVIDE_OPEN
          break
        case 'dialog.close':
          provide = DIALOG_PROVIDE_CLOSE
          break
      }

      if (provide && isFunction(provide)) {
        const result = provide()
        if (isPromise(result)) {
          loading.value = true
          return result
            .then(() => {
              loading.value = false
              return runCommand(commands)
            })
            .finally(() => {
              loading.value = false
            })
        } else {
          return runCommand(commands)
        }
      }
    }

    const next = (e) => {
      if (props.run) {
        return runCommand(
          Array.isArray(props.run) ? props.run : [props.run],
          loading
        )
      }

      if (isFunction(props.onClick)) {
        const result = props.onClick(e)
        if (isPromise(result)) {
          loading.value = true
          result.finally(() => {
            loading.value = false
          })
        }
      }
    }

    const events = {
      [eventName]: (e) => {
        if ('string' === typeof props.dialogConfirm) {
          ElMessageBox.confirm(props.dialogConfirm, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
          })
            .then(() => next(e))
            .catch(() => {})
        } else {
          next(e)
        }
      },
    }

    const bindProps = mergeProps(events, context.attrs)

    return {
      events,
      loading,
      bindProps,
    }
  },
})
</script>