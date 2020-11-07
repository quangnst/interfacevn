export const state = () => ({
  user: null
});
export const mutations = {
  setUser(state, user) {
    console.log("user", user);
    state.user = user;
  }
};
