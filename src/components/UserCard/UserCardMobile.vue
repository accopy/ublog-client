<template>
  <div class="header">
    <div class="logo_wrap">
      <div class="avatar" @click="router.push('/')">
        <img :src="userStore.avatar" alt="" v-if="userStore.avatar" />
      </div>
      <div>
        <div class="username">{{ userStore.name }}</div>
        <div class="ind">{{ userStore.saying[0] }}</div>
      </div>
      <div class="menuIcon">
        <MenuFoldOutlined @click="showDrawer" />
      </div>
    </div>

    <a-drawer
      v-model:open="open"
      class="custom-class ct"
      root-class-name="root-class-name"
      :root-style="{ color: 'blue' }"
      :closable="false"
      placement="right"
      :getContainer="false"
    >
      <div class="menuIcon">
        <MenuUnfoldOutlined @click="open = false" />
      </div>
      <div style="margin-top: 20px">
        <a-input-search v-model:value="data.searchValue" placeholder="站内搜索" enter-button />
        <SearchResult :searchKey="data.searchValue" @Refresh="open = false" />
      </div>
    </a-drawer>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import SearchResult from './components/SearchResult.vue';
import { MenuUnfoldOutlined } from '@ant-design/icons-vue';
import { MenuFoldOutlined } from '@ant-design/icons-vue';
import { userInfo } from '@/stores/user';
const userStore = userInfo();

//引入路由
import { useRouter } from 'vue-router';
const router = useRouter();

const data = reactive({
  searchTempValue: '',
  searchValue: '',
  searchList: [],
  recentlist: [],
});

const open = ref(false); //手机模式抽屉状态
const showDrawer = () => {
  open.value = true;
};

const Refresh = () => {
  emit('Refresh');
};

const toDetailPage = (val) => {
  //跳转详情页
  router.push({
    path: '/detail',
    query: { articleId: val },
  });
};
</script>
<style scoped lang="scss">
.header {
  :deep(.ant-drawer .ant-drawer-body) {
    background-color: aquamarine !important;
  }

  .logo_wrap {
    display: flex;
    padding: 20px 5px;
    align-items: center;

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
      font-size: 0.8125rem;
      cursor: pointer;
      color: $text-p1;
    }
  }
}

.menuIcon {
  font-size: 160%;
  margin-left: auto;
  color: black;
}
</style>
