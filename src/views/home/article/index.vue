<template>
    <div>
        <Navbar />

        <router-view></router-view>

    </div>
</template>

<script setup>
import { reactive, toRefs, onBeforeMount, onMounted } from 'vue'
import Navbar from '@/views/home/components/navbar.vue'
const data = reactive({
    name: '',
})



</script>
<style scoped lang='scss'>
.pl15 {
    padding: 0 15px;

}
</style>