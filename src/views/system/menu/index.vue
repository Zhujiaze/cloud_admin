<template>
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
        <!-- <el-tag :type="row.type == 1 ? 'primary' : 'success'">{{
            row.type == 1 ? "菜单" : "按钮"
          }}</el-tag> -->
        <el-tag v-if="row.type == 1" type="primary">菜单</el-tag>
        <el-tag v-if="row.type == 2" type="success">按钮</el-tag>
      </template>
    </el-table-column>
    <el-table-column align="center" prop="sort" label="排序" />
    <el-table-column align="center" label="操作">
      <template #default="{ row }">
        <el-button type="primary" icon="Plus" link size="small"
          >新增下级</el-button
        >
        <el-button type="warning" icon="Edit" link size="small">修改</el-button>

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
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import { getMenuList } from "../../../api/system/menu";
import type { ResponseMenuListType } from "@/api/types/menuType";

const menuList = ref<ResponseMenuListType[]>([]);

const searchFormKey = ref({
  keyword: "",
});

const initMenuList = async () => {
  try {
    const res = await getMenuList(searchFormKey.value);
    menuList.value = res.data;
    console.log(menuList);
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
</script>

<style lang="scss" scoped></style>
