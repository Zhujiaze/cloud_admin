<template>
    <el-icon :size="size" :color="color">
        <component :is="icon"></component>
    </el-icon>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
withDefaults(defineProps<{
    icon: string
    size?: string | number
    color?: string
}>(), {
    size: '16',
    color: ''
})

</script>

<style lang="scss" scoped></style>