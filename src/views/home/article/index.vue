<template>
  <div class="articleaboutpage"><Navbar /> <router-view></router-view></div>
</template>

<script setup>
import { reactive, toRefs, onBeforeMount, onMounted } from 'vue';
import Navbar from '@/views/home/components/Navbar.vue';
const data = reactive({
  name: '',
});
</script>
<style scoped lang="scss">
.articleaboutpage {
  width: 100%;
  height: 100%;
}
</style>
