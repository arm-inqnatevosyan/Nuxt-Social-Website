export default function ({ app, store, redirect }) {
  const cookieValue = app.$cookiz.get('token')
  console.log(cookieValue)
  if (cookieValue !== undefined) {
    return true
  } else {
    redirect('/')
  }
}
