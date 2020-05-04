import ProLayout, {
  MenuDataItem,
  BasicLayoutProps as ProLayoutProps,
  Settings,
  DefaultFooter,
  SettingDrawer,
} from '@ant-design/pro-layout';
import React, { useEffect } from 'react';
import { Link, connect, Dispatch, history } from 'umi';
import { Result, Button, Menu } from 'antd';
import Authorized from '@/utils/Authorized';
import RightContent from '@/components/GlobalHeader/RightContent';
import { ConnectState } from '@/models/connect';
import { getAuthorityFromRouter } from '@/utils/utils';
import logo from '../assets/logo.svg';
import styles from './BasicLayout.less';

const { SubMenu } = Menu;

const noMatch = (
  <Result
    status={403}
    title="403"
    subTitle="Sorry, you are not authorized to access this page."
    extra={
      <Button type="primary">
        <Link to="/user/login">Go Login</Link>
      </Button>
    }
  />
);
export interface BasicLayoutProps extends ProLayoutProps {
  breadcrumbNameMap: {
    [path: string]: MenuDataItem;
  };
  route: ProLayoutProps['route'] & {
    authority: string[];
  };
  settings: Settings;
  dispatch: Dispatch;
}
export type BasicLayoutContext = { [K in 'location']: BasicLayoutProps[K] } & {
  breadcrumbNameMap: {
    [path: string]: MenuDataItem;
  };
};
/**
 * use Authorized check all menu item
 */

const menuDataRender = (menuList: MenuDataItem[]): MenuDataItem[] =>
  menuList.map(item => {
    const localItem = { ...item, children: item.children ? menuDataRender(item.children) : [] };
    return Authorized.check(item.authority, localItem, null) as MenuDataItem;
  });

const defaultFooterDom = <DefaultFooter copyright="2020 闪麟网络有限公司" />;

const menuItemRender = (menuItem: MenuDataItem, props: any) => {
  const { collapsed } = props;
  if (menuItem.type === 'group') {
    return (
      <Menu.ItemGroup
        key={menuItem.name}
        title={collapsed ? null : menuItem.name}
      >
        {menuItem.children?.map(menuItemRender)}
      </Menu.ItemGroup>
    );
  }

  if (menuItem.children && menuItem.children.length > 0) {
    return (
      <SubMenu key={menuItem.name} title={menuItem.name}>
        {menuItem.children?.map(menuItemRender)}
      </SubMenu>
    );
  }

  return (
    <Menu.Item
      onClick={() => history.push({ pathname: menuItem.path })}
      icon={menuItem.icon}
      key={menuItem.name}
      title={menuItem.name}
    >
      {menuItem.name}
    </Menu.Item>
  );
};

const menuRender = (props: any) => {
  const { menuData, collapsed } = props;
  return (
    <div className={styles.sider}>
      <div className={styles.header}>{collapsed ? 'E' : 'EzLinker'}</div>
      <Menu inlineCollapsed={collapsed} style={{ width: collapsed ? 75 : 200 }}>
        {menuData.map((menuItem: MenuDataItem) => menuItemRender(menuItem, props))}
      </Menu>
    </div>
  );
};

const BasicLayout: React.FC<BasicLayoutProps> = props => {
  const {
    dispatch,
    children,
    settings,
    location = {
      pathname: '/',
    },
  } = props;
  /**
   * constructor
   */

  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: 'user/fetchCurrent',
      });
    }
  }, []);
  /**
   * init variables
   */

  const handleMenuCollapse = (payload: boolean): void => {
    if (dispatch) {
      dispatch({
        type: 'global/changeLayoutCollapsed',
        payload,
      });
    }
  }; // get children authority

  const authorized = getAuthorityFromRouter(
    props.route.routes as any,
    location.pathname || '/',
  ) || {
    authority: undefined,
  };
  return (
    <>
      <ProLayout
        logo={logo}
        siderWidth={200}
        menuHeaderRender={(logoDom, titleDom) => (
          <Link to="/">
            {logoDom}
            {titleDom}
          </Link>
        )}
        theme="light"
        onCollapse={handleMenuCollapse}
        menuRender={menuRender}
        menuItemRender={(menuItemProps, defaultDom) => {
          if (menuItemProps.isUrl || menuItemProps.children || !menuItemProps.path) {
            return defaultDom;
          }

          return <Link to={menuItemProps.path}>{defaultDom}</Link>;
        }}
        itemRender={(route, params, routes, paths) => {
          const first = routes.indexOf(route) === 0;
          return first ? (
            <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
          ) : (
            <span>{route.breadcrumbName}</span>
          );
        }}
        footerRender={() => defaultFooterDom}
        menuDataRender={menuDataRender}
        rightContentRender={() => <RightContent />}
        breadcrumbRender={(routers = []) => [
          {
            path: '/',
            breadcrumbName: '主页',
          },
          ...routers,
        ]}
        {...props}
        {...settings}
      >
        <Authorized authority={authorized!.authority} noMatch={noMatch}>
          {children}
        </Authorized>
      </ProLayout>
      <SettingDrawer
        settings={settings}
        onSettingChange={config =>
          dispatch({
            type: 'settings/changeSetting',
            payload: config,
          })
        }
      />
    </>
  );
};

export default connect(({ global, settings }: ConnectState) => ({
  collapsed: global.collapsed,
  settings,
}))(BasicLayout);
