<template>
  <div>
    <NavBars />
    <div>
      <h1 class="mt-7 text-3xl font-bold text-sky-600 text-center">
        Opinion Jobs
      </h1>
      <div class="mt-7 w-full sm:grid-cols-1 md:grid-cols-3 lg:grid grid-cols-3">
        <div v-for="user in users" :key="user.id" class="w-80 h-52 bg-sky-700 shadow-lg shadow-cyan-500/50  mx-auto mt-2">
          <div class="flex flex-col h-full items-center justify-center text-white font-bold">
            <h1>Email: {{ user.email }}</h1>
            <h1>Name : {{ user.name }}</h1>
            <h1>Description : {{ user.subject }}</h1>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBars from '@/components/NavBars'

export default {
  components: { NavBars },
  middleware: ['auth'],
  data () {
    return {
      users: []
    }
  },
  async mounted () {
    await this.$axios.$get('/api/postman/csrf')
    const response = await this.$axios.get('/api/query')
    this.users = response.data.data
  }
}
</script>
