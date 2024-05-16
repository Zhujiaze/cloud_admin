import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { StateType } from '../types/login'
import { Local } from '../utils/storage'
import { login, ueseInfo, logout } from '../api/auth'
import type { UserInfo, MenuList } from '../api/types/authType'

export const useAutherStore = defineStore('auth', () => {

    const token = ref<string>()











































    const userInfo = ref<UserInfo>()
    const buttonList = ref<string[]>([]);
    const menuList = ref<MenuList[]>([]);


    const setToken = (value: string) => {
        token.value = value;
    };


    const setRememberPwd = (state: StateType) => {
        if (state.isRemember) {
            Local.set("username", state.ruleForm.username);
            Local.set("password", state.ruleForm.password);
            Local.set("isRemember", state.isRemember);
        } else {
            Local.remove("username");
            Local.remove("password");
            Local.remove("isRemember");
        }
    }
    //登录操作
    const userLogin = async (state: StateType) => {
        try {
            const res = await login(state.ruleForm)
            setToken(res.data.access_token)
            return res
        } catch (err) {
            console.log(err);
        }
    }
    //获取用户信息操作
    const getUserInfo = async () => {
        try {
            const res = await ueseInfo()
            // console.log(res.data.userInfo);
            userInfo.value = res.data.userInfo
            buttonList.value = res.data.buttonList
            menuList.value = res.data.menuList
            return res
        } catch (err) {
            console.log(err);
        }
    }
    //退出登录操作
    const userLogout = async () => {
        try {
            const res = await logout()
            // console.log(res);
            resetUserstate()
            window.location.reload()
            return res
        }
        catch (err) {
            console.log(err);

        }

    }

    //重置用户信息
    const resetUserstate = () => {
        token.value = ""
        userInfo.value = null
        buttonList.value = []
        menuList.value = []
    }

    return { setRememberPwd, userLogin, token, userInfo, buttonList, menuList, getUserInfo, userLogout }
},
    { persist: true } // 启用状态管理
)
