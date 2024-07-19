<template>
    <div>
        <div>
            <a-button type="primary" @click="showDrawer">新增文章</a-button>
        </div>

        <a-table :dataSource="data.dataSource" :columns="data.columns">
            <template #headerCell="{ column }">
                <template v-if="column.key === 'title'">
                    <span>
                        <smile-outlined />
                        {{ column.title }}
                    </span>
                </template>
            </template>

            <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'categoryName'">
                    <a>
                        {{ record.categoryName[0] }}
                    </a>
                </template>

                <template v-else-if="column.key === 'content'">

                    {{ record.content }}

                </template>

                <template v-else-if="column.key === 'tagsName'">
                    <span>
                        <a-tag v-for="tag in record.tagsName" :key="tag"
                            :color="tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'">
                            {{ tag.toUpperCase() }}
                        </a-tag>
                    </span>
                </template>
                <template v-else-if="column.key === 'action'">
                    <span>
                        <a-button type="dashed" size="small" style="margin-right: 10px;"
                            @click="showDrawer(record._id, 'view')">查看</a-button>
                        <a-button type="primary" size="small" style="margin-right: 10px;"
                            @click="showDrawer(record._id, 'edit')">编辑</a-button>



                        <a-popconfirm title="Are you sure ?" ok-text="Yes" cancel-text="No"
                            @confirm="deleteConfirm(record._id)" @cancel="deleteCancel">
                            <a-button type="dashed" size="small" danger>删除</a-button>

                        </a-popconfirm>

                    </span>
                </template>
            </template>
        </a-table>



    </div>

    <a-drawer :width="windowWidth" :title="data.drawerMode" placement="right" :open="data.open" @close="onCloseDrawer">
        <template #extra v-if="data.drawerMode == 'edit'">
            <a-button style="margin-right: 8px" @click="onCloseDrawer">取消</a-button>
            <a-button type="primary" @click="onCloseDrawer">提交</a-button>
        </template>
        <!-- <ArticleDetail :articleId="data.choosedId" /> -->
        <!-- <EditArticle :articleId="data.choosedId" :categoryList="data.categoryList" @Refresh="onCloseDrawerAndRefresh" /> -->
        <AddArticle :categoryList="data.categoryList" @Refresh="onCloseDrawerAndRefresh" />
    </a-drawer>

</template>

<script setup>
import { reactive, onBeforeMount, defineProps, toRefs, watch, ref } from 'vue'
import { getArticleList, delArticle, getCategoryList } from '@/api/api'
import { message } from 'ant-design-vue';
import { SmileOutlined } from '@ant-design/icons-vue';

import ArticleDetail from './components/ArticleDetail.vue'
import EditArticle from './components/EditArticle.vue'
import AddArticle from './components/AddArticle.vue'


// 屏幕宽度
const windowWidth = ref(0)

// 获取屏幕尺寸
const getWindowResize = function () {
    windowWidth.value = window.innerWidth
}

onBeforeMount(() => {

    getWindowResize()
    window.addEventListener('resize', getWindowResize)

    getList(data.pageData)
    getCategory()

})

const data = reactive({
    choosedId: '',     //选择文章的id
    open: false,       //抽屉状态
    drawerMode: '',    //抽屉模式 view查看，edit编辑，add添加
    dataSource: [],
    categoryList: [],  //分类列表
    columns: [
        {
            title: '标题',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: '分类',
            dataIndex: 'categoryName',
            key: 'categoryName',
        },
        {
            title: '内容',
            dataIndex: 'content',
            key: 'content',
        },
        {
            title: '标签',
            dataIndex: 'tagsName',
            key: 'tagsName',
        },
        {
            title: '操作',
            key: 'action',
        },
    ],
    pageData: {
        pageSize: 10,
        pageNum: 1,
        queryinfo: {
            querytype: 'recent',
            key: ''
        }
    },
    total: 0,
});


//分页变化
const changePageNum = (val) => {
    data.pageData.pageNum = val
    sessionStorage.setItem('pageNum', val)
    console.log('val', val);
    getList(data.pageData)

}

//打开抽屉
const showDrawer = (val, mode) => {
    data.choosedId = val
    data.drawerMode = mode
    data.open = true;

};

//关闭抽屉
const onCloseDrawer = () => {
    data.open = false;
};

//关闭抽屉并刷新
const onCloseDrawerAndRefresh = () => {
    data.open = false;
    getList(data.pageData)
};

//定义获取个人文章
const getList = (val) => {

    getArticleList(val).then(res => {
        if (res.data != 400) {
            data.dataSource = res.data.list
            data.total = res.data.count

        }
    })
};

//获取个人分类
const getCategory = () => {
    getCategoryList().then(res => {
        if (res.code == 200) {
            let arr = []
            for (let i = 0; i < res.data.length; i++) {
                let obj = {}
                obj.value = res.data[i]._id
                obj.label = res.data[i].name
                arr.push(obj)
            }
            data.categoryList = arr
        }

    })
}

//删除文章
const deleteArticle = (val) => {
    delArticle({ id: val }).then(res => {

        if (res.code == 200) {
            message.success(res.data);
            //更新页面
            getList(data.pageData)

        }
    })


}

//确认删除
const deleteConfirm = e => {
    deleteArticle(e)
};
//取消删除
const deleteCancel = e => {
    message.error('Click on No');
};





</script>
<style scoped lang='scss'></style>