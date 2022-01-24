import { h, resolveComponent, defineComponent, mergeProps, inject } from 'vue';

export default defineComponent({
  props: {
    component: {
      default: 'el-input',
    },
    label: {
      type: String,
    },
    prop: {
      type: String,
    },
    labelWidth: {
      type: String,
    },
    required: {
      default: false,
    },
    rules: {
      type: Array,
    },
    error: {
      type: String,
    },
    showMessage: {
      default: true,
    },
    inlineMessage: {
      default: false,
    },
    size: {
      type: String,
    },
    defaultValue: {
      default: '',
    },
  },
  inheritAttrs: false,
  emits: ['update:modelValue'],
  setup(props, context) {
    const blurArr = ['el-input'];
    const event = blurArr.includes(props.component) ? 'blur' : 'change';
    const rules = Array.isArray(props.rules)
      ? props.rules.map((rule) => {
        if (typeof rule === 'string' && rule.includes('required')) {
          const type = rule.split(':')[1] ? rule.split(':')[1] : 'string';
          return { required: true, type, message: `请${event === 'blur' ? '输入' : '选择'}${props.label}`, tirgger: event };
        }

        if (typeof rule === 'string' && rule === 'email') {
          return { pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/, message: '邮箱格式不正确', tirgger: event };
        }

        if (typeof rule === 'string' && rule === 'mobile') {
          return { pattern: /^1\d{10}$/, message: '手机号格式不正确', tirgger: event };
        }

        return rule;
      })
      : props.rules

    // const label = props.label ? props.label + '：' : props.label;
    const label = props.label ? props.label : props.label;
    if (context.slots.default) {
      return () => {
        const t = resolveComponent('el-form-item');
        return h(
          t,
          {
            ...props,
            rules,
            label,
            class: [context.attrs.class],
          },
          context.slots
        );
      };
    }

    const formModel = inject('FORM_PROVIDE_MODEL');
    const setFormModel = inject('FORM_PROVIDE_SET_MODEL');

    if (formModel && !Object.prototype.hasOwnProperty.call(formModel, props.prop) && props.prop) {
      if (!props.prop.includes('.')) {
        setFormModel(props.prop, props.defaultValue);
      }
    }

    return () => {
      const clearableElements = ['el-input','s-input','s-group','s-select','el-cascader']
      const clearable = clearableElements.includes(props.component) ? (Object.prototype.hasOwnProperty.call(context.attrs, 'clearable') || inject('TABLE_PROVIDE_UID', null) !== null) : undefined;

      const bindProps = mergeProps(
        {
          clearable,
          modelValue: formModel[props.prop],
          'onUpdate:modelValue'(val) {
            if (!props.prop.includes('.')) {
              setFormModel(props.prop, val);
            }
            context.emit('update:modelValue', val);
          },
        },
        context.attrs
      );

      const t = resolveComponent('el-form-item');
      return h(
        t,
        {
          ...props,
          rules,
          label,
          class: [context.attrs.class],
        },
        { default: () => h(resolveComponent(props.component), bindProps) }
      );
    };
  },
});
