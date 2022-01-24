<template>
    <template v-for="(menu, index) of menuList">
        <el-sub-menu
            :index="menu.path"
            :key="menu.path || index+''"
            v-if="!menu.hidden && menu.children && menu.children.length"
        >
            <template #title>
                <c-icon :name="menu.icon" class-name="p-icon"></c-icon>
                <span>{{ menu.name }}</span>
            </template>
            <menu-tree :menuList="menu.children"></menu-tree>
        </el-sub-menu>
        <template v-else>
            <el-menu-item
                v-if="!menu.hidden"
                :index="menu.path"
                :key="menu.path || index+''"
                :disabled="menu.disabled"
            >
                <c-icon :name="menu.icon" class-name="p-icon"></c-icon>
                <template #title>{{ menu.name }}</template>
            </el-menu-item>
        </template>
    </template>
</template>

<script>
export default {
    props: ['menuList'],
    name: 'MenuTree',
};
</script>

<style lang="scss" scoped>
.p-icon {
    margin-right: 5px;
    font-size: 14px;
}
</style>