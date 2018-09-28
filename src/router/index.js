import Vue from 'vue'
import Router from 'vue-router'
import spa from '@/components/spa'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'spa',
      component: spa
    }
  ]
})
