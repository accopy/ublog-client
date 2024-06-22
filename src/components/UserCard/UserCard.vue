<template>
    <div class="container">

        <div class="header">
            <div class="logo_wrap">
                <div class="avatar">
                    <img src="@/assets/img/logo.png" alt="">
                </div>
                <div>
                    <div class="username">ACCOPY</div>
                    <div class="ind">风暴前夕</div>
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
import { reactive, toRefs, onBeforeMount, onMounted } from 'vue'
import { getArticleListSe } from '@/api/api'
import SearchResult from './components/SearchResult.vue'
import { useDebounceFn } from '@vueuse/core'

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
        { id: 2, img: require('./icon/社交.svg'), url: '' },
        { id: 3, img: require('./icon/爱心.svg'), url: '' },
        { id: 4, img: require('./icon/写作.svg'), url: '/add' }
    ],
    recentlist: []
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

onBeforeMount(() => {
    getArticleListSe().then(res => {
        data.recentlist = res.data
    })
})







</script>
<style scoped lang='scss'>
.container {
    width: 100%;
    height: 100vh;
    font-family: LXGWWenKaiMonoScreen;
    background: linear-gradient(to bottom, #92FE9D, #00C9FF);
    user-select: none;
    overflow: hidden;
}

.header {
    .logo_wrap {
        display: flex;
        padding: 40px 20px 0 20px
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
    padding: 30px 20px 0 20px;

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
    padding: 40px 20px 0 20px;


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
    padding: 40px 20px 0 20px;

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