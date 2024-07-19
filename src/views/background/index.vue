<template>
    <div class="container">
        <a-layout style="height: 100%;">
            <a-layout-header :style="headerStyle">Header</a-layout-header>
            <a-layout>
                <a-layout-sider :style="siderStyle">

                    <Sider></Sider>


                </a-layout-sider>
                <a-layout-content :style="contentStyle">

                    <router-view></router-view>
                </a-layout-content>
            </a-layout>
            <a-layout-footer :style="footerStyle">Footer</a-layout-footer>
        </a-layout>
    </div>

</template>

<script setup>
import { reactive, watch, h } from 'vue';
import Sider from './components/Sider.vue';

</script>
<style scoped lang='scss'>
.container {
    height: 100vh;
    overflow: hidden;
}
</style>