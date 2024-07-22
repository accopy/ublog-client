<template>
    <div>
        <a-menu v-model:openKeys="state.openKeys" v-model:selectedKeys="state.selectedKeys" mode="inline" theme="dark"
            :inline-collapsed="state.collapsed" :items="items" @click="changeMenu"></a-menu>
    </div>
</template>
<script setup>
import { reactive, watch, h } from 'vue';
import { useRouter } from 'vue-router'
const router = useRouter();
import {
    PieChartOutlined,
    AppstoreOutlined,
    FileProtectOutlined
} from '@ant-design/icons-vue';
const state = reactive({
    collapsed: false,
    selectedKeys: ['home'],
    //初始展开
    openKeys: ['blog'],
    // preOpenKeys: ['sub1'],
});
const items = reactive([
    // {
    //     key: 'home',
    //     icon: () => h(PieChartOutlined),
    //     label: '首页',
    //     title: '首页',
    // },

    {
        key: 'blog',
        icon: () => h(FileProtectOutlined),
        label: '博客管理',
        title: '博客管理',
        children: [
            {
                key: 'article',
                label: '文章管理',
                title: '文章管理',
            },
            {
                key: 'category',
                label: '分类管理',
                title: '分类管理',
            },
        ],
    },
    {
        key: 'system',
        icon: () => h(AppstoreOutlined),
        label: '系统设置',
        title: '系统设置',
        children: [
            {
                key: 'myinfo',
                label: '信息修改',
                title: '信息修改',
            },


        ],
    },
]);
// watch(
//     () => state.openKeys,
//     (_val, oldVal) => {
//         state.preOpenKeys = oldVal;
//     },
// );


const changeMenu = (e) => {
    console.log('e', e);
    router.push({
        path: `/background/${e.key}`,

    })
}
</script>