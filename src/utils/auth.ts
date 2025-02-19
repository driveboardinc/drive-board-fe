import Cookies from 'js-cookie';

export const setAuthCookies = (access: string, refresh: string) => {
  Cookies.set('accessToken', access, { secure: true });
  Cookies.set('refreshToken', refresh, { secure: true });
};

export const clearAuthCookies = () => {
  Cookies.remove('accessToken');
  Cookies.remove('refreshToken');
};

export const getAccessToken = () => Cookies.get('accessToken');
export const getRefreshToken = () => Cookies.get('refreshToken');
