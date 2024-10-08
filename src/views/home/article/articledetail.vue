<template>
  <div class="detailOuter" v-if="data.article">
    <a-row style="width: 100%">
      <a-col :xs="24" :sm="24" :md="24" :lg="18" :xl="18">
        <div class="detailbox" ref="el">
          <div class="banner">
            <div class="bannerbg">
              <img src="../../../assets/img/articleBg.jpg" width="100%" height="100%" />
            </div>

            <div class="content">
              <div class="bannertop">
                <div class="breadcrumbbox">
                  <a-breadcrumb>
                    <a-breadcrumb-item><a href="/">主页</a></a-breadcrumb-item>
                    <a-breadcrumb-item
                      ><a>{{
                        dictLabel(data.categoryList, data.article.category)
                      }}</a></a-breadcrumb-item
                    >
                  </a-breadcrumb>
                </div>
                <div style="display: flex">
                  <div class="time1">
                    <span>{{ data.article.create_time }}</span>
                  </div>

                  <div class="time2">
                    <span style="margin: 0 10px">|</span>
                    <span>更新于{{ data.article.update_time }}</span>
                  </div>
                </div>
              </div>
              <div class="bannertitle">
                {{ data.article.title }}
              </div>
              <div></div>
            </div>
          </div>
          <div class="maincontent">
            <a-spin v-if="isloading" />
            <div id="preview" class="vd"></div>
          </div>
        </div>
      </a-col>
      <a-col :xs="0" :sm="0" :md="0" :lg="6" :xl="6">
        <div class="toolbar">
          <Toc
            :tocData="tocData"
            :isactive="isactive"
            @RefreshIndex="setIsactive"
            v-if="!isloading"
          />
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script setup>
import { reactive, toRefs, onBeforeMount, onMounted, ref, watch, nextTick, onUnmounted } from 'vue';
import { getArticleDetail, getCategoryList } from '@/api/api-public';
//引入路由
import { useRouter } from 'vue-router';
import { useRoute } from 'vue-router';
const router = useRouter();

import { dictLabel } from '@/api/utils';
// 1.1 引入Vditor 构造函数
import Vditor from 'vditor';
import 'vditor/dist/index.css';

import { userInfo } from '@/stores/user';
import { useThrottleFn } from '@vueuse/core';
import Toc from '../components/Toc.vue';

const userStore = userInfo();
//首先在setup中定义
const route = useRoute();
const isMobile = ref(null);
const data = reactive({
  id: '',
  article: {},
  categoryList: [],
  authorName: '',
});

const isactive = ref(0); //文章右边目录 高亮索引

const isloading = ref(true); //加载状态
const getRandom = (n, m) => {
  return Math.floor(Math.random() * (m - n + 1)) + n;
};

// TOC 目录
function initToc() {
  // 获取所有h1 h2 h3 标签
  let all_headings = document.querySelectorAll('h1, h2, h3');
  // console.log('all_headings', all_headings);

  return all_headings;
}
// 存放 toc 目录数据
const tocData = ref(null);

//滚动触发
const onScrollFunc = useThrottleFn(() => {
  // console.log('出发了');

  if (tocData == null) {
    return;
  } else {
    let sections = initToc();
    // console.log('dd', window.scrollY);
    for (var i = sections.length - 1; i >= 0; i--) {
      if (window.scrollY >= sections[i].offsetTop - 25) {
        //我在上面规定了每个el-tab-pane标签的name属性值为tab+该标签的index值
        // console.log('sections[i]', sections[i]);
        isactive.value = i;
        // console.log('isactive.value', isactive.value);

        break;
      }
    }
  }
}, 25);

window.addEventListener('scroll', onScrollFunc, true);
onUnmounted(() => {
  //销毁时移除监听
  window.removeEventListener('scroll', onScrollFunc, true);
});

onMounted(() => {
  getTagsList();
  getCategory();
});

// 3. 在组件初始化时，就创建Vditor对象，并引用

//获取详情数据
const getTagsList = () => {
  //页面滚动到top
  toTop();
  data.id = route.query.articleId;
  getArticleDetail(data.id).then((res) => {
    if (res.code == 200) {
      data.article = res.data;
      data.article.create_time = res.data.create_time.slice(0, 10);
      data.article.update_time = res.data.update_time.slice(0, 10);
      data.article.category = res.data.category[0];
      data.authorName = res.data.authorName;
      renderMarkdown(data.article.content);
    }
  });
};

//获取个人分类
const getCategory = () => {
  getCategoryList().then((res) => {
    if (res.code == 200) {
      let arr = [];
      for (let i = 0; i < res.data.length; i++) {
        let obj = {};
        obj.value = res.data[i]._id;
        obj.label = res.data[i].name;
        arr.push(obj);
      }
      data.categoryList = arr;
    }
  });
};

//监听路由
watch(
  () => route.query,
  (newVal, oldVal) => {
    getTagsList();
  },
  { deep: true },
);

const renderMarkdown = (md) => {
  Vditor.preview(document.getElementById('preview'), md, {
    width: '100%',
    hljs: { style: 'github' },
    outline: {
      enable: true,
      position: 'right',
    },
    classes: {},
    after: () => {
      nextTick(() => {
        tocData.value = initToc();
        isloading.value = false;
      });
    },
  });
};

const toTop = () => {
  window.scrollTo({
    // top: document.documentElement.offsetHeight, //回到底部
    top: 0, //回到顶部
    left: 0,
    behavior: 'auto', //smooth 平滑；auto:瞬间
  });
};

const setIsactive = (e) => {
  setTimeout(() => {
    isactive.value = e;
  }, 50);
};
</script>
<style scoped lang="scss">
.scrollmargin {
  scroll-margin: 6rem;
}
.detailOuter {
  display: flex;
  padding: 5px 0px;
  width: 100%;
}

.detailbox {
  width: 100%;
  flex: 1;
  font-family: LXGWWenKaiMonoScreen !important;
  background-color: #f9fafb !important;
  flex: 1;
  overflow: hidden;

  .banner:hover {
    img {
      filter: blur(10px);
    }
  }

  .banner {
    width: 100%;
    height: 200px;
    border-radius: 16px;
    overflow: hidden;
    font-family: LXGWWenKaiMonoScreen;
    overflow: hidden;
    position: relative;

    .bannerbg {
      width: 100%;
      border-radius: 16px;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 1;

      img {
        -moz-user-select: -moz-none;
        -khtml-user-select: none;
        -webkit-user-select: none;
        -o-user-select: none;
        user-select: none;
        object-fit: cover;
        transition: 0.3s;
      }
    }

    .time2 {
      opacity: 0;
    }

    .time2:hover {
      opacity: 0.8;
    }

    .content {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      color: white; //
      .bannertop {
        padding: 15px;

        line-height: 1.6;
        user-select: none;

        z-index: 2;
      }

      .bannertitle {
        padding: 0px 40px;
        display: flex;
        justify-content: center;
        font-size: 28px;
        padding-bottom: 40px;
        z-index: 2;
        text-align: center;
        //文字描边效果
        background-image: linear-gradient(#ffffff, #f2c2eb);
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;

        /*需要文字透明*/
      }
    }
  }

  .maincontent {
    margin-top: 20px;
    width: 100%;
    padding: 10px;

    .vd {
      overflow: hidden;
      width: 100%;
      font-family: 'LXGWWenKaiMonoScreen' !important;
      padding-bottom: 100px;
    }
    :deep(h1) {
      scroll-margin: 0.8rem;
    }
    :deep(h2) {
      scroll-margin: 0.8rem;
    }
    :deep(h3) {
      scroll-margin: 0.8rem;
    }
    :deep(h4) {
      scroll-margin: 0.8rem;
    }
    :deep(h5) {
      scroll-margin: 0.8rem;
    }
  }

  .breadcrumbbox {
    z-index: 2;
    font-size: 0.8125rem;
    .ant-breadcrumb a {
      color: white !important; //面包屑字体颜色
      font-family: LXGWWenKaiMonoScreen;
      z-index: 2;
      font-size: 0.8125rem;
    }

    // .ant-breadcrumb li:last-child {
    //   color: white !important;
    //   font-family: LXGWWenKaiMonoScreen;
    //   z-index: 2;
    //   font-size: 0.8125rem;
    // }

    :deep(.ant-breadcrumb-separator) {
      //括号中为需要修改的类名
      color: white !important;
    }
  }
}

.toolbar {
  width: 180px;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 12px;
  height: fit-content;
  padding-bottom: 10px;
  position: sticky;
  top: 0px;
  user-select: none;
}
</style>
