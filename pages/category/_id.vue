<template>
  <div>
    <NavBars />
    <div class="mt-7 w-full sm:grid-cols-1 md:grid-cols-3 lg:grid grid-cols-3">
      <div v-for="user in users" :key="user.id" class="w-80 h-auto text-sm bg-sky-700 shadow-lg py-4 shadow-cyan-500/50 text-white text-center font-bold mx-auto mt-2">
        <h1 class="font-bold text-xl">
          Name : {{ user.name }}
        </h1>
        <h1>Email :{{ user.email }}</h1>
        <h1>Description :{{ user.subject }}</h1>
      </div>
    </div>
  </div>
</template>

<script>
import NavBars from '@/components/NavBars'

export default {
  components: { NavBars },
  data () {
    return {
      users: []
    }
  },
  async mounted () {
    const response = await this.$axios.get('/api/categories', { params: { id: this.$route.params.id } })
    this.users = response.data.data
  }
}
</script>
