<script setup lang="ts">
import { RouterView } from 'vue-router'

import { getList } from './api/test'

getList().then((res: any) => {
  console.log(res)
})




</script>

<template>



  <RouterView />
</template>

<style scoped></style>
