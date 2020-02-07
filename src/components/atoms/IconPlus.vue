<template>
  <img src="../../assets/bx-plus-circle.svg" :width="width" :height="height" />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class IconPlus extends Vue {
  @Prop({ default: "24" }) width!: string;
  @Prop({ default: "24" }) height!: string;
}
</script>
