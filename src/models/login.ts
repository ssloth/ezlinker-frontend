import { Reducer } from 'redux';
import { routerRedux } from 'dva/router';
import { Effect } from 'dva';
import { stringify } from 'querystring';

import { accountLogin } from '@/services/login';
import { getPageQuery } from '@/utils/utils';
import { setToekn } from '../utils/request';

export interface StateType {
  status?: 'ok' | 'error';
  type?: string;
  currentAuthority?: 'user' | 'guest' | 'admin';
}

export interface LoginModelType {
  namespace: string;
  state: StateType;
  effects: {
    login: Effect;
    logout: Effect;
  };
  reducers: {
    changeLoginStatus: Reducer<StateType>;
  };
}

const Model: LoginModelType = {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
      const result = yield call(accountLogin, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: { toekn: result },
      });
      // Login successfully
      if (result) {
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params as { redirect: string };
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = '/';
            return;
          }
        }
        setToekn(result);
        yield put(routerRedux.replace(redirect || '/'));
      }
    },

    *logout(_, { put }) {
      const { redirect } = getPageQuery();
      // redirect
      setToekn();
      if (window.location.pathname !== '/auth/login' && !redirect) {
        yield put(
          routerRedux.replace({
            pathname: '/auth/login',
            search: stringify({
              redirect: window.location.href,
            }),
          }),
        );
      }
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};

export default Model;
