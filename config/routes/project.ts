export default {
  path: '/project',
  icon: 'crown',
  name: '项目',
  routes: [
    {
      path: './',
      component: './project',
    },
    {
      path: './:id',
      hideInMenu: true,
      routes: [
        {
          path: './develop',
          name: '开发模式',
          component: './project/develop',
        },
        {
          path: './operation',
          name: '运维模式',
          component: './project/operation',
        },
        {
          path: './operation/product',
          name: '产品列表',
          component: './project/operation/product',
        },
        {
          path: './manage',
          name: '管理模式',
          component: './project/manage/Layout',
          routes:[
            {
              path: './:productId',
              name: '设备管理',
              component: './project/manage',
            },
          ]
        },
      ],
    },
  ],
};
