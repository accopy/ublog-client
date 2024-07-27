<template>
  <div class="detailOuter">
    <div class="detailbox" ref="el">
      <div class="banner">
        <div class="bannerbg">
          <img src="@/assets/img/banner.jpg" alt="" width="100%" height="100%" />
        </div>

        <div class="content">
          <div class="bannertop">
            <div class="breadcrumbbox">
              <a-breadcrumb>
                <a-breadcrumb-item><a href="/">主页</a></a-breadcrumb-item>
                <a-breadcrumb-item>{{
                  dictLabel(data.categoryList, data.article.category)
                }}</a-breadcrumb-item>
              </a-breadcrumb>
            </div>
            <div style="display: flex">
              <div>{{ data.authorName }}</div>
              <div class="time1">
                <span style="margin: 0 10px">|</span>
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
        <div id="preview" class="vd"></div>
      </div>
    </div>
    <div class="toolbar">
      <Toc :tocData="tocData" :isactive="isactive" />
    </div>
  </div>
</template>

<script setup>
import { reactive, toRefs, onBeforeMount, onMounted, ref, watch, nextTick, onUnmounted } from 'vue';
import { getArticleDetail, getCategoryList } from '@/api/api-public';

//引入路由
import { useRouter } from 'vue-router';
const router = useRouter();
import { dictLabel } from '@/api/utils';

// 1.1 引入Vditor 构造函数
import Vditor from 'vditor';
// 1.2 引入样式
import 'vditor/dist/index.css';

import { useRoute } from 'vue-router';
import { message } from 'ant-design-vue';
import { userInfo } from '@/stores/user';
import { useDebounceFn, useThrottleFn } from '@vueuse/core';
import Toc from '../components/Toc.vue';

const userStore = userInfo();
//首先在setup中定义
const route = useRoute();
const data = reactive({
  id: '',
  article: {},
  categoryList: [],
  authorName: '',
});

const isactive = ref(0); //目录高亮索引

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

onMounted(() => {
  getTagsList();
  getCategory();
});

onUnmounted(() => {
  //销毁时移除监听
  window.removeEventListener('scroll', onScrollFunc, true);
});

// 3. 在组件初始化时，就创建Vditor对象，并引用

//获取详情数据
const getTagsList = () => {
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
    hljs: { style: 'github' },
    outline: {
      enable: true,
      position: 'right',
    },
    after: () => {
      nextTick(() => {
        tocData.value = initToc();
      });
    },
  });
};
</script>
<style scoped lang="scss">
.detailOuter {
  display: flex;
  width: 100%;
}
.detailbox {
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
    height: 200px;
    border-radius: 16px;
    overflow: hidden;
    font-family: LXGWWenKaiMonoScreen;
    overflow: hidden;
    position: relative;

    .bannerbg {
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
      color: white;

      .bannertop {
        padding: 15px;

        line-height: 1.6;
        user-select: none;
        color: white;
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
        background-image: linear-gradient(#ffffff, #92fe9d);
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
    }
  }

  .breadcrumbbox {
    color: white !important;
    z-index: 2;

    .ant-breadcrumb a {
      color: white !important;
      font-family: LXGWWenKaiMonoScreen;
      z-index: 2;
    }

    .ant-breadcrumb li:last-child {
      color: white !important;
      font-family: LXGWWenKaiMonoScreen;
      z-index: 2;
    }

    :deep(.ant-breadcrumb-separator) {
      //括号中为需要修改的类名
      color: white !important;
    }
  }
}

@media screen and (max-width: 980px) {
  /*当屏幕尺寸小于600px时，应用下面的CSS样式*/
  .toolbar {
    width: 0px !important;
    margin: 0px !important;
    overflow: hidden;
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
