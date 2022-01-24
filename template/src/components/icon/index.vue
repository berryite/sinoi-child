<template>
  <svg :class="svgClass" aria-hidden="true" v-if="svg">
    <use :xlink:href="'#'+iconName"></use>
  </svg>
  <i :class="iClass" v-else></i>
</template>

<script>
/**
 * name 取iconfont 值
 * svg 是否支持彩色
 * className 添加类名
 */
export default {
  name: 'c-icon',
  props: {
    name: {
      type: String,
      required: ''
    },
    svg: {
      type: Boolean,
      required: false
    },
    className: {
      type: String
    }
  },
  computed: {
    iconName() {
      return `font-${this.name}`
    },
    iClass() {
      if (this.className) {
        return 'iconSinoi '+ this.iconName + ' ' + this.className
      } else {
        return 'iconSinoi '+ this.iconName
      }
    },
    svgClass() {
      if (this.className) {
        return 'font ' + this.className
      } else {
        return 'font'
      }
    }
  }
}
</script>