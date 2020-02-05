<template>
  <li>
    <img v-if="data.image" :src="data.image" alt />
    <div v-else class="no-image">NO IMAGE</div>
    <h2>{{ data.name }}</h2>
  </li>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { BookData } from "../organisms/BookList.vue";

@Component
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

img,
.no-image {
  width: 80px;
  height: auto;
  flex-basis: 80px;
  margin-right: 1rem;
}

.no-image {
  border: 1px solid #ccc;
  background-color: #eee;
  font-size: 0.5rem;
  height: 109px;
  display: flex;
  justify-content: center;
  align-items: center;
}

h2 {
  flex-basis: auto;
  font-size: 1rem;
  margin: 0;
}
</style>
