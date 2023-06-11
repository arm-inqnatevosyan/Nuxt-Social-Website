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
      <div class="flex justify-between">
        <button class="ml-2" @click="likeContact(author,id1)">
          <h1 v-if="liked === true">
            UnLike
          </h1>
          <h1 v-if="liked === false">
            Like
          </h1>
        </button>
        <h1 class="mr-2">
          Likes: {{ count }}
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
    id1: { type: Number, required: true },
    email: { type: String, required: true },
    name: { type: String, required: true },
    subject: { type: String, required: true },
    comments: { type: Array, required: true },
    likes: { type: Array, required: true }
  },
  data () {
    return {
      title: '',
      liked: false,
      count: 0,
      author: ''
    }
  },
  async mounted () {
    const response = await this.$axios.get('/api/author')
    this.author = response.data
    for (let i = 0; i < this.likes.length; i++) {
      if (this.author === this.likes[i].user_id && this.id1 === this.likes[i].contact_id) {
        this.liked = true
      } if (this.author !== this.likes.user_id && this.id1 !== this.likes.contact_id) {
        continue
      } else {
        // alert(this.likes[i].contact_id)
        this.liked = false
      }
    }
    this.count = this.likes.length
  },
  methods: {
    async addComment (id, title) {
      // await this.$axios.$get('/api/postman/csrf')
      return await this.$axios.post('/api/contacts/comments', { title, contact_id: id })
    },
    async likeContact (author, id1) {
      await this.$axios.post(`/api/likes/${id1}`, { user_id: author, contact_id: id1 })
      if (this.liked === true) {
        this.liked = false
        this.count -= 1
      } else {
        this.liked = true
        this.count += 1
      }
    }
    // async getLikes (userId) {
    //   await this.$axios.$get(`/api/likes/${userId}`, { contact_id: userId })
    // }
  }
}
</script>
