<template>
    <el-container>
        <layoutAside></layoutAside>
        <el-container>
            <layoutHeader></layoutHeader>
            <layoutMain></layoutMain>
        </el-container>
    </el-container>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import { defineAsyncComponent } from 'vue'
//异步引入
const layoutAside = defineAsyncComponent(() => import('./layoutAside/index.vue'))
const layoutHeader = defineAsyncComponent(() => import('./layoutHeader/index.vue'))
const layoutMain = defineAsyncComponent(() => import('./layoutMain/index.vue'))



</script>

<style lang="scss" scoped></style>