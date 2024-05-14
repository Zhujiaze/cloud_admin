<template>

  <div class="home-container">
    <div class="home-statistic">
      <div class="home-statistic-title">营业数据统计</div>
      <el-row :gutter="20">
        <el-col :span="6" :lg="6" :md="12" :sm="12" :xs="24"> <el-card shadow="hover">1</el-card></el-col>
        <el-col :span="6" :lg="6" :md="12" :sm="12" :xs="24"> <el-card shadow="hover">2</el-card></el-col>
        <el-col :span="6" :lg="6" :md="12" :sm="12" :xs="24"> <el-card shadow="hover">3</el-card></el-col>
        <el-col :span="6" :lg="6" :md="12" :sm="12" :xs="24"> <el-card shadow="hover">4</el-card></el-col>
      </el-row>
    </div>


    <el-row :gutter="20">
      <el-col :lg="8" :md="8" :sm="8" :xs="24" :span="8">
        <el-card shadow="hover" class="card"> 1 </el-card>
      </el-col>
      <el-col :lg="16" :md="16" :sm="16" :xs="24" :span="16">
        <el-card shadow="hover" class="card"> 2 </el-card>
      </el-col>
    </el-row>


    <el-row :gutter="20">
      <el-col :lg="16" :md="16" :sm="16" :xs="24" :span="8">
        <el-card shadow="hover" class="card"> 1 </el-card>
      </el-col>
      <el-col :lg="8" :md="8" :sm="8" :xs="24" :span="16">
        <el-card shadow="hover" class="card"> 2 </el-card>
      </el-col>
    </el-row>

  </div>


</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";

</script>

<style lang="scss" scoped>
.home-container {

  .home-statistic {

    .home-statistic-title {
      font-size: 18px;
      height: 25px;
      line-height: 25px;
      border-left: 2px solid var(--el-color-primary);
      padding-left: 10px;
      margin: 15px 0;
    }

    .el-row {
      cursor: pointer;

      .el-col {
        margin-bottom: 15px;

        .el-card {
          // background-color: red;
          height: 80px;
        }
      }
    }
  }

  .card {
    height: 380px;
  }


}
</style>
