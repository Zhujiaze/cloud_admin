<script lang="ts" setup>
// 点击下拉菜单项触发的事件
const handleCommand = () => {
    alert("123");
};
</script>
<template>
    <div class="layout-header-user">
        <!-- 全屏 -->
        <div class="layout-header-user-icon">
            <svg-icon icon="FullScreen"></svg-icon>
        </div>
        <!-- 主题切换 -->
        <div class="layout-header-user-icon">
            <el-switch></el-switch>
        </div>
        <!-- 下拉菜单 -->
        <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
                <el-avatar :size="30" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />

                <span class="username">张三</span>

                <el-icon class="el-icon--right"><arrow-down /></el-icon>
            </span>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item command="a">Action 1</el-dropdown-item>
                    <el-dropdown-item command="b">Action 2</el-dropdown-item>
                    <el-dropdown-item command="c">Action 3</el-dropdown-item>
                    <el-dropdown-item command="d" disabled>Action 4</el-dropdown-item>
                    <el-dropdown-item command="e" divided>Action 5</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
</template>

<style scoped lang="scss"></style>