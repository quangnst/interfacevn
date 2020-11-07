export default {
  loginSuccess(state, user) {
    state.status.loggedIn = true;
    state.user = user;
    state.error = null;
  },
  loginFailure(state) {
    state.status.loggedIn = false;
    state.user = null;
    state.error = "Error";
  },
  logout(state) {
    state.status.loggedIn = false;
    state.user = null;
  },
  registerSuccess(state) {
    state.status.loggedIn = false;
    state.error = null;
  },
  registerFailure(state) {
    state.status.loggedIn = false;
    state.error = "Error";
  }
};