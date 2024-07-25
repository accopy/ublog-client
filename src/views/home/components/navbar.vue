<template>
    <div class="nav pl-15">
        <div v-for="item in data.list" :key="item.id" :class="[item.id == data.activeId ? 'active' : '']"
            @click="JumpOtherPage(item)">{{ item.name }}</div>
    </div>
</template>

<script setup>
import { reactive, onBeforeMount, watch } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter();

const data = reactive({
    activeId: 1,
    list: [
        {
            id: 1, name: '近期发布', url: '/article/recent'
        },
        {
            id: 2, name: '分类', url: '/article/category'
        },
        {
            id: 3, name: '标签', url: '/article/tags'
        },
        {
            id: 4, name: '归档', url: '/article/archives'
        },
    ],
})

watch(() =>
    router.currentRoute.value.path,
    (toPath) => {
        //要执行的方法

        for (let i = 0; i < data.list.length; i++) {
            if (toPath == data.list[i].url) {
                data.activeId = data.list[i].id
            }
        }


    }, { immediate: true, deep: true })

const JumpOtherPage = (val) => {
    data.activeId = val.id
    router.push({
        path: val.url,

    })
}

const setNavNum = () => {
    //获取当前页面地址
    let { fullPath } = router.currentRoute.value

    data.list.forEach(item => {
        if (item.url == fullPath) {
            data.activeId = item.id
        }
    })

}

onBeforeMount(() => {
    setNavNum()
})




</script>
<style scoped lang='scss'>
.nav {
    height: 50px;
    border-bottom: 1px solid #E9EAEC;
    display: flex;
    position: relative;
}

.nav>div {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 10px;
    margin: 10px 20px 10px 0px;
    color: $text-p3;
    border-radius: 6px;
    font-size: 12px;


}

.nav :hover {
    cursor: pointer;
    background-color: $block-hover;

}

.active {
    background-color: white;
    box-shadow: 0 0 2px 0 rgba(0, 0, 0, .04), 0 0 8px 0 rgba(0, 0, 0, .04);

}

.new {
    top: 2px;
    position: absolute;
    right: 0;



}
</style>