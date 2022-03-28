<template>
  <div class="modify-container">
    <a-form
      :form="form"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 12 }"
      @submit="handleSubmit"
    >
      <a-form-item
        label=" "
        name="avatar"
        :colon="false"
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 12 }"
      >
        <!-- name="avatar" -->
        点击头像即可上传
        <a-upload
          list-type="picture-card"
          class="avatar-uploader"
          :show-upload-list="false"
          :customRequest="handleUpload"
          :before-upload="beforeUpload"
          @change="handleChange"
        >
          <img v-if="imageUrl" :src="imageUrl" alt="avatar" width="100%" />
          <div v-else>
            <a-icon :type="loading ? 'loading' : 'plus'" />
            <div class="ant-upload-text">Upload</div>
          </div>
        </a-upload>
      </a-form-item>
      <a-form-item label="昵称" name="author">
        <a-input v-decorator="['author', validateRulesObj.author]" />
      </a-form-item>
      <a-form-item label="密码" name="password">
        <a-input-password
          type="password"
          autocomplete="new-password"
          placeholder="请输入密码"
          v-decorator="['password', validateRulesObj.password]"
        />
      </a-form-item>
      <a-form-item label="性别" name="sex">
        <a-radio-group v-decorator="['sex']" @change="handleSelectChange">
          <a-radio value="1"> 男 </a-radio>
          <a-radio value="0"> 女 </a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="邮箱" name="email">
        <a-input
          v-decorator="[
            'email',
            { rules: [{ required: true, message: '请输入邮箱' }] },
          ]"
        />
      </a-form-item>
      <a-form-item label="个性签名" name="autograph">
        <a-input
          v-decorator="[
            'autograph',
            { rules: [{ required: true, message: '请输入个性签名' }] },
          ]"
        />
      </a-form-item>
      <a-form-item label="电话" name="tel">
        <a-input
          v-decorator="[
            'tel',
            { rules: [{ required: true, message: '请输入电话号码' }] },
          ]"
        />
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
        <a-button type="primary" html-type="submit"> 确定修改 </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { upload } from "@/apis/upload.js";
export default {
  props: {
    info: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      sex: "1",
      formLayout: "horizontal",
      form: this.$form.createForm(this, { name: "coordinated" }),
      loading: false,
      imageUrl: this.info.avatar,
      validateRulesObj: {
        password: {
          rules: [
            {
              required: true,
              validator: (rule, value, cbfn) => {
                const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;
                if (value === "*********") {
                  cbfn();
                }
                if (!value) {
                  cbfn("请输入密码");
                } else if (!value.trim().length) {
                  cbfn("请输入密码");
                } else if (
                  value.trim().length < 8 ||
                  value.trim().length > 16
                ) {
                  cbfn("密码长度为8-16");
                } else if (!reg.test(value.trim())) {
                  cbfn("密码至少包含 数字和英文，长度8-16");
                }
                cbfn();
              },
            },
          ],
        },
        author: {
          rules: [
            {
              required: true,
              validator: (rule, value, cbfn) => {
                // const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;
                if (!value) {
                  cbfn("请输入昵称");
                } else if (!value.trim().length) {
                  cbfn("请输入昵称");
                } else if (
                  value.trim().length < 1 ||
                  value.trim().length > 10
                ) {
                  cbfn("昵称长度为1-10");
                }
                cbfn();
              },
            },
          ],
        },
      },
    };
  },
  mounted() {
    // console.log(this.info)
    this.form.setFieldsValue(this.info);
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log(values);
        }
      });
    },
    handleSelectChange(value) {
      this.form.setFieldsValue({
        sex: value.target.value,
      });
    },
    handleChange(info) {
      if (info.file.status === "uploading") {
        this.loading = true;
        return;
      }
      if (info.file.status === "done") {
        // Get this url from response in real world.
        // getBase64(info.file.originFileObj, imageUrl => {
        //   this.imageUrl = imageUrl;
        //   this.loading = false;
        // });
      }
    },
    beforeUpload(file) {
      const isJpgOrPng =
        file.type === "image/jpeg" || file.type === "image/png";
      if (!isJpgOrPng) {
        this.$message.error("You can only upload JPG file!");
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("Image must smaller than 2MB!");
      }
      return isJpgOrPng && isLt2M;
    },
    handleUpload(info) {
      const formData = new FormData();
      formData.append("file", info.file);
      formData.append("name", this.$store.getters.info.username);
      upload(formData).then((res) => {
        this.imageUrl = res.data;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.modify-container {
  width: 100%;
  // .avatar-uploader.ant-upload-picture-card-wrapper {
  //   // text-align: center;
  //   position: relative;
  // }
}
</style>
