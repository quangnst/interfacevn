export const state = () => {
  return {
    auth: {
      user: {},
      loggedIn: false
    }
  }
}
export const mutations = {
  login(state, user){
    state.auth.user = user;
    state.auth.loggedIn = true;
  },
  logout(state){
    state.auth.user = {};
    state.auth.loggedIn = false;
  }
}
export const actions = {
  login({commit}, user){
    commit("login", user)
  },
  logout({commit}){
    commit('logout');
  }
}
export const getters = {
  isAuthenticated(state) {
    return state.auth.loggedIn;
  },

  loggedInUser(state) {
    return state.auth.user;
  }
}

