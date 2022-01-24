/* eslint-disable no-unused-vars */
import Params, { addRule } from '../../utils/params-util'
import { defineComponent, h, resolveComponent, mergeProps } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { CURRENT_PAGE, PAGE_SIZE } from '../../CONFIG'

export const COMPONENT_NAME = 'P'

addRule(COMPONENT_NAME, {
  parse(params) {
    params = params.split('.')
    return {
      [CURRENT_PAGE]: +params[0],
      [PAGE_SIZE]: +params[1]
    }
  },
  componentization(params) {
    return Object.keys(params)
      .map(v => params[v])
      .join('.')
  }
})

export default defineComponent({
  inheritAttrs: false,
  emits: ['current-change', 'size-change', 'page-init'],
  props: {
    uid: {
      default: 0
    },
  },
  setup(props, context) {
    const queryParams = new Params(COMPONENT_NAME, props.uid, useRoute(), useRouter())

    const query = queryParams.get()
    if (query) {
      context.emit('page-init', query)
    }

    return () => {
      const bindProps = mergeProps({
        onCurrentChange(val) {
          const query = {
            currentPage: val,
            pageSize: context.attrs.pageSize || context.attrs['page-size']
          }
          queryParams.set(query).then(() => {
            context.emit('current-change', val)
          })
        },
        onSizeChange(val) {
          const query = {
            currentPage: context.attrs.currentPage || context.attrs['current-page'],
            pageSize: val
          }
          queryParams.set(query).then(() => {
            context.emit('size-change', val)
          })
        },
      }, context.attrs)
      return h(resolveComponent('el-pagination'), bindProps)
    }
  }
})


