<template>
  <div>
    <h1>{{ message }}</h1>
    <BookList :bookData="bookData" :msg="message" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import BookList, { BookData } from "../organisms/BookList.vue";

@Component({
  components: {
    BookList
  }
})
export default class TopPage extends Vue {
  message: string = "TOP";
  bookData: BookData[] = [
    {
      isbn: 12341341,
      name: "鬼滅の刃 19 (ジャンプコミックスDIGITAL) Kindle版",
      vol: 19,
      updata: true,
      image: "https://images-fe.ssl-images-amazon.com/images/I/51ytIQmuA4L.jpg"
    },
    {
      isbn: 12341342,
      name: "ONE PIECE モノクロ版 95 (ジャンプコミックスDIGITAL) Kindle版",
      vol: 95,
      updata: false,
      image:
        "https://images-fe.ssl-images-amazon.com/images/I/61o1ZBYiFxL._SY346_.jpg"
    },
    {
      isbn: 12341344,
      name: "Dr.STONE 14 (ジャンプコミックスDIGITAL) Kindle版",
      vol: 5,
      updata: false,
      image:
        "https://images-fe.ssl-images-amazon.com/images/I/51L0TyiWl5L._SY346_.jpg"
    },
    {
      isbn: 12341345,
      name: "dd",
      vol: 51,
      updata: false,
      image: ""
    }
  ];
}
</script>

<style scoped>
h1 {
  color: red;
}
</style>
