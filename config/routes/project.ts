export default {
  path: '/project',
  icon: 'project',
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
          path: './design',
          name: '产品设计',
          component: './project/design',
        },
        {
          path: './design/product/:productId/console',
          name: '控制台设计',
          component: './project/design/console',
        },
        {
          path: './operation',
          name: '运维',
          component: './project/operation',
        },
        {
          path: './operation/product',
          name: '产品列表',
          component: './project/operation/product',
        },
        {
          path: './device',
          name: '设备管理',
          component: './project/device',
        },
        {
          path: './device/:did',
          name: '设备详情',
          component: './project/device/detail',
        },
      ],
    },
  ],
};
