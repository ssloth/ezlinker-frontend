import React from 'react';
import { connect } from 'dva';
import pathToRegexp from 'path-to-regexp';
import { ConnectProps, ConnectState, Route, UserModelState } from '@/models/connect';

interface AuthComponentProps extends ConnectProps {
  user: UserModelState;
}

export const getRouteAuthority = (path: string, routeData: Route[]) => {
  let authorities: string[] | string | undefined;
  routeData.forEach(route => {
    if (route.authority) {
      authorities = route.authority;
    }
    // match prefix
    if (pathToRegexp(`${route.path}(.*)`).test(path)) {
      // exact match
      if (route.path === path) {
        authorities = route.authority || authorities;
      }
      // get children authority recursively
      if (route.routes) {
        authorities = getRouteAuthority(path, route.routes) || authorities;
      }
    }
  });
  return authorities;
};

const AuthComponent: React.FC<AuthComponentProps> = ({ children }) => <div>{children}</div>;

export default connect(({ user }: ConnectState) => ({
  user,
}))(AuthComponent);
