<template>
  <el-main class="layout-main">
    <el-scrollbar>
      <div class="layout-main-wrap">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <div>
              <keep-alive>
                <component
                  :key="$route.name"
                  :is="Component"
                  v-if="$route.meta.cache"
                ></component>
             </keep-alive>
            </div>
          </transition>
          <transition name="fade" mode="out-in">
            <div>
              <component
              :key="$route.name"
              v-if="!$route.meta.cache"
              :is="Component"
            ></component>
            </div>
          </transition>
        </router-view>
      </div>
    </el-scrollbar>
  </el-main>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
::v-deep .el-scrollbar__view {
  height: 100% !important;
}
</style>
