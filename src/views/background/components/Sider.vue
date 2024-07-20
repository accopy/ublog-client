<template>
    <div>
        <a-menu v-model:openKeys="state.openKeys" v-model:selectedKeys="state.selectedKeys" mode="inline" theme="dark"
            :inline-collapsed="state.collapsed" :items="items"></a-menu>
    </div>
</template>
<script setup>
import { reactive, watch, h } from 'vue';
import {
    PieChartOutlined,
    MailOutlined,
    DesktopOutlined,
    InboxOutlined,
    AppstoreOutlined,
} from '@ant-design/icons-vue';
const state = reactive({
    collapsed: false,
    selectedKeys: ['1'],
    //初始展开
    openKeys: ['sub1'],
    preOpenKeys: ['sub1'],
});
const items = reactive([
    {
        key: '1',
        icon: () => h(PieChartOutlined),
        label: '首页',
        title: '首页',
    },

    {
        key: 'sub1',
        icon: () => h(MailOutlined),
        label: '博客管理',
        title: '博客管理',
        children: [
            {
                key: 'sub11',
                label: '文章管理',
                title: '文章管理',
            },
            {
                key: 'sub12',
                label: '分类管理',
                title: '分类管理',
            },
        ],
    },
    {
        key: 'sub2',
        icon: () => h(AppstoreOutlined),
        label: '系统设置',
        title: '系统设置',
        children: [
            {
                key: 'sub21',
                label: '..',
                title: '..',
            },


        ],
    },
]);
watch(
    () => state.openKeys,
    (_val, oldVal) => {
        state.preOpenKeys = oldVal;
    },
);
const toggleCollapsed = () => {
    state.collapsed = !state.collapsed;
    state.openKeys = state.collapsed ? [] : state.preOpenKeys;
};
</script>