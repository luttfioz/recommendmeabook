import AuthService from '@/services/AuthService';
import User from '@/dto/user';

const user: any = localStorage.getItem('user');

const initialState = user
  ? { status: { loggedIn: true }, user }
  : { status: { loggedIn: false }, user: null };

export const auth = {
  namespaced: true,
  state: initialState,
  mutations: {
    loginSuccess(state: any, user: User): void {
      state.status.loggedIn = true;
      state.user = user;
    },
    loginFailure(state: any) {
      state.status.loggedIn = false;
      state.user = null;
    },
  },
  actions: {
    login(context: any, user: User) {
      return AuthService.login(user).then(
        user => {
          context.commit('loginSuccess', user);
          return Promise.resolve(user);
        },
        error => {
          context.commit('loginFailure');
          return Promise.reject(error);
        }
      );
    },
  },
};
