<template>
  <div>
    <NavBars />
    <div class="mt-7 w-full sm:grid-cols-1 md:grid-cols-3 lg:grid grid-cols-3">
      <SeePost
        v-for="user in users"
        :id="user.id"
        :key="user.id"
        :id1="user.id"
        :email="user.email"
        :author="user.author"
        :name="user.name"
        :subject="user.subject"
        :comments="user.comments"
        :likes="user.likes"
      />
    </div>
  </div>
</template>

<script>
import NavBars from '@/components/NavBars'
import SeePost from '@/components/SeePost'

export default {
  components: { NavBars, SeePost },
  data () {
    return {
      users: [],
      content: '',
      liked: false
    }
  },
  async mounted () {
    await this.getContacts()
  },
  methods: {
    async openUserProfile (user) {
      await this.$router.push('/api/contacts' + '/' + `${user}`)
      if (user) {
        user = !user
      }
    },
    async addComment (id, title) {
      return await this.$axios.post('/api/contacts/comments', { contact_id: id, title })
    },
    async getContacts () {
      const response = await this.$axios.get('/api/contacts')
      this.users = response.data.data
    }
  }
}
</script>
