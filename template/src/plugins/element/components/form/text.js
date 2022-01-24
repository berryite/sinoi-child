import formatDate from '../../utils/format-date'
import { h, resolveComponent, defineComponent, computed } from 'vue'

export default defineComponent({
  props: {
    formatDate: String,
    modelValue: {
      default: ''
    },
    tag: {
      default: 'span'
    },
    props: {
      default() {
        return {
          label: 'label',
          value: 'value'
        }
      }
    },
    separator:{
      default: ','
    },
    data: Array,
    tip: [String, Boolean],
    emptyText: {
      default: '--'
    }
  },
  setup(props) {

    const content = computed(() => {
      // 日期
      if (props.formatDate) {
        return formatDate(props.modelValue, props.formatDate)
      }

      // 选项
      if (props.data && props.data.length && props.modelValue !== undefined && props.modelValue !== '') {
        try {
          if (Array.isArray(props.modelValue)) {
            return props.data.filter(v => props.modelValue.includes(v[props.props.value])).map(v => v[props.props.label]).join(props.separator)
          } else {
            return props.data.find(v => v[props.props.value] === props.modelValue)[props.props.label]
          }
        } catch {
          return ''
        }
      }
      return props.modelValue ? props.modelValue : props.emptyText
    })








    return () => {
      const contentRender = h(props.tag, null, { default: () => content.value })
      const tipRender = h(resolveComponent('el-tooltip'), {
        openDelay: 800,
        effect: 'dark',
        content: 'string' === typeof props.tip ? props.tip : content.value
      }, { default: () => contentRender })

      return props.tip ? tipRender : contentRender
    }
  },
})