import { User } from '@/services/domain/user.types';

export const UserStorage = {
  key: 'USER_DATA',
  setUser: (userData: User.IAuthenticatedUserResponse) => {
    localStorage.setItem(UserStorage.key, JSON.stringify(userData));
  },
  getUser: (): User.IAuthenticatedUserResponse | null => {
    const userData = localStorage.getItem(UserStorage.key);
    return userData ? JSON.parse(userData) : null;
  },
  removeUser: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(UserStorage.key);
    }
  },
};
