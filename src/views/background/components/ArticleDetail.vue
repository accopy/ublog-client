<template>
    <div class=" bannertitle">
        {{ data.article.title }}
    </div>
    <div class=" detailbox">
        <div class="maincontent">
            <div id="preview" class="vd"></div>
        </div>
    </div>




</template>

<script setup>
import { reactive, toRefs, onBeforeMount, onMounted, ref, watch } from 'vue'
import { getArticleDetail } from "@/api/api"

// 1.1 引入Vditor 构造函数
import Vditor from "vditor"
// 1.2 引入样式
import 'vditor/dist/index.css';


import { message } from 'ant-design-vue';

//首先在setup中定义
const props = defineProps({
    //子组件接收父组件传递过来的值
    articleId: String,
})
const data = reactive({

    article: {}
})
// 3. 在组件初始化时，就创建Vditor对象，并引用

//获取详情数据
const getTagsList = () => {
    getArticleDetail(props.articleId).then(res => {
        if (res.code == 200) {
            data.article = res.data
            data.article.create_time = res.data.create_time.slice(0, 10)
            data.article.update_time = res.data.update_time.slice(0, 10)
            data.article.categoryName = res.data.categoryName[0]
            renderMarkdown(data.article.content)

        }

    })
}
onMounted(() => {
    getTagsList()

})

const renderMarkdown = (md) => {
    Vditor.preview(document.getElementById("preview"), md, {
        hljs: { style: "github" },
        outline: {
            enable: true,
            position: "right"
        }
    });
}


</script>
<style scoped lang='scss'>
.detailbox {
    background-color: #F9FAFB !important;
}



.bannertitle {
    display: flex;
    justify-content: center;
    font-size: 28px;
    padding-bottom: 40px;



}





.maincontent {
    margin-top: 20px;
    width: 100%;
    padding: 10px;

    .vd {
        overflow: hidden;
    }

}
</style>