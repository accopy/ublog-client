<template>
  <div class="app">
    <router-view />
  </div>
</template>

<script setup>
console.log('process.env.VITE_BASE_URL', process.env.VITE_BASE_URL);
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
