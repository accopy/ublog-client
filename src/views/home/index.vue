<template>
    <div class="homecontainer ">
        <a-row>
            <a-col :xs="0" :sm="0" :md="10" :lg="10" :xl="5" ref="divDom">
                <div class="userCard">
                    <UserCard></UserCard>
                </div>
            </a-col>
            <a-col :xs="24" :sm="24" :md="14" :lg="14" :xl="19">

                <div class="main ">
                    <div class="header" v-if="data.isMobile">
                        <div class="logo_wrap">
                            <div class="avatar">
                                <img src="@/assets/img/logo.png" alt="">
                            </div>
                            <div>
                                <div class="username">ACCOPY</div>
                                <div class="ind">风暴前夕</div>
                            </div>
                        </div>
                    </div>

                    <router-view></router-view>
                    <Footer />
                </div>
            </a-col>
        </a-row>

    </div>


</template>
<script setup>
import { ref, defineComponent, onMounted, onUnmounted, reactive } from 'vue';
import UserCard from '../../components/UserCard/UserCard.vue';
import Footer from '../../components/Footer/Footer.vue';

import { useResizeObserver } from "@vueuse/core";

const divDom = ref()

const data = reactive({
    isMobile: null
});


useResizeObserver(divDom, (entries) => {
    const entry = entries[0]
    const { width, height } = entry.contentRect
    // console.log(`width: ${width}, height: ${height}`)
    // console.log(`${width}px`)
    if (width == 0) {
        data.isMobile = true

    } else {
        data.isMobile = false
    }

})


</script>
<style scoped>
.homecontainer {
    background-color: #F9FAFB;
}

.userCard {
    width: 300px;

    position: sticky;
    top: 0;

}

.header {
    .logo_wrap {
        display: flex;
        padding: 30px 20px 10px 20px
    }

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
        font-size: .8125rem;
        cursor: pointer;
        color: $text-p1;
    }
}

.main {
    width: 100%;
    padding: 0 15px;



}
</style>