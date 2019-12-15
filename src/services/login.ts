import request from '@/utils/request';

export interface LoginType {
  username: string;
  password: string;
}

export async function accountLogin(data: LoginType) {
  return request('/entry/login', {
    method: 'POST',
    data,
  });
}
