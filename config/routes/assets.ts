export default {
  path: '/assets',
  type: 'group',
  name: '资源管理',
  routes: [
    {
      path: './project',
      icon: 'project',
      name: '项目管理',
      routes: [
        {
          path: './',
          component: './assets/project',
        },
        {
          path: './:id',
          hideInMenu: true,
          routes: [
            {
              path: './design',
              name: '产品设计',
              component: './assets/project/design',
            },
            {
              path: './design/product/:productId/console',
              name: '控制台设计',
              component: './assets/project/design/console',
            },
            {
              path: './operation',
              name: '运维',
              component: './assets/project/operation',
            },
            {
              path: './operation/product',
              name: '产品列表',
              component: './assets/project/operation/product',
            },
            {
              path: './device',
              name: '设备管理',
              component: './assets/project/device',
            },
            {
              path: './device/:did',
              name: '设备详情',
              component: './assets/project/device/detail',
            },
          ],
        },
      ],
    },
    {
      path: './product-search',
      icon: 'appstore',
      name: '产品搜索'
    },
    {
      path: './device-search',
      icon: 'robot',
      name: '设备搜索'
    },
    {
      path: './shared-device',
      icon: 'share-alt',
      name: '共享设备'
    },
  ],
};
