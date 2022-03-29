import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/',
    redirect: '/loadingStatus',
  },
  {
    path: '/loadingStatus',
    name: 'loadingStatus',
    component: () => import("../view/loadingStatus/index"),
    meta: {
      title: 'Loading Status'
    }
  },
  {
    path: '/binancePayment',
    name: 'binancePayment',
    component: () => import("../view/binancePayment/index"),
  },
  {
    path: '/paymentDetails',
    name: 'paymentDetails',
    component: () => import("../view/paymentDetails/index"),
    meta: {
      title: 'Pay with'
    }
  },
  {
    path: '/paymentSelect',
    name: 'paymentSelect',
    component: () => import("../view/paymentSelect"),
    meta: {
      title: 'Select payment option'
    }
  },
  {
    path: '/overpayment',
    name: 'overpayment',
    component: () => import("../view/overpayment"),
  },
  {
    path: '/paymentEmail',
    name: 'paymentEmail',
    component: () => import("../view/paymentEmail"),
    meta:{
      title:'Pay with USDT'
    }
  },
  {
    path: '/paymentPrompt',
    name: 'paymentPrompt',
    component: () => import("../view/paymentPrompt"),
    meta:{
      title:'Pay with USDT'
    }
  },
]

const createRouter = () => new Router({
  mode: 'hash',
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
