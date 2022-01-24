import Params, { addRule } from '../../utils/params-util'
import { h, resolveComponent, defineComponent, mergeProps } from 'vue'
import { useRouter, useRoute } from 'vue-router'
export const COMPONENT_NAME = 'TAB'

addRule(COMPONENT_NAME, {
  parse(params) {
    return params
  },
  componentization(params) {
    return params
  }
})

export default defineComponent({
  emits: ['update:modelValue'],
  props: {
    uid: {
      default: 0
    },
    modelValue: {
      default: ''
    }
  },
  setup(props, context) {
    const queryParams = new Params(COMPONENT_NAME, props.uid, useRoute(), useRouter())

    const value = queryParams.get()
    if (value !== props.modelValue) {
      context.emit('update:modelValue', value || props.modelValue)
    }

    const bindProps = mergeProps({
      modelValue: queryParams.get() || props.modelValue,
      ['onUpdate:modelValue'](val) {
        queryParams.set(val).then(() => {
          context.emit('update:modelValue', val)
        })
      }
    }, context.attrs)

    return ()=>h(resolveComponent('el-tabs'), bindProps, context.slots)

  }
})