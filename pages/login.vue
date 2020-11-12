<template>
<section class="section">
  <div class="container">
    <div class="columns">
      <div class="column is-4 is-offset-4">
        <h2 class="title has-text-centered">Welcome back!</h2>

        <Notification :message="error" v-if="error" />
        <ValidationObserver v-slot="{ handleSubmit }">
          <form @submit.prevent="handleSubmit(userLogin)">
            <div class="field">

              <label class="label">Email</label>
              <div class="control">
                <ValidationProvider v-slot="{ errors }" name="email" rules="required|email">
                  <input type="email" class="input" name="email" v-model="login.email" />
                  <span class="input-invalid-message">
                    {{ errors[0] }}
                  </span>
                </ValidationProvider>
              </div>

            </div>
            <div class="field">
              <label class="label">Password</label>
              <div class="control">
                <ValidationProvider v-slot="{ errors }" name="password" rules="required">
                  <input type="password" class="input" name="password" v-model="login.password" />
                  <span class="input-invalid-message">
                    {{ errors[0] }}
                  </span>
                </ValidationProvider>
              </div>
            </div>
            <div class="control">
              <button type="submit" class="button is-dark is-fullwidth">Log In</button>
            </div>
          </form>
        </ValidationObserver>
        <div class="has-text-centered" style="margin-top: 20px">
          <p>
            Don't have an account? <nuxt-link to="/register">Register</nuxt-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</section>
</template>

<script>
import Notification from '~/components/Notification'
import {
  ValidationObserver,
  ValidationProvider
} from "vee-validate";

export default {
  components: {
    Notification,
    ValidationObserver: ValidationObserver,
    ValidationProvider: ValidationProvider
  },
  data() {
    return {
      login: {
        email: '',
        password: ''
      },
      error: null
    }
  },

  methods: {
    async userLogin() {
      console.log(this.login)
      try {
        let response = await this.$axios.post('auth/signin', this.login).then(resp => {
          this.$auth.setToken('local', 'Bearer ' + resp.data.accessToken);
          this.$axios.setHeader('Authorization', 'Bearer ' + resp.data.accessToken);
          this.$auth.ctx.app.$axios.setHeader('Authorization', 'Bearer ' + resp.data.accessToken);
          this.$auth.setUser(resp.data);
          this.$router.push("/profile");
        })

      } catch (e) {
        this.error = e.response.data.message
      }
    }
  }
}
</script>
