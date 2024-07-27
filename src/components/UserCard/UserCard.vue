<template>
    <div class="container">

        <div class="header">
            <div class="logo_wrap">
                <div class="avatar" @click="router.push('/')">
                    <img :src="userStore.avatar" alt="">
                </div>
                <div>
                    <div class="username">{{ userStore.name }}</div>
                    <div class="ind">{{ userStore.saying[0] }}</div>
                </div>
            </div>
        </div>

        <div class="nav-area">
            <div class="top">
                <div style="margin: 0 10px 0 15px;">
                    <img src="./icon/搜索.svg" alt="" width="20px">
                </div>
                <div style="flex: 1;">
                    <a-input v-model:value="data.searchValue" placeholder="站内搜索" />
                </div>
            </div>
            <div>
                <SearchResult :searchKey="data.searchValue" />
            </div>
            <div class="bottom">
                <div v-for="item in data.navlist" :key="item.id" @click="JumpOtherPage(item)"
                    :class="[data.activeId == item.id ? 'navActive' : '']">
                    <img :src="item.img" alt="" width="30">
                </div>

            </div>
        </div>

        <div class="welcome">
            <div class="title">欢迎，旅行者:</div>
            <div class="textbox">吴蜀风流自古同，归去应须早。您已来到世界边缘～</div>
        </div>

        <div class="widget-wrapper ">
            <div class="title">
                <div>最近更新</div>
                <div></div>
            </div>
            <div class="post-list">
                <div v-for="item in data.recentlist" @click="toDetailPage(item._id)">{{ item.title }}</div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref, onBeforeMount, onMounted, nextTick } from 'vue'
import { getArticleListSe } from '@/api/api-public'
import SearchResult from './components/SearchResult.vue'

import { userInfo } from '@/stores/user'

const userStore = userInfo()
//引入路由
import { useRouter } from 'vue-router'
const router = useRouter();
const data = reactive({
    searchTempValue: '',
    searchValue: '',
    searchList: [],
    activeId: 1,
    navlist: [
        //静态加载加require
        { id: 1, img: require('./icon/文档.svg'), url: '/' },
        { id: 2, img: '', url: '' },
        { id: 3, img: '', url: '' },
        { id: 4, img: '', url: '' }
    ],
    recentlist: [],
})

const JumpOtherPage = (val) => {
    if (val.url) {
        data.activeId = val.id

        router.push({
            path: val.url,

        })
    }
}


const toDetailPage = (val) => {
    //跳转详情页
    router.push({
        path: '/detail',
        query: { articleId: val }

    })
}

const getarticleListse = () => {
    getArticleListSe().then(res => [
        data.recentlist = res.data
    ])
}
onBeforeMount(() => {
    getarticleListse()

})
onMounted(() => {
    console.log('挂载完成');
    console.log('userStore', userStore);



})







</script>
<style scoped lang='scss'>
.container {
    width: 100%;
    height: 100%;
    font-family: LXGWWenKaiMonoScreen;
    background: linear-gradient(to bottom, #92FE9D, #00C9FF);
    user-select: none;


    border-radius: 15px;
}

.header {
    .logo_wrap {
        display: flex;
        padding: 40px 10px 0 10px
    }

    .avatar {
        margin-right: 15px;
        border: 3px solid red;
        border-radius: 50%;

        img {
            width: 44px;
            height: 44px;
            border-radius: 50%;
            cursor: pointer;

        }
    }

    .username {
        font-family: klxq;
        font-size: 1.5rem;
        font-weight: 900;
        cursor: pointer;

    }

    .ind {
        font-size: .8125rem;
        cursor: pointer;
        color: $text-p1;
    }
}

.nav-area {
    padding: 30px 10px 0 10px;

    .top {
        padding: 3px 0;
        display: flex;
        background-color: white;
        align-items: center;
        border-radius: 8px;


        .ant-input {
            width: 100%;
            border: none;


            font-family: LXGWWenKaiMonoScreen;
        }

        .ant-input:focus {
            border: none;
            box-shadow: none;
        }

    }

    .bottom {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-top: 10px;
    }

    .bottom>div {
        width: 58px;
        height: 40px;
        background-color: $alpha50;
        border-radius: 8px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;

    }

}

.navActive {
    background-color: white !important;
    transition: 0.5s;
}

.welcome {
    padding: 40px 10px 0 10px;


    .title {
        padding-left: 10px;
        color: $text-p1;
        font-size: .8125rem;
        opacity: 0.6
    }

    .textbox {
        margin-top: 8px;
        padding: 10px;
        background-color: $alpha50;
        color: #333;
        line-height: 1.5;
        border-radius: 10px;
        font-size: 0.875rem;
    }
}

.widget-wrapper {
    padding: 40px 10px 0 10px;

    .title {
        padding-left: 10px;
        color: $text-p1;
        font-size: .8125rem;
        opacity: 0.6
    }

    .post-list {
        overflow: hidden;
        margin-top: 8px;
        font-size: .875rem;
        border-radius: 8px;
        color: $text-p1;


        :hover {
            background-color: white;
            cursor: pointer;
            border-radius: 10px;
            transition: 0.5s;

        }
    }

    .post-list>div {
        height: 30px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        line-height: 30px;
        padding: 0 10px;



    }


}
</style>