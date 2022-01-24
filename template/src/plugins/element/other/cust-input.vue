<template>
  <el-select v-model="val" clearable remote filterable :remote-method="remoteMethod">
    <el-option v-for="item in options" :key="item.id" :label="item.custName" :value="item.id"></el-option>
  </el-select>
</template>
<script>
export default {
  props: ['value'],
  computed: {
    val: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
        this.$emit('change', this.options.filter((v) => v.id === value)[0])
      },
    },
  },
  data() {
    return {
      options: [],
    }
  },
  methods: {
    remoteMethod(query) {
      if (query !== '') {
        this.$api('common.findCustByCustName', { custName: query }).then(
          (res) => {
            this.options = Array.isArray(res.list) ? res.list : []
          }
        )
      } else {
        this.options = []
      }
    },
  },
  watch: {
    value(newValue, oldValue) {
      if (
        newValue &&
        newValue !== oldValue &&
        !this.options.some((v) => v.id === newValue)
      ) {
        this.$api('common.findCustNameByCustId', { custId: this.value }).then(
          (response) => {
            this.options = [
              {
                custName: response.custName,
                id: this.value,
              },
            ]
          }
        )
      }
    },
  },
}
</script>