<template>
  <img src="../../assets/bx-menu.svg" :width="width" :height="height" />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Icon extends Vue {
  @Prop({ default: "24" }) width!: string;
  @Prop({ default: "24" }) height!: string;
}
</script>
