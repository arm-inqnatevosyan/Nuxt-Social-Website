<!-- Please remove this file from your project -->
<template>
  <div class="flex flex-col">
    <NavBars />
    <div class="flex flex-col w-1/3 mt-40 p-10 bg-sky-800 mx-auto h-my shadow-lg shadow-cyan-500/50">
      <h1 class="text-white font-bold font-sans mb-10 text-2xl">
        Add Category
      </h1>
      <input
        id="input"
        v-model="title"
        class="border-solid border-2 border-sky-200 outline-none p-1 mt-5"
        required
        type="text"
        placeholder="Create Your Category ..."
      >
      <p v-if="errorTitle" class="text-red-500 font-bold">
        {{ errorTitle }}
      </p>
      <button style="padding: 5px;margin-top: 20px;background-color: grey;color:white;" @click="submit(title)">
        Add Category
      </button>
    </div>
  </div>
</template>

<script>
import NavBars from '../components/NavBars.vue'
export default {
  name: 'AddPost',
  components: { NavBars },
  middleware: ['auth'],
  data () {
    return {
      title: '',
      errorTitle: null
    }
  },
  methods: {
    async submit (title) {
      try {
        await this.$axios.get('/api/postman/csrf')
        const post = await this.$axios.post('/api/category', { title })
        if (post !== '') {
          this.$router.push('/')
        }
      } catch (error) {
        if (error.response.data.errors.title) {
          this.errorTitle = error.response.data.errors.title[0]
        } else {
          this.errorTitle = ''
        }
      }
    }
  }
}
</script>
