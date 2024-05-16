<template>
  <el-drawer
    v-model="visible"
    :title="dialogTitle"
    direction="rtl"
    :before-close="handleClose"
    size="650px"
  >
    <el-form
      ref="formDataRef"
      style="max-width: 600px"
      :model="formData"
      label-width="auto"
      class="demo-ruleForm"
      label-position="right"
      status-icon
    >
      <el-form-item label="上级菜单">
        <el-cascader
          v-model="formData.parentId"
          :options="options"
          :props="props"
          clearable
          placeholder="请选择上级菜单"
        />
      </el-form-item>
      <el-form-item
        label="菜单类型"
        :rules="{
          required: true,
          message: '请选择菜单类型',
          trigger: 'change',
        }"
        prop="type"
      >
        <el-radio-group v-model="formData.type">
          <el-radio value="1" border>菜单</el-radio>
          <el-radio value="2" border>按钮</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item
        label="菜单名称"
        :rules="{
          required: true,
          message: '输入菜单名称',
          trigger: 'blur',
        }"
        prop="meta.title"
      >
        <el-input
          v-model="formData.meta.title"
          maxlength="10"
          placeholder="请输入菜单名称"
          show-word-limit
          type="text"
        />
      </el-form-item>
      <el-form-item label="权限标识" v-if="formData.type === '2'" prop="code">
        <el-input
          v-model="formData.code"
          maxlength="10"
          placeholder="请输入权限标识"
          show-word-limit
          type="text"
        />
      </el-form-item>
      <el-form-item label="路由地址" v-if="formData.type === '1'">
        <el-input
          v-model="formData.path"
          maxlength="10"
          placeholder="路由地址path值"
          show-word-limit
          type="text"
        />
      </el-form-item>
      <el-form-item label="路由名称" v-if="formData.type === '1'">
        <el-input
          v-model="formData.name"
          maxlength="10"
          placeholder="路由名称"
          show-word-limit
          type="text"
        />
      </el-form-item>
      <el-form-item label="组件路径" v-if="formData.type === '1'">
        <el-input
          v-model="formData.component"
          maxlength="10"
          placeholder="路由组件和相对路径"
          show-word-limit
          type="text"
        />
      </el-form-item>
      <el-form-item label="菜单图标" v-if="formData.type === '1'">
        <el-input
          v-model="formData.meta.icon"
          maxlength="10"
          placeholder="请输入图标名ele-开头"
          show-word-limit
          type="text"
        />
      </el-form-item>
      <el-form-item label="重定向" v-if="formData.type === '1'">
        <el-input
          v-model="formData.redirect"
          maxlength="10"
          placeholder="路由重定向地址redirect值"
          show-word-limit
          type="text"
        />
      </el-form-item>
      <el-row v-if="formData.type === '1'">
        <el-col :span="12">
          <el-form-item label="是否隐藏">
            <el-radio-group v-model="formData.meta.hidden" class="ml-4">
              <el-radio :value="true" size="large">不隐藏</el-radio>
              <el-radio :value="false" size="large">隐藏</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="是否缓存">
            <el-radio-group v-model="formData.meta.cache" class="ml-4">
              <el-radio :value="true" size="large">不缓存</el-radio>
              <el-radio :value="false" size="large">缓存</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="排序" prop="sort">
        <el-input-number
          style="width: 300px"
          v-model="formData.sort"
          :min="1"
          :max="100000"
        />
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input
          v-model="formData.remark"
          type="textarea"
          placeholder="请输入备注"
          maxlength="50"
          show-word-limit
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-row justify="center" style="margin-top: 10px">
        <el-button>取消</el-button>
        <el-button type="primary" @click="handleSubmit">保存</el-button>
      </el-row>
    </template>
  </el-drawer>
</template>

<script lang="ts" setup>
import type { MenuselectType, formDataMenuType } from "@/api/types/menuType";
import { addMenu, editMenu, selectMenu } from "@/api/system/menu";
import { ref, reactive, nextTick } from "vue";
import { ElNotification, type FormInstance } from "element-plus";
import _ from "lodash";
const visible = ref<boolean>(false);
const dialogTitle = ref("新增");
const dialogType = ref("1");

const formDataRef = ref<FormInstance>();

const formData = ref<formDataMenuType>({
  type: "1",
  sort: 1,
  meta: {
    hidden: false,
    cache: false,
    title: "",
    icon: "",
  },
  path: "",
  name: "",
  component: "",
  redirect: "",
  remark: "",
  parentId: "",
  code: "",
});

// 关闭抽屉之前触发的方法
const handleClose = () => {
  formData.value = {
    type: "1",
    sort: 1,
    meta: {
      hidden: false,
      cache: false,
      title: "",
      icon: "",
    },
    path: "",
    name: "",
    component: "",
    redirect: "",
    remark: "",
    parentId: "",
    code: "",
  };

  // formDataRef.value?.resetFields();
  visible.value = false;
};

const options = ref<MenuselectType>();
const props = ref({
  checkStrictly: true,
  value: "id",
  label: "title",
});

//获取下拉菜单方法
const getSelectMenu = async () => {
  try {
    const res = await selectMenu();
    console.log("res=>", res);
    options.value = res.data;
  } catch (error) {
    console.log(error);
  }
};

const handleSubmit = () => {
  formDataRef.value?.validate((valid: boolean) => {
    if (valid) {
      if (formData.value.type == "2") {
        formData.value.component = "";
        formData.value.redirect = "";
        formData.value.path = "";
        formData.value.name = "";
        formData.value.meta.title = "";
        formData.value.meta.icon = "";
        formData.value.meta.hidden = false;
        formData.value.meta.cache = false;
      }
      submitForm();
    }
  });
};

const emits = defineEmits(["refresh"]);

// 提交表单方法
const submitForm = async () => {
  try {
    if (dialogType.value == "add") {
      delete formData.value.code;
      const res = await addMenu(formData.value);

      ElNotification({
        title: "成功通知",
        message: "成功",
        type: "success",
      });
      handleClose();
      emits("refresh");
    } else {
      //编辑
      const res = await editMenu(formData.value);
    }
  } catch (error) {
    console.log(error);
  }
};

// 开启抽屉方法
const openDrawer = (type: string, title: string, data = {} as any) => {
  console.log(data.parentId);
  getSelectMenu();
  visible.value = true;
  dialogType.value = type;
  dialogTitle.value = title;

  formData.value.parentId = data.parentId;
  if (type == "edit") {
    nextTick(() => {
      formData.value = _.cloneDeep(data.row);
    });
  }
};

//暴露子组件方法
defineExpose({
  openDrawer,
});
</script>

<style lang="scss" scoped></style>
