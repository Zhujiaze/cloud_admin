<template>
  <el-drawer
    v-model="visible"
    :title="drawerTitle"
    direction="rtl"
    :before-close="handleClose"
    size="400px"
  >
    <el-tree
      ref="treeRef"
      style="max-width: 600px"
      :data="data"
      show-checkbox
      node-key="id"
      :default-expand-all="defaultExpandAll"
      :props="defaultProps"
    >
      <template #default="{ node, data }">
        <span class="custom-tree-node">
          <svg-icon
            v-if="data.meta.icon"
            :icon="filterIcon(data.meta.icon)"
          ></svg-icon>
          <span style="margin-left: 10px">{{ data.meta.title }}</span>
        </span>
      </template>
    </el-tree>
    <template #footer>
      <el-button type="primary" @click="handleSubmit">提交</el-button>
      <el-button @click="handleCheckAll">全选/全不选</el-button>
      <el-button @click="handleExpandAll">展开/收起</el-button>
      <el-button @click="handleClose">取消</el-button>
    </template>
  </el-drawer>
</template>

<script lang="ts" setup>
import type { ElTree } from "element-plus";
import { ref, reactive } from "vue";
import { getMenuList } from "@/api/system/menu";
import type { ResponseMenuListType } from "@/api/types/menuType";
import { getCheckRoleList, saveRole } from "@/api/system/role";

const visible = ref(false);
const drawerTitle = ref<string>();

const defaultProps = {
  children: "children",
  label: (data: ResponseMenuListType) => {
    return data.meta.title;
  },
};
const data = ref<ResponseMenuListType[]>([]);

const treeRef = ref<InstanceType<typeof ElTree>>();

const checked = ref<boolean>(false);
//角色的id
const roleId = ref<number | string>();

//选中菜单节点的id
const menuIds = ref<string[]>([]);

// 打开抽屉

// 关闭抽屉触发的方法
const handleClose = () => {
  visible.value = false;
};

// 打开抽屉触发的方法
const openDrawer = async (title: string, id: number | string) => {
  visible.value = true;
  drawerTitle.value = title;
  roleId.value = id;
  await initMenuList();
  await initCheckedMenuList();
  await checkMenuNode();
};

// 根据后台返回的权限数据选中对应的节点
const checkMenuNode = () => {
  menuIds.value.forEach((id: string) => {
    treeRef.value?.setChecked(id, true, false);
  });
};

//过滤ele方法
const filterIcon = (icon: string) => {
  if (icon) {
    return icon.replace("ele-", "");
  }
};

//展开收起的方法
const defaultExpandAll = ref(false);

const handleExpandAll = () => {
  defaultExpandAll.value = !defaultExpandAll.value;
  changeTreeNodeStatus(treeRef.value!.root);
};

//递归方法
const changeTreeNodeStatus = (node: Node) => {
  for (let i = 0; i < node!.childNodes.length; i++) {
    node!.childNodes[i]!.expanded = defaultExpandAll.value;

    if (node!.childNodes[i].childNodes.length > 0) {
      changeTreeNodeStatus(node!.childNodes[i]);
    }
  }
};

defineExpose({
  openDrawer,
});

const initMenuList = async () => {
  // 初始化列表
  try {
    const res = await getMenuList();
    // console.log(res);
    data.value = res.data as any;
  } catch (error) {
    console.log(error);
  }
};
//获取选中的权限
const initCheckedMenuList = async () => {
  try {
    const res = await getCheckRoleList(roleId.value as number);
    menuIds.value = res.data;
  } catch (error) {
    console.log(error);
  }
};

//选中全选与全部选
const handleCheckAll = () => {
  checked.value = !checked.value;
  if (checked.value) {
    treeRef.value?.setCheckedNodes(data.value);
  } else {
    treeRef.value?.setCheckedNodes([]);
  }
};

//提交
const handleSubmit = async () => {
  try {
    //获取选中的id
    const checkedMenuIds = treeRef.value?.getCheckedKeys();
    // 获取半选中的父节点id
    const parentIds = treeRef.value?.getHalfCheckedKeys();
    // 合并选中的子节点id与半选中的父节点的id
    const menuIds = parentIds?.concat(checkedMenuIds!);

    // 分配权限
    const res = await saveRole(roleId.value as string, menuIds as string[]);

    // 关闭抽屉
    handleClose();
  } catch (error) {
    console.log(error);
  }
};
</script>

<style lang="scss" scoped></style>
