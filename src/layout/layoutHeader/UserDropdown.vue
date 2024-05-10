<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { useFullscreen, useDark } from '@vueuse/core'
import 'element-plus/theme-chalk/dark/css-vars.css'
import { useAutherStore } from '../../stores/auth'


const store = useAutherStore()
const routet = useRouter()

const { isFullscreen, toggle } = useFullscreen()

const skdark = () => {
    toggle()
}

const isDark = useDark({
    valueDark: "dark",
    valueLight: "",
    initialValue: "dark",
})

// 点击下拉菜单项触发的事件


// 退出登录
const logout = async () => {
    try {
        await store.userLogout()
    }
    catch (err) {
        console.log(err);

    }
};
</script>
<template>
    <div class="layout-header-user">
        <!-- 全屏 -->
        <div class="layout-header-user-icon">
            <svg-icon @click="skdark" :icon="isFullscreen ? 'Aim' : 'FullScreen'"></svg-icon>
        </div>
        <!-- 主题切换 -->
        <div class="layout-header-user-icon">
            <el-switch v-model="isDark" active-icon="moon" inline-prompt inactive-icon="sunny"></el-switch>
        </div>
        <!-- 下拉菜单 -->
        <el-dropdown>
            <span class="el-dropdown-link">
                <el-avatar :size="30" :src="store.userInfo?.imageUrl" />

                <span class="username">{{ store.userInfo?.username }}</span>

                <el-icon class="el-icon--right"><arrow-down /></el-icon>
            </span>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item @click="$router.push('/')">首页</el-dropdown-item>
                    <el-dropdown-item @click="$router.push('/401')">401</el-dropdown-item>
                    <el-dropdown-item @click="$router.push('/404')">404</el-dropdown-item>
                    <el-dropdown-item @click="logout" divided>退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
</template>

<style scoped lang="scss"></style>