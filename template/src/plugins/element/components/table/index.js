import { h, resolveComponent, defineComponent, mergeProps } from 'vue'
const props = {
  uid: {
    default: 0
  },
  cols: {
    required: true,
    type: Array
  },
  value: {
    default() {
      return []
    }
  }
}

const tableColumnParser = (() => {
  const rules = []
  return {
    _parse(props) {
      const config = {
        props: { ...props },
        slots: {}
      }
      if (typeof props.prop === 'string') {
        props.prop = props.prop.trim()
      }

      for (let i = 0, result; i < rules.length; i++) {
        // eslint-disable-next-line no-cond-assign
        if (result = rules[i](config)) {
          return result
        }
      }
      return config
    },
    parse(cols) {
      return cols.map(v => {
        const props = { ...v }
        const t = tableColumnParser._parse(props)

        return h(
          resolveComponent('el-table-column'),
          t.props,
          t.slots
        )
      })
    },
    add(fn) {
      rules.push(fn)
    }
  }
}
)()

function parseCustomNode(result, scope) {
  if (Array.isArray(result)) {
    return result.map(v => parseCustomNode(v, scope))
  }
  return result
}

/**
 * 自定义返回值解析器
 * 返回一个function,参数是sopce,createElement
 */
tableColumnParser.add(function ({ props, slots }) {
  //即将废弃 新版本改用render替代
  if (typeof props.prop === 'function') {
    const func = props.prop
    delete props.prop
    slots.default = (scope) => {
      return parseCustomNode(func(scope), scope)
    }
  }
})
/**
 * 自定义返回值解析器
 * 返回一个function,参数是sopce,createElement
 */
tableColumnParser.add(function ({ props, slots }) {
  if (typeof props.render === 'function') {
    const func = props.render
    delete props.render
    slots.default = (scope) => {
      return parseCustomNode(func(scope), scope)
    }
  }
})

/**
 * 自定义表头解析器
 */
tableColumnParser.add(function ({ props, slots }) {
  if (typeof props.label === 'function') {
    const func = props.label
    delete props.label
    slots.header = (scope) => {
      return parseCustomNode(func(scope), scope)
    }
  }
})



export default defineComponent({
  props,
  setup(props, context) {
    // 解析表格
    const cols = tableColumnParser.parse(props.cols)
    return () => {
      return h(
        resolveComponent('el-table'),
        mergeProps(context.attrs),
        { default: () => cols }
      )
    }
  },
})

