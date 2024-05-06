<script setup lang="ts">
import { RouterView } from 'vue-router'
import server from '@/utils/request'


const dddd = () => {
  const res = server.request({
    url: '/focus',
    method: 'get'
  })
  
  console.log(res)

}




</script>

<template>

  <SvgIcon icon="Edit" size="16" color="blue" @click="dddd" />


  <RouterView />
</template>

<style scoped></style>
