import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import SvgIcon from '@/components/SvgIcon.vue'

import type { App } from 'vue'


export default {
    install(app: App) {
        for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
            app.component(key, component)
        }

        // 注册SvgIcon组件
        app.component('SvgIcon', SvgIcon)
    }

}