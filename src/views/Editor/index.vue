<template>
  <div class="editor-container">
    <div class="header">
      <a-input class="inputBox" placeholder="请输入标题" v-model="title" />
      <div class="right">
        <div class="btns">
          <a-button type="danger" @click="handleOut"> 退出 </a-button>
          <a-button type="primary" @click="handlePublish"> 发布 </a-button>
        </div>
        <div class="avatar">
          <a-avatar :size="45" icon="user" />
        </div>
      </div>
    </div>
    <div ref="editor"></div>
    <div class="explain">字数</div>
    <div>
      <a-drawer
        title="Create a new account"
        :width="720"
        :visible="visible"
        :body-style="{ paddingBottom: '80px' }"
        @close="onClose"
      >
        <a-form :form="form" layout="vertical" hide-required-mark>
          <a-row :gutter="16">
            <a-col :span="12">
              <a-form-item label="Name">
                <a-input
                  v-decorator="[
                    'name',
                    {
                      rules: [
                        { required: true, message: 'Please enter user name' },
                      ],
                    },
                  ]"
                  placeholder="Please enter user name"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="Url">
                <a-input
                  v-decorator="[
                    'url',
                    {
                      rules: [{ required: true, message: 'please enter url' }],
                    },
                  ]"
                  style="width: 100%"
                  addon-before="http://"
                  addon-after=".com"
                  placeholder="please enter url"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="16">
            <a-col :span="12">
              <a-form-item label="Owner">
                <a-select
                  v-decorator="[
                    'owner',
                    {
                      rules: [
                        { required: true, message: 'Please select an owner' },
                      ],
                    },
                  ]"
                  placeholder="Please a-s an owner"
                >
                  <a-select-option value="xiao"> Xiaoxiao Fu </a-select-option>
                  <a-select-option value="mao"> Maomao Zhou </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="Type">
                <a-select
                  v-decorator="[
                    'type',
                    {
                      rules: [
                        { required: true, message: 'Please choose the type' },
                      ],
                    },
                  ]"
                  placeholder="Please choose the type"
                >
                  <a-select-option value="private"> Private </a-select-option>
                  <a-select-option value="public"> Public </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="16">
            <a-col :span="12">
              <a-form-item label="Approver">
                <a-select
                  v-decorator="[
                    'approver',
                    {
                      rules: [
                        {
                          required: true,
                          message: 'Please choose the approver',
                        },
                      ],
                    },
                  ]"
                  placeholder="Please choose the approver"
                >
                  <a-select-option value="jack"> Jack Ma </a-select-option>
                  <a-select-option value="tom"> Tom Liu </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="DateTime">
                <a-date-picker
                  v-decorator="[
                    'dateTime',
                    {
                      rules: [
                        {
                          required: true,
                          message: 'Please choose the dateTime',
                        },
                      ],
                    },
                  ]"
                  style="width: 100%"
                  :get-popup-container="(trigger) => trigger.parentNode"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="16">
            <a-col :span="24">
              <a-form-item label="Description">
                <a-textarea
                  v-decorator="[
                    'description',
                    {
                      rules: [
                        {
                          required: true,
                          message: 'Please enter url description',
                        },
                      ],
                    },
                  ]"
                  :rows="4"
                  placeholder="please enter url description"
                />
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
        <div
          :style="{
            position: 'absolute',
            right: 0,
            bottom: 0,
            width: '100%',
            borderTop: '1px solid #e9e9e9',
            padding: '10px 16px',
            background: '#fff',
            textAlign: 'right',
            zIndex: 100,
          }"
        >
          <a-button :style="{ marginRight: '8px' }" @click="onClose">
            Cancel
          </a-button>
          <a-button type="primary" @click="onClose"> Submit </a-button>
        </div>
      </a-drawer>
    </div>
  </div>
</template>

<script>
import E from "wangeditor";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";
export default {
  data() {
    return {
      title: "",
      form: this.$form.createForm(this),
      visible: false,
    };
  },
  mounted() {
    this.editor = new E(this.$refs.editor);

    this.editor.config.menus = [
      "head",
      "bold",
      "fontSize",
      "fontName",
      "italic",
      "underline",
      "strikeThrough",
      "indent",
      "lineHeight",
      "foreColor",
      "link",
      "list",
      "todo",
      "justify",
      "quote",
      "emoticon",
      "image",
      "table",
      "code",
      "splitLine",
      "undo",
      "redo",
    ];
    this.editor.highlight = hljs;
    this.editor.config.zIndex = 2
    this.editor.config.languageTab = "    ";
    this.editor.config.height = 600;
    this.editor.config.showLinkImg = false
    this.editor.config.customUploadImg = this.diyUploadImg
    this.editor.create();
  },
  methods: {
    handleOut() {
      console.log("点击退出");
      this.$router.push({
        name: "Home",
      });
    },
    handlePublish() {
      console.log("发布");
      this.visible = true;
      const html = this.editor.txt.html()
      console.log(html)
    },

    onClose() {
      this.visible = false;
    },
    diyUploadImg(resultFiles, insertImgFn){
      console.log(resultFiles)
      console.log(insertImgFn)
    }
  },
};
</script>

<style lang="scss" scoped>
.header {
  height: 50px;
  display: flex;
  justify-content: space-between;
  .inputBox {
    width: 70%;
    height: 100%;
    font-size: 20px;
  }
  .right {
    width: 25%;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    .btns {
      width: 60%;
      display: flex;
      align-items: center;
      justify-content: space-around;
    }
    .avatar {
      width: 40%;
      margin-left: -20px;
      display: flex;
      align-items: center;
    }
  }
}
</style>
