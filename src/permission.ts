import path from "path";
import router from "./router";
import { useAutherStore } from './stores/auth'

const whiteList = ['/login']


router.beforeEach(async (to, from, next) => {
    const store = useAutherStore()
    const token = store.token
    if (token) {
        if (to.path === '/login') {
            return next({ path: from.path })
        } else {
            if (!store.userInfo || store.menuList.length >= 0) {
                const res = await store.getUserInfo()
                if (res?.data.userInfo.username) {
                    next()
                } else {
                    next('/login')
                }
            } else {
                return next()
            }
        }
    } else {
        if (whiteList.indexOf(to.path) !== -1) {
            return next()
        } else {
            next('/login')
        }
    }

})