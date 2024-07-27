<template>
  <div class="bgbox">
    <div class="loginbox">
      <div class="logo">
        <img src="@/assets/logo.png" alt="" draggable="false" oncontextmenu="return false;" />
      </div>
      <a-form
        :model="formState"
        name="basic"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 18 }"
        autocomplete="off"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
      >
        <a-form-item
          label="用户名"
          name="username"
          :rules="[{ required: true, message: '请输入用户名!' }]"
        >
          <a-input v-model:value="formState.username" />
        </a-form-item>
        <a-form-item
          label="邮箱"
          name="email"
          :rules="[{ required: true, message: '请输入你的邮箱!' }]"
        >
          <a-input v-model:value="formState.email" />
        </a-form-item>

        <a-form-item
          label="密码"
          name="password"
          :rules="[{ required: true, message: '请输入密码!' }]"
        >
          <a-input-password v-model:value="formState.password" />
        </a-form-item>
        <a-form-item
          label="确认密码"
          name="password2"
          :rules="[{ required: true, message: '请输入密码!' }]"
        >
          <a-input-password v-model:value="formState.password2" />
        </a-form-item>
        <div
          style="font-size: 10px; display: flex; justify-content: flex-end; margin-bottom: 10px"
          @click="toRegPage"
        >
          <a>已有账号？去登录</a>
        </div>
        <div style="display: flex; margin-bottom: 20px">
          <div style="width: 75px"></div>
          <div style="display: flex; justify-content: space-between; flex: 1; margin-right: 30px">
            <a-button type="primary" danger @click="reset">重置</a-button>
            <a-button type="primary" html-type="submit">注册</a-button>
          </div>
        </div>
      </a-form>
    </div>
  </div>
</template>
<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { register } from '@/api/api';
import { message } from 'ant-design-vue';

const router = useRouter();
const formState = reactive({
  username: '',
  email: '',
  password: '',
  password2: '',
});
const toRegPage = () => {
  router.push({
    path: '/login',
  });
};

const onFinish = (values) => {
  register(formState).then((res) => {
    if (res.code == 200) {
      message.success(res.data);
      toRegPage();
    }
  });
};
const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

//重置
const reset = () => {
  (formState.email = ''), (formState.password = ''), (formState.password2 = '');
};
</script>

<style lang="scss" scoped>
.bgbox {
  width: 100%;
  height: 100vh;
  background: linear-gradient(to right, #00c9ff, #92fe9d);
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
      width: 50px;
      height: 50px;
    }
  }
}
</style>
