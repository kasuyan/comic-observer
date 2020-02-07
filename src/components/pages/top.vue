<template>
  <div>
    <BookList :bookData="bookData" :onSelectData="onSelectData" />
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
  @Prop() bookData!: BookData;
  @Prop() onSelectData!: (index: number) => void;
}
</script>

<style scoped>
h1 {
  color: red;
}
</style>
