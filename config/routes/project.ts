export default {
  path: '/project',
  icon: 'crown',
  name: '项目',
  routes: [
    {
      path: './:id/develop',
      name: '开发模式',
      component: '../layouts/LightLayout',
      hideInMenu: true,
      routes: [
        {
          path: './',
          component: './project/develop',
        },
      ],
    },
    {
      path: './:id/operation',
      hideInMenu: true,
      component: '../layouts/DarkLayout',
      routes: [
        {
          path: './',
          name: '运维模式',
          component: './project/operation',
        },
        {
          path: './product',
          name: '产品列表',
          component: './project/operation/product',
        },
      ],
    },
    {
      path: './',
      component: '../layouts/LightLayout',
      routes: [
        {
          path: './',
          component: './project',
        },
      ],
    },
  ],
};
