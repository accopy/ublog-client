<template>
  <div class="addview">
    <a-form :model="data.formState" style="width: 100%">
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
        <a-input
          v-if="data.tagsState.inputVisible"
          ref="inputRef"
          v-model:value="data.tagsState.inputValue"
          type="text"
          size="small"
          :style="{ width: '78px' }"
          @blur="handleInputConfirm"
          @keyup.enter="handleInputConfirm"
        />
        <a-tag v-else style="background: #fff; border-style: dashed" @click="showInput">
          <plus-outlined />
          New Tag
        </a-tag>
      </a-form-item>

      <a-form-item label="分类">
        <a-select
          v-model:value="data.formState.category"
          style="width: 100%"
          placeholder="Please select"
          :options="data.categoryList"
          @change="handleChange"
        >
        </a-select>
      </a-form-item>
      <div id="vditor" ref="vditorRef">
        <a-spin v-if="spin" tip="上传中,请稍后..." />
      </div>
    </a-form>

    <div class="bt">
      <a-button type="primary" @click="updatearticle">更新</a-button>
    </div>
  </div>
</template>

<script setup>
// 1.1 引入Vditor 构造函数
import Vditor from 'vditor';
// 1.2 引入样式
import 'vditor/dist/index.css';
import { ref, onMounted, reactive, nextTick, onBeforeMount, defineEmits } from 'vue';
import { updateArticle, getArticleDetail, upload } from '@/api/api';
import { message } from 'ant-design-vue';
const emit = defineEmits(['Refresh']);
import axios from 'axios';
const inputRef = ref();
const spin = ref(false);
const data = reactive({
  formState: {
    title: '',
    content: '',
    tagsName: [],
    category: '',
    //0草稿1发布
    state: 1,
    author: '',
    _id: '',
  },
  tagsState: {
    tagsName: [],
    inputVisible: false,
    inputValue: '',
  },
  categoryList: [],
});

const props = defineProps({
  //子组件接收父组件传递过来的值
  articleId: String,
  categoryList: Array,
});

// 2. 获取DOM引用
const vditor = ref();
// 3. 在组件初始化时，就创建Vditor对象，并引用
onMounted(() => {
  vditor.value = new Vditor('vditor', {
    height: '60vh',

    cache: {
      //是否开启本地缓存
      enable: false,
    },
    outline: {
      enable: false,
      position: 'right',
    },
    after: () => {
      getarticledetail();
    },
    upload: {
      accept: 'image/jpg, image/jpeg, image/png',
      max: 2 * 1024 * 1024, // 控制大小
      // linkToImgUrl: '/api/upload/fetch',
      multiple: false,
      filename(name) {
        return name
          .replace(/[^(a-zA-Z0-9\u4e00-\u9fa5\.)]/g, '')
          .replace(/[\?\\/:|<>\*\[\]\(\)\$%\{\}@~]/g, '')
          .replace('/\\s/g', '');
      },
      //上传smms服务
      async handler(files) {
        spin.value = true;
        const formData = new FormData();
        // console.log('files[0]', files[0]);
        formData.append('smfile', files[0]);
        // console.log('formData', formData);

        axios({
          headers: {
            authorization: 'yYzIjutlgECLSBNl2lwHaFEGANuxMJVm',
            'Content-Type': 'multipart/form-data',
          },
          method: 'post',
          url: '/upload',
          data: formData,
        }).then((res) => {
          spin.value = false;
          console.log('res', res);
          if (res.data.code == 'success') {
            vditor.value.insertValue(`![${name}](${res.data.data.url})`); // 文本编辑器中插入图片
            return '上传成功';
          } else {
            return res.data.code;
          }
        });

        // if (res.code == 200) {
        //   vditor.value.insertValue(`![${name}](${res.data})`); // 文本编辑器中插入图片
        //   return '上传成功';
        // }
        // return '上传失败';
      },
      // async handler(files) {
      //   const formData = new FormData();
      //   // console.log('files[0]', files[0]);
      //   formData.append('file', files[0]);
      //   // console.log('formData', formData);
      //   let res = await upload(formData);

      //   if (res.code == 200) {
      //     vditor.value.insertValue(`![${name}](${res.data})`); // 文本编辑器中插入图片
      //     return '上传成功';
      //   }
      //   return '上传失败';
      // },
    },
  });
});
onBeforeMount(() => {
  //父组件传入数据
  data.id = props.articleId;
  data.categoryList = props.categoryList;
  // getarticledetail()
});

//获取文章详情
const getarticledetail = () => {
  getArticleDetail(props.articleId).then((res) => {
    if (res.code == 200) {
      let result = res.data;
      data.formState.title = result.title;
      data.tagsState.tagsName = result.tagsName;
      data.formState.category = result.category;
      data.formState.content = result.content;
      data.formState.author = result.author;
      data.formState._id = result._id;
      vditor.value.setValue(data.formState.content);
      console.log('获取成功！');
    }
  });
};

const handleChange = (value) => {
  console.log('data', data.formState);
};

//更改文章
const updatearticle = (values) => {
  //提交前处理
  data.formState.tagsName = data.tagsState.tagsName;
  data.formState.content = vditor.value.getValue();

  // console.log(data.formState, 'data.formState');
  updateArticle(data.formState).then((res) => {
    // console.log('res', res);

    if (res.code == 200) {
      message.success({ content: '提交成功!' });
      emit('Refresh');
      resetform();
    }
  });
};

const resetform = () => {
  data.formState = {
    title: '',
    content: '',
    tagsName: [],
    category: '',
    //0草稿1发布
    state: 1,
    author: '',
    _id: '',
  };
};
const tagColor = (val) => {
  let colorlist = ['pink', 'cyan', 'blue', '#f50', '#2db7f5', '#87d068', '#108ee9'];
  let num = Number(val) % 7;
  console.log('val', val);
  return colorlist[num];
};

const handleClose = (removedTag) => {
  const tagsName = data.tagsState.tagsName.filter((tag) => tag !== removedTag);
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
</script>
<style scoped lang="scss">
.addview {
  box-sizing: border-box;
}

.handleline {
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
}

.bt {
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
}
</style>
