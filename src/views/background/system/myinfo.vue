<template>
    <div class="container ">
        <a-form :model="data" name="basic" :label-col="{ span: 1 }" :wrapper-col="{ span: 8 }" autocomplete="off">
            <a-form-item label="昵称">
                <a-input v-model:value="data.name" />
            </a-form-item>

            <a-form-item label="头像">

                <a-upload v-model:file-list="fileList" name="avatar" list-type="picture-card" class="avatar-uploader"
                    :show-upload-list="false" :headers="headers" :before-upload="beforeUpload" @change="handleChange"
                    :customRequest="FilesCustomRequest">
                    <img v-if="imageUrl" :src="imageUrl" alt="avatar" style="width: 100%;height: 100%" />
                    <div v-else>
                        <loading-outlined v-if="loading"></loading-outlined>
                        <plus-outlined v-else></plus-outlined>
                        <div class="ant-upload-text">Upload</div>
                    </div>
                </a-upload>
            </a-form-item>



            <a-form-item>
                <a-button type="primary" @click="updateInfo" style="margin-left: 10px;">更新</a-button>
            </a-form-item>
        </a-form>

    </div>
</template>

<script setup>
import { reactive, toRefs, onBeforeMount, ref } from 'vue'
import { getmyinfo, updatemyinfo, upload } from '@/api/api'
import { baseUrl } from '@/api/request'
import { message } from 'ant-design-vue';
import axios from "axios";
const headers = reactive({
    'Authorization': localStorage.getItem("token"),
    'Content-Type': 'multipart/form-data',


})

const fileList = ref([]);
const loading = ref(false);
const imageUrl = ref('');

const data = reactive({
    name: '',

})


onBeforeMount(() => {
    getMyInfo()
})

const getMyInfo = () => {
    getmyinfo().then(res => {
        data.name = res.data.name
        imageUrl.value = res.data.avatar
    })
}


//点击更新信息
const updateInfo = () => {
    let obj = {}
    obj.name = data.name
    obj.avatar = imageUrl.value

    updatemyinfo(obj).then(res => {
        if (res.code == 200) {
            message.success('更新成功');
            getMyInfo()
        }
    })

}

function handleChange(e) {
    console.log('e', e);

}



const FilesCustomRequest = (data) => {

    employeeFileUpload(data)

}

async function employeeFileUpload(data) {
    const formData = new FormData()
    formData.append('file', data.file);
    axios({
        method: 'post',
        url: baseUrl + 'api/uploadImage',
        data: formData,
        // headers: headers,
    }).then(res => {

        imageUrl.value = res.data.data
        console.log('imageUrl.value', imageUrl.value);


    })
    // return Promise.reject(new Error(res.data.msg));
}

const beforeUpload = file => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
};

</script>
<style scoped lang='scss'>
.container {
    padding: 30px 0px;
}

.avatar-uploader>.ant-upload {
    width: 128px;
    height: 128px;
}

.ant-upload-select-picture-card i {
    font-size: 32px;
    color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
    margin-top: 8px;
    color: #666;
}
</style>