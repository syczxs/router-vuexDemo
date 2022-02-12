let Vue
class Store {
    constructor(options) {
        //state响应式处理
        this._vm= new Vue({
            data: {
                $$state:options.state
            }
        })
        this._mutations = options.mutations
        this._actions = options.actions
        this.commit=this.commit.bind(this)
        this.dispatch=this.dispatch.bind(this)
        this.getters={}
        options.getters && this.handleGetters(options.getters)
    }

    handleGetters(getters){
        Object.keys(getters).map(key=>{
            Object.defineProperty(this.getters,key,{
                get:()=>getters[key](this.state)
            })
        })

    }

    get state() {
        return this._vm._data.$$state
    }

    set state(v) {
        console.err("please use replaceState to reset state")
    }

    commit(type, payload) {
        const entry = this._mutations[type];
        if (!entry) {
            console.err("unknown mutation type")
        }
        entry(this.state, payload)
    }

    dispatch(type, payload) {
        const entry = this._action[type];
        if (!entry) {
            console.err("unknown mutation type")
        }
        entry(this, payload)
    }

}

const install = (_Vue) => {
    Vue = _Vue;

    Vue.mixin({
        beforeCreate() {
            if (this.$options.store) {
                Vue.prototype.$store = this.$options.store

            }
        }
    })

}

export default { Store, install }
