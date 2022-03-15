<template>
  <div class="register">
    <a-steps :current="current">
      <a-step v-for="item in steps" :key="item.title" :title="item.title" />
    </a-steps>
    <div class="steps-content">
      <div class="content" v-if="current === 0">
        <a-form
          class="form"
          :form="formReg"
          :label-col="{ span: 10 }"
          :wrapper-col="{ span: 14 }"
          @submit="handleSubmit"
        >
          <a-form-item label="author">
            <a-input
              autocomplete="nope"
              placeholder="请输入您的昵称"
              v-decorator="['author', validateRulesObj.author]"
            />
          </a-form-item>
          <a-form-item label="username">
            <a-input
              placeholder="请输入用户名"
              autocomplete="off"
              v-decorator="['username', validateRulesObj.username]"
            >
            </a-input>
          </a-form-item>
          <a-form-item label="password" name="password">
            <a-input-password
              type="password"
              autocomplete="new-password"
              placeholder="请输入密码"
              v-decorator="['password', validateRulesObj.password]"
            />
          </a-form-item>
          <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
            <a-button type="primary" html-type="submit"> Submit </a-button>
          </a-form-item>
        </a-form>
      </div>
      <div class="content" v-if="current === 1">
        <img :src="imgSrc" width="100%" alt="">
        <span>注册成功</span>
      </div>
    </div>
    <div class="steps-action">
      <a-button
        :loading="regLoading"
        v-if="current < steps.length - 1"
        :disabled="!canNext"
        type="primary"
        @click="next"
      >
        Next
      </a-button>
      <a-button
        v-if="current == steps.length - 1"
        type="primary"
        @click="handleRegister"
      >
        前去登录
      </a-button>
      <!-- <a-button v-if="current > 0" style="margin-left: 8px" @click="prev">
        Previous
      </a-button> -->
    </div>
  </div>
</template>

<script>
const imgSrc = require('@/assets/success.png')
import {register} from '@/apis/user'
export default {
  data() {
    return {
      imgSrc,
      canNext: false,
      regLoading: false,
      current: 0,
      userId: -1,
      userInfoId:-1,
      steps: [
        {
          title: "第一步",
        },
        {
          title: "第二步",
        },
      ],
      formLayout: "horizontal",
      formReg: this.$form.createForm(this, { name: "register" }),
      formUserInfo: this.$form.createForm(this, { name: "userInfo" }),
      validateRulesObj: {
        password: {
          rules: [
            {
              required: true,
              validator: (rule, value, cbfn) => {
                const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;
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
        username: {
          rules: [
            {
              required: true,
              validator: (rule, value, cbfn) => {
                // const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;
                if (!value) {
                  cbfn("请输入账号");
                } else if (!value.trim().length) {
                  cbfn("请输入账号");
                } else if (
                  value.trim().length < 6 ||
                  value.trim().length > 20
                ) {
                  cbfn("账号长度为6-20");
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
  methods: {
    next() {
      this.current++;
    },
    prev() {
      this.current--;
    },
    handleRegister() {
      // 调接口
      this.$emit('handleRegister')
    },
    handleSubmit(e) {
      e.preventDefault();
      this.formReg.validateFields((err, values) => {
        if (!err) {
          // 该状态
          // 掉接口
          // 下一页
          this.regLoading = true
          register(values).then(resp => {
            this.canNext = true
            const {data} = resp
            this.userId = data.id
            this.userInfoId = data.UserInfoId
            this.next()
            this.$message.success('注册成功')
          }).finally(() => {
            this.regLoading = false
          })
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.steps-content {
  margin-top: 16px;
  border: 1px dashed #e9e9e9;
  border-radius: 6px;
  background-color: #fafafa;
  min-height: 200px;
  text-align: center;
  padding: 40px 20px 20px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  .form {
    width: 100%;
  }
}

.steps-action {
  margin-top: 24px;
}
</style>
