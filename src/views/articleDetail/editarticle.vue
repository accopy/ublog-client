<template>
    <div class="addview">
        <a-form :model="data.formState" @finish="handleFinish" @finishFailed="handleFinishFailed" style="width: 100%;">
            <a-form-item label="标题">
                <a-input v-model:value="data.formState.title" placeholder="请输入">
                    <template #prefix>
                        <UserOutlined style="color: rgba(0, 0, 0, 0.25)" />
                    </template>
                </a-input>
            </a-form-item>
            <a-form-item label="标签">
                <template v-for="(tag, index) in data.tagsState.tagsName" :key="tag">
                    <a-tooltip v-if="tag.length > 20" :title="tag">
                        <a-tag :closable="true" color="pink" @close="handleClose(tag)">
                            {{ `${tag.slice(0, 20)}...` }}
                        </a-tag>
                    </a-tooltip>
                    <a-tag v-else :closable="true" @close="handleClose(tag)" :color="tagColor(index)">
                        {{ tag }}
                    </a-tag>
                </template>
                <a-input v-if="data.tagsState.inputVisible" ref="inputRef" v-model:value="data.tagsState.inputValue"
                    type="text" size="small" :style="{ width: '78px' }" @blur="handleInputConfirm"
                    @keyup.enter="handleInputConfirm" />
                <a-tag v-else style="background: #fff; border-style: dashed" @click="showInput">
                    <plus-outlined />
                    New Tag
                </a-tag>

            </a-form-item>

            <a-form-item label="分类">
                <a-select v-model:value="data.formState.category" style="width: 100%" label-in-value
                    placeholder="Please select" :options="data.categoryList" @change="handleChange">

                </a-select>


            </a-form-item>


            <div id="vditor" ref="vditorRef">
            </div>
            <div class="handleline">
                <a-button>取消</a-button>
                <a-button type="primary" html-type="submit">更新</a-button>

            </div>


        </a-form>
    </div>

</template>

<script setup>
// 1.1 引入Vditor 构造函数
import Vditor from 'vditor'
// 1.2 引入样式
import 'vditor/dist/index.css';
import { ref, onMounted, reactive, nextTick, onBeforeMount } from 'vue';
import { updateArticle, getCategoryList, getArticleDetail } from '@/api/api'
import { message } from 'ant-design-vue';
//引入路由
import { useRouter } from 'vue-router'
const router = useRouter();
import { useRoute } from 'vue-router'

//首先在setup中定义
const route = useRoute()

const inputRef = ref()

const data = reactive({
    formState: {
        title: '',
        content: '',
        tagsName: [],
        category: '',
        //0草稿1发布    
        state: 1,
        author: '',
        _id: ''
    },
    tagsState: {
        tagsName: [],
        inputVisible: false,
        inputValue: '',
    },
    categoryList: []
});

onBeforeMount(() => {

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
})

const handleChange = value => {
    console.log('data', data.formState);

};



const tagColor = (val) => {
    let colorlist = ['pink', 'cyan', 'blue', '#f50', '#2db7f5', '#87d068', '#108ee9']

    let num = Number(val) % 7
    console.log('val', val);


    return colorlist[num]
}
const handleClose = removedTag => {

    const tagsName = data.tagsState.tagsName.filter(tag => tag !== removedTag);
    console.log(data.tagsState.tagsName, 'data.tagsState.tagsName');
    data.tagsState.tagsName = tagsName;
};
const showInput = () => {
    data.tagsState.inputVisible = true;
    nextTick(() => {
        inputRef.value.focus();
    });
};
const handleInputConfirm = () => {
    const inputValue = data.tagsState.inputValue;
    let tagsName = data.tagsState.tagsName;
    if (inputValue && tagsName.indexOf(inputValue) === -1) {
        tagsName = [...tagsName, inputValue];
    }

    Object.assign(data.tagsState, {
        tagsName,
        inputVisible: false,
        inputValue: '',
    });


};



// 2. 获取DOM引用
const vditor = ref()
// 3. 在组件初始化时，就创建Vditor对象，并引用
onMounted(() => {
    vditor.value = new Vditor('vditor', {
        height: '60vh',
        width: '100%',
        cache: {
            //是否开启本地缓存
            enable: false
        },
        outline: {
            enable: false,
            position: "right"
        },
        // after: () => {
        //     vditor.value.setValue(data.formState.content)
        // },

    })
})


const handleFinish = values => {

    //提交前处理
    data.formState.content = vditor.value.getValue()
    data.formState.tagsName = data.tagsState.tagsName


    console.log(data.formState, 'data.formState');
    updateArticle(data.formState).then(res => {
        console.log('res', res);

        if (res.code == 200) {
            message.success({ content: '提交成功!' })
            toHomePage()
        }

    })
};


const handleFinishFailed = errors => {
    console.log(errors);
};

const toHomePage = (val) => {
    //跳转主页
    router.push({
        path: '/',
    })
}



//编辑


onBeforeMount(() => {
    data.id = route.query.articleId
    getArticleDetail(data.id).then(res => {
        if (res.code == 200) {
            let result = res.data
            data.formState.title = result.title
            data.tagsState.tagsName = result.tagsName
            data.formState.category = { label: result.categoryName[0], value: result.category[0] }
            // data.formState.tagsName = result.tagsName
            vditor.value.setValue(result.content)
            data.formState.author = result.author
            data.formState._id = result._id
            // vditor.value.setValue(data.formState.content)
            // console.log('vditor.value', vditor.value);

        }

    })

})
</script>
<style scoped lang='scss'>
.addview {

    box-sizing: border-box;
    padding: 20px;
}

.handleline {
    margin-top: 20px;
    display: flex;
    justify-content: space-around;
}
</style>