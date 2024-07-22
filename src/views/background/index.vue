<template>
    <div class="container">
        <a-layout style="height: 100%;">
            <a-layout-header :style="headerStyle">Header</a-layout-header>
            <a-layout>
                <a-layout-sider :style="siderStyle">

                    <Sider></Sider>


                </a-layout-sider>
                <a-layout-content :style="contentStyle" class="content">
                    <router-view></router-view>
                </a-layout-content>
            </a-layout>

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

.content {
    overflow-y: scroll;
    margin: 0 10px;
}
</style>