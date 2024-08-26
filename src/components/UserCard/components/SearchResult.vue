<template>
  <div class="searchresultbox">
    <div
      class="searchresultli"
      v-for="item in data.list"
      :key="item._id"
      @click="toDetailPage(item._id)"
    >
      <div class="biaoti">
        <span v-html="eachColor(item.title, props.searchKey)"></span>
      </div>
      <div class="neirong">
        <span v-html="eachColor(item.content, props.searchKey)"></span>
      </div>
    </div>
    <div class="searchresultnone" v-if="!data.isNone">没有找到内容</div>
  </div>
</template>

<script setup>
import { reactive, toRefs, onBeforeMount, onMounted, defineProps, watch, defineEmits } from 'vue';
import { useRouter } from 'vue-router';
import { searchArticle } from '@/api/api-public';
import { useDebounceFn } from '@vueuse/core';
const router = useRouter();
const emit = defineEmits(['Refresh']);
const data = reactive({
  list: [],
  isNone: true,
});
const props = defineProps({
  //子组件接收父组件传递过来的值
  searchKey: String,
});

//监听prop
watch(
  () => props.searchKey,
  (newVal, oldVal) => {
    // console.log('newVal', newVal.substring(0, 5))
    //跳转后台
    if (newVal.substring(0, 5) == '#9527') {
      router.push('/background');
    } else {
      search();
    }
  },
);

//搜索文章

const search = useDebounceFn(
  () => {
    if (props.searchKey) {
      searchArticle({ key: props.searchKey }).then((res) => {
        if (res.code == 200) {
          data.list = res.data;
          emit('searchDown');
          if (data.list.length == 0) {
            data.isNone = false;
          } else {
            data.isNone = true;
          }
        }
      });
    } else {
      data.list = [];
      data.isNone = true;
    }
    // do something
  },
  1500,
  { maxWait: 5000 },
);

const toDetailPage = (val) => {
  //跳转详情页
  router.push({
    path: '/detail',
    query: { articleId: val },
  });
  emit('Refresh');
};

//搜索结果关键字改变颜色
function eachColor(content, searchVal) {
  // 原始文本
  let originalText = content;

  // 要查找的关键字
  let keyword = searchVal;

  // 找到关键字在文本中的位置
  let keywordIndex = originalText.indexOf(keyword);

  // 如果关键字存在
  if (keywordIndex !== -1) {
    // 截取包含关键字的部分文本
    let startIndex = Math.max(0, keywordIndex - 20); // 开始截取的位置，向前20个字符
    let endIndex = Math.min(originalText.length, keywordIndex + keyword.length + 20); // 结束截取的位置，向后20个字符
    let extractedText = originalText.substring(startIndex, endIndex);
    console.log(extractedText);
    let nt = '<span style="color:red">' + searchVal + '</span>';
    return extractedText.replace(searchVal, nt) + '&nbsp;';
  } else {
    return originalText.substr(0, 40);
  }
}
</script>
<style scoped lang="scss">
.searchresultbox {
  max-height: 60vh;
  overflow: auto;
  scrollbar-width: none;
  /* firefox */
  -ms-overflow-style: none;
  /* IE 10+ */
}

.searchresultnone {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 8px;
  padding: 30px 0;
  background-color: $alpha50;
  color: #333;
  line-height: 1.5;
  border-radius: 10px;
  font-size: 0.875rem;
}

.searchresultli:hover {
  cursor: pointer;
  background-color: #fff;
  transition: 0.3s;
}

.searchresultli {
  margin-top: 8px;
  padding: 10px;
  background-color: $alpha50;
  color: #333;
  line-height: 1.5;
  border-radius: 10px;
  font-size: 0.875rem;

  .biaoti {
    color: $text-p1;
    font-weight: 700;
    font-size: 0.9375rem;
    margin-bottom: 2px;
  }

  .neirong {
    font-size: 0.8125rem;
    word-break: break-all;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
}
</style>
