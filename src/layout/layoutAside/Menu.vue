<template>
    <el-menu active-text-color="#ffd04b" background-color="transparent" class="el-menu-vertical-demo" text-color="black"
        router :default-active="$route.path" :default-openeds="['/system']">
        <!-- 首页 -->
        <el-menu-item index="/home">
            <Svg-icon icon="menu"></Svg-icon>
            <span>首页</span>
        </el-menu-item>

        <el-sub-menu index="/system">
            <template #title>
                <el-icon>
                    <Svg-icon icon="menu"></Svg-icon>
                </el-icon>
                <span>系统管理</span>
            </template>
            <el-menu-item index="/system/menu">
                <Svg-icon icon="menu"></Svg-icon>
                <span>菜单管理</span>
            </el-menu-item>
            <el-menu-item index="/system/role">
                <Svg-icon icon="menu"></Svg-icon>
                <span>角色管理</span>
            </el-menu-item>
            <el-menu-item index="/system/user">
                <Svg-icon icon="menu"></Svg-icon>
                <span>用户管理</span>
            </el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="/goods">
            <template #title>
                <el-icon>
                    <Svg-icon icon="menu"></Svg-icon>
                </el-icon>
                <span>商品管理</span>
            </template>
            <el-menu-item index="/goods/list">
                <Svg-icon icon="menu"></Svg-icon>
                <span>商品列表</span>
            </el-menu-item>
            <el-menu-item index="/goods/category">
                <Svg-icon icon="menu"></Svg-icon>
                <span>商品分类</span>
            </el-menu-item>

        </el-sub-menu>

        <el-menu-item index="/usian">
            <Svg-icon icon="menu"></Svg-icon>
            <span>积云官网</span>
        </el-menu-item>
        <el-menu-item index="/401">
            <Svg-icon icon="menu"></Svg-icon>
            <span>401页面</span>
        </el-menu-item>



    </el-menu>
</template>

<script lang="ts" setup>
import { ref, reactive, defineAsyncComponent } from "vue";



</script>

<style lang="scss" scoped></style>