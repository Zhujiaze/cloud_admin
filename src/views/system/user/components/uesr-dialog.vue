<template>
  <div>
    <el-dialog
      :title="dialogTitle"
      v-model="visible"
      :before-close="handleClose"
      center
    >
      <el-form
        :model="dialogForm"
        label-width="95px"
        status-icon
        ref="dialogFoemRef"
        :rules="dialogFormRules"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="用户昵称" prop="username">
              <el-input
                v-model="dialogForm.username"
                autocomplete="off"
                placeholder="请输入用户昵称"
                maxlength="30"
                clearable
                show-word-limit
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="用户帐号" prop="nickName">
              <el-input
                v-model="dialogForm.nickName"
                autocomplete="off"
                placeholder="请输入4-30位用户账号"
                maxlength="30"
                clearable
                show-word-limit
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="手机号码" prop="mobile">
              <el-input
                v-model="dialogForm.mobile"
                autocomplete="off"
                placeholder="请输入手机号码"
                maxlength="20"
                clearable
                show-word-limit
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="登陆密码" prop="password">
              <el-input
                v-model="dialogForm.password"
                :disabled="dialogType === 'edit'"
                autocomplete="off"
                placeholder="请输入6-30位登录密码"
                clearable
                show-word-limit
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="分配角色" prop="password">
              <el-select
                v-model="dialogForm.roleIds"
                multiple
                placeholder="请选择角色"
              >
                <el-option
                  v-for="(item, index) in roleList"
                  :key="index"
                  :label="item.roleName"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="电子邮箱" prop="email">
              <el-input
                placeholder="请输入电子邮箱"
                maxlength="30"
                clearable
                show-word-limit
                v-model="dialogForm.email"
                autocomplete="off"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="账号锁定" prop="accountNonLocked">
              <el-radio-group v-model="dialogForm.accountNonLocked">
                <el-radio :value="false" border>未锁定</el-radio>
                <el-radio :value="true" border>已锁定</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="账号过期" prop="accountNonExpired">
              <el-radio-group v-model="dialogForm.accountNonExpired">
                <el-radio :value="false" border>未过期</el-radio>
                <el-radio :value="true" border>已过期</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="密码过期" prop="credentialsNonExpired">
              <el-radio-group v-model="dialogForm.credentialsNonExpired">   
                <el-radio :value="false" border>未过期</el-radio>
                <el-radio :value="true" border>已过期</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="备注信息" prop="remark">
              <el-input
                v-model="dialogForm.remark"
                :rows="2"
                type="textarea"
                placeholder="请输入备注信息"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="handleClose">取消</el-button>
          <el-button type="primary" @click="handleSubmit"> 确定 </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import type { userdataaddType } from "@/api/types/userType";
import { ref, nextTick, reactive } from "vue";
import _ from "lodash";
import { getRoleList } from "@/api/system/role";
import type { Record } from "../../../../api/types/roleType";
import {
  ElNotification,
  type FormInstance,
  type FormRules,
} from "element-plus";
import { addUser, editUser } from "@/api/system/user";

const visible = ref<boolean>(false);
const dialogTitle = ref<string>("");
const dialogType = ref<string>();

//表单REF
const dialogFoemRef = ref<FormInstance>();

const dialogForm = ref<userdataaddType>({
  accountNonExpired: false,
  accountNonLocked: false,
  credentialsNonExpired: false,
  email: "",
  mobile: "",
  nickName: "",
  password: "",
  remark: "",
  roleIds: [],
  username: "",
});

const openDialog = (type: string, title: string, data = {} as any) => {
  initRoleList();
  visible.value = true;
  dialogTitle.value = title;
  dialogType.value = type;
  if (type == "edit") {
    nextTick(() => {
      dialogForm.value = _.cloneDeep(data.row);
    });
  }
};

const roleList = ref<Record[]>([]);

const initRoleList = async () => {
  try {
    const res = await getRoleList();
    roleList.value = res.data.records;
    // console.log(roleList.value);
  } catch (error) {
    console.log(error);
  }
};

const handleClose = () => {
  visible.value = false;
  dialogFoemRef.value?.resetFields();
};

defineExpose({
  openDialog,
});

const emit = defineEmits(["refresh"]);

//提交数据
const handleSubmit = () => {
  dialogFoemRef.value?.validate(async (valid) => {
    if (valid) {
      try {
        if (dialogType.value == "add") {
          const res = await addUser(dialogForm.value);
        } else if (dialogType.value == "edit") {
          const res = await editUser(dialogForm.value);
        }
        ElNotification({
          title: "操作成功",
          type: "success",
        });
        emit("refresh");
        handleClose();
      } catch (error) {
        console.log(error);
      }
    }
  });
};

//表单验证
const dialogFormRules = reactive<FormRules<userdataaddType>>({
  nickName: [
    {
      required: true,
      message: "用户昵称不能为空",
      trigger: "blur",
    },
  ],
  username: [
    {
      required: true,
      message: "用户账号不能为空",
      trigger: "blur",
    },
    {
      min: 6,
      max: 30,
      message: "帐号必须为6~30位数字、字母、下划线！",
      trigger: "blur",
    },
  ],
  password: [
    {
      required: true,
      min: 6,
      max: 30,
      message: "密码必须为6~30位数字、字母、下划线！",
      trigger: "blur",
    },
  ],
  accountNonLocked: [
    {
      required: true,
      message: "请选择",
      trigger: "change",
    },
  ],
  accountNonExpired: [
    {
      required: true,
      message: "请选择",
      trigger: "change",
    },
  ],
  credentialsNonExpired: [
    {
      required: true,
      message: "请选择",
      trigger: "change",
    },
  ],
});
</script>

<style lang="scss" scoped></style>
