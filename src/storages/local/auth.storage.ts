export const AuthStorage = {
  key: 'AUTH_TOKEN',
  setToken: (token: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(AuthStorage.key, token);
    }
  },

  getToken: (): string | null => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(AuthStorage.key);
    }
    return null;
  },

  removeToken: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(AuthStorage.key);
    }
  },
};
