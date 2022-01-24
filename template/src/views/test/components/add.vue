<template>
  <s-form :model="form">
    <s-form-item  label="元素名称" prop="a" />
    <s-form-item  label="元素ID" prop="a" />
    <s-form-item  label="元素分类" prop="a" />
    <s-form-item  label="元素类型" prop="a" />
    <s-form-item  label="元素值" prop="a" />
    <s-form-item>
        <s-button run="form.submit" type="primary">保存</s-button>
        <s-button run="form.submit" >关闭</s-button>
    </s-form-item>
  </s-form>
</template>
<script>
import { defineComponent, reactive } from 'vue'

export default defineComponent({
  setup() {
    const form = reactive({
      a: '',
    })

    return { form }
  },
})
</script>