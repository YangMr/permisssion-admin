<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <p>name jack 123</p>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  },
  data() {
    return {
      name: 'jack',
      age: '123',
      test: 'ceshi',
      love: 'music',
      a: 'hello',
      b: 'word'
    }
  },
  created() {}
}
</script>
