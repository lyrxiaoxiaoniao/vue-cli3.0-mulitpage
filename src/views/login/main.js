import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '../../element'
import * as filters from '../../filters/index' // 全局过滤器
// 页面顶部进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import '../../styles/index.css'
import moduleName from 'jquery'
console.log(moduleName, 'jQuery')
// 注册全局实用程序过滤器（register global utility filters）.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

router.beforeEach((to, from, next) => {
  window.scroll(0, 0)
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done()
})
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
