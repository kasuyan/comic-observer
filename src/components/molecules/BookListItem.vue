<template>
  <li>
    <BookImage :src="data.image" :width="80" :height="108" :alt="data.name" />
    <!-- <img v-if="data.image" :src="data.image" alt />
    <div v-else class="no-image">NO IMAGE</div>-->
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
}
</script>

<style scoped>
li {
  list-style: none;
  margin: 0;
  display: flex;
  align-items: center;
}

h2 {
  flex-basis: auto;
  flex: 1;
  font-size: 1rem;
  margin: 0 1rem 0;
}
</style>
