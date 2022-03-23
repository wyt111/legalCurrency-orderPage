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
    redirect: '/paymentMethod',
  },
  {
    path: '/paymentMethod',
    name: 'payment method pag',
    component: () => import("../view/paymentMethod/index"),
  },
  {
    path: '/payment',
    name: 'payment pag',
    component: () => import("../view/payment/index"),
  },
  {
    path: '/paymentDetails',
    name: 'Payment details',
    component: () => import("../view/paymentDetails/index"),
  },
  {
    path: '/paymentSelect',
    name: 'Select payment option',
    component: () => import("../view/paymentSelect"),
  },
  {
    path: '/overpayment',
    name: 'overpayment',
    component: () => import("../view/overpayment"),
  }
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
