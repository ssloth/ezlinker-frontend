export default {
  path: '/user',
  name: '用户',
  type: 'group',
  routes: [
    {
      path: './',
      icon: 'team',
      name: '用户管理',
      component: './user',
    },
    {
      path: './',
      icon: 'user',
      name: '个人中心',
      component: './user',
    },
  ],
};
