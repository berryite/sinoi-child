<template>
    <el-result title="抱歉，服务器出错了">
        <template #icon>
            <img :src="require('@/assets/500/500.jpg')" alt="500" />
        </template>
        <template #extra>
            <div class="b-button" @click="index">返回主页</div>
        </template>
    </el-result>
</template>

<script>
import { useRouter } from 'vue-router';
export default {
    setup() {
        const $router = useRouter();

        const index = () => {
            $router.push({ path: '/' });
        };

        return {
            index,
        };
    },
};
</script>
<style lang="scss" scoped>
.b-button {
    display: inline-block;
    background: $--color-theme;
    color: $--color-white;
    text-align: center;
    width: 205px;
    line-height: 40px;
    border-radius: 2px;
    cursor: pointer;
}
</style>
