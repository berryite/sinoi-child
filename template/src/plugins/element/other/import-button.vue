<template>
  <old-upload
    ref="upload"
    @error="error"
    @success="success"
    class="wmcbfOr3gnMWQpEZ"
    :action="action"
    :accept="accept"
    :show-file-list="false"
  >
    <slot v-if="$slots.default"></slot>
    <s-button v-else v-bind="$attrs">导入</s-button>
  </old-upload>
</template>
<script>
export default {
  props: {
    action: {
      required: true
    },
    accept: {
      default: 'xls,xlsx'
    },
    successMessage: {
      default: '导入成功！'
    },
    errorMessage: {
      default: '导入失败！'
    }
  },
  methods: {
    error(val) {
      this.$refs.upload.$refs.upload.clearFiles()
      this.$message({
        type: 'error',
        message: val || this.errorMessage
      })
      this.$emit('error', val)
    },
    success(val) {
      this.$refs.upload.$refs.upload.clearFiles()
      this.$message({
        type: 'success',
        message: this.successMessage
      })
      this.files = []
      this.$emit('input', val)
      this.$emit('change', val)
    }
  }
}
</script>
<style>
.wmcbfOr3gnMWQpEZ {
  display: inline-block;
}
.wmcbfOr3gnMWQpEZ .upload__text__1 {
  display: inline-block;
}
</style>