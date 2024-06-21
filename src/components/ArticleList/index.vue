<template>
    <div class="articlelistbox">
        <div class="contentbox">
            <div class="card" v-for="item in data.list" :key="item.id" @click="toDetailPage(item._id)">
                <div class="titel"> {{ item.title }}</div>
                <div class="ind"> {{ item.content }}</div>
                <div class="foot">
                    <div class="createdate">
                        <img src="@/assets/img/icon/日历.svg" alt="" width="15">
                        <div style="margin-left: 8px;">{{ item.create_time.substring(0, 10) }}</div>
                    </div>
                    <div class="category">
                        <div v-for="(i, index) in item.categoryName" :key="index" class="categorybox">
                            <i class="iconfont icon-wendang"></i>
                            {{ i }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="pagination">
            <a-pagination v-model:current="data.pageData.pageNum" :total="data.total"
                :defaultPageSize="data.pageData.pageSize" @change="changePageNum" />
        </div>

    </div>
</template>

<script setup>
import { reactive, onBeforeMount, defineProps, toRefs, watch } from 'vue'
import { getArticleList } from '@/api/api'
import { useRouter } from 'vue-router'
const router = useRouter();
const props = defineProps({
    //子组件接收父组件传递过来的值
    queryObj: Object,
})

const data = reactive({
    list: [
    ],
    pageData: {
        pageSize: 5,
        pageNum: 1,
        queryinfo: {
            querytype: 'recent'
        }
    },
    total: 0,
});

//监听prop
watch(
    () => props.queryObj,
    (newVal, oldVal) => {

        data.pageData.queryinfo = newVal
        console.log('请求体', data.pageData)
        getList(data.pageData)
    },
    { deep: true }
)

//定义获取个人文章
const getList = (val) => {

    // const { query } = toRefs(props)
    // console.log('query', query);

    getArticleList(val).then(res => {
        data.list = res.data.list
        data.total = res.data.count

    })
};

onBeforeMount(() => {
    getList(data.pageData)
})


const toDetailPage = (val) => {
    //跳转详情页
    router.push({
        path: '/detail',
        query: { articleId: val }

    })
}

//分页变化
const changePageNum = (val) => {
    data.pageData.pageNum = val
    sessionStorage.setItem('pageNum', val)
    console.log('val', val);
    getList(data.pageData)

}

</script>
<style scoped lang='scss'>
.articlelistbox {}

.card:hover {
    //hover样式
    cursor: pointer;
    box-shadow: 0 12px 20px -4px rgba(0, 0, 0, .15);
    transform: translate3d(0, -2px, 0);
    transition: 0.3s;

}

.card {
    display: flex;
    flex-direction: column;
    border-radius: 12px;
    padding: 20px;
    margin-top: 20px;
    background-color: white;


    .titel {
        font-size: 22px;
        font-weight: 500;
        color: #333;

    }

    .ind {
        font-size: .875rem;
        margin: 20px 0;
        line-height: 1.5;

        overflow: hidden;
        word-break: break-all;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 5;
        -webkit-box-orient: vertical;

    }

    .foot {
        font-size: .8125rem;
        display: flex;
        align-items: center;

        .createdate {
            color: $text-p2;
            display: flex;
        }

        .category {
            margin-left: 20px;
            display: flex;
            align-items: center;

            .categorybox {
                display: flex;
                align-items: center;
                margin: 0 5px;
                color: $de-c1 ;
            }
        }


    }
}


.pagination {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    // pointer-events: none !important;
}
</style>