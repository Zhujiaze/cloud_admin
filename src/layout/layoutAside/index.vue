<template>
  <el-aside width="200px" class="layout-aside">
    <!-- logo -->
    <Logo></Logo>
    <!-- 菜单 -->
    <Menu></Menu>

  </el-aside>
</template>

<script lang="ts" setup>
import { ref, reactive, defineAsyncComponent } from "vue";

const Logo = defineAsyncComponent(() => import('@/layout/layoutAside/Logo.vue'))
const Menu = defineAsyncComponent(() => import('@/layout/layoutAside/Menu.vue'))
</script>

<style lang="scss" scoped></style>