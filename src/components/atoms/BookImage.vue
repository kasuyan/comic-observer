<template>
  <div :style="{ width: width + 'px', height: height + 'px'}">
    <img v-if="src" :src="src" :alt="alt" @error="resetSrc" />
    <div v-else class="no-image">NO IMAGE</div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import axios from "axios";

@Component
export default class BookImage extends Vue {
  @Prop() private src!: string;
  @Prop() private width!: string;
  @Prop() private height!: string;
  @Prop() private alt!: string;

  resetSrc() {
    this.src = "";
  }
}
</script>

<style scoped>
img,
.no-image {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  vertical-align: bottom;
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
