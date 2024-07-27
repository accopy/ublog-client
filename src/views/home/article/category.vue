<template>
  <div class="category">
    <div class="contentbox" v-if="data.pageState.current == 0">
      <div
        class="categoryli"
        v-for="item in data.categoryList"
        :key="item._id"
        @click="handClickLi(item)"
      >
        <div class="left">
          <div style="margin-right: 8px"><i class="iconfont icon-wendang"></i></div>
          <div>{{ item.name }}</div>
        </div>
        <div class="right">({{ item.count }})</div>
      </div>
    </div>
    <div class="listbox" v-if="!data.pageState.current == 0">
      <div class="breadcrumbbox">
        <a-breadcrumb separator=">">
          <a-breadcrumb-item href="" @click="backtohome">返回</a-breadcrumb-item>
          <a-breadcrumb-item>{{ data.pageState.breadcrumb }}</a-breadcrumb-item>
        </a-breadcrumb>
      </div>
      <ArticleList :queryObj="data.queryinfo" />
    </div>
  </div>
</template>

<script setup>
import { reactive, onBeforeMount } from 'vue';
import { getCategoryNum } from '@/api/api-public';
import ArticleList from '../components/ArticleList.vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const data = reactive({
  pageState: {
    //0分类1详情
    current: 0,
    breadcrumb: '',
  },
  queryinfo: {
    querytype: 'category',
    categoryid: '',
  },
  queryinfo1: '',
  categoryList: [],
});

onBeforeMount(() => {
  //页面状态设置

  //获取全部分类

  getCategoryNum().then((res) => {
    console.log(' data.categoryList', res);

    data.categoryList = res.data;
  });
});

const handClickLi = (val) => {
  //隐藏分类
  data.pageState.current = 1;
  data.pageState.breadcrumb = val.name;
  //请求体赋值
  data.queryinfo.categoryid = val.id;
};

const backtohome = (val) => {
  data.pageState.current = 0;
};
</script>
<style scoped lang="scss">
.category {
  width: 100%;
  min-height: calc(100vh - 350px);

  .contentbox {
  }
}

.categoryli:hover {
  background: $block-border;
  color: $text;
  cursor: pointer;
}

.categoryli {
  color: $text-p2;
  font-weight: 500;
  font-size: 15px;
  display: flex;
  justify-content: space-between;
  border-radius: 8px;
  height: 30px;
  margin: 10px 0;
  align-items: center;
  padding: 0 10px;

  .left {
    display: flex;
  }
}

.listbox {
  .breadcrumbbox {
    padding: 10px 10px 0px 10px;

    .ant-breadcrumb {
      font-size: 12px;
      font-family: LXGWWenKaiMonoScreen;
    }
  }
}
</style>
