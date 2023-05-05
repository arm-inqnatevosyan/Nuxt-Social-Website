<template>
  <div class="bg-gray-400 h-screen">
    <NavBars />
    <div class="flex justify-center items-center pt-80">
      <div class="w-full max-w-xs">
        <div class="identity-input mb-4">
          <label
            for="identity"
            class="block text-gray-700 text-sm font-bold mb-2"
          >
            Email</label>
          <input
            id="identity"
            v-model="email"
            class="shadow border border-gray-400 appearance-none borderrounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            name="email"
            placeholder="Email"
            aria-describedby="emailHelp"
          >
          <span id="emailHelp" class="text-xs text-red-700" />
        </div>

        <div class="password-input mb-6">
          <label
            for="identity"
            name="password"
            class="block text-gray-700 text-sm font-bold mb-2"
          >Password</label>

          <input
            id="password"
            v-model="password"

            aria-describedby="passwordHelp"
            class="shadow border border-gray-400 appearance-none borderrounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="password"
            placeholder="*******"
          >

          <span id="passwordHelp" class="text-xs text-red-700" />
        </div>
        <p v-if="errorEmail" class="text-red-500 font-bold">
          {{ errorEmail }}
        </p>
        <p v-if="errorPassword" class="text-red-500 font-bold">
          {{ errorPassword }}
        </p>
        <div class="flex items-center justify-between mt-3">
          <button
            class="bg-blue-600 hover:bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            @click="login(email,password)"
          >
            Log In
          </button>
          <NuxtLink
            class="inline-block align-baseline font-bold text-sm text-black-500 hover:text-blue-800"
            to="/register"
          >
            Register?
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBars from '../components/NavBars.vue'

export default {
  name: 'LoginVue',
  components: { NavBars },
  middleware: ['login'],
  data () {
    return {
      email: '',
      password: '',
      errorEmail: null,
      errorPassword: null
    }
  },
  methods: {
    async login (email, password) {
      try {
        await this.$axios.$get('/api/postman/csrf')
        const res = await this.$axios.$post('/api/login', { email, password })
        if (res.status === true) {
          this.$cookiz.set('token', res.token, {
            maxAge: 60 * 60 * 24 * 7
          })
          this.$router.push('/createcategory')
        }
      } catch (error) {
        if (error.response.data.errors.email) {
          this.errorEmail = error.response.data.errors.email[0]
        } else {
          this.errorEmail = ''
        }
        if (error.response.data.errors.password) {
          this.errorPassword = error.response.data.errors.password[0]
        } else {
          this.errorPassword = ''
        }
      }
    }
  }
}
</script>
<style scoped>
</style>
