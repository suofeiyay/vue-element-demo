import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 * 多于一个children父元素需要设置 meta，只有一个可以不设置
 */
export const constantRoutes = [
  {
    path: '/login',
    meta: { title: 'Example', icon: 'el-icon-s-help' },
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    meta: { title: 'Example', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'home',
        name: 'home1',
        component: () => import('@/views/home/index'),
        meta: { title: 'home' , icon:'el-icon-s-help', affix: true}
      },
      {
        path: 'home2',
        name: 'home2',
        component: () => import('@/views/home/index'),
        meta: { title: 'Table', icon: 'el-icon-s-help', affix: true}
      }
    ]
  },
  {
    path: '/single',
    component: Layout,
    component: () => import('@/views/home/index'),
    meta: { title: 'single', icon: 'el-icon-s-help' },
  },
  {
    path: '/demo',
    component: Layout,
    redirect: '/demo',
    meta: { title: 'demo', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'demo',
        name: 'home1',
        component: () => import('@/views/home/index'),
        meta: { title: 'demo' , icon:'el-icon-s-help'}
      },
      {
        path: 'demo2',
        name: 'demo',
        component: () => import('@/views/home/index'),
        meta: { title: 'Table', icon: 'el-icon-s-help'},
        children: [
          {
            path: 'san',
            name: 'san1',
            component: () => import('@/views/home/index'),
            meta: { title: 'demo' , icon:'el-icon-s-help'}
          },
          {
            path: 'san2',
            name: 'san2',
            component: () => import('@/views/home/index'),
            meta: { title: 'Table', icon: 'el-icon-s-help'}
          }
        ]
      }
    ]
  }

]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    meta: { title: 'Example', icon: 'el-icon-s-help' ,affix: true},
    children: [
      {
        path: 'home',
        name: 'home1',
        component: () => import('@/views/home/index'),
        meta: { title: 'home' , icon:'el-icon-s-help', affix: true}
      },
      {
        path: 'home2',
        name: 'home2',
        component: () => import('@/views/home/index'),
        meta: { title: 'Table', icon: 'el-icon-s-help'}
      }
    ]
  },
  {
    path: '/single',
    component: Layout,
    component: () => import('@/views/home/index'),
    meta: { title: 'single', icon: 'el-icon-s-help' },
  },
  {
    path: '/demo',
    component: Layout,
    redirect: '/demo',
    meta: { title: 'demo', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'demo',
        name: 'home1',
        component: () => import('@/views/home/index'),
        meta: { title: 'demo' , icon:'el-icon-s-help'}
      },
      {
        path: 'demo2',
        name: 'demo',
        component: () => import('@/views/home/index'),
        meta: { title: 'Table', icon: 'el-icon-s-help'},
        children: [
          {
            path: 'san',
            name: 'san1',
            component: () => import('@/views/home/index'),
            meta: { title: 'demo' , icon:'el-icon-s-help'}
          },
          {
            path: 'san2',
            name: 'san2',
            component: () => import('@/views/home/index'),
            meta: { title: 'Table', icon: 'el-icon-s-help'}
          }
        ]
      }
    ]
  }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}
export default router
