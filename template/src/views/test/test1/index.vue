<template>
  <el-page-header content="自定义元素" />
  <el-alert :closable="false" type="error" title="此功能用于设置自定义表单元素，用户可根据自身业务定义要记录的信息！" />
  <s-form inline :model="form">
    <s-form-item label="元素名称" prop="a" />
    <s-form-item label="元素分类" prop="a" />
    <s-form-item label="元素状态" prop="a" />
    <s-form-item label="创建时间" component="el-date-picker" prop="a" />
    <s-form-item>
      <s-button run="form.search" type="primary">查询</s-button>
      <s-button run="form.reset">重置</s-button>
    </s-form-item>
  </s-form>
  <div>
    <s-button type="primary" @click="dialog.isVisible=true">新增</s-button>
  </div>
  <s-table :cols="table.cols" :data="table.data" />
  <el-dialog v-model="dialog.isVisible" v-bind="dialog.options">
    <AddElement class="fw"></AddElement>
  </el-dialog>

</template>
<script>
import { defineComponent, reactive } from 'vue'
import AddElement from '../components/add'

export default defineComponent({
  components: { AddElement },
  setup() {
    const form = reactive({
      a: '',
    })

    const dialog = reactive({
      options: {
        title: '新增元素',
        width: '600px',
      },
      isVisible: false,
    })

    const table = reactive({
      data: [{ a: 1 }],
      cols: [
        {
          label: '元素名称',
          prop: 'a',
        },
        {
          label: '元素分类',
          prop: 'a',
        },
        {
          label: '状态',
          prop: 'a',
        },
        {
          label: '类型',
          prop: 'a',
        },
        {
          label: '最近编辑人',
          prop: 'a',
        },
        {
          label: '创建时间',
          prop: 'a',
        },
        {
          label: '最近编辑时间',
          prop: 'a',
        },
        {
          label: '操作',
          prop: () => {
            const buttons = [
              <s-button type="text">编辑</s-button>,
              <s-button type="text">停用</s-button>,
            ]
            return buttons
          },
        },
      ],
    })

    return { form, table, dialog }
  },
})
</script>