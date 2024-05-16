<template>
  <div class="layout-padding">
    <el-form :inline="true" :model="searchForm" class="demo-form-inline">
      <el-form-item label="角色名称">
        <el-input
          v-model="searchForm.name"
          placeholder="清楚如角色名称"
          clearable
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="initRoleList" icon="search"
          >搜索</el-button
        >
        <el-button type="success" @click="handAdd" icon="plus"
          >新增角色</el-button
        >
      </el-form-item>
    </el-form>
    <el-table :data="roleList" stripe style="width: 100%" border>
      <el-table-column align="center" type="index" label="序号" width="80" />
      <el-table-column align="center" prop="roleName" label="角色名称" />
      <el-table-column align="center" prop="roleCode" label="角色编码" />
      <el-table-column align="center" label="角色状态">
        <template #default="{ row }">
          <el-tag :type="row.status ? 'success' : 'warning'">{{
            row.status ? "启用" : "禁用"
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="remark" label="备注" />
      <el-table-column align="center" label="操作">
        <template #default="{ row }">
          <el-button icon="edit" type="primary" link>分配权限</el-button>
          <el-button icon="edit" type="warning" link @click="handleEdit(row)"
            >修改</el-button
          >
          <el-button
            icon="delete"
            type="danger"
            link
            @click="handleDelete(row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-row justify="end" style="margin-top: 20px">
      <el-pagination
        v-model:current-page="current"
        v-model:page-size="size"
        :page-sizes="[10, 20, 30, 50]"
        :background="true"
        layout="total, sizes, prev, pager, next"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
    /></el-row>
  </div>

  <!-- 弹窗 -->
  <RoleDialog ref="roleDialogRef" @refresh="handleRefresh"></RoleDialog>
</template>

<script lang="ts" setup>
import { ref, reactive, defineAsyncComponent } from "vue";
import { delRole, getRoleList } from "../../../api/system/role";
import type { Record } from "../../../api/types/roleType";

const RoleDialog = defineAsyncComponent(
  () => import("./components/role-dialog.vue")
);
//打开新增对话框
const handAdd = () => {
  roleDialogRef.value.openDialog("add", "新增角色");
};

//抽屉实例
const roleDialogRef = ref();

const roleList = ref<Record[]>([]);

const current = ref<number>(1);
const size = ref<number>(10);
const total = ref<number>(0);
const searchForm = ref<{ name: string }>({
  name: "",
});

const initRoleList = async () => {
  const res = await getRoleList({
    current: current.value,
    size: size.value,
    name: searchForm.value.name,
  });
  // console.log(res);
  roleList.value = res.data.records;
  total.value = res.data.total;
};

initRoleList();

const handleSizeChange = (value: number) => {
  size.value = value;
  initRoleList();
};

// 页码
const handleCurrentChange = (value: number) => {
  current.value = value;
  initRoleList();
};

const handleRefresh = () => {
  initRoleList();
};

//修改方法
const handleEdit = (row: Record) => {
  roleDialogRef.value!.openDialog("edit", "编辑角色", { row });
};

// 删除方法
const handleDelete = async (id: number) => {
  try {
    await delRole(id);
    initRoleList();
  } catch (error) {
    console.log(error);
  }
};
</script>

<style lang="scss" scoped></style>
