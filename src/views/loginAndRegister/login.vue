<template>
    <div class="bgbox">
        <div class="loginbox">
            <div class="logo">
                <img src="@/assets/img/logo.png" alt="" draggable="false" oncontextmenu="return false;">
            </div>
            <a-form :model="formState" name="basic" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }"
                autocomplete="off" @finish="onFinish" @finishFailed="onFinishFailed">
                <a-form-item label="邮箱" name="email" :rules="[{ required: true, message: '请输入你的邮箱!' }]">
                    <a-input v-model:value="formState.email" />
                </a-form-item>

                <a-form-item label="密码" name="password" :rules="[{ required: true, message: '请输入密码!' }]">
                    <a-input-password v-model:value="formState.password" />
                </a-form-item>
                <div style="font-size: 10px; display: flex;justify-content: flex-end;margin-bottom: 10px"
                    @click="toRegPage">
                    <a>还没有账号？去注册</a>
                </div>
                <div style="display: flex;margin-bottom: 20px ">
                    <div style="width: 75px;"></div>
                    <div style="display: flex;justify-content: space-between ; flex: 1;margin-right: 30px">
                        <a-button type="primary" danger @click="reset">重置</a-button>
                        <a-button type="primary" html-type="submit">登录</a-button>
                    </div>

                </div>


            </a-form>
        </div>

    </div>

</template>
<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router'
import { login } from '@/api/api'
import { message } from 'ant-design-vue';
const router = useRouter();
const formState = reactive({
    email: '',
    password: '',
});
const toRegPage = () => {
    router.push({
        path: 'register',

    })
};

const onFinish = values => {
    login(formState).then(res => {
        if (res.code == 200) {
            let token = res.data
            localStorage.setItem("token", 'Bearer ' + token)
            message.success('登录成功！');
            router.replace({
                path: 'article',
            })
        } else if (res.code == 400) {
            message.error('邮箱或密码错误！');
            console.log('邮箱或密码错误！');

        }

    })
};
const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
};

//重置
const reset = () => {
    formState.email = '',
        formState.password = ''
}
</script>

<style lang="scss" scoped>
.bgbox {
    width: 100%;
    height: 100vh;
    background: linear-gradient(to right, #00C9FF, #92FE9D);
    display: flex;
    align-items: center;
    justify-content: center;
}

.loginbox {
    background-color: white;
    border-radius: 10px;
    padding: 70px 30px 0px 10px;
    position: relative;

    .ant-form {
        width: 300px !important;
    }

    .ant-form-item-explain-error {
        font-size: 10px !important;
    }

    .logo {
        position: absolute;
        left: 50%;
        top: 0;
        transform: translate(-50%, -50%);


        img {
            width: 100px;
            height: 100px;
            border-radius: 50px;
        }
    }
}
</style>