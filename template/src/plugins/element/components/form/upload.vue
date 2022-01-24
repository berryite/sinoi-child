<template>
  <el-upload :class="`upload__${listType}__${limit}`" v-bind="$attrs" ref="upload" :listType="listType" :disabled="disabled" :action="action" :accept="accept" :on-preview="preview" :on-remove="remove" :before-remove="beforeRemove" :before-upload="beforeUpload" :limit="autoLimit" :on-success="success" :on-change="change" :on-error="error" :on-exceed="exceed" :file-list="cacheFileList" :http-request="httpRequest">
    <!-- slot -->
    <slot v-if="$slots.default"></slot>
    <!-- picture-card -->
    <i class="el-icon-plus" v-if="!$slots.default&&listType==='picture-card'"></i>
    <!-- picture or text -->
    <el-button v-if="!$slots.default&&(listType==='text'||listType==='picture')" :disabled="disabled" type="primary">点击上传</el-button>
    <template v-if="!$slots.default&&(listType==='text'||listType==='picture')" v-slot:tip>
      <div class="el-upload__tip">允许的文件类型：{{accept}}</div>
    </template>
  </el-upload>
  <el-dialog v-if="listType === 'picture' || listType === 'picture-card'" v-model="previewDialog">
    <img width="100%" :src="previewImageURL" :alt="previewImageURL" />
  </el-dialog>
</template>
<script>
import { defineComponent, watchEffect, ref, computed, inject } from 'vue'
import { ElMessage } from 'element-plus'
/**
 * listType:text|picture|picture-card
 * files:[{ name:'',url:''}]
 *
 */
import jsonAxios from '../../utils/upload/cas/json'
import blobAxios from '../../utils/upload/cas/blob'

export default defineComponent({
  props: {
    type: {
      default: 'json',
    },
    listType: {
      default: 'text',
    },
    axiosConfig: {
      default() {
        return null
      },
    },
    axios: {
      default() {
        return null
      },
    },
    disabled: {
      default: false,
    },
    valueModel: {
      default: '',
    },
    limit: {
      default: 1,
    },
    action: {
      default: process.env.VUE_APP_API_BASE_URL + 'contract/file/upload',
    },
    accept: {
      default: 'gif,png,jpg,jpeg',
    },
    size: {
      type: Number,
      default: 10,
    },
    fileName: {
      default: 'file',
    },
    isReplace: {
      default: true,
    },
    params: {
      default() {
        return {}
      },
    },
    files: {
      default: () => [],
    },
  },
  inheritAttrs: false,
  emits: ['update:files', 'update:modelValue'],
  setup(props, context) {
    const cacheFileList = ref([])
    const previewImageURL = ref('')
    const previewDialog = ref(false)
    const autoLimit = computed(() => {
      if (props.isReplace) {
        return props.limit + 1
      }
      return props.limit
    })

    watchEffect(() => {
      cacheFileList.value = [...props.files]
    })

    const EL_FORM_ITEM = inject('elFormItem', null)
    function errorMessage(message) {
      if (Object.prototype.hasOwnProperty.call(context.attrs, 'error')) {
        context.emit('error', message)
        return
      } else {
        ElMessage({
          type: 'error',
          message,
        })
      }
    }

    function error(msg) {
      console.log(msg)
      errorMessage('上传出错！')
    }

    function httpRequest({ file, action, onSuccess, onError, onProgress }) {
      const params = new FormData()
      params.append(props.fileName, file)
      params.append(
        'filterFileExtNames',
        props.accept
          .split(',')
          .map((v) => v.toLocaleLowerCase().trim())
          .join()
      )
      params.append('allowFileSizeStr', props.size)
      params.append('businessType', 'sinoiContract')
      Object.keys(props.params).forEach((v) => {
        params.append(v, props.params[v])
      })
      ;(props.axios || props.type === 'json' ? jsonAxios : blobAxios)
        .post(action, params, {
          onUploadProgress: (progressEvent) => {
            const percent =
              ((progressEvent.loaded / progressEvent.total) * 100) | 0
            onProgress({ percent: percent })
          },
          ...props.axiosConfig,
        })
        .then((response) => onSuccess(response))
        .catch((error) => onError(error))
    }

    function getEmitData(fileList) {
      //ceboss 兼容
      return fileList.map((v) => {
        try {
          let ftpFileVo = null
          if (v.response && v.response.ftpFileVo) {
            ftpFileVo = v.response.ftpFileVo
          }

          if (v.response && v.response.data && v.response.data.ftpFileVo) {
            ftpFileVo = v.response.data.ftpFileVo
          }

          if (
            v.response &&
            v.response.data &&
            v.response.data.data &&
            v.response.data.data.ftpFileVo
          ) {
            ftpFileVo = v.response.data.data.ftpFileVo
          }

          if (
            v.response &&
            v.response.data &&
            v.response.data.code === 'SYS0000' &&
            v.response.data.data
          ) {
            v.response.data.data.fileURL = v.response.data.data.fileUrl
            ftpFileVo = v.response.data.data
          }
          if (
            v.response &&
            v.response.data &&
            v.response.data.code === '0' &&
            v.response.data.data
          ) {
            v.response.data.data.fileURL =
              v.response.data.data.fileUrl || v.response.data.data.fileURL
            ftpFileVo = v.response.data.data
          }

          return {
            name: ftpFileVo.fileName,
            url: ftpFileVo.fileURL,
            id: ftpFileVo.id,
          }
        } catch (error) {
          return v
        }
      })
    }

    function syncFileList(fileList) {
      const fileData = getEmitData(fileList)
      console.log(fileData)
      context.emit('update:files', fileData)
      context.emit('update:modelValue', fileData.map((v) => v.id).join())

      if (EL_FORM_ITEM) {
        EL_FORM_ITEM.validate()
      }
    }

    function preview(file) {
      const fileData = getEmitData([file])[0]
      // 容错
      if (!fileData.url) {
        errorMessage('当前文件暂不支持预览！')
        return
      }
      //临时
      window.open(fileData.url)
    }

    function change(file, fileList) {
      if (props.isReplace && fileList.length > props.limit) {
        cacheFileList.value = fileList.slice(fileList.length - props.limit)
      }
    }

    function success(response, file, fileList) {
      context.emit('success', fileList)
      syncFileList(fileList)
    }

    function beforeUpload(file) {
      context.emit('before', file)
      const fileNamePathSplitArr = file.name.split('.')
      const fileSuffix = fileNamePathSplitArr[fileNamePathSplitArr.length - 1]
      if (
        fileSuffix === null ||
        !props.accept
          .split(',')
          .map((v) => v.toLocaleLowerCase().trim())
          .includes(fileSuffix.toString().toLocaleLowerCase())
      ) {
        errorMessage(`只能上传 ${props.accept} 格式的文件!`)
        return false
      }
      if (file.size / 1024 / 1024 > props.size) {
        errorMessage('上传附件大小不能超过 ' + props.size + 'MB!')
        return false
      }
      return true
    }

    function remove(file, fileList) {
      syncFileList(fileList)
    }
    function beforeRemove() {}
    function exceed() {
      errorMessage(`超出最大允许上传数量${props.limit}个！`)
    }

    return {
      cacheFileList,
      autoLimit,
      previewImageURL,
      previewDialog,
      httpRequest,
      syncFileList,
      errorMessage,
      getEmitData,
      preview,
      change,
      success,
      beforeUpload,
      error,
      remove,
      beforeRemove,
      exceed,
    }
  },
})
</script>