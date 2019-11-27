export default [
  {
    path: '/auth',
    component: '../layouts/UserLayout',
    routes: [
      {
        name: 'login',
        path: '/auth/login',
        component: './auth/login',
      },
    ],
  },
  {
    path: '/',
    component: '../layouts/SecurityLayout',
    routes: [
      {
        path: '/',
        component: '../layouts/BasicLayout',
        routes: [
          {
            path: '/',
            redirect: '/welcome',
          },
          {
            path: '/welcome',
            name: '总览',
            icon: 'smile',
            component: './Welcome',
          },
          {
            path: '/projects',
            name: '项目',
            icon: 'crown',
            routes: [
              {
                path: './',
                component: './project',
              },
              {
                path: './:id/develop',
                name: '开发模式',
                component: './project/develop',
                hideInMenu: true,
              },
              {
                path: './:id/operation',
                name: '开发模式',
                component: './project/operation',
                hideInMenu: true,
              },
              {
                path: './:id/operation/product',
                name: '产品列表',
                component: './project/operation/product',
                hideInMenu: true,
              },
            ],
          },
          {
            path: '/user',
            name: '用户',
            icon: 'crown',
            component: './Admin',
          },
          {
            path: '/setting',
            name: '配置',
            icon: 'crown',
            component: './Admin',
          },
          {
            component: './404',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },
  {
    component: './404',
  },
];
