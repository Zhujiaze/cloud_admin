<template>

    <!-- logo -->
    <div class="layout-logo">
        <img class="layout-logo-img" src="http://vue3.mengxuegu.com/assets/logo-8ba32897.png" alt="logo">
        <span v-show="!stores.isCollapse">积云全家桶</span>
    </div>
    <!-- 菜单 -->



</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import { useLayoutConfig } from '../../stores/layoutConfig'
const stores = useLayoutConfig()

</script>

<style lang="scss" scoped></style>