import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Stocks from '../views/Stocks.vue'
import Commodities from '../views/Commodities.vue'
import Derivatives from '../views/Derivatives.vue'
import CryptoCurrencies from '../views/CryptoCurrencies.vue'
import Profile from '../views/Profile.vue'
import Settings from '../views/Settings.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Financial Dashboard - Home'
    }
  },
  {
    path: '/stocks',
    name: 'Stocks',
    component: Stocks,
    meta: {
      title: 'Stocks - Financial Dashboard'
    }
  },
  {
    path: '/commodities',
    name: 'Commodities',
    component: Commodities,
    meta: {
      title: 'Commodities - Financial Dashboard'
    }
  },
  {
    path: '/derivatives',
    name: 'Derivatives',
    component: Derivatives,
    meta: {
      title: 'Derivatives - Financial Dashboard'
    }
  },
  {
    path: '/crypto',
    name: 'CryptoCurrencies',
    component: CryptoCurrencies,
    meta: {
      title: 'Cryptocurrencies - Financial Dashboard'
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: {
      title: 'User Profile - Financial Dashboard'
    }
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings,
    meta: {
      title: 'Settings - Financial Dashboard'
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Update document title on route change
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Financial Dashboard'
  next()
})

export default router
