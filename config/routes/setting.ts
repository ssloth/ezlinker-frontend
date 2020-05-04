export default {
  path: './setting',
  type: 'group',
  name: '系统配置',
  routes: [
    {
      path: './manage',
      icon: 'setting',
      name: '配置管理',
      component: './setting/manage',
    },
    {
      path: './cache-manage',
      icon: 'database',
      name: '缓存管理',
      component: './setting/cache-manage',
    },
    {
      path: './upgrade',
      icon: 'cloud-upload',
      name: '版本升级',
      component: './setting/upgrade',
    },
  ],
};
