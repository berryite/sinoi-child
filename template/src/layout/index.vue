<template>
  <el-container style="height: 100vh">
    <a-side v-if="!access"></a-side>
    <el-container>
      <el-header v-if="!access">
        <nav-bar :isActive="getter.sidebar"></nav-bar>
      </el-header>
      <el-main :class="[access && 'qk-main']">
        <div :class="[access?'qk-warp':'main-warp']">
          <router-view />
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import { reactive, ref } from '@vue/reactivity'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import navBar from '@/layout/navbar'
import aSide from '@/layout/aside'
export default {
  components: {
    navBar,
    aSide
  },
  setup() {
    const store  = useStore()
    const route  = useRoute()

    if (route.query.access === '1') {
      store.commit('set_access', true)
    }
    
    const getter = reactive(store.getters)
    const access = ref(store.state.access);

    return {
      getter,
      access
    }
  }
}
</script>
<style lang="scss" scoped>
.el-main{
  padding: 0px;
}
.main-warp {
  padding: 20px;
  box-sizing: border-box;
  background: $--color-white;
}
.qk-warp {
  height: 100%;
  box-sizing: border-box;
  background: $--color-white;
}
.qk-main {
  padding: 0 !important;
}
</style>
