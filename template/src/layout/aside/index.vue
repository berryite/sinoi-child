<template>
    <el-aside :width="getter.sidebar?'210px':'64px'">
      <div class="layout-child">
        <div class="layout-child-logo">
          <c-icon name="logo" class-name="icon-p"></c-icon>
          <span v-if="getter.sidebar">子应用模板</span>
        </div>

        <el-menu 
          class="el-menu-vertical-demo"
          background-color="#364760"
          text-color="#fff"
          :collapse="!getter.sidebar"
          :router="true"
          :unique-opened="true"
          :default-active="route.path" 
          @select="selectMenu">
            <menu-tree :menuList="menuList"></menu-tree>
        </el-menu>

      </div>
    </el-aside>
</template>

<script>
import { reactive, ref, toRefs } from '@vue/reactivity'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import MenuTree from './components/MenuTree'
export default {
  components: {
    MenuTree
  },
  setup() {
    const store  = useStore()
    const route  = useRoute()
    
    const getter = reactive(store.getters)
    const routeActive = ref(route.path);
    const navData = reactive({
      menuList: []
    })

    store.dispatch('user/getUserMenu')
    .then((list) => {
      navData.menuList = list || [];
    })

    const selectMenu = (key) => {
      key && (routeActive.value = key);
    }

    return {
      getter,
      route,
      routeActive,
      selectMenu,
      ...toRefs(navData)
    }
  }
}
</script>
<style lang="scss" scoped>
.layout-child {
  position: fixed;
  width: inherit;
  height: 100%;
  overflow: hidden;
  background-color: $--color-left;
  box-sizing: border-box;
  .el-menu-item {
    display: flex;
    color: #fff;
    &:hover {
      background: $--color-left-hover;
    }
  }

  &-logo {
    width: 100%;
    height: 50px;
    background-color: #2b2f3a;
    color: #fff;
    font-size: 15px;
    text-indent: 20px;
    display: flex;
    align-items: center;
    font-weight: 600;
    .icon-p {
      font-size: 26px;
    }
    span {
      text-align: left;
    }
  }
  ::v-deep(.el-menu-item) {
    font-size: 12px;
  }
  ::v-deep(.el-sub-menu__title) {
    font-size: 12px;
    height: 40px;
    line-height: 40px;
  }
  ::v-deep(.el-menu ul .el-menu-item) {
    color: #94b0d4;
    font-size: 12px;
    height: 40px;
    line-height: 40px;
  }
  ::v-deep(.el-menu .el-menu-item.is-active) {
    color: #fff;
    background: $--color-left-hover;
  }
}
</style>