module.exports = {
  /*
   ** Headers of the page
   */
  head: {
    title: "nuxt-auth",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "Nuxt.js project" }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: 'stylesheet',
        href: 'https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.1/css/bulma.min.css'
      }
    ]
  },
  css: [
    // '@/assets/css/main.scss'
  ],
  /*
   ** Customize the progress bar color
   */
  loading: { color: "#3B8070" },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** Run ESLint on save
     */
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/
        });
      }
    },
    transpile: ["vee-validate/dist/rules"]
  },
  axios: {
    baseURL: "http://localhost:8080/api"
  },
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: false,
          user: false,
          logout: false
        }
      }
    }
  },
  plugins: ['~/plugins/persistedState.js', '~/plugins/vee-validate.js'],
  modules: [
    "@nuxtjs/axios", '@nuxtjs/auth'
  ]
};
