
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Login.vue') },
      { path: '/login', name: 'login', component: () => import('pages/Login.vue') },
      { path: '/register', name: 'register', component: () => import('pages/RegisterUser.vue') },
      { path: '/home', name: 'home', component: () => import('pages/HomeUser.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
