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
        :wrappe-col="{ span: 18 }"
        autocomplete="off"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
      >
        <a-form-item
          label="账号"
          name="username"
          :rules="[{ required: true, message: '请输入用户名!' }]"
        >
          <a-input v-model:value="formState.username" />
        </a-form-item>

        <a-form-item
          label="密码"
          name="password"
          :rules="[{ required: true, message: '请输入密码!' }]"
        >
          <a-input-password v-model:value="formState.password" />
        </a-form-item>
        <!-- <div style="font-size: 10px; display: flex;justify-content: flex-end;margin-bottom: 10px"
                    @click="toRegPage">
                    <a>还没有账号？去注册</a>
                </div> -->
        <div style="display: flex; margin-bottom: 20px">
          <div style="width: 75px"></div>
          <div style="display: flex; justify-content: space-between; flex: 1; margin-right: 30px">
            <a-button type="primary" danger @click="reset">重置</a-button>
            <a-button type="primary" html-type="submit">登录</a-button>
          </div>
        </div>
      </a-form>
    </div>
    <contextHolder />
  </div>
</template>
<script setup>
import { reactive, onMounted, h } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
import { login } from '@/api/api';
import { message } from 'ant-design-vue';
//引入提示

const formState = reactive({
  username: 'admin',
  password: 'admin123',
});
const toRegPage = () => {
  router.push({
    path: 'register',
  });
};

const onFinish = (values) => {
  login(formState).then((res) => {
    if (res.code == 200) {
      let token = res.data;
      localStorage.setItem('token', 'Bearer ' + token);
      message.success('登录成功！');
      router.push({
        path: 'background',
      });
    } else if (res.code == 400) {
      message.error('邮箱或密码错误！');
      console.log('邮箱或密码错误！');
    }
  });
};
const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

//重置
const reset = () => {
  formState.email = '';
  formState.password = '';
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
