<template>
    <div class="tags">
        <div class="contentbox">

            <div v-for="item in data.tagsList" :key="item._id" class="tag"
                :class="[item.name == data.queryinfo.key ? 'active' : '']" @click="handClickTag(item)">
                <a style="opacity: .4;">#</a>
                <div class="name">{{ item.name }}</div>
            </div>

        </div>
        <div class="listbox" v-if="data.queryinfo.key">
            <ArticleList :queryObj="data.queryinfo" @Refresh="gettaglist" />
        </div>
    </div>
</template>

<script setup>
import { reactive, onBeforeMount } from 'vue'
import { getTagsList } from '@/api/api-public'
import ArticleList from '../components/ArticleList.vue';
import { useRouter } from 'vue-router'


const router = useRouter();
const data = reactive({

    queryinfo: {
        querytype: "",
        key: '',
    },
    tagsList: [],
});


const gettaglist = () => {
    getTagsList().then(res => {
        console.log(' data.categoryList', res);

        data.tagsList = res.data

    })
}

onBeforeMount(() => {

    //页面状态设置

    gettaglist()
    //获取全部分类




})

const handClickTag = (val) => {
    data.queryinfo.querytype = 'tags'
    data.queryinfo.key = val.name
    console.log('   data.queryinfo', data.queryinfo);

}

const backtohome = (val) => {
    data.pageState.current = 0
}




</script>
<style scoped lang='scss'>
.tags {
    width: 100%;
    height: calc(100vh - 350px);
}

.contentbox {
    display: flex;
    flex-wrap: wrap;
}

.tag {
    background-color: $block;
    display: flex;
    padding: 5px;
    margin: 10px;
    border-radius: 4px;

    .name {
        color: $text-p2;
        margin-left: 2px;
    }

}

.tag:hover {
    cursor: pointer;
    color: $text;
    background: $block-hover;

    a {
        color: $de-c2 !important;
    }


}

.active {
    color: $de-c2;
    background: $block-hover;
}
</style>