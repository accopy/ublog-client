<template>
  <div class="articleaboutpage">
    <a-row>
      <a-col :xs="24" :sm="24" :md="24" :lg="18" :xl="18">
        <Navbar /> <router-view></router-view
      ></a-col>
      <a-col :xs="0" :sm="0" :md="0" :lg="6" :xl="6"></a-col>
    </a-row>
  </div>
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
