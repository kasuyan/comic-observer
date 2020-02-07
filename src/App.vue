<template>
  <div id="app">
    <Top
      :onClickEditShow="onClickEditShow"
      :bookData="bookData"
      :onSelectData="onSelectData"
    />
    <Detail
      :isShow="isEdit"
      :currentData="currentData"
      :onDeleteBook="onDeleteBook"
      :onClickEditHide="onClickEditHide"
    />
    <Menu
      :onAddData="onAddData"
      :onClickEditShow="onClickEditShow"
      :isEdit="isEdit"
      :onClickEditHide="onClickEditHide"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Top from "./components/pages/top.vue";
import Detail from "./components/pages/detail.vue";
import Menu from "./components/molecules/Menu.vue";
import { BookData } from "./components/organisms/BookList.vue";

@Component({
  components: {
    Top,
    Detail,
    Menu
  }
})
export default class App extends Vue {
  isEdit: boolean = false;
  currentData: object = {};
  bookData: BookData[] = [
    {
      isbn: 12341341,
      name: "鬼滅の刃 19 (ジャンプコミックスDIGITAL) Kindle版",
      vol: 19,
      description: "",
      updata: true,
      image: "https://images-fe.ssl-images-amazon.com/images/I/51ytIQmuA4L.jpg"
    },
    {
      isbn: 12341342,
      name: "ONE PIECE モノクロ版 95 (ジャンプコミックスDIGITAL) Kindle版",
      vol: 95,
      description: "",
      updata: false,
      image:
        "https://images-fe.ssl-images-amazon.com/images/I/61o1ZBYiFxL._SY346_.jpg"
    },
    {
      isbn: 0,
      name: "未設定タイトル",
      description: "",
      vol: 0,
      updata: false,
      image: ""
    }
  ];

  onClickEditShow() {
    document.body.className = "edit";
    this.isEdit = true;
  }

  onClickEditHide() {
    document.body.className = "";
    this.isEdit = false;
  }

  onSelectData(index: number) {
    this.currentData = this.bookData[index];
    this.onClickEditShow();
  }

  onAddData() {
    this.bookData.unshift({
      isbn: 0,
      name: "未設定タイトル",
      vol: 0,
      description: "説明文",
      updata: false,
      image: ""
    })
    this.onSelectData(0);
  }

  onDeleteBook(isbn: number) {
    let id: number = 0;

    const deleteItem = this.bookData.filter((item, index) => {
      if (item.isbn === isbn) {
        id = index;
      }
    });

    this.bookData.splice(id, 1);
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  position: relative;
  overflow: hidden;
  min-height: 100vh;
}
</style>
