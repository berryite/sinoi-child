<template>
    <template v-for="(menu, index) of menuList">
        <template v-if="!menu.hidden">
            <el-menu-item v-if="getChildren(menu.children).length == 1" :index="getChildren(menu.children)[0]"
                :key="menu.path || index + ''" :disabled="menu.disabled">
                <c-icon :name="menu.icon" class-name="p-icon"></c-icon>
                <template #title>{{ menu.name }}</template>
            </el-menu-item>
            <template v-else-if="menu.children && menu.children.length">
                <el-sub-menu :index="menu.path" :key="menu.path || index + ''">
                    <template #title>
                        <c-icon :name="menu.icon" class-name="p-icon"></c-icon>
                        <span>{{ menu.name }}</span>
                    </template>
                    <menu-tree :menuList="menu.children"></menu-tree>
                </el-sub-menu>
            </template>
            <template v-else>
                <el-menu-item :index="menu.path" :key="menu.path || index + ''" :disabled="menu.disabled">
                    <c-icon :name="menu.icon" class-name="p-icon"></c-icon>
                    <template #title>{{ menu.name }}</template>
                </el-menu-item>
            </template>
        </template>
    </template>
</template>

<script>
export default {
    props: ['menuList'],
    name: 'MenuTree',
    setup() {
        const getChildren = children => {
            let childNums = [];
            children && children.forEach(item => { if (!item.hidden) { childNums.push(item.path) } })

            return childNums;
        }
        return { getChildren }
    }
};
</script>

<style lang="scss" scoped>
.p-icon {
    margin-right: 5px;
    font-size: 14px;
}
</style>
