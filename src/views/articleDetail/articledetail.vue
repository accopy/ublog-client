<template>
    <div class="toolbar">

    </div>
    <div class=" detailbox">
        <div class="banner">
            <div class="bannerbg">
                <img src="@/assets/img/banner.jpg" alt="" width="100%" height="100%">
            </div>

            <div class="content ">
                <div class="bannertop">
                    <div class="breadcrumbbox">
                        <a-breadcrumb>
                            <a-breadcrumb-item><a href="/">主页</a></a-breadcrumb-item>
                            <a-breadcrumb-item>{{ data.article.categoryName }}</a-breadcrumb-item>

                        </a-breadcrumb>
                    </div>
                    <div style="display: flex;">
                        <div> Mr. A </div>
                        <div class="time1">
                            <span style="margin: 0 10px;">|</span>
                            <span>{{ data.article.create_time }}</span>
                        </div>

                        <div class="time2">
                            <span style="margin: 0 10px;">|</span>
                            <span>更新于{{ data.article.update_time }}</span>
                        </div>
                    </div>
                    <div class="caozuo">
                        <span class="edit" @click="handleEditClick">编辑</span>
                        <span class="spanfg">/</span>
                        <span class="delete" @click="handleDeleteClick">删除</span>
                    </div>

                </div>
                <div class=" bannertitle">
                    {{ data.article.title }}
                </div>
                <div>

                </div>
            </div>
        </div>
        <div class="maincontent">
            <div id="preview" class="vd"></div>
        </div>
    </div>




</template>

<script setup>
import { reactive, toRefs, onBeforeMount, onMounted, ref, watch } from 'vue'
import { getArticleDetail, delArticle } from "@/api/api"
//引入路由
import { useRouter } from 'vue-router'
const router = useRouter();

// 1.1 引入Vditor 构造函数
import Vditor from "vditor"
// 1.2 引入样式
import 'vditor/dist/index.css';

import { useRoute } from 'vue-router'
import { message } from 'ant-design-vue';

//首先在setup中定义
const route = useRoute()
const data = reactive({
    id: '',
    article: {}
})
// 3. 在组件初始化时，就创建Vditor对象，并引用

//获取详情数据
const getTagsList = () => {
    data.id = route.query.articleId
    getArticleDetail(data.id).then(res => {
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

//监听路由
watch(
    () => route.query,
    (newVal, oldVal) => {
        getTagsList()
    },
    { deep: true }
)

const renderMarkdown = (md) => {
    Vditor.preview(document.getElementById("preview"), md, {
        hljs: { style: "github" },
        outline: {
            enable: true,
            position: "right"
        }
    });
}


const handleEditClick = e => {
    router.push({
        path: '/edit',
        query: { articleId: data.article._id }

    })
};

const handleDeleteClick = e => {

    delArticle({ id: data.article._id }).then(res => {
        if (res.code == 200) {
            message.success('删除成功！')
            router.go(-1)
        }

    })


};



</script>
<style scoped lang='scss'>
.detailbox {
    background-color: #F9FAFB !important;
}

.banner:hover {
    img {
        filter: blur(10px);
    }

}



.banner {
    // width: 720px;
    height: 200px;
    border-radius: 16px;
    overflow: hidden;
    font-family: LXGWWenKaiMonoScreen;
    overflow: hidden;
    position: relative;
    // background-image: url('@/assets/img/banner.jpg');
    // background-size: cover;

    .bannerbg {
        border-radius: 16px;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 1;

        img {
            -moz-user-select: -moz-none;
            -khtml-user-select: none;
            -webkit-user-select: none;
            -o-user-select: none;
            user-select: none;
            object-fit: cover;
        }
    }

    .caozuo {
        line-height: 1.6;
        user-select: none;
        color: $text-meta;
        z-index: 2;

        opacity: 0;

        .spanfg {
            margin: 10px;

        }

        .edit {
            cursor: pointer;
        }

        .delete {
            cursor: pointer;
            color: red
        }
    }

    .caozuo:hover {
        opacity: .8;
    }

    .time2 {
        opacity: 0;
    }

    .time2:hover {
        opacity: .8;
    }

    .content {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        color: white;


        .bannertop {
            padding: 15px;

            line-height: 1.6;
            user-select: none;
            color: white;
            z-index: 2;
        }



        .bannertitle {
            display: flex;
            justify-content: center;
            font-size: 28px;
            padding-bottom: 40px;
            z-index: 2;

            //文字描边效果
            background-image: linear-gradient(#FFFFFF, #92FE9D, );
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            /*需要文字透明*/
        }



    }
}

.maincontent {
    margin-top: 20px;
    width: 100%;
    padding: 10px;

    .vd {
        overflow: hidden;
    }

}


.breadcrumbbox {

    color: white !important;
    z-index: 2;

    .ant-breadcrumb a {
        color: white !important;
        font-family: LXGWWenKaiMonoScreen;
        z-index: 2;
    }

    .ant-breadcrumb li:last-child {
        color: white !important;
        font-family: LXGWWenKaiMonoScreen;
        z-index: 2;
    }


    :deep(.ant-breadcrumb-separator) {
        //括号中为需要修改的类名
        color: white !important;

    }
}

.toolbar {
    position: fixed;
    bottom: 80px;
    right: 20px;
}
</style>