<template>
  <div class="app">
    <router-view />
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  // components: {
  //   HelloWorld
  // }
}
</script>

<style lang="scss">
.app {
  font-family: LXGWWenKaiMonoScreen;
}

.pl-15 {
  padding-left: 15px;
}

.rb {
  border: 1px solid red;
}

.gb {
  border: 1px solid green;
}
</style>
