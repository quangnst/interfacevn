export default {
  async login({ commit }, user) {
    await this.$axios
      .post("/auth/signin", {
        username: user.username,
        password: user.password
      })
      .then(response => {
        console.log('response', response.data);
        if (response.data.accessToken) {
          commit('localStorage/setUser', response.data, { root: true })
          commit("loginSuccess", response.data);
        }

        return response;
      })
      .catch(error => {
        commit("loginFailure", error);
      });
  },
  logout({ commit }) {
    commit('localStorage/setUser', null, { root: true })
    commit("logout");
  },
  async register({ commit }, user) {
    try {
      await this.$axios.post("auth/signup", {
        username: user.username,
        email: user.email,
        password: user.password
      });
      commit("registerSuccess");
      this.$router.push("login");
    } catch (error) {
      commit("registerFailure", error.message);
    }
  }
};
