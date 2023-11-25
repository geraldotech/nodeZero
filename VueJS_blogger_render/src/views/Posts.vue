<template>
  <div>
    <h1>{{ frontend }}</h1>
    <h2>Front will fetch all posts again and filter the posts by params</h2>
    <ul>
      <li v-for="p in post" :key="p.id">
        <router-link :to="{ name: 'templatefront', params: { id: p.id } }">{{
          p.title
        }}</router-link>
      </li>
    </ul>
    <h1>{{ backend }}</h1>
    <h2>Back has a router to get posts by params</h2>
    <code>https://node-do-zerp.onrender.com/videos/{myidid}</code>
    <ul>
      <li v-for="p in post" :key="p.id">
        <router-link :to="{ name: 'templatebackend', params: { id: p.id } }">{{
          p.title
        }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'BlogPosts',
  data() {
    return {
      frontend: `Find posts | Front-end handler `,
      backend: 'Find posts | Back-end handler',
      post: [],
    }
  },
  methods: {
    GetPostsVideos() {
      fetch('https://node-do-zerp.onrender.com/videos')
        .then((req) => req.json())
        .then((data) => {
          console.log(data)
          this.post = data
        })
    },
  },
  mounted() {
    this.GetPostsVideos()
  },
}
</script>

<style>
ul li {
  padding: 1.2em;
}
code {
  color: seagreen;
  font-size: 1.5rem;
}
</style>
