<template>

    <div>
        <div class="top">
            <a-input v-model:value="data.input" placeholder="分类名" />
            <a-button type="primary" @click="addcategory">新增分类</a-button>

        </div>

        <a-table :dataSource="data.dataSource" :columns="data.columns">


            <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'name'">

                    {{ record.name }}

                </template>

                <template v-else-if="column.key === 'count'">

                    {{ record.count }}

                </template>
                <template v-else-if="column.key === 'action'">
                    <span>

                        <a-popconfirm title="Are you sure ?" ok-text="Yes" cancel-text="No"
                            @confirm="deleteConfirm(record)" @cancel="deleteCancel">
                            <a-button type="dashed" size="small" danger>删除</a-button>

                        </a-popconfirm>

                    </span>
                </template>
            </template>
        </a-table>

    </div>



</template>

<script setup>
import { reactive, onBeforeMount, defineProps, toRefs, watch, ref } from 'vue'
import { getCategoryNum, delCategory, addCategory } from '@/api/api'
import { message } from 'ant-design-vue';

onBeforeMount(() => {



    getList(data.pageData)


})

const data = reactive({
    input: '',  //添加分类的名称
    dataSource: [],
    columns: [
        {
            title: '名称',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '文章数量',
            dataIndex: 'count',
            key: 'count',
        },
        {
            title: '操作',
            key: 'action',
        },
    ],
});


//获取分类及数量
const getList = () => {

    getCategoryNum().then(res => {
        if (res.data != 400) {
            data.dataSource = res.data

        }
    })
};

//添加分类

const addcategory = () => {
    if (data.input) {
        addCategory({ name: data.input }).then(res => {
            if (res.code == 200) {
                message.success(res.data);

            }
            data.input = ''
            getList()
        })
    }
    else {
        message.warning('请输入新增分类名称')
    }
};

//删除文章
const delcategory = (val) => {
    delCategory({ id: val }).then(res => {

        if (res.code == 200) {
            message.success(res.data);
            //更新页面
            getList()

        }
    })


}

//确认删除
const deleteConfirm = e => {
    console.log('e', e);

    if (e.count == 0) {
        delcategory(e.id)
    } else {
        message.error('文章数量不为0!');
    }

};
//取消删除
const deleteCancel = e => {
    message.warning('已取消！');
};





</script>
<style scoped lang='scss'>
.top {
    padding: 20px 0px;
    display: flex;

    :deep(.ant-input) {
        //括号中为需要修改的类名
        width: 200px;
        margin: 0 10px
    }



}
</style>