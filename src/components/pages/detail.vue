<template>
  <div class="detail-page" :class="{ 'is-show': isShow }">
    <textarea class="title" v-model="currentData.name" />
    <div class="col2">
      <BookImage :src="currentData.image" :width="140" :height="190" :alt="currentData.name" />
      <dl class="info">
        <dt>あらすじ</dt>
        <dd>{{ currentData.description }}</dd>
        <dt>ISBN</dt>
        <dd>
          <textarea class="isbn" v-model="currentData.isbn" />
        </dd>
      </dl>
    </div>
    <Button @onClick="onBookSave">保存</Button>
    <Button @onClick="onSync">入力データから登録</Button>
    <Button @onClick="onScan">バーコードから登録</Button>
    <Button :isDelete="true" @onClick="onDelete">マンガの削除</Button>
    <!-- <div class="newbook">新刊情報</div> -->
    <div class="scan-view" v-show="isScaning">
      <video id="video"></video>
      <span class="red-line"></span>
      <p>
        バーコードは978
        <b>4</b>で始まるものを読み取ってください
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import axios from "axios";
import { BrowserMultiFormatReader } from "@zxing/library";
import { eventHub } from "../../App.vue";

import Button from "../atoms/Button.vue";
import { BookData } from "../organisms/BookList.vue";
import BookImage from "../atoms/BookImage.vue";

@Component({
  components: {
    Button,
    BookImage
  }
})
export default class DetailPage extends Vue {
  @Prop() private currentData!: BookData;
  @Prop() private isShow!: boolean;
  @Prop() onDeleteBook!: (idx: number) => void;
  @Prop() onClickEditHide!: () => void;
  @Prop() saveBookDta!: () => void;

  title: string = "hoge";
  isbn: number = 0;
  image: string = "";
  READER: any = null;
  errorId: number = 0;
  isScaning: boolean = false;
  isLoading: boolean = false;

  created() {
    eventHub.$on("stopScan", this.onStopScan);
  }

  onBookSave() {
    this.saveBookDta();
  }

  async onSync() {
    await this.getBookInfo(this.currentData.isbn);
    this.onBookSave();
  }

  onStopScan() {
    if (this.READER) {
      this.READER.reset();
    }
    this.saveBookDta();
    this.isScaning = false;
  }

  onDelete() {
    if (window.confirm("delete this comic ?")) {
      this.onDeleteBook(this.currentData.isbn);
      this.onClickEditHide();
      this.onStopScan();
    }
  }

  onScan() {
    this.READER = new BrowserMultiFormatReader();
    this.isScaning = true;
    this.READER.getVideoInputDevices().then((videoInputDevices: any) => {
      const target =
        videoInputDevices.length === 1 ? 0 : videoInputDevices.length - 1;
      const selectedDeviceId = videoInputDevices[target].deviceId;
      this.READER.decodeFromVideoDevice(
        selectedDeviceId,
        "video",
        (result: any, err: any) => {
          if (result && this.errorId !== Number(result.text)) {
            this.getBookInfo(Number(result));
          }
          if (err) {
            console.error(err);
          }
        }
      );
    });
  }

  async getBookInfo(isbn: number) {
    if (this.isLoading) {
      return;
    }
    this.isLoading = true;
    axios
      .get(`https://api.openbd.jp/v1/get?isbn=${isbn}`)
      .then(res => {
        if (res.data[0]) {
          const bookInfo = res.data[0];
          this.currentData.name = bookInfo.summary.title;
          this.currentData.isbn = bookInfo.summary.isbn;
          this.currentData.description =
            bookInfo.onix.CollateralDetail.TextContent[0].Text;
          this.currentData.image = `https://iss.ndl.go.jp/thumbnail/${isbn}`;
        }
      })
      .catch(err => {
        this.errorId = isbn;
      })
      .finally(() => {
        this.isLoading = false;
        this.saveBookDta();
      });
  }
}
</script>

<style scoped>
.detail-page {
  width: calc(100vw - 2rem);
  height: calc(100vh - 2rem);
  position: fixed;
  bottom: -100vh;
  background-color: #fff;
  transition: bottom 200ms ease-out;
  padding: 1rem;
}

h2,
textarea {
  font-size: 1.5rem;
  margin: 0 0 1rem;
  color: #2c3e50;
  font-weight: bold;
  box-sizing: border-box;
}

textarea.title {
  width: 100%;
  border: 1px solid #ccc;
  padding: 0.5rem;
}

textarea.isbn {
  width: auto;
  font-size: 1rem;
  width: 100%;
  border: 1px solid #ccc;
  padding: 0.5rem;
  font-size: 0.8rem;
}

.col2 {
  display: flex;
}

.col2 > div {
  margin-right: 1rem;
  flex-basis: 140px;
}

.col2 > dl {
  flex: 1;
  text-align: left;
  margin: 0;
}

.col2 > dl dt {
  font-size: 0.8rem;
  font-weight: bold;
}

.col2 > dl dd {
  font-size: 0.7rem;
  margin: 0.5rem 0 1rem 1rem;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 5;
  overflow: hidden;
}

.detail-page.is-show {
  bottom: 0;
  text-align: center;
}

.newbook {
  margin: 2rem 0;
  height: 5rem;
  border: 1px solid #ccc;
  background-color: #eee;
}

.scan-view {
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0.95);
  width: 100%;
  height: 100%;
}

.red-line {
  border: 2px solid rgb(225, 59, 59);
  position: absolute;
  top: 46vh;
  left: 15vw;
  width: 70vw;
  height: 8vh;
}

.scan-view p {
  position: absolute;
  top: 2vh;
  font-size: 0.6rem;
  text-align: center;
  width: 100%;
}

.scan-view p b {
  color: rgb(225, 59, 59);
}

video {
  margin: 10vh 10vw;
  width: 80vw;
  height: 80vh;
  border: 1px solid #ccc;
}
</style>
