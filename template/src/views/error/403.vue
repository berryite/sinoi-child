<template>
    <el-result title="抱歉，您无权访问该页面">
        <template #icon>
            <img :src="require('@/assets/403/403.jpg')" alt="403" />
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
