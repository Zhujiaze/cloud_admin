<template>
    <div class="login-container">
        <div class="loginww">
            <div class="login-wapper">
                <img class="login-img" src="http://vue3.mengxuegu.com/assets/login-logo-6c42311e.png" alt="">

                <h3>帐号登录</h3>

                <el-form ref="ruleFormRef" style="max-width: 600px" :model="state.ruleForm" :rules="rules"
                    label-width="auto" class="demo-ruleForm" :size="formSize" status-icon>
                    <el-form-item prop="username">
                        <el-input v-model="state.ruleForm.username" class="login-inputform">
                            <template #prefix>
                                <el-icon class="el-input__icon">
                                    <svg-icon icon="user"></svg-icon>
                                </el-icon>
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input v-model="state.ruleForm.password" class="login-inputform" show-password
                            type="password">
                            <template #prefix>
                                <el-icon class="el-input__icon">
                                    <svg-icon icon="lock"></svg-icon>
                                </el-icon>
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-checkbox v-model="state.isRemember">
                            记住密码
                        </el-checkbox>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm(ruleFormRef)" class="btn">
                            登录
                        </el-button>

                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import type { ComponentSize, FormInstance, FormRules } from 'element-plus'
import { Local } from '../../utils/storage'
import router from "@/router";
import { useAutherStore } from '../../stores/auth'
const store = useAutherStore()
interface RuleForm {
    username: string
    password: string

}

//校验用户名
const validateUsername = (rule: any, value: any, callback: any) => {
    const phoneRegex = /^1[34578]\d{9}$/;
    if (!phoneRegex.test(value)) {
        callback(new Error('请输入正确的手机号/账号'))
    } else {
        callback()
    }
}
//校验密码
const validatepassword = (rule: any, value: any, callback: any) => {
    var patrn = /^(\w){6,20}$/;
    if (!patrn.test(value)) {
        callback(new Error('密码不能小于6位'))
    } else {
        callback()
    }
}



const formSize = ref<ComponentSize>('default')
const ruleFormRef = ref<FormInstance>()

const state = reactive({
    isRemember: Local.get('isRemember') || false,
    ruleForm: {
        username: Local.get('username') || "17802901987",
        password: Local.get('password') || ''
    }
})




const rules = reactive<FormRules<RuleForm>>({
    username: [
        { required: true, message: '请输入账号/手机号', trigger: 'blur' },
        { validator: validateUsername, trigger: "blur" },
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { validator: validatepassword, trigger: "blur" },
    ]
})

const submitForm = async (formEl: FormInstance | undefined) => {
    ruleFormRef.value!.validate(async (valid: boolean) => {
        if (valid) {
            // 存储账号与密码
            store.setRememberPwd(state);

            // 调用pinia中定义的userlogin
            await store.userLogin(state);

            // 跳转到主页
            router.push("/");
        }
    });
}



</script>

<style lang="scss" scoped>
.login-container {
    width: 100%;
    height: 100%;
    background-image: url("http://vue3.mengxuegu.com/assets/login-bj-514aa045.png");
    background-size: cover;

    .loginww {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: right;
        align-items: center;



    }

    .login-wapper {
        width: 460px;
        height: 450px;
        background-color: #fff;
        margin-right: 130px;
        padding: 30px;
        box-shadow: 5px 5px 10px 0 rgba(0, 0, 0, 0.5);
        border-radius: 10px;


        .login-img {
            display: block;
            margin: auto;
            width: 130px;
            height: 43px;

        }

        h3 {
            color: #0d1243;
            text-align: left;
            font-weight: 500;
            font-size: 20px;
            letter-spacing: 2px;
            line-height: 70px;
            height: 70px;
        }

        .btn {
            width: 100%;
            height: 50px;
            font-size: 20px;
        }

        .login-inputform {
            height: 40px !important;
        }




    }
}
</style>