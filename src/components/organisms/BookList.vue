<template>
  <div>
    <ul>
      <BookListItem
        v-for="(item, index) in bookData"
        :key="item.isbn"
        :data="item"
        :index="index"
        :onSelectData="onSelectData"
      />
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
  description: string;
  image: string;
  updata: boolean;
}

@Component({
  components: {
    BookListItem
  }
})
export default class BookList extends Vue {
  @Prop() private bookData!: BookData[];
  @Prop() private msg!: string;
  @Prop() onSelectData!: (index: number) => void;
}
</script>

<style scoped>
h1 {
  color: red;
}

ul {
  margin: 0 0 6rem;
  padding: 0;
}
</style>
