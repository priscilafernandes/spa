import Vue from 'vue'
import Router from 'vue-router'
import spa from '@/components/spa'
import spaDetail from '@/components/spaDetail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'spa',
      component: spa
    },
    {
      path: '/:bookDetail',
      name: 'spaDetail',
      component: spaDetail
    }
  ]
})
