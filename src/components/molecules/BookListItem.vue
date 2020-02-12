<template>
  <li @click="onClick">
    <BookImage :src="data.image" :width="80" :height="108" :alt="data.name" />
    <h2>{{ data.name }}</h2>
  </li>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { BookData } from "../organisms/BookList.vue";
import BookImage from "../atoms/BookImage.vue";

@Component({
  components: {
    BookImage
  }
})
export default class BookListItem extends Vue {
  @Prop() private data!: BookData;
  @Prop() private index!: number;
  @Prop() onSelectData!: (index: number) => void;

  onClick() {
    this.onSelectData(this.index);
  }
}
</script>

<style scoped>
li {
  list-style: none;
  margin: 0 0 0.4rem 0;
  border-bottom: 1px solid #ccc;
  padding: 0 0.4rem 0.4rem;
  display: flex;
  align-items: center;
}

li:first-child {
  padding-top: 0.4rem;
}

h2 {
  flex-basis: auto;
  flex: 1;
  font-size: 1rem;
  margin: 0 1rem 0;
}
</style>
