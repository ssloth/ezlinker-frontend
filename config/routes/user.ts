export default {
  path: '/user',
  name: '用户',
  icon: 'crown',
  component: '../layouts/LightLayout',
  routes: [
    {
      path: './',
      component: './Admin',
    },
  ],
};
