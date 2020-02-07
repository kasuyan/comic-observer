<template>
  <button @click="clickHandler" :class="{ alert: isDelete }">
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Button extends Vue {
  @Prop() isDelete!: boolean;

  clickHandler() {
    this.$emit("onClick");
  }
}
</script>

<style scoped>
button {
  display: block;
  margin: 2rem auto;
  border: 1px solid #2c3e50;
  background-color: #fff;
  padding: 1rem 2rem;
  font-size: 1rem;
  border-radius: 0.8rem;
}

.alert {
  border: 1px solid rgb(225, 59, 59);
  color: rgb(225, 59, 59);
}
</style>
