<template>
    <div class="container">

        <div class="top">
            <a-button type="primary" @click="showDrawer(null, '新增')">新增</a-button>
            <a-form-item label="关键字">
                <a-input v-model:value="data.searchKey" placeholder="请输入搜索关键字" />
            </a-form-item>
            <a-form-item label="分类">
                <a-select v-model:value="data.category" style="width: 100%" placeholder="Please select"
                    :options="data.categoryList">
                </a-select>
            </a-form-item>
            <a-button type="dashed" @click="reset()">重置</a-button>
            <a-button type="primary" @click="getList()" style="margin-left: 10px;">搜索</a-button>


        </div>


        <a-table :dataSource="data.dataSource" :columns="data.columns" @change="handleChange" :pagination="pagination">
            <template #headerCell="{ column }">
                <template v-if="column.key === 'title'">
                    <span>
                        <smile-outlined />
                        {{ column.title }}
                    </span>
                </template>
            </template>

            <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'category'">
                    <a>
                        {{ dictLabel(data.categoryList, record.category[0]) }}
                    </a>
                </template>

                <template v-else-if="column.key === 'desc'">

                    {{ record.desc.substr(0, 100) }}

                </template>

                <template v-else-if="column.key === 'tagsName'">
                    <span>
                        <a-tag v-for="tag in record.tagsName" :key="tag"
                            :color="tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'">
                            {{ tag }}
                        </a-tag>
                    </span>
                </template>
                <template v-else-if="column.key === 'action'">
                    <span>
                        <a-button type="dashed" size="small" style="margin-right: 10px;"
                            @click="showDrawer(record._id, '详情')">查看</a-button>
                        <a-button type="primary" size="small" style="margin-right: 10px;"
                            @click="showDrawer(record._id, '编辑')">编辑</a-button>

                        <a-popconfirm title="Are you sure ?" ok-text="Yes" cancel-text="No"
                            @confirm="deleteConfirm(record._id)" @cancel="deleteCancel">
                            <a-button type="dashed" size="small" danger>删除</a-button>

                        </a-popconfirm>

                    </span>
                </template>

            </template>

        </a-table>


    </div>

    <a-drawer :width="windowWidth" :title="data.drawerMode" placement="right" :open="data.open"
        @close="onCloseDrawerAndRefresh">
        <template #extra v-if="data.drawerMode == 'edit'">
            <a-button style="margin-right: 8px" @click="onCloseDrawerAndRefresh">取消</a-button>
            <a-button type="primary" @click="onCloseDrawerAndRefresh">提交</a-button>
        </template>
        <ArticleDetail :articleId="data.choosedId" v-if="data.drawerMode == '详情'" @Refresh="onCloseDrawerAndRefresh" />
        <EditArticle :articleId="data.choosedId" :categoryList="data.categoryList" v-else-if="data.drawerMode == '编辑'"
            @Refresh="onCloseDrawerAndRefresh" />
        <AddArticle :categoryList="data.categoryList" v-else-if="data.drawerMode == '新增'"
            @Refresh="onCloseDrawerAndRefresh" />
    </a-drawer>

</template>

<script setup>
import { reactive, onBeforeMount, computed, toRefs, watch, ref } from 'vue'
import { searchArticle, delArticle, getCategoryList } from '@/api/api'
import { message } from 'ant-design-vue';
import { SmileOutlined } from '@ant-design/icons-vue';
import { dictLabel } from '@/api/utils'

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
    searchKey: '',      //搜索值
    category: '',       //分类
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
            customCell: column => {
                return {
                    style: {
                        'width': "220px",
                    }
                };
            }
        },
        {
            title: '分类',
            dataIndex: 'category',
            key: 'category',
            customRender: (e) => {

            },
            customCell: column => {
                return {
                    style: {
                        'min-width': "130px",
                    }
                };
            }
        },
        {
            title: '内容简介',
            dataIndex: 'desc',
            key: 'desc',
            customCell: column => {
                return {
                    style: {

                    }
                };
            }
        },
        {
            title: '标签',
            dataIndex: 'tagsName',
            key: 'tagsName',
            customCell: column => {
                return {
                    style: {
                        'width': "180px",
                    }
                };
            }
        },
        {
            title: '操作',
            key: 'action',
            customCell: column => {
                return {
                    style: {
                        'min-width': "200px",

                    }
                };
            }
        },
    ],
    pageData: {
        pageSize: 10,
        pageNum: 1,
    },
    total: 0,
});


//搜索文章
const getList = () => {
    let obj = {
        pageParam: data.pageData,
        key: data.searchKey,
        category: data.category,
        tags: ''
    }
    searchArticle(obj).then(res => {
        if (res.code == 200) {
            data.total = res.data.count
            data.dataSource = res.data.list
        }


    })

};
const pagination = computed(() => ({
    total: data.total,
    current: data.pageData.pageNum,
    pageSize: data.pageData.pageSize,
}));

//分页变化
const handleChange = (val) => {
    data.pageData.pageNum = val.current
    getList()
}

//打开抽屉
const showDrawer = (val, mode) => {
    data.choosedId = val
    data.drawerMode = mode
    data.open = true;

};


//关闭抽屉并刷新
const onCloseDrawerAndRefresh = () => {
    data.open = false;
    data.drawerMode = ''
    getList()

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



const reset = () => {
    data.searchKey = ''
    data.category = ''
    data.pageData = {
        pageSize: 10,
        pageNum: 1,
    }
    getList()

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
<style scoped lang='scss'>
.container {
    // :deep(.ant-table-wrapper) {
    //     //括号中为需要修改的类名
    //     height: 500px;
    // }
}

.top {
    padding: 20px 0px;
    display: flex;





    :deep(.ant-form-item) {
        //括号中为需要修改的类名
        width: 300px;
        margin: 0 10px
    }




}
</style>