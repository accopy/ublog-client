<template>
    <div>
        <a-menu v-model:openKeys="state.openKeys" v-model:selectedKeys="state.selectedKeys" mode="inline" theme="dark"
            :inline-collapsed="state.collapsed" :items="items" @click="changeMenu"></a-menu>
    </div>
</template>
<script setup>
import { reactive, watch, h, onBeforeMount } from 'vue';
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
watch(
    () => state.openKeys,
    (_val, oldVal) => {
        console.log('_val', _val);

    },
);

watch(() =>
    router.currentRoute.value.path,
    (toPath) => {
        //要执行的方法
        let str = toPath.slice(12)

        //获取openkey selectedKeys
        for (let i = 0; i < items.length; i++) {
            for (let j = 0; j < items[i].children.length; j++) {

                if (str == items[i].children[j].key) {
                    if (state.selectedKeys !== items[i].children[j].key) {
                        state.selectedKeys = []
                        state.selectedKeys.push(items[i].children[j].key)
                    }
                    if (state.openKeys !== items[i].key) {
                        state.openKeys = []

                        state.openKeys.push(items[i].key)
                    }


                }
            }
        }





    }, { immediate: true, deep: true })


const changeMenu = (e) => {
    router.push({
        path: `/background/${e.key}`,

    })
}
</script>