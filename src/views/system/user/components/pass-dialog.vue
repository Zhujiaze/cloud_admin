<template>
  <el-dialog
    v-model="visible"
    :title="dialogTitle"
    center
    width="390px"
    :before-close="handleClose"
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
      <el-form-item label="新密码" prop="newPassword">
        <el-input
          v-model="dialogForm.newPassword"
          placeholder="请输入新密码"
          type="password"
        />
      </el-form-item>
      <el-form-item label="确认密码" prop="repPassword">
        <el-input
          v-model="dialogForm.repPassword"
          placeholder="请输入确认密码"
          type="password"
        />
      </el-form-item>
    </el-form>
    <template #footer center>
      <div class="dialog-footer">
        <el-button>取消</el-button>
        <el-button type="primary" @click="handlesubitm"> 确定 </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { editPwd } from "@/api/system/user";
import type { userpasswordType } from "@/api/types/userType";
import type { FormInstance, FormRules } from "element-plus";
import { ref, reactive } from "vue";

const visible = ref<boolean>(false);
const dialogTitle = ref<string>("");
const ruleFormRef = ref<FormInstance>();

const dialogForm = ref<userpasswordType>({
  userId: 1,
  newPassword: "",
  repPassword: "",
});

// 打开弹窗
const openDialog = (title: string, id: number) => {
  dialogTitle.value = title;
  visible.value = true;
  dialogForm.value.userId = id;
};

// 暴露给父组件的方法
defineExpose({
  openDialog,
});

// 表单校验
const changePassword = (rule: any, value: any, callback: any) => {
  if (value === dialogForm.value.newPassword) {
    callback();
  } else {
    callback(new Error("新密码与确认密码不一致"));
  }
};

const rules = reactive<FormRules<userpasswordType>>({
  newPassword: [
    { required: true, message: "密码不能为空", trigger: "blur" },
    {
      pattern: /^(?!^[\d]+$)(?!^[-]+$)(?!^[_]+$)(?!^[a-zA-Z]+$)[\w-]{6,30}$/,
      message: "新密码必须为6~30位数字、字母、下划线！",
      trigger: "blur",
    },
  ],
  repPassword: [
    { required: true, message: "确认密码不能为空", trigger: "blur" },
    { validator: changePassword, trigger: "blur" },
  ],
});
//关闭弹窗
const handleClose = () => {
  visible.value = false;
  dialogForm.value = {
    userId: 1,
    newPassword: "", 
    repPassword: "",
  };
};

// 提交表单
const handlesubitm = () => {
  ruleFormRef.value?.validate(async (valid) => {
    if (valid) {
      //校验通过
      const res = await editPwd(dialogForm.value);
      console.log(res);
    }
  });
};
</script>

<style lang="scss" scoped></style>
