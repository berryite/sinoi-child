<template>
  <el-link type="primary" href="http://git.300.cn/chengbing/qiankun-child/blob/master/src/plugins/element/s-table.md" target="_blank">说明文档</el-link>
  <el-divider content-position="left">组合一</el-divider>
  <div class="demo-wrap">
    <!-- 拷贝代码主体 -->
    <s-table :cols="table.cols" :data="table.data">
      <template #bottom>
        <s-button size="mini">全选</s-button>
        <s-button size="mini">取消全选</s-button>
        <span style="color:#f00;font-size:12px;">(* 此处必须 button size="mini")</span>
      </template>
    </s-table>
    <!-- 拷贝代码主体 -->
  </div>

  <el-divider content-position="left">组合二</el-divider>
  <div class="demo-wrap">
    <!-- 拷贝代码主体 -->
    <s-table :cols="table.cols" :data="table.data">
      <template #bottom>
        <el-alert title="消息提示的文案" type="info" show-icon>
        </el-alert>
      </template>
      <template #page>
        <s-button size="mini">全选</s-button>
        <s-button size="mini">取消全选</s-button>
        <span style="color:#f00;font-size:12px;">(* 此处必须 button size="mini")</span>
      </template>
    </s-table>
    <!-- 拷贝代码主体 -->
  </div>
</template>
<script>
import { defineComponent, reactive } from 'vue'

export default defineComponent({
  setup() {
    const search = () => {
      alert(JSON.stringify(form))
    }
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
    const table = reactive({
      data: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄',
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
        },
      ],
      cols: [
        {
          label: '日期',
          prop: 'date',
        },
        {
          label: '姓名',
          prop: 'name',
        },
        {
          label: '地址',
          prop: 'address',
        },
      ],
    })
    return { search, form, options, table }
  },
})
</script>
<style scoped>
.demo-wrap {
  background: #eaeaea;
  padding: 20px;
}
</style>
