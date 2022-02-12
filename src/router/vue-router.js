let Vue; //保存vue的构造函数
class VueRouter {
    constructor(options) {
        this.$options = options;

        let initial = window.location.hash.slice(1) || '/'
        //将current变化为响应式数据
        Vue.util.defineReactive(this, "current", initial)
        // this.current = "/";


        window.addEventListener("hashchange", () => {
            this.current = window.location.hash.slice(1) || "/"

        })
    }

}

VueRouter.install = (_Vue) => {
    console.log("执行install")
    Vue = _Vue

    //挂载$router属性
    //1在index.js中install先执行再new router实例
    //2所以在这里全局混入（延迟挂载在router创建完毕并附加到选项时再执行）
    Vue.mixin({
        beforeCreate() {
            console.log("beforeCreate")
            //根实例才挂载
            if (this.$options.router) {
                console.log("找到根实例")
                Vue.prototype.$router = this.$options.router
            }

        }
    })


    Vue.component("router-link", {
        props: {
            to: {
                type: String,
                require: true
            }
        },
        render(h) {
            return h("a", {
                attrs: {
                    href: `#${this.to}`
                }
            },
                this.$slots.default
            )
        },
    })
    Vue.component("router-view", {
        render(h) {
            let component = null

            //获取路由对应组件并渲染
            const current = this.$router.current;
            const route = this.$router.$options.routes.find((route) => route.path === current)
           
            if (route) {

                component = route.component
            }

            return h(component)
        }
    })
}

export default VueRouter;