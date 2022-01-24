<template>
  <span v-if="loading">loading...</span>
  <Group v-bind="$attrs" v-else :data="isRemoteData?remoteData:data" />
</template>
<script>
import Group from './index'
import tryGetOnlyArray from '../../../utils/data-patch-v1/try-get-only-array'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  inheritAttrs: false,
  components: { Group },
  props: {
    data: {
      required: true,
    },
    init: {
      default: true,
    },
    page: {
      type: [Object, Boolean],
      default: true,
    },
  },
  setup(props) {
    const loading = ref(false)
    const isRemoteData = ref(false)
    const remoteData = ref([])

    const getRemoteData = (params) => {
      loading.value = true
      isRemoteData.value = true
      props
        .data(params)
        .then((response) => {
          const result = tryGetOnlyArray(response)
          if (result.error === false) {
            remoteData.value = result.data
          }
        })
        .finally(() => {
          loading.value = false
        })
    }

    if (props.init && typeof props.data === 'function') {
      getRemoteData()
    }

    return {
      loading,
      isRemoteData,
      remoteData,
      getRemoteData,
    }
  },
})
</script>
