import { createStore } from 'vuex'
import getters from './getter'
const modulesFiles = import.meta.globEager("./modules/*.ts")
const modules = Object.entries(modulesFiles).reduce((modules,module) => {    
    const moduleName = module[0].match(/(\.\/\w+\/)(\w+)(.*)/)[2]
    const moduleValue = module[1].default
    modules[moduleName] = moduleValue
    return modules
}, {})
const store = createStore({
    getters,
    modules
})

export default store


