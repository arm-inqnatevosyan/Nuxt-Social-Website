<template>
  <div>
    <div class="w-80 h-auto text-sm bg-sky-700 shadow-lg py-4 shadow-cyan-500/50 text-white text-center font-bold mx-auto mt-2">
      <h1 class="font-bold text-xl">
        Name : {{ name }}
      </h1>
      <h1>Email :{{ email }}</h1>
      <div class="py-3">
        <input v-model="title" type="text" class="text-black h-[22px] outline-none bg-gray-300" placeholder="Add a comment">
        <button class="h-5 w-16 bg-sky-400 text-white font-bold tracking-widest" @click="addComment(id, title)">
          Post
        </button>
      </div>
      <div v-for="comment in comments" :key="comment.id" class="mt-3">
        <h1 class="text-black">
          {{ comment.author }} :{{ comment.title }}
        </h1>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'SeePost',
  props: {
    id: { type: Number, required: true },
    email: { type: String, required: true },
    name: { type: String, required: true },
    subject: { type: String, required: true },
    comments: { type: Array, required: true }
  },
  data () {
    return {
      title: ''
    }
  },

  methods: {
    async addComment (id, title) {
      await this.$axios.$get('/api/postman/csrf')
      return await this.$axios.post('/api/contacts/comments', { title, contact_id: id })
    }
  }
}
</script>
