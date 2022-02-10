<template>
  <div class="home">
    <div class="home-head">
      <c-icon name="font18" class-name="icon-p"></c-icon>
      <div class="title">WELCOME</div>
      <div class="desc">子系统模板首页</div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
// import qk from '@/hooks/qk-store'
export default {
  name: 'Home',
  props: {
    msg: String,
  },
  setup() {

    // console.log('主系统权限=', qk.store.power('boss-app-manage:editApp'))
    const groupTest = ref(2)
    const options=ref([{label:'1',value:2}])
    return { groupTest ,options}
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .home {
    &-head {
      text-align: center;
      margin: 60px 0;
      .title {
        font-size: 48px;
        color: #7f9bc1;
        font-weight: bold;
      }
      .desc {
        color: #364760;
        font-size: 16px;
      }
    }
    &-pic {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        width: 436px;
        height: 328px;
      }
    }
  }
</style>
