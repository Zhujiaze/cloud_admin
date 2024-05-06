import registerElementPlusIcon from './registerElementPlusIcon.js'
import registerElementPlus from './registerElementPlus.js'
import type { App } from 'vue'

export const setRegisterGlobal = (app: App) => {
    app.use(registerElementPlusIcon)
    app.use(registerElementPlus)
}




