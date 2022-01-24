
import { h, resolveComponent, defineComponent, computed } from 'vue'
export default defineComponent({
    inheritAttrs: false,
    props: {
        tags: {
            default: ['el-select', 'el-option']
        },
        data: {
            required: true,
            type: Array
        },
        props: [Object, Array],
    },
    setup(props, context) {
        return () => {
            const data = computed(() => {
                let label = 'label'
                let value = 'value'

                let isManual = false
                if (props.props) {
                    isManual = true
                    if (Array.isArray(props.props)) {
                        if (props.props[0]) {
                            label = props.props[0]
                        }
                        if (props.props[1]) {
                            value = props.props[1]
                        }
                    }

                    if (Object.hasOwnProperty.call(props.props, 'label')) {
                        label = props.props.label
                    }
                    if (Object.hasOwnProperty.call(props.props, 'value')) {
                        value = props.props.value
                    }
                }



                return props.data.map(v => {
                    const copy = { ...v }
                    if (!Object.hasOwnProperty.call(copy, label) || isManual) {
                        copy['label'] = copy[label]
                    }
                    if (!Object.hasOwnProperty.call(copy, value) || isManual) {
                        copy['value'] = copy[value]
                    }
                    return copy
                })
            })






            if (props.tags[0] === 'el-select') {
                return h(resolveComponent(props.tags[0]), context.attrs, {
                    default: () => data.value.map(v => {
                        return h(resolveComponent(props.tags[1]), v)
                    })
                })
            } else {
                return h(resolveComponent(props.tags[0]), context.attrs, {
                    default: () => data.value.map(v => {
                        const { label, value, ...attrs } = v
                        attrs.label = value
                        return h(resolveComponent(props.tags[1]), attrs, {
                            default: () => label
                        })
                    })
                })
            }
        }

    }
})