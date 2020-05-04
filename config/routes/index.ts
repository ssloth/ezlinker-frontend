import overview from './overview';
import assets from './assets';
import advanced from './advanced';
import user from './user';
import setting from './setting';

export default [
  {
    path: '/auth',
    component: '../layouts/UserLayout',
    routes: [
      {
        name: '登录',
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
          { path: '/', redirect: '/home' },
          { ...overview },
          { ...assets },
          { ...advanced },
          { ...setting },
          { ...user },
          { component: './404' },
        ],
      },
    ],
  },
];
