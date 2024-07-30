<template>
  <div class="achives">
    <div v-for="item in data.list" :key="item.year" style="margin-top: 15px">
      <div class="head">
        <span class=""> {{ item.year }}</span>
      </div>
      <div class="achivesli" v-for="e in item.list" :key="e._id" @click="toDetailPage(e._id)">
        <div class="left">{{ e.create_time.substr(5, 5) }}</div>
        <div class="right">
          {{ e.title }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, toRefs, onBeforeMount, onMounted } from 'vue';
import { getArticleTimeLine } from '@/api/api-public';
import { useRouter } from 'vue-router';
const router = useRouter();

const data = reactive({
  list: [],
});

onBeforeMount(() => {
  getArticleTimeLine().then((res) => {
    data.list = res.data;
  });
});

const toDetailPage = (val) => {
  //跳转详情页

  router.push({
    path: '/detail',
    query: { articleId: val },
  });
};
</script>
<style scoped lang="scss">
.achives {
  width: 100%;
  height: calc(100vh - 350px);
  padding: 0 10px;
}

.head {
  color: $text-p1;
  font-weight: 700;
  line-height: 1.2;
  font-size: 21px;
  margin-bottom: 10px;
  position: relative;

  span {
    border-bottom: 3px solid #1cd0fd;
  }
}

.head:after {
  content: '666';
  position: absolute;
  height: 4px;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: -1;
  border-radius: 4px;
  background: #1cd0fd;
}

.achivesli {
  display: flex;
  border-bottom: 1px dashed $text-meta;
  padding: 5px 0;
  align-items: center;

  .left {
    margin-right: 14px;
    color: $text-p4;
    font-weight: 500;
    text-wrap: nowrap;
  }

  .right {
    color: $text-p1;

    word-break: break-all;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
}

.achivesli:hover {
  cursor: pointer;
  border-bottom: 1px solid #1cd0fd;

  .left {
    color: #1cd0fd;
  }

  .right {
    color: $text;
  }
}
</style>
