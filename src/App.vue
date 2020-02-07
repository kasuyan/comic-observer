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
      :onAddDataAndOpen="onAddDataAndOpen"
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
import localforage from "localforage";

export interface eventHub extends HTMLDocument {
  eventHub: Vue;
}
export declare const global: eventHub;
export const eventHub = (global.eventHub = new Vue());

localforage.config({
  driver: localforage.INDEXEDDB,
  name: "comicObserver",
  version: 1.0,
  storeName: "bookDB",
  description: "set book data"
});

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
  bookData: BookData[] = [];

  created() {
    localforage.getItem("CDDB").then((res: any): void => {
      if (res && res.length) {
        this.bookData = res;
      } else {
        this.bookData = [];
        this.onAddData();
      }
    });
  }

  saveBookDta() {
    localforage.setItem("CDDB", this.bookData);
  }

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
      isbn: Date.now(),
      name: "未設定タイトル",
      vol: 0,
      description: "説明文",
      updata: false,
      image: ""
    });
    this.saveBookDta();
  }

  onAddDataAndOpen() {
    this.onAddData();
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
    this.saveBookDta();
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
