import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import ProductList from '@/views/ProductList.vue'
import ProductCreate from '@/views/ProductCreate.vue'
import ProductEdit from '@/views/ProductEdit.vue'
import ProductDetail from '@/views/ProductDetail.vue'
import OrderList from '@/views/OrderList.vue'
import OrderCreate from '@/views/OrderCreate.vue'
import OrderDetail from '@/views/OrderDetail.vue'
import UserList from '@/views/UserList.vue'
import UserEdit from '@/views/UserEdit.vue'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterView
  },
  {
    path: '/',
    redirect: '/products'
  },
  // Product routes
  {
    path: '/products',
    name: 'ProductList',
    component: ProductList
  },
  {
    path: '/products/create',
    name: 'ProductCreate',
    component: ProductCreate
  },
  {
    path: '/products/:id',
    name: 'ProductDetail',
    component: ProductDetail
  },
  {
    path: '/products/:id/edit',
    name: 'ProductEdit',
    component: ProductEdit
  },
  // Order routes
  {
    path: '/orders',
    name: 'OrderList',
    component: OrderList
  },
  {
    path: '/orders/create',
    name: 'OrderCreate',
    component: OrderCreate
  },
  {
    path: '/orders/:id',
    name: 'OrderDetail',
    component: OrderDetail
  },
  // User routes
  {
    path: '/users',
    name: 'UserList',
    component: UserList
  },
  {
    path: '/users/:id/edit',
    name: 'UserEdit',
    component: UserEdit
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
