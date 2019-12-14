/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import { extend } from 'umi-request';
import { notification } from 'antd';

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

const errorMessage = {
  400: '请求错误',
  401: '登录过期',
  403: '访问被禁止',
  404: '不存在的记录',
  405: '请求方法不支持',
  406: '请求的格式不可得',
  410: '请求的资源被永久删除',
  422: '发生验证错误。',
  500: '服务器发生错误，请检查服务器',
  502: '网关错误',
  503: '服务不可用，服务器暂时过载或维护',
  504: '网关超时',
};

export const getToken = (): string | null => localStorage.getItem('token');

export const setToekn = (token?: string) => {
  if (token) localStorage.setItem('token', token);
  else localStorage.removeItem('token');
};

/**
 * 异常处理程序
 */
const errorHandler = (error: { response: Response }): Response => {
  // eslint-disable-next-line no-console
  const { response } = error;
  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;

    notification.error({
      message: `请求错误 ${status}: ${url}`,
      description: errorText,
    });
  } else if (!response) {
    notification.error({
      description: '您的网络发生异常，无法连接服务器',
      message: '网络异常',
    });
  }
  throw response;
};

/**
 * 配置request请求时的默认参数
 */
const request = extend({
  prefix: '/api',
  errorHandler, // 默认错误处理
  credentials: 'include', // 默认请求是否带上cookie
});

request.interceptors.request.use((url, options: any) => {
  const token = getToken();
  const optionsRet = { ...options };
  if (token) {
    optionsRet.headers.token = token;
  }
  return { url, options: optionsRet };
});

// response interceptor
request.interceptors.response.use(async (response: any) => {
  const result = await response.clone().json();
  const { code, data, i18nMessage } = result;

  if (errorMessage[code]) {
    if (code === 401) {
      setToekn();
      window.location.href = '/auth/login';
    }

    notification.error({
      message: errorMessage[code],
      description: i18nMessage,
    });

    return data;
  }

  return data;
});

export default request;
