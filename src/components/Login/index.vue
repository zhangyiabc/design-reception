<template>
  <div class="login">
    <div class="owl" :class="hasPassword ? 'password' : ''" ref="owl">
      <div class="hand"></div>
      <div class="hand hand-r"></div>
      <div class="arms">
        <div class="arm"></div>
        <div class="arm arm-r"></div>
      </div>
    </div>
    <div class="input-box">
      <a-input
        class="inputBox"
        type="text"
        name="user"
        v-model="username"
        placeholder="账号"
      />
      <a-input
        class="inputBox"
        name="user"
        type="password"
        v-model="password"
        placeholder="密码"
        @focus="handleFocus"
        @blur="handleBlur"
        ref="password"
      />
      <button @click="handleLogin">登录</button>
    </div>
  </div>
</template>

<script>
import store from "@/store";

export default {
  data() {
    return {
      hasPassword: false,
      username: "",
      password: "",
    };
  },
  mounted() {},
  methods: {
    handleLogin() {
      if (!this.username || !this.password) {
        this.$message.error("请检查账号是否完整");
        return;
      }
      // 触发action
      store
        .dispatch("user/login", {
          username: this.username,
          password: this.password,
        })
        .then((res) => {
          // 此时登录成功
          store.dispatch("setting/setShow", false);
          store.dispatch("user/getUserInfo");
          // console.log(res);
          // console.log(this.$socket)
          this.$socket.emit("login", {
            userId: res.id,
          });
        });
    },
    handleFocus() {
      this.hasPassword = true;
    },
    handleBlur() {
      this.hasPassword = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.input-box {
  /* 弹性布局 垂直排列 */
  display: flex;
  flex-direction: column;
}
.input-box .inputBox {
  height: 40px;
  border-radius: 3px;
  /* 缩进15像素 */
  text-indent: 15px;
  outline: none;
  border: 1px solid #d9d9d9;
  margin-bottom: 15px;
}
.input-box .inputBox:focus {
  outline: 1px solid lightseagreen;
}
.input-box button {
  border: none;
  height: 45px;
  background-color: lightseagreen;
  color: #fff;
  border-radius: 3px;
  cursor: pointer;
}
/* 接下来是猫头鹰的样式 */
.owl {
  width: 211px;
  height: 108px;
  /* 背景图片 */
  background: url("../../assets/mtyt.png") no-repeat;
  /* 绝对定位 */
  position: absolute;
  top: -100px;
  /* 水平居中 */
  left: 50%;
  transform: translateX(-50%);
}
.owl .hand {
  width: 34px;
  height: 34px;
  border-radius: 40px;
  background-color: #472d20;
  /* 绝对定位 */
  position: absolute;
  left: 12px;
  bottom: -8px;
  /* 沿Y轴缩放0.6倍（压扁） */
  transform: scaleY(0.6);
  /* 动画过渡 */
  transition: 0.3s ease-out;
}
.owl .hand.hand-r {
  left: 170px;
}
.owl.password .hand {
  transform: translateX(42px) translateY(-15px) scale(0.7);
}
.owl.password .hand.hand-r {
  transform: translateX(-42px) translateY(-15px) scale(0.7);
}
.owl .arms {
  position: absolute;
  top: 58px;
  width: 100%;
  height: 41px;
  overflow: hidden;
}
.owl .arms .arm {
  width: 40px;
  height: 65px;
  position: absolute;
  left: 20px;
  top: 40px;
  background: url("../../assets/mty.png") no-repeat;
  transform: rotate(-20deg);
  transition: 0.3s ease-out;
}
.owl .arms .arm.arm-r {
  transform: rotate(20deg) scaleX(-1);
  left: 158px;
}
.owl.password .arms .arm {
  transform: translateY(-40px) translateX(40px);
}
.owl.password .arms .arm.arm-r {
  transform: translateY(-40px) translateX(-40px) scaleX(-1);
}
</style>
