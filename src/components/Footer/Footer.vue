<template>
    <div class="footer">
        <a-divider />
        <div class="copyright">
            蜀江水碧蜀山青，圣主朝朝暮暮情。
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
    height: 300px;

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