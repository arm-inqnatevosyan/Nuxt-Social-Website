<template>
  <div>
    <NavBars />
    <h1 class="mt-7 text-3xl font-bold text-sky-600 text-center">
      Categories
    </h1>
    <div class="mt-7 w-full sm:grid-cols-1 md:grid-cols-3 lg:grid grid-cols-3">
      <div v-for="category in categories" :key="category.id">
        <div class="w-80 h-auto text-sm bg-sky-700 shadow-lg py-4 shadow-cyan-500/50 text-white text-center font-bold mx-auto mt-2">
          <h1 class="font-bold text-xl">
            Name : {{ category.title }}
            Id : {{ category.id }}
          </h1>
          <button class="h-5 w-16 bg-sky-400 text-white font-bold tracking-widest" @click="seeAll(category.id)">
            See All
          </button>
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
      categories: [],
      content: ''
    }
  },
  async mounted () {
    await this.$axios.get('/api/postman/csrf')
    const response = await this.$axios.get('/api/categories')
    this.categories = response.data.data
  },
  methods: {
    async seeAll (id) {
      await this.$axios.get('/api/postman/csrf')
      this.$router.push(`/category/${id}`)
    }
  }
}
</script>
