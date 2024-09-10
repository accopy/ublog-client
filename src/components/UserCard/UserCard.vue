<template>
  <div class="container">
    <div class="header">
      <div class="logo_wrap">
        <div class="avatar" @click="router.push('/')">
          <div class="color_border"></div>
          <img :src="userStore.avatar" alt="" class="imgsty" />
        </div>
        <div style="display: flex; flex-direction: column; justify-content: space-evenly">
          <div class="username">{{ userStore.name }}</div>

          <div class="par">
            <div class="show">
              {{ userStore.saying[0] }}
              <div>
                {{ userStore.saying[1] }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="nav-area">
      <div class="top">
        <div style="margin: 0 10px 0 15px">
          <img src="./icon/搜索.svg" alt="" width="20px" />
        </div>
        <div style="flex: 1">
          <a-input v-model:value="data.searchValue" placeholder="站内搜索" />
        </div>
      </div>
      <div>
        <SearchResult :searchKey="data.searchValue" />
      </div>
      <div class="bottom">
        <div
          v-for="item in data.navlist"
          :key="item.id"
          @click="JumpOtherPage(item)"
          :class="[data.activeId == item.id ? 'navActive' : '']"
        >
          <a-tooltip :title="item.name" placement="bottom">
            <img :src="item.img" alt="" width="30" />
          </a-tooltip>
        </div>
      </div>
    </div>

    <div class="welcome">
      <div class="title">欢迎，旅行者:</div>
      <div class="textbox">吴蜀风流自古同，归去应须早。您已来到世界边缘～</div>
    </div>

    <div class="widget-wrapper">
      <div class="title">
        <div>最近更新</div>
        <div></div>
      </div>
      <div class="post-list">
        <div v-for="item in data.recentlist" @click="toDetailPage(item._id)">{{ item.title }}</div>
      </div>
    </div>

    <div class="toback" @click="toBackground"></div>
  </div>
</template>

<script setup>
import { reactive, ref, onBeforeMount, onMounted, nextTick } from 'vue';
import { getArticleListSe } from '@/api/api-public';
import SearchResult from './components/SearchResult.vue';

import { userInfo } from '@/stores/user';

const userStore = userInfo();
//引入路由
import { useRouter } from 'vue-router';
const router = useRouter();
const data = reactive({
  searchTempValue: '',
  searchValue: '',
  searchList: [],
  activeId: 1,
  navlist: [
    //静态加载加require
    { id: 1, img: require('./icon/文档.svg'), url: '/', name: '文章' },
    { id: 2, img: '', url: '', name: '' },
    { id: 3, img: '', url: '', name: '' },
    { id: 4, img: '', url: '', name: '' },
    // { id: 4, img: require('./icon/爱心.svg'), url: '/about', name: '关于' },
  ],
  recentlist: [],
});

const colors = [
  'pink',
  'red',
  'yellow',
  'orange',
  'cyan',
  'green',
  'blue',
  'purple',
  'geekblue',
  'magenta',
  'volcano',
  'gold',
  'lime',
];

const JumpOtherPage = (val) => {
  if (val.url) {
    data.activeId = val.id;

    router.push({
      path: val.url,
    });
  }
};

const toDetailPage = (val) => {
  //跳转详情页
  router.push({
    path: '/detail',
    query: { articleId: val },
  });
};

const toBackground = () => {
  //跳转详情页
  router.push({
    path: '/background',
  });
};

const getarticleListse = () => {
  getArticleListSe().then((res) => [(data.recentlist = res.data)]);
};
onBeforeMount(() => {
  getarticleListse();
});
onMounted(() => {
  console.log('挂载完成');
  console.log('userStore', userStore);
});
</script>
<style scoped lang="scss">
.toback {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 30px;
  height: 30px;
  border-radius: 50%;
}
.container {
  width: 100%;
  height: 100%;
  font-family: LXGWWenKaiMonoScreen;
  user-select: none;
  border-radius: 12px;
  padding: 0 4px;
  position: relative;

  // background-image: linear-gradient(to bottom, #fad0c4 0%, #fad0c4 1%, #ffd1ff 100%);
  // background-image: linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%);
  background-image: linear-gradient(to bottom, #fbc2eb 0%, #a6c1ee 100%);
}

.header {
  .logo_wrap {
    display: flex;
    padding: 40px 10px 0 10px;
  }

  .avatar {
    width: 48px;
    height: 48px;
    margin-right: 12px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    .color_border {
      background-image: url('../../assets/img/rainbow64@3x.webp');
      background-size: 100% 100%;
      width: 49px;
      height: 49px;
      position: absolute;
      z-index: 1;
      opacity: 0;
    }
    .imgsty {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      cursor: pointer;
      z-index: 2;
    }
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .avatar:hover .color_border {
    //鼠标经过A元素时，B元素背景会变成黑色

    animation: spin 2s linear infinite;
    opacity: 1;
  }

  .username {
    font-family: klxq;
    font-size: 1.5rem;
    font-weight: 900;
    cursor: pointer;
  }

  .par {
    font-size: 0.8125rem;
    color: $text-p1;
    line-height: 15px;
    height: 16px;
    overflow: hidden;
    cursor: pointer;
  }
}

.show {
  transition: all 0.2s;
}
.par :hover {
  transform: translateY(-16px);
}
.show :hover {
  transform: translateY(0);
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

  .bottom > div {
    width: 52px;
    height: 36px;
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
    font-size: 0.8125rem;
    opacity: 0.6;
  }

  .textbox {
    margin-top: 8px;
    padding: 10px;
    background-color: $alpha50;
    color: #333;
    line-height: 1.5;
    border-radius: 10px;
    font-size: 0.815rem;
  }
}

.widget-wrapper {
  padding: 40px 10px 0 10px;

  .title {
    padding-left: 10px;
    color: $text-p1;
    font-size: 0.8125rem;
    opacity: 0.6;
  }

  .post-list {
    overflow: hidden;
    margin-top: 8px;
    font-size: 0.875rem;
    border-radius: 8px;
    color: $text-p1;

    :hover {
      background-color: white;
      cursor: pointer;
      border-radius: 10px;
      transition: 0.5s;
    }
  }

  .post-list > div {
    height: 30px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 30px;
    padding: 0 10px;
  }
}
</style>
