<template>
    <div class="searchresultbox">

        <div class="searchresultli" v-for="item in data.list" :key="item._id">
            <div class="biaoti">{{ item.title }}</div>
            <div class="neirong">
                {{ item.content }}
            </div>
        </div>
        <div class="searchresultnone">
            没有找到内容
        </div>
    </div>
</template>

<script setup>
import { reactive, toRefs, onBeforeMount, onMounted, defineProps, watch } from 'vue'
import { useRouter } from 'vue-router'
import { searchArticle } from '@/api/api'
import { useDebounceFn } from '@vueuse/core'
const router = useRouter();
const data = reactive({
    list: [],
})
const props = defineProps({
    //子组件接收父组件传递过来的值
    searchKey: String,
})

//监听prop
watch(
    () => props.searchKey,
    (newVal, oldVal) => {
        console.log('newVal', newVal)
        search()


    },

)

//搜索文章

const search = useDebounceFn(() => {
    // do something
    searchArticle({ key: props.searchKey }).then(res => {
        if (res.code == 200) {
            data.list = res.data
        }

    })

}, 1500, { maxWait: 5000 })

const toDetailPage = (val) => {
    //跳转详情页
    router.push({
        path: '/detail',
        query: { articleId: val }

    })
}
</script>
<style scoped lang='scss'>
.searchresultbox {
    max-height: 60vh;
    overflow: auto;
    scrollbar-width: none;
    /* firefox */
    -ms-overflow-style: none;
    /* IE 10+ */
}

.searchresultnone {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 8px;
    padding: 30px 0;
    background-color: $alpha50;
    color: #333;
    line-height: 1.5;
    border-radius: 10px;
    font-size: 0.875rem;
}

.searchresultli:hover {
    cursor: pointer;
    background-color: #fff;
    transition: 0.3s
}

.searchresultli {
    margin-top: 8px;
    padding: 10px;
    background-color: $alpha50;
    color: #333;
    line-height: 1.5;
    border-radius: 10px;
    font-size: 0.875rem;

    .biaoti {
        color: $text-p1;
        font-weight: 700;
        font-size: .9375rem;
        margin-bottom: 2px;
    }

    .neirong {

        font-size: .8125rem;
        word-break: break-all;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }
}
</style>