<template>
  <div
    :style="{
      width: width + 'px',
      height: height + 'px',
      maxHeight: height + 'px'
    }"
  >
    <img v-if="src" :src="src" :alt="alt" />
    <div v-else class="no-image">NO IMAGE</div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class BookImage extends Vue {
  @Prop() private src!: string;
  @Prop() private width!: string;
  @Prop() private height!: string;
  @Prop() private alt!: string;
}
</script>

<style scoped>
img,
.no-image {
  width: 100%;
  height: auto;
  box-sizing: border-box;
}

.no-image {
  border: 1px solid #ccc;
  background-color: #eee;
  font-size: 0.5rem;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
