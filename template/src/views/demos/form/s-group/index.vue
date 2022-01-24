<template>
  <el-link type="primary" href="http://git.300.cn/chengbing/qiankun-child/blob/master/src/plugins/element/s-form.md" target="_blank">说明文档</el-link>
  <el-divider content-position="left">tags, data 属性</el-divider>
  <h5>默认 el-select</h5>
  <div class="demo-wrap">
    <!-- 拷贝代码主体 -->
    <s-form :model="form" label-width="120px">
      <s-form-item label="默认" prop="cate" component="s-group" :data="options" />
    </s-form>
    <!-- 拷贝代码主体 -->
  </div>

  <h5>el-checkbox</h5>
  <div class="demo-wrap">
    <!-- 拷贝代码主体 -->
    <s-form :model="form" label-width="120px">
      <s-form-item label="多选框组" prop="checkbox" component="s-group" :data="options" :tags="['el-checkbox-group', 'el-checkbox']" />
      <s-form-item label="多选框组" prop="checkbox" component="s-group" :data="options" :tags="['el-checkbox-group', 'el-checkbox-button']" />
    </s-form>
    <!-- 拷贝代码主体 -->
  </div>

  <h5>el-radio</h5>
  <div class="demo-wrap">
    <!-- 拷贝代码主体 -->
    <s-form :model="form" label-width="120px">
      <s-form-item label="单选框组" prop="radio" component="s-group" :data="options" :tags="['el-radio-group', 'el-radio']" />
      <s-form-item label="单选框组" prop="radio" component="s-group" :data="options" :tags="['el-radio-group', 'el-radio-button']" />
    </s-form>
    <!-- 拷贝代码主体 -->
  </div>


  <el-divider content-position="left">init 属性</el-divider>

  <el-divider content-position="left">props 属性</el-divider>

</template>
<script>
import { defineComponent, reactive } from 'vue'

export default defineComponent({
  setup() {
    const form = reactive({
      name: '',
      cate: '1',
      checkbox: ['2'],
      radio: '1',
      cascader: '待补充',
      num: 1,
      switch: false,
      time: '',
      daterange: '',
    })
    const submit = () => {
      alert(JSON.stringify(form))
    }
    const handleClick = () => {
      alert(1)
    }
    const handleClickPromise = () => {
      return new Promise(function (resolve) {
        setTimeout(function () {
          resolve('成功!')
        }, 2000)
      })
    }
    const options = [
      {
        value: '1',
        label: '黄金糕',
      },
      {
        value: '2',
        label: '双皮奶',
      },
      {
        value: '3',
        label: '蚵仔煎',
      },
      {
        value: '4',
        label: '龙须面',
      },
      {
        value: '5',
        label: '北京烤鸭',
      },
    ]
    const options2 = [
      {
        value: 'zhinan',
        label: '指南',
        children: [
          {
            value: 'shejiyuanze',
            label: '设计原则',
            children: [
              {
                value: 'yizhi',
                label: '一致',
              },
              {
                value: 'fankui',
                label: '反馈',
              },
              {
                value: 'xiaolv',
                label: '效率',
              },
              {
                value: 'kekong',
                label: '可控',
              },
            ],
          },
          {
            value: 'daohang',
            label: '导航',
            children: [
              {
                value: 'cexiangdaohang',
                label: '侧向导航',
              },
              {
                value: 'dingbudaohang',
                label: '顶部导航',
              },
            ],
          },
        ],
      },
      {
        value: 'zujian',
        label: '组件',
        children: [
          {
            value: 'basic',
            label: 'Basic',
            children: [
              {
                value: 'layout',
                label: 'Layout 布局',
              },
              {
                value: 'color',
                label: 'Color 色彩',
              },
              {
                value: 'typography',
                label: 'Typography 字体',
              },
              {
                value: 'icon',
                label: 'Icon 图标',
              },
              {
                value: 'button',
                label: 'Button 按钮',
              },
            ],
          },
          {
            value: 'form',
            label: 'Form',
            children: [
              {
                value: 'radio',
                label: 'Radio 单选框',
              },
              {
                value: 'checkbox',
                label: 'Checkbox 多选框',
              },
              {
                value: 'input',
                label: 'Input 输入框',
              },
              {
                value: 'input-number',
                label: 'InputNumber 计数器',
              },
              {
                value: 'select',
                label: 'Select 选择器',
              },
              {
                value: 'cascader',
                label: 'Cascader 级联选择器',
              },
              {
                value: 'switch',
                label: 'Switch 开关',
              },
              {
                value: 'slider',
                label: 'Slider 滑块',
              },
              {
                value: 'time-picker',
                label: 'TimePicker 时间选择器',
              },
              {
                value: 'date-picker',
                label: 'DatePicker 日期选择器',
              },
              {
                value: 'datetime-picker',
                label: 'DateTimePicker 日期时间选择器',
              },
              {
                value: 'upload',
                label: 'Upload 上传',
              },
              {
                value: 'rate',
                label: 'Rate 评分',
              },
              {
                value: 'form',
                label: 'Form 表单',
              },
            ],
          },
          {
            value: 'data',
            label: 'Data',
            children: [
              {
                value: 'table',
                label: 'Table 表格',
              },
              {
                value: 'tag',
                label: 'Tag 标签',
              },
              {
                value: 'progress',
                label: 'Progress 进度条',
              },
              {
                value: 'tree',
                label: 'Tree 树形控件',
              },
              {
                value: 'pagination',
                label: 'Pagination 分页',
              },
              {
                value: 'badge',
                label: 'Badge 标记',
              },
            ],
          },
          {
            value: 'notice',
            label: 'Notice',
            children: [
              {
                value: 'alert',
                label: 'Alert 警告',
              },
              {
                value: 'loading',
                label: 'Loading 加载',
              },
              {
                value: 'message',
                label: 'Message 消息提示',
              },
              {
                value: 'message-box',
                label: 'MessageBox 弹框',
              },
              {
                value: 'notification',
                label: 'Notification 通知',
              },
            ],
          },
          {
            value: 'navigation',
            label: 'Navigation',
            children: [
              {
                value: 'menu',
                label: 'NavMenu 导航菜单',
              },
              {
                value: 'tabs',
                label: 'Tabs 标签页',
              },
              {
                value: 'breadcrumb',
                label: 'Breadcrumb 面包屑',
              },
              {
                value: 'dropdown',
                label: 'Dropdown 下拉菜单',
              },
              {
                value: 'steps',
                label: 'Steps 步骤条',
              },
            ],
          },
          {
            value: 'others',
            label: 'Others',
            children: [
              {
                value: 'dialog',
                label: 'Dialog 对话框',
              },
              {
                value: 'tooltip',
                label: 'Tooltip 文字提示',
              },
              {
                value: 'popover',
                label: 'Popover 弹出框',
              },
              {
                value: 'card',
                label: 'Card 卡片',
              },
              {
                value: 'carousel',
                label: 'Carousel 走马灯',
              },
              {
                value: 'collapse',
                label: 'Collapse 折叠面板',
              },
            ],
          },
        ],
      },
      {
        value: 'ziyuan',
        label: '资源',
        children: [
          {
            value: 'axure',
            label: 'Axure Components',
          },
          {
            value: 'sketch',
            label: 'Sketch Templates',
          },
          {
            value: 'jiaohu',
            label: '组件交互文档',
          },
        ],
      },
    ]
    return { form, options, options2, submit, handleClick, handleClickPromise }
  },
})
</script>
<style scoped>
.demo-wrap {
	background: #eee;
	padding: 20px;
}
</style>