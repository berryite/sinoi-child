<template>
  <div :key="`s-table-${uid}`" class="s-table" :class="{ 's-table__empty': !tableData || tableData.length === 0, 's-table__inited': isInited }">
    <slot name="form" />
    <!-- <slot name="top" /> -->
    <div class="slot-top" v-if="$slots.top">
      <slot name="top" />
    </div>

    <Table v-bind="$attrs" v-loading="tableIsLoading" :uid="uid" :data="tableData">
      <slot />
    </Table>
    <div class="slot-bottom" v-if="$slots.bottom">
      <slot name="bottom" />
    </div>
    <div v-if="page !== false" class="ce-pagination">
      <slot name="page" />
      <Page :page-size="queryParams.pagination[CURRENT_PAGE]" background layout="total,sizes,prev, pager, next, jumper" :current-page="queryParams.pagination[PAGE_SIZE]" @current-change="currentChange" @size-change="sizeChange" @pageInit="pageInit" :page-sizes="[10, 20, 50, 100]" :uid="uid" :total="total" v-bind="page === true ? {} : page" v-if="page !== false" ref="pageRef"></Page>
    </div>
  </div>
</template>
<script>
import Table from './index'
import Page from '../pagination/index'
import tryGetOnlyArray from '../../utils/data-patch-v1/try-get-only-array'
import tryGetPaginationParams from '../../utils/data-patch-v1/try-get-pagination-params'
import { timestamp, uid, event, params } from '../../store/config'
import { useStore } from 'vuex'
import {CURRENT_PAGE,PAGE_SIZE} from '../../CONFIG'

import { defineComponent, ref, reactive, computed, watch, provide } from 'vue'

export default defineComponent({
  components: { Table, Page },
  props: {
    uid: {
      default: 0,
    },
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
    props: {
      default() {
        return {
          data: 'data',
          total: 'total',
        }
      },
    },
  },
  setup(props, context) {
    const queryParams = reactive({
      form: {},
      pagination: {
        [PAGE_SIZE]: 10,
        [CURRENT_PAGE]: 1,
      },
    })

    const pageRef = ref(null)
    const isInited = ref(false) //记录当前表格是否进行过数据初始化
    const tableIsLoading = ref(false)
    const total = ref(0)
    const mandatoryInit = ref(false) //存在查询条件的情况下，强制触发初始化

    const tableData = ref([])
    const store = useStore()

    const sTimestamp = computed(() => store.state.table[timestamp])
    const sUID = computed(() => store.state.table[uid])
    const sEvent = computed(() => store.state.table[event])
    const sParams = computed(() => store.state.table[params])

    function setTableData(response) {
      const data = response ? response.data || response : []
      tableIsLoading.value = false
      let _tableData = data[props.props.data]
      let _total = data[props.props.total]
      if (!Array.isArray(_tableData)) {
        _tableData = tryGetOnlyArray(data).data
      }
      if (typeof _total !== 'number') {
        _total = tryGetPaginationParams(data).total
      }
      tableData.value = _tableData
      total.value = _total
    }

    function parseData(params) {
      if (typeof props.data === 'function') {
        tableIsLoading.value = true
        return props.data(params).then(
          (response) => {
            setTableData(response)
          },
          () => {
            tableIsLoading.value = false
          }
        )
      } else if (Array.isArray(props.data)) {
        tableData.value = props.data
      }
    }
    function change() {
      isInited.value = true
      if (Array.isArray(props.data)) {
        tableData.value = props.data
      } else {
        let params = {
          ...queryParams.form,
        }
        if (sUID.value === props.uid) {
          params = { ...params, ...sParams.value }
        }

        //在不使用分页组件的情况下，不合并分页参数
        if (props.page !== false) {
          params = { ...params, ...queryParams.pagination }
        }
        return parseData(params)
      }
    }

    // 供查询表单调用
    function formSearch(params) {
      queryParams.form = params
      if (props.page !== false) {
        // 如果存在分页组件，在查询条件变更的情况下，改变分页到第一页，并触发查询事件
        return pageRef.value.$emit('current-change', 1)
      } else {
        return change()
      }
    }
    // 供查询表单调用
    function formReset(params) {
      queryParams.form = params || {}
    }
    // 供查询表单调用
    function formInit(params) {
      mandatoryInit.value = true
      queryParams.form = params
    }
    provide('TABLE_PROVIDE_UID', props.uid)
    provide('TABLE_PROVIDE_COLS', context.attrs.cols)
    provide('TABLE_PROVIDE_FORM_SEARCH', formSearch)
    provide('TABLE_PROVIDE_FORM_RESET', formReset)
    provide('TABLE_PROVIDE_FORM_INIT', formInit)

    function pageInit(params) {
      mandatoryInit.value = true
      queryParams.pagination = { ...queryParams.pagination, ...params }
    }

    function sizeChange(size) {
      queryParams.pagination[PAGE_SIZE] = size
      change()
    }
    function currentChange(next) {
      queryParams.pagination[CURRENT_PAGE] = next
      change()
    }

    watch(sTimestamp, () => {
      if (
        sUID.value === props.uid ||
        (sUID.value === 'all' && sEvent.value === 'update')
      ) {
        change()
      }
    })

    watch(() => props.data, change)

    if (props.init) {
      setTimeout(() => {
        change()
      })
    } else {
      setTimeout(() => {
        if (mandatoryInit.value === true) {
          change()
        }
      })
    }

    return {
      pageRef,
      pageInit,
      sizeChange,
      currentChange,
      tableIsLoading,
      tableData,
      isInited,
      queryParams,
      total,
    }
  },
})
</script>
<style>
.s-table {
  background: #fff;
}
.s-table .el-form {
  border-bottom: 1px solid #ededed;
}
.s-table .slot-top {
  padding: 10px 0;
}
.s-table .slot-bottom {
  padding: 10px 0 0 0;
}
/* 分页 */
.s-table .ce-pagination {
  padding: 20px 0;
  overflow: hidden;
}
.s-table .ce-pagination .el-pagination {
  float: right;
}
.s-table.hide-uninitialized-table .el-table,
.s-table.hide-uninitialized-table .el-pagination {
  display: none;
}
.s-table.hide-uninitialized-table.s-table__inited .el-table,
.s-table.hide-uninitialized-table.s-table__inited .el-pagination {
  display: block;
}
</style>
