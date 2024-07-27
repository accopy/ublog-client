<template>
    <div style="  background-color: #F9FAFB;">
        <div class="homecontainer ">
            <div class="userCard " ref="divDom">
                <UserCard></UserCard>
            </div>
            <div class="main">
                <UserCardMobile v-if="data.isMobile" />
                <div class="homecontent">
                    <router-view></router-view>
                </div>

                <Footer />
            </div>




        </div>
    </div>



</template>
<script setup>
import { ref, defineComponent, onMounted, onUnmounted, reactive, onBeforeMount } from 'vue';
import UserCard from '../../components/UserCard/UserCard.vue';
import UserCardMobile from '../../components/UserCard/UserCardMobile.vue';

import Footer from '../../components/Footer/Footer.vue';
import { getmyinfo } from '@/api/api-public'
import { useResizeObserver } from "@vueuse/core";


import { userInfo } from '@/stores/user'
const userStore = userInfo()

const divDom = ref()


const data = reactive({
    isMobile: null,

});

onBeforeMount(() => {
    getmyinfo().then(res => {
        userStore.name = res.data.name
        userStore.avatar = res.data.avatar

    })
})

useResizeObserver(divDom, (entries) => {
    const entry = entries[0]
    const { width, height } = entry.contentRect
    console.log(`width: ${width}, height: ${height}`)
    console.log(`${width}px`)
    if (width == 0) {
        data.isMobile = true

    } else {
        data.isMobile = false
    }

})




</script>
<style scoped lang="scss">
@media screen and (max-width: 800px) {

    /*当屏幕尺寸小于600px时，应用下面的CSS样式*/
    .userCard {
        width: 0px !important;
        margin: 0px !important;
    }
}

//最外层
.homecontainer {
    max-width: 1200px;
    margin: auto;
    display: flex;
    justify-content: center;
    border: 1px solid #F9FAFB;

}

.userCard {

    width: 264px;
    height: 100vh;

    overflow: hidden;
    position: sticky;
    top: 0;
    margin-right: 10px;

}



.homecontent {
    min-height: calc(100vh - 204px);

}

.main {
    flex: 1;
    padding: 0 10px;

}
</style>