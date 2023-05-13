<template>
  <div class="flex flex-col">
    <NavBars />
    <div class="flex flex-col w-1/3 mt-40 p-10 bg-sky-800 mx-auto h-my shadow-lg shadow-cyan-500/50">
      <h1 class="text-white font-bold font-sans mb-10 text-2xl">
        Add User
      </h1>
      <input
        id="input"
        v-model="name"
        class="border-solid border-2 border-sky-200 outline-none p-1"
        required
        type="text"
        placeholder="Name"
      >
      <input
        id="input"
        v-model="email"
        class="border-solid border-2 border-sky-200 outline-none p-1 mt-5"
        required
        type="email"
        placeholder="Email"
      >
      <input
        id="input"
        v-model="description"
        class="border-solid border-2 border-sky-200 outline-none p-1 mt-5"
        required
        type="text"
        placeholder="Description"
      >
      <label for="category">Choose a Category:</label>
      <select id="category" v-model="category" name="category">
        <option disabled value="">
          Please select one
        </option>
        <option v-for="user in categories" :key="user.id" :value="user.id">
          {{ user.title }}
        </option>
      </select>
      <p v-if="errorName" class="text-red-500 font-bold">
        {{ errorName }}
      </p>
      <p v-if="errorEmail" class="text-red-500 font-bold">
        {{ errorEmail }}
      </p>
      <p v-if="errorDescription" class="text-red-500 font-bold">
        {{ errorDescription }}
      </p>
      <p v-if="errorCategory" class="text-red-500 font-bold">
        {{ errorCategory }}
      </p>
      <p v-if="errorOur" class="text-blue-500 font-bold">
        {{ errorOur }}
      </p>
      <button style="padding: 5px;margin-top: 20px;background-color: grey;color:white;" @click="submit(name,email,description,id,category)">
        Add User
      </button>
    </div>
    <button class="absolute bottom-2 right-2" @click="logout">
      <img src="/logout.png" class="w-12 h-12">
    </button>
  </div>
</template>

<script>
import NavBars from '../components/NavBars.vue'
export default {
  name: 'AddPost',
  components: { NavBars },
  data () {
    return {
      name: '',
      email: '',
      description: '',
      category: '',
      errorName: null,
      errorEmail: null,
      errorDescription: null,
      errorOur: null,
      errorCategory: null,
      categories: []
    }
  },
  async mounted () {
    try {
      const category = await this.$axios.get('/api/category')
      this.categories = category.data.data
    } catch (error) {
      this.$cookiz.remove('token')
      return this.$router.push('/')
    }
  },
  methods: {
    async submit (name, email, description, id, category) {
      try {
        const post = await this.$axios.post('/api/contact', { name, email, description, user_id: id, category })
        if (post !== '') {
          this.$router.push('/users')
        }
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
        if (error.response.data.errors.description) {
          this.errorDescription = error.response.data.errors.description[0]
        } else {
          this.errorDescription = ''
        }
        if (error.response.data.errors.category) {
          this.errorCategory = error.response.data.errors.category[0]
        } else {
          this.errorCategory = ''
        }
        if (error.response.data.errors.message) {
          this.errorOur = error.response.data.errors.message
        } else {
          this.errorOur = ''
        }
      }
    },
    async logout () {
      await this.$auth.logout()
      this.$router.push('/')
    }
  }
}
</script>
