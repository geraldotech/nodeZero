<template>
  <div>
    <h1>Render Single Post Template | Back-end Handler</h1>
    <p>Title: {{ posts.title }}</p>
    <p>Description: {{ posts.description }}</p>
    <p>Duration: {{ posts.duration }}</p>
  </div>
</template>

<script>
export default {
  name: 'SingleTemplate',
  mounted() {
    this.GetSingle()
  },
  created() {},
  data() {
    return {
      posts: [],
      single: {},
    }
  },
  methods: {
    async GetSingle() {
      await fetch(
        `https://node-do-zerp.onrender.com/videos/${this.$route.params.id}`
      )
        .then((req) => req.json())
        .then((data) => {
          this.posts = data
          console.log(data)
        })
    },
  },
}
</script>

<style></style>
