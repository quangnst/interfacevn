import Vue from 'vue';
import Router from 'vue-router';
import Login from './views/Login.vue';
import Register from './views/Register.vue';

// Shop
import Products from '@/components/Products';
import Product from '@/components/Product';
import Category from '@/components/Category';
import Checkout from '@/components/Checkout';
import Thakyou from '@/components/Thakyou';
import Search from '@/components/Search';

Vue.use(Router);

export const router = new Router({
         mode: 'history',
         routes: [
           {
             path: '/',
             name: 'products',
             component: Products
           },
           {
             path: '/login',
             name: 'login',
             component: Login
           },
           {
             path: '/register',
             name: 'register',
             component: Register
           },
           {
             path: '/search/:key',
             name: 'search',
             component: Search
           },
           {
             path: '/profile',
             name: 'profile',
             // lazy-loaded
             component: () => import('./views/Profile.vue')
           },
           {
             path: '/admin',
             name: 'admin',
             // lazy-loaded
             component: () => import('./views/BoardAdmin.vue')
           },
           {
             path: '/mod',
             name: 'moderator',
             // lazy-loaded
             component: () => import('./views/BoardModerator.vue')
           },
           {
             path: '/user',
             name: 'user',
             // lazy-loaded
             component: () => import('./views/BoardUser.vue')
           },
           {
             path: '/product/:id',
             name: 'product',
             component: Product,
             props: true
           },
           {
             path: '/category/:category',
             name: 'category',
             component: Category,
             props: true
           },
           {
             path: '/checkout',
             name: 'checkout',
             component: Checkout
           },
           {
             path: '/thankyou',
             name: 'thankyou',
             component: Thakyou
           }
         ]
       });

router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/register'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn) {
    next('/login');
  } else {
    next();
  }
});
