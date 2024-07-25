<template>
    <div class="footer">
        <a-divider />
        <div class="copyright">

            <img src="https://v1.jinrishici.com/all.svg?font-size=12" alt="">
        </div>




    </div>
</template>

<script setup>
import { reactive, toRefs, onBeforeMount, onMounted } from 'vue'
const data = reactive({
    name: '',
})



</script>
<style scoped lang='scss'>
.footer {
    padding: 15px;
    padding-bottom: 60px;

    margin-top: 65px;

    .copyright {
        display: flex;
        justify-content: center;
        line-height: 1.5;
        color: $text-p2;
        font-size: 0.8125rem;
        ;
    }
}
</style>