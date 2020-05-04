export default {
  path: '/advanced',
  name: '高级功能',
  type: 'group',
  routes: [
    {
      path: './open-api',
      icon: 'api',
      name: '开放接口',
      component: './advanced/open-api',
    },
    {
      path: './cloud-function',
      icon: 'cloud',
      name: '云函数',
      component: './advanced/cloud-function',
    },
  ],
};
