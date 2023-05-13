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
            Name</label>
          <input
            id="identity"
            v-model="name"
            class="shadow border border-gray-400 appearance-none borderrounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Name"
            aria-describedby="emailHelp"
          >
          <span id="emailHelp" class="text-xs text-red-700" />
        </div>

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
            type="email"
            placeholder="Email"
            aria-describedby="emailHelp"
          >
          <span id="emailHelp" class="text-xs text-red-700" />
        </div>

        <div class="password-input mb-6">
          <label
            for="identity"
            class="block text-gray-700 text-sm font-bold mb-2"
          >Password</label>

          <input
            id="password"
            v-model="password"

            aria-describedby="passwordHelp"
            class="shadow border border-gray-400 appearance-none borderrounded w-full px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="password"
            placeholder="*******"
          >

          <span id="passwordHelp" class="text-xs text-red-700" />
        </div>
        <p v-if="errorName" class="text-red-500 font-bold">
          {{ errorName }}
        </p>
        <p v-if="errorEmail" class="text-red-500 font-bold">
          {{ errorEmail }}
        </p>
        <p v-if="errorPassword" class="text-red-500 font-bold">
          {{ errorPassword }}
        </p>
        <div class="flex items-center justify-between">
          <button
            class="bg-blue-600 mt-3 hover:bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            @click="submit(name,email,password)"
          >
            Sign In
          </button>
          <NuxtLink to="/">
            <button
              class="bg-blue-600 hover:bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Log In
            </button>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import NavBars from '../components/NavBars.vue'

export default {
  name: 'IndexPage',
  components: { NavBars },
  middleware: ['guest'],
  auth: false,
  data () {
    return {
      name: '',
      email: '',
      password: '',
      errorName: null,
      errorEmail: null,
      errorPassword: null
    }
  },
  methods: {
    async submit (name, email, password) {
      try {
        await this.$axios.$get('/api/postman/csrf')
        await this.$axios.$post('/api/register', { name, email, password })
        this.$router.push('/')
      } catch (error) {
        if (error.response.data.errors.name) {
          this.errorName = error.response.data.errors.name[0]
        } else {
          this.errorName = ''
        }
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
