import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import inventario from './views/inventario.vue'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

Vue.use(Buefy)

Vue.use(VueRouter)

const router = new VueRouter({
    routes: [
       {
          path:'/',
          component:inventario
       }
    ]
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
