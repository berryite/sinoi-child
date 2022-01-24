<template>
  <el-link type="primary" href="http://git.300.cn/chengbing/qiankun-child/blob/master/src/plugins/element/s-dialog.md" target="_blank">说明文档</el-link>
  <el-divider content-position="left">component</el-divider>
  <s-dialog :component="require('../../form/base')" title="通过componet参数显示内容">
    <template #reference>
      <s-button type="default" run="dialog.open">点击弹窗(slot按钮)</s-button>
    </template>
  </s-dialog>
  <s-button type="default" class="ml20" @click="openDialog()">点击弹窗(store按钮)</s-button>

  <el-divider content-position="left">slot</el-divider>
  <s-dialog uid="slot" title="通过slot参数显示内容">
    <Table />
    <s-footer>
      <s-button run="dialog.close">关闭</s-button>
    </s-footer>
    <template #reference>
      <s-button type="default" run="dialog.open">点击弹窗(slot按钮)</s-button>
    </template>
  </s-dialog>
  <s-button type="default" class="ml20" @click="openDialog('slot')">点击弹窗(store按钮)</s-button>
</template>
<script>
import { defineComponent } from 'vue'
import { useStore } from 'vuex'
import Table from '../../table/base'
export default defineComponent({
  components: { Table },
  setup() {
    const store = useStore()
    const openDialog = (uid) => {
      store.commit('dialog/open', { _uid: uid || 0 })
    }
    return {
      openDialog,
    }
  },
})
</script>
