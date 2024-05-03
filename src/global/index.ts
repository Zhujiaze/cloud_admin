import registerElementPlusIcon from './src/global/src/global/registerElementPlusIcon.js'
import registerElementPlus from './src/global/registerElementPlus.js'
import type { App } from 'vue'

export const setRegisterGlobal = (app: App) => {
    app.use(registerElementPlusIcon)
    app.use(registerElementPlus)
}




