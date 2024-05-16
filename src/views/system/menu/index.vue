<template>
  <el-form :inline="true" :model="searchFormKey" class="demo-form-inline">
    <el-form-item label="菜单名称">
      <el-input
        v-model="searchFormKey.keyword"
        placeholder="请输入菜单名称"
        clearable
      />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="initMenuList" icon="search"
        >查询</el-button
      >
      <el-button type="success" icon="Plus" @click="handAdd('')"
        >新增菜单</el-button
      >
    </el-form-item>
  </el-form>
  <el-table
    :data="menuList"
    style="width: 100%; margin-bottom: 20px"
    row-key="id"
    border
    default-expand-all
  >
    <el-table-column align="center" label="菜单名称">
      <template #default="{ row }">
        <svg-icon
          v-if="filterMenuIcon(row.meta.icon)"
          :icon="filterMenuIcon(row.meta.icon)"
        ></svg-icon>
        <span style="margin-left: 10px">{{ row.meta.title }}</span>
      </template>
    </el-table-column>
    <el-table-column align="center" prop="path" label="路由地址" />
    <el-table-column align="center" prop="component" label="组件路径">
    </el-table-column>
    <el-table-column align="center" prop="code" label="权限标识">
    </el-table-column>
    <el-table-column align="center" label="类型">
      <template #default="{ row }">
        <el-tag v-if="row.type == 1" type="primary">菜单</el-tag>
        <el-tag v-if="row.type == 2" type="success">按钮</el-tag>
      </template>
    </el-table-column>
    <el-table-column align="center" prop="sort" label="排序" />
    <el-table-column align="center" label="操作">
      <template #default="{ row }">
        <el-button
          type="primary"
          icon="Plus"
          link
          size="small"
          @click="handAdd(row.id)"
          >新增下级</el-button
        >
        <el-button
          type="warning"
          icon="Edit"
          link
          size="small"
          @click="handEdit(row)"
          >修改</el-button
        >

        <el-popconfirm
          :title="`确定要删除${row.meta.title}`"
          confirm-button-text="确定"
          cancel-button-text="取消"
          @confirm="delmenu(row)"
        >
          <template #reference>
            <el-button type="danger" icon="delete" link size="small"
              >删除</el-button
            >
          </template>
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>

  <!-- 弹窗 -->
  <menuDialog ref="dialogRef" @refresh="handleRefresh"></menuDialog>
</template>

<script lang="ts" setup>
import { ref, defineAsyncComponent } from "vue";
import { getMenuList } from "../../../api/system/menu";
import type { MenuParamsType } from "@/api/types/menuType";

const menuDialog = defineAsyncComponent(
  () => import("@/views/system/menu/components/meun-dialog.vue")
);

const menuList = ref<any>([]);

const searchFormKey = ref({
  keyword: "",
});
//暴路子组件的实例
const dialogRef = ref();

const initMenuList = async () => {
  try {
    const res = await getMenuList(searchFormKey.value);
    menuList.value = res.data;
    // console.log(menuList);
  } catch (err) {
    console.log(err);
  }
};
initMenuList();
// 过滤图表的ele-
const filterMenuIcon = (icon: string) => {
  if (icon) {
    return icon.replace("ele-", "");
  }
};
//删除方法
const delmenu = async (row: any) => {
  // console.log(id);
  try {
    const res = await getMenuList(row.id);
    // console.log(res);
    initMenuList();
  } catch (err) {
    console.log(err);
  }
};
const handAdd = (id: string) => {
  dialogRef.value.openDrawer("add", "新增菜单", { parentId: id });
};
const handleRefresh = () => {
  initMenuList();
};
const handEdit = (row: MenuParamsType) => {
  dialogRef.value.openDrawer("edit", "编辑菜单", { row });
};
</script>

<style lang="scss" scoped></style>
