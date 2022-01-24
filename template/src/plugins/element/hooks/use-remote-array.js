
import tryGetOnlyArray from '../utils/data-patch-v1/try-get-only-array'

import { ref } from 'vue'
export default (api, isInit = true) => {
    const data = ref([])
    const load = (params) => {
        return api(params).then(response => {
            return data.value = tryGetOnlyArray(response).data
        })
    }

    if (isInit) {
        load()
    }
    return [data, load]
}
