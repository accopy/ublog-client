<template>
    <div>
        <Navbar />
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
    </div>
</template>

<script setup>
import { reactive, toRefs, onBeforeMount, onMounted } from 'vue'
import Navbar from '@/views/home/components/navbar.vue'
const data = reactive({
    name: '',
})



</script>
<style scoped lang='scss'></style>