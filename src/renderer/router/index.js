import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/components/HomePage'
import HelloPage from '@/components/HelloPage'
import RegisterHomePage from '@/components/RegisterHomePage'
import RegisterBankPage from '@/components/register/RegisterBankPage'
import RegisterInputPage from '@/components/register/RegisterInputPage'
import RegisterSetPage from '@/components/register/RegisterSetPage'
import RegisterFinishPage from '@/components/register/RegisterFinishPage'
import RegisterListPage from '@/components/RegisterListPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home-page',
      component: HomePage,
      children: [
        {
          path: '/hello',
          name: 'hello',
          component: HelloPage
        },
        {
          path: '/register-home',
          name: 'register-home',
          component: RegisterHomePage,
          children:[
            {
              path: '/register-bank',
              name: 'register-bank',
              component: RegisterBankPage,
            },
            {
              path: '/register-input',
              name: 'register-input',
              component: RegisterInputPage,
            },
            {
              path: '/register-set',
              name: 'register-set',
              component: RegisterSetPage,
            },
            {
              path: '/register-finish',
              name: 'register-finish',
              component: RegisterFinishPage,
            },
          ]
        },
        {
          path: '/register-list',
          name: 'register-list',
          component: RegisterListPage,
        }
      ]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
