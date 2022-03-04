<template>
  <div class="editor-container">
    <div class="header">
      <a-input
        class="inputBox"
        placeholder="请输入标题"
        v-model.trim="article.title"
      />
      <div class="right">
        <div class="btns">
          <a-button type="danger" @click="handleOut"> 退出 </a-button>
          <a-button type="primary" @click="handlePublish"> 发布 </a-button>
        </div>
        <div class="avatar">
          <a-avatar :size="45" icon="user" :src="avatarUrl" />
        </div>
      </div>
    </div>
    <div ref="editor"></div>
    <div class="explain">字数 <span>{{len}}</span></div>
    <div>
      <a-drawer
        title="发布文章"
        :width="720"
        :visible="visible"
        :body-style="{ paddingBottom: '80px' }"
        @close="onClose"
      >
        <a-form
          :form="form"
          :layout="formLayout"
          hide-required-mark
          labelAlign="right"
        >
          <a-form-item
            label="标签分类:"
            :label-col="{
              span: 4,
            }"
            :wrapper-col="{
              offset: 4,
            }"
          >
            <div class="select">
              <template v-for="info in tags">
                <a-checkable-tag
                  class="check"
                  :key="info.id"
                  :checked="selectedTags.indexOf(info.id) > -1"
                  @change="(checked) => handleTagChange(info, checked)"
                >
                  {{ info.tag }}
                </a-checkable-tag>
              </template>
            </div>
          </a-form-item>
          <a-form-item
            label="文章封面："
            :label-col="{
              span: 4,
            }"
            :wrapper-col="{
              offset: 4,
            }"
          >
            <a-upload
              :customRequest="handleUpload"
              list-type="picture-card"
              :file-list="fileList"
              @preview="handlePreview"
              :remove="deleteFileItem"
            >
              <div v-if="fileList.length < 1">
                <a-icon type="plus" />
                <div class="ant-upload-text">Upload</div>
              </div>
            </a-upload>
            <a-modal
              :visible="previewVisible"
              :footer="null"
              @cancel="handleCancel"
            >
              <img alt="example" style="width: 100%" :src="previewImage" />
            </a-modal>
          </a-form-item>
          <a-form-item
            label="编辑摘要："
            :label-col="{
              span: 4,
            }"
            :wrapper-col="{
              offset: 4,
            }"
          >
            <a-textarea
              v-model="article.abstract"
              :min-length="0"
              :max-length="100"
              :rows="4"
              placeholder="请输入文章摘要"
            >
            </a-textarea>
            <span>{{ abstractLength }} / 100</span>
          </a-form-item>
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
            取消
          </a-button>
          <a-button type="primary" @click="onHandlePublish">
            确认并发布
          </a-button>
        </div>
      </a-drawer>
    </div>
    <div class="outline-container">
      <Outline  v-if="showOutline" :list="handList" />
    </div> 
  </div>
</template>

<script>
import { upload } from "@/apis/upload";
import { getAllLabel } from "@/apis/label";
import { addArticle } from "@/apis/article";
import E from "wangeditor";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";
import Outline from '../Outline/index.vue'
export default {
  data() {
    return {
      title: "",
      form: this.$form.createForm(this),
      visible: false,
      showOutline:true,
      tags: [],
      selectedTags: [],
      editor: "",
      fileList: [],
      formLayout: "horizontal",
      article: {
        abstract: "",
        title: "",
        content: "",
        cover: "",
        LabelId: "",
      },
      previewImage: "",
      previewVisible: false,
      handList:[],
      len:0
    };
  },
  components:{
    Outline
  },
  computed: {
    avatarUrl() {
      return this.$store.getters.info.UserInfo.avatar || "";
    },
    abstractLength() {
      return this.article.abstract.length;
    },
  },
  created() {
    this.getLabelList();
  },
  mounted() {
    this.editor = new E(this.$refs.editor);
    const that = this
    const { $, BtnMenu} = E;
    class OutlineMenu extends BtnMenu {
      constructor(editor) {
        // data-title属性表示当鼠标悬停在该按钮上时提示该按钮的功能简述
        const $elem = $(
          `<div class="w-e-menu" data-title="大纲">
               <span style='color: #999;' class="icon-dagangguanli_moren iconfont icon"></span>
            </div>`
        );
        super($elem, editor);
      }
      clickHandler() {
        that.showOutline = !that.showOutline

      }
      tryChangeActive() {}
    }
    const menuKey = 'alertMenuKey'
    E.registerMenu(menuKey, OutlineMenu)
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
    this.editor.config.zIndex = 2;
    this.editor.config.languageTab = "    ";
    this.editor.config.height = '800';
    this.editor.config.onchangeTimeout = 2500;
    this.editor.config.showLinkImg = false;
    this.editor.config.customUploadImg = this.diyUploadImg;
    this.editor.config.onCatalogChange = this.CatalogChange;
    this.editor.config.onchange = this.contentChange
    this.editor.config.onchangeTimeout = 2500;
    this.editor.create();
  },
  methods: {
    handleCancel() {
      this.previewVisible = false;
    },
    handleOut() {
      console.log("点击退出");
      this.$router.push({
        name: "Home",
      });
    },
    handlePublish() {
      this.visible = true;
      const html = this.editor.txt.html();
      this.article.content = html;
    },
    // 内容发生改变
    contentChange(){
      this.len = this.editor.txt.text().length
    },
    onClose() {
      this.visible = false;
    },
    onHandlePublish() {
      // 1. 验证表单 -- 标签、摘要
      console.log(this.article);
      // 2. 验证内容 -- 标题、内容
      if (this.hasValue(this.article)) {
        // 每一项都有值
        // 3. 发送ajax请求，跳转页面
        addArticle(this.article).then((res) => {
          console.log(res);
          // 弹出消息
          if (res.code == "200") {
            this.$message.success("发布成功！");
          }
          // 设置store
          this.$store.dispatch("article/changeTitle", this.article.title);
          // 跳转页面
          this.$router.push({
            path: "/published",
          });
          //
        });
      }
    },
    // 验证对象中属性是否全部有值
    hasValue(obj) {
      for (const key in obj) {
        if (Object.hasOwnProperty.call(obj, key)) {
          const value = obj[key];
          if (key === "abstract" && value.length < 20) {
            this.$message.warn("摘要不能少于20字");
            return false;
          }
          if (!value) {
            return false;
          }
        }
      }
      return true;
    },
    // 自定义富文本图片上传
    diyUploadImg(resultFiles, insertImgFn) {
      const formData = new FormData();
      formData.append("file", resultFiles[0]);
      formData.append("name", this.$store.getters.info.username);
      upload(formData).then((res) => {
        insertImgFn(res.data);
      });
    },
    handleTagChange(tag, check) {
      if (check) {
        this.selectedTags = [tag.id];
        this.article.LabelId = tag.id;
      }
    },
    getLabelList() {
      getAllLabel().then((res) => {
        this.tags = res.data;
      });
    },
    handleUpload(info) {
      // 初始化
      const fileInfo = {
        uid: info.file.uid,
        name: info.file.name,
        status: "uploading",
        response: "",
        url: "",
      };
      this.fileList.push(fileInfo);
      const formData = new FormData();
      formData.append("file", info.file);
      formData.append("name", this.$store.getters.info.username);

      upload(formData).then((res) => {
        fileInfo.status = "done";
        fileInfo.response = res.msg;
        fileInfo.url = res.data;
        this.article.cover = res.data;
      });
    },
    handlePreview(file) {
      this.previewVisible = true;
      this.previewImage = file.url;
    },
    deleteFileItem(file) {
      //找到当前文件所在列表的索引
      let index = this.fileList.indexOf(file);
      //从列表中移除该文件
      this.fileList.splice(index, 1);
      return true;
    },
    CatalogChange(headList) {

      this.handList = headList
      
    },
  },
};
</script>

<style lang="scss" scoped>
@import url('//at.alicdn.com/t/font_2804341_7i7gmdr6rw5.css');
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
.check {
  border: 1px solid #f1f1f1;
}

div.outline-container{
  position: fixed;
  top: 20%;
  right: 120px;
  z-index: 1000;
  background-color: rgb(254,254,254);
  border-left: 1px solid rgb(201, 200, 200);
}
</style>
