<template>
  <div style="background-color: #f9fafb">
    <div class="homecontainer">
      <div class="userCard" ref="divDom">
        <UserCard></UserCard>
      </div>
      <div class="main">
        <UserCardMobile v-if="data.isMobile" />
        <div class="homecontent">
          <router-view></router-view>
        </div>
        <a-row>
          <a-col :xs="24" :sm="24" :md="24" :lg="18" :xl="18"> <Footer /></a-col>
          <a-col :xs="0" :sm="0" :md="0" :lg="6" :xl="6"></a-col>
        </a-row>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, defineComponent, onMounted, onUnmounted, reactive, onBeforeMount } from 'vue';
import UserCard from '../../components/UserCard/UserCard.vue';
import UserCardMobile from '../../components/UserCard/UserCardMobile.vue';

import Footer from '../../components/Footer/Footer.vue';
import { getmyinfo } from '@/api/api-public';
import { useResizeObserver } from '@vueuse/core';

import { userInfo } from '@/stores/user';
const userStore = userInfo();

const divDom = ref();

const data = reactive({
  isMobile: null,
});

onBeforeMount(() => {
  getmyinfo().then((res) => {
    userStore.name = res.data.name;
    userStore.avatar = res.data.avatar;
  });
});

useResizeObserver(divDom, (entries) => {
  const entry = entries[0];
  const { width, height } = entry.contentRect;
  console.log(`width: ${width}, height: ${height}`);
  console.log(`${width}px`);
  if (width == 0) {
    data.isMobile = true;
  } else {
    data.isMobile = false;
  }
});
</script>
<style scoped lang="scss">
//最外层
.homecontainer {
  max-width: 1200px;
  margin: auto;
  display: flex;
  border: 1px solid #fff;
}

.userCard {
  width: 258px;
  height: 100vh;
  overflow: hidden;
  position: sticky;
  top: 0;
  margin-right: 10px;
  @media screen and (max-width: 900px) {
    width: 0px;
    margin-right: 0px;
  }
}

.homecontent {
  width: 100%;
  min-height: calc(100vh - 204px);
}

.main {
  width: 0;
  flex: 1;
  padding: 0 10px;
}
</style>
