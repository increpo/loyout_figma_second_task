<template>
  <h2>Привет это vue! {{message}}</h2>
</template>

<script>
  export default {
    data () {
      return {
        message: ' hello from vue.js script!'
      }
    },
    created () {
      this.message = this.$store.getters.getMyFirstMessage
    }
  }
</script>

<style lang="scss">
  h2 {
    color: pink;
  }
</style>
