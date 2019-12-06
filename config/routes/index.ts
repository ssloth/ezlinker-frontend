import home from './home';
import projects from './project';
import user from './user';
import setting from './setting';

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
          { path: '/', redirect: '/home' },
          { ...home },
          { ...projects },
          { ...user },
          { ...setting },
          { component: './404' },
        ],
      },
    ],
  },
];
