<template>
  <div style="width: 100%">
    <div class="title">
      <div class="top">
        <div class="desc">本文目录</div>
        <div class="handleicon" @click="showDetailHandle">
          <OrderedListOutlined />
        </div>
      </div>
      <div class="toccontent">
        <transition name="fade">
          <ul id="menu" v-if="showDetail">
            <!-- 这里为了设置各级标题的不同样式，添加了类，h1标签类为item-1，h2标签类为item-2 -->
            <li
              v-for="(item, index) in tocData"
              :key="index"
              :class="[`item-${item.tagName.charAt(1)}`, isactive == index ? 'topcactive' : '']"
              @click="anchor(item.id, index)"
            >
              {{ item.id }}
            </li>
          </ul>
        </transition>
      </div>
    </div>
    <div class="toTop" @click="toTop">
      <ToTopOutlined />
      <div style="margin-left: 15px">回到顶部</div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, defineProps, defineEmits, watch, nextTick } from 'vue';
import { OrderedListOutlined, ToTopOutlined } from '@ant-design/icons-vue';
const emit = defineEmits(['RefreshIndex']);
const data = reactive({
  name: '',
});
const props = defineProps({
  //子组件接收父组件传递过来的值
  tocData: Array,
  isactive: Number,
});

const showDetail = ref(true); //默认第一项展开
const showDetailHandle = (e) => {
  showDetail.value = !showDetail.value;
};

const anchor = (id, index) => {
  console.log('index', index);
  emit('RefreshIndex', index);
  let anchorElement = document.getElementById(id);
  if (anchorElement) {
    anchorElement.scrollIntoView({
      behavior: 'auto', // smooth 平滑；auto:瞬间
    });
  }
};

const toTop = () => {
  window.scrollTo({
    // top: document.documentElement.offsetHeight, //回到底部
    top: 0, //回到顶部
    left: 0,
    behavior: 'smooth', //smooth 平滑；auto:瞬间
  });
};
</script>
<style scoped lang="scss">
.title {
  width: 100%;
  color: $text-p1;
  font-size: 0.8125rem;
  border-bottom: 1px solid rgba(5, 5, 5, 0.06);
  display: flex;
  flex-direction: column;
  padding: 0 10px;

  .top {
    display: flex;
    padding-bottom: 10px;

    .desc {
      font-family: LXGWWenKaiMonoScreen !important;
      font-size: 0.825rem;
      padding-bottom: 10px;

      padding: 5px 10px;
    }
  }

  .handleicon {
    margin-left: auto;
    cursor: pointer;
  }

  .handleicon :hover {
    margin-left: auto;
    cursor: pointer;
    background-color: $block-hover;
  }
}
.toccontent {
  ul {
    height: auto;
    padding: 0;

    -webkit-transition: transform 0.3s;

    li {
      font-family: LXGWWenKaiMonoScreen !important;
      color: $text-p3;
      list-style: none;
      cursor: pointer;
      font-size: 13px;
      padding: 5px 10px;
      border-radius: 8px;
      margin: 2px 0;
    }

    li:hover {
      color: $text;
      background-color: $block-hover;
      transition: 0.3s;
    }
  }
}

.toTop {
  width: 92%;
  display: flex;
  margin-top: 10px;
  justify-content: flex-start;

  border-radius: 8px;
  cursor: pointer;
  margin-left: 10px;
  font-family: LXGWWenKaiMonoScreen !important;
  font-size: 0.825rem;
  color: $text-p2;
}

.toTop:hover {
  background-color: $block-hover;
  transition: 0.3s;
}

.topcactive {
  color: $text !important;
}

.item-1 {
  font-weight: 500;
}

.item-2 {
  padding-left: 20px !important;
  font-size: 0.875rem !important;
}

.item-3 {
  padding-left: 40px !important;
  font-size: 0.825rem !important;
}
</style>
