export default function ({ app, store, redirect }) {
  const cookieValue = app.$cookiz.get('token')
  if (cookieValue !== undefined) {
    store.dispatch('login', cookieValue)
    redirect('/home')
  }
}
