<template>
  <button @click="clickHandler">
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Button extends Vue {
  clickHandler() {
    this.$emit("onClick");
  }
}
</script>
