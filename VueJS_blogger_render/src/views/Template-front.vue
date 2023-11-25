<template>
  <div>
    <h1>Render Single Post Template | Front-end Handler</h1>
    <p>{{ $route.params.id }}</p>

    <p>{{ single }}</p>

    <h2>{{ single.id }} - {{ single.title }}</h2>
    <p>{{ single.description }}</p>
    <hr />
    <!--  <p>{{ comSingle }}</p> -->
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
      single2: {},
    }
  },
  methods: {
    async GetSingle() {
      await fetch(`https://node-do-zerp.onrender.com/videos`)
        .then((req) => req.json())
        .then((data) => {
          this.posts = data
          console.log(data)
        })
      this.FilterSingle()
    },
    FilterSingle() {
      this.single = this.posts.find((v) => v.id === this.$route.params.id)
    },
  },
  computed: {
    comSingle() {
      return this.posts.find((v) => v.id == this.$route.params.id)
    },
  },
}
</script>

<style></style>
