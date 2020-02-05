<template>
  <div class="detail-page" :class="{ 'is-show': isShow }">
    <Button @onClick="onToggleEdit">back</Button>
    <h2>{{ title }}</h2>
    <img :src="image" />
    <p>{{ isbn }}</p>
    <video id="video"></video>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Button from "../atoms/Button.vue";
import { BrowserMultiFormatReader } from "@zxing/library";
import axios from "axios";
@Component({
  components: {
    Button
  }
})
export default class DetailPage extends Vue {
  @Prop() private isShow!: boolean;
  @Prop() private onToggleEdit!: () => {};
  title: string = "hoge";
  isbn: number = 0;
  image: string = "";

  getBookInfo(isbn: number) {
    axios
      .get(`https://www.googleapis.com/books/v1/volumes?q=${isbn}`)
      .then(res => {
        return res.data.items.filter((item: any) => {
          let flag = false;
          item.volumeInfo.industryIdentifiers.filter(
            (ids: any) => (flag = Number(ids.identifier) === isbn)
          );
          return flag;
        });
      })
      .then(res => {
        const bookInfo = res[0];
        this.title = bookInfo.volumeInfo.title;
        this.isbn = bookInfo.volumeInfo.industryIdentifiers.filter(
          (ids: any) => {
            return Number(ids.identifier) === isbn;
          }
        )[0].identifier;
        this.image = bookInfo.volumeInfo.imageLinks.thumbnail;
      })
      .catch(err => {
        console.error("Not found this book");
      });
  }
  mounted() {
    const READER = new BrowserMultiFormatReader();
    console.log(READER);
    // const result: number = 9784902372199;
    // this.getBookInfo(result);

    // READER.getVideoInputDevices().then(videoInputDevices => {
    //   console.log(videoInputDevices);
    //   const selectedDeviceId = videoInputDevices[0].deviceId;
    //   READER.decodeFromVideoDevice(selectedDeviceId, "video", (result, err) => {
    //     if (result) {
    //       console.log(result);
    //       this.getBookInfo(Number(result));
    //     }
    //     if (err) {
    //       // console.error(err);
    //     }
    //   });
    // });
  }
}
</script>

<style scoped>
h2 {
  color: green;
}

.detail-page {
  width: 100vw;
  min-height: 100vh;
  position: absolute;
  top: 0;
  background-color: #fff;
  left: 100vw;
  transition: left 200ms ease-out;
}

.detail-page.is-show {
  left: 0;
}
</style>
