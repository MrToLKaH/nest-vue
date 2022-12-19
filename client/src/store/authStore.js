import authService from '@/services/AuthService';

export default {
  state: {
    isAuthenticated: false,
    currentUser: {}
  },
  getters: {
    isAuthenticated(state) {
      return state.isAuthenticated;
    },

    getCurrentUser(state) {
      return state.currentUser;
    }
  },
  mutations: {
    setIsAuthenticated(state, isAuth) {
      state.isAuthenticated = isAuth;
    },
    setCurrentUser(state, user) {
      state.currentUser = user;
    }
  },
  actions: {
    async registration({commit}, {email, password}) {
      try {
        const response = await authService.registration(email, password);
        localStorage.setItem('accessToken', response.data.accessToken);
        commit('setIsAuthenticated', true);
        commit('setCurrentUser', response.data.user);
      } catch (e) {
        throw e;
      }
    },

    async login({commit}, {email, password}) {
      try {
        const response = await authService.login(email, password);
          localStorage.setItem('accessToken', response.data.accessToken);
          commit('setIsAuthenticated', true);
          commit('setCurrentUser', response.data.user);
      } catch (e) {
        throw e;
      }
    },

    async logout({commit}, email, password) {
      try {
        await authService.logout(email, password);
        localStorage.removeItem('accessToken');
        commit('setIsAuthenticated', false);
        commit('setCurrentUser', {});
      } catch (e) {
        throw e;
      }
    }
  }
}