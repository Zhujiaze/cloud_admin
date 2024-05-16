<template>
  <el-dialog
    v-model="dialogFormVisible"
    :title="dialogTitle"
    center
    width="520px"
    destroy-on-close
    :before-close="handleClose"
    :close-on-click-modal="false"
  >
    <el-form
      ref="ruleFormRef"
      style="max-width: 600px"
      :model="dialogForm"
      :rules="rules"
      label-width="auto"
      class="demo-ruleForm"
      status-icon
    >
      <el-form-item label="角色名称" prop="roleName">
        <el-input
          v-model="dialogForm.roleName"
          maxlength="30"
          placeholder="请输入角色名称"
          show-word-limit
          type="text"
          autocomplete="off"
          clearable
        />
      </el-form-item>
      <el-form-item label="角色编码" prop="roleCode">
        <el-input
          v-model="dialogForm.roleCode"
          maxlength="30"
          placeholder="请输入角色编码"
          show-word-limit
          type="text"
          autocomplete="off"
          clearable
        />
      </el-form-item>
      <el-form-item label="角色状态" prop="status">
        <el-switch
          v-model="dialogForm.status"
          inline-prompt
          active-text="是"
          inactive-text="否"
        />
      </el-form-item>
      <el-form-item label="备注:" prop="remark">
        <el-input v-model="dialogForm.remark" type="textarea" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleSubmit"> 确定 </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { EditRole, addRole } from "@/api/system/role";
import type { AddRoleParamsType } from "@/api/types/roleType";
import {
  ElNotification,
  type FormInstance,
  type FormRules,
} from "element-plus";
import { ref, reactive, nextTick } from "vue";
import _ from "lodash";
const ruleFormRef = ref<FormInstance>();
const dialogType = ref<string>();
const dialogTitle = ref<string>("");
const dialogFormVisible = ref<boolean>(false);
//表单存储的数据
const dialogForm = ref<AddRoleParamsType>({
  roleCode: "",
  roleName: "",
  status: true,
  remark: "",
});
//校验表单数据
const rules = reactive<FormRules<AddRoleParamsType>>({
  roleName: [{ required: true, message: "请输入角色名称", trigger: "blur" }],
  roleCode: [
    {
      required: true,
      message: "角色编码不能为空",
      trigger: "change",
    },
    {
      pattern: /^[a-zA-Z0-9_]{2,30}$/,
      message: "只允许输入2-30位英文/数字/下划线",
      trigger: "blur",
    },
  ],
  status: [
    {
      required: true,
      message: "角色状态位必选项!",
      trigger: "change",
    },
  ],
});

//关闭时调用的方法
const handleClose = () => {
  ruleFormRef.value?.resetFields();
  dialogFormVisible.value = false;
};

//提交新增编辑方法
const handleSubmit = async () => {
  await ruleFormRef.value?.validate((valid: boolean) => {
    if (valid) {
      submitData();
    }
  });
};

const emits = defineEmits(["refresh"]);
//提交方法
const submitData = async () => {
  try {
    if (dialogType.value == "add") {
      await addRole(dialogForm.value);
    } else if (dialogType.value == "edit") {
      console.log(dialogForm.value);
      await EditRole(dialogForm.value);
    }
    handleClose();

    ElNotification({
      title: "操作成功",
      type: "success",
    });

    emits("refresh");
  } catch (err) {
    console.log(err);
  }
};

//开启弹框方法
const openDialog = (
  type: string,
  title: string = "新增角色",
  data = {} as any
) => {
  dialogFormVisible.value = true;
  dialogTitle.value = title;
  dialogType.value = type;

  if (type == "edit") {
    nextTick(() => {
      dialogForm.value = _.cloneDeep(data.row);
    });
  }
};

defineExpose({
  openDialog,
});
</script>

<style lang="scss" scoped></style>
