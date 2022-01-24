<template>
  <el-link type="primary" href="http://git.300.cn/chengbing/qiankun-child/blob/master/src/plugins/element/s-button.md" target="_blank">说明文档</el-link>
	<div class="demo-wrap">
		<!-- 拷贝代码主体 -->
    <s-form :model="form" @submit="submit" label-width="120px">
      <s-form-item label="单条文本" prop="name" placeholder="请输入" />
      <s-form-item label="下拉选择" prop="cate" component="s-group" :data="options" />
      <s-form-item label="多选框组" prop="checkbox" component="s-group" :data="options" :tags="['el-checkbox-group', 'el-checkbox']" />
      <s-form-item label="单选框组" prop="radio" component="s-group" :data="options" :tags="['el-radio-group', 'el-radio']" />
      <s-form-item label="级联" component="s-text" prop="cascader" />
      <s-form-item label="计数器" component="el-input-number" :min="2" :max="10" prop="num" />
      <s-form-item label="Switch" component="el-switch" prop="switch" />
      <s-form-item label="日期" component="el-date-picker" prop="time" />
      <s-form-item label="日期范围" component="el-date-picker" type="daterange" prop="daterange" />
      <s-footer>
        <s-form-item label="">
            <s-button run="form.submit" type="primary">提交</s-button>
            <s-button run="form.submit" type="primary" confirm="确认信息">提交确认popconfirm</s-button>
            <s-button run="form.submit" type="primary" dialogConfirm="确认信息">提交确认dialogconfirm</s-button>
            <s-button run="form.reset">重置</s-button>
            <s-button run="form.clear">清空</s-button>
        </s-form-item>
      </s-footer>
    </s-form>
		<!-- 拷贝代码主体 -->
	</div>

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
    return { form, options, options2, submit }
  },
})
</script>
<style scoped>
.demo-wrap {
	background: #eee;
	padding: 20px;
}
</style>