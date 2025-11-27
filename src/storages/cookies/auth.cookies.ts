import { setCookie, getCookie, deleteCookie } from 'cookies-next';

export const AuthCookie = {
  name: 'AUTH_TOKEN',
  setToken(token: string, days = 30) {
    setCookie(this.name, token, {
      maxAge: days * 24 * 60 * 60,
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });
  },

  getToken(): string | null {
    const value = getCookie(this.name);
    return typeof value === 'string' ? value : null;
  },

  removeToken() {
    deleteCookie(this.name);
  },
};
