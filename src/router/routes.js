
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Login.vue') },
      { path: '/login', name: 'login', component: () => import('pages/Login.vue') },
      { path: '/register', name: 'register', component: () => import('pages/RegisterUser.vue') },
    ]
  },
  {
    path: '/',
    component: () => import('layouts/HomeUser.vue'),
    children: [
      { path: '', component: () => import('pages/HomeLogado.vue') },
      { path: '/home', name: 'home', component: () => import('pages/HomeLogado.vue') },
      { path: '/incluir-pessoa', name: 'incluirpessoa', component: () => import('pages/Cadastro/Pessoa/IncluirPessoa.vue') },
      { path: '/pesquisar-pessoa', name: 'pesquisarpessoa', component: () => import('pages/Cadastro/Pessoa/PesquisarPessoa.vue') },
      { path: '/editar-pessoa/:id', name: 'editarpessoa', component: () => import('pages/Cadastro/Pessoa/IncluirPessoa.vue') }
    ],
    meta: {
      requiresAuth: true
    }
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
