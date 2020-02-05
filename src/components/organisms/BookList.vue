<template>
  <div>
    <ul v-for="item in bookData" :key="item.name">
      <BookListItem :data="item" />
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import BookListItem from "../molecules/BookListItem.vue";

export interface BookData {
  isbn: number;
  name: string;
  vol: number;
  image: string;
  updata: boolean;
}

@Component({
  components: {
    BookListItem
  }
})
export default class BookList extends Vue {
  @Prop({ default: "aho" }) private bookData!: BookData[];
  @Prop() private msg!: string;
}
</script>

<style scoped>
h1 {
  color: red;
}

ul {
  padding: 0;
}
</style>
