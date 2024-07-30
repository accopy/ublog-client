<template>
  <div class="recent">
    <ArticleList :queryObj="data.queryinfo"></ArticleList>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import ArticleList from '../components/ArticleList.vue';
import { useRouter } from 'vue-router';
const router = useRouter();

const data = reactive({
  queryinfo: {
    querytype: 'recent',
  },
});
</script>
<style scoped lang="scss">
.recent {
  width: 100%;
  height: 100%;
  min-height: calc(100vh - 250px);
}

.card:hover {
  //hover样式
  cursor: pointer;
  box-shadow: 0 12px 20px -4px rgba(0, 0, 0, 0.15);
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
    font-size: 0.875rem;
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
    font-size: 0.8125rem;
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
        color: $de-c1;
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
