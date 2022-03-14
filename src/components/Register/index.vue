<template>
  <div class="register">
    <a-steps :current="current">
      <a-step v-for="item in steps" :key="item.title" :title="item.title" />
    </a-steps>
    <div class="steps-content">
      <div class="content" v-if="current === 0">
        第一步的内容
        要求输入账号、昵称、密码
      </div>
      <div class="content" v-if="current === 1">
        第二步的内容
        要求输入电话、邮箱、性别、个性签名
      </div>
    </div>
    <div class="steps-action">
      <a-button v-if="current < steps.length - 1" type="primary" @click="next">
        Next
      </a-button>
      <a-button
        v-if="current == steps.length - 1"
        type="primary"
        @click="handleRegister"
      >
        Done
      </a-button>
      <a-button v-if="current > 0" style="margin-left: 8px" @click="prev">
        Previous
      </a-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      current: 0,
      steps: [
        {
          title: "第一步",
        },
        {
          title: "第二步",
        },
      ],
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
      this.$message.success("Processing complete!");
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
  padding-top: 80px;
}

.steps-action {
  margin-top: 24px;
}
</style>
