<template>
  <img src="../../assets/bx-cog.svg" :width="width" :height="height" />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class IconSetting extends Vue {
  @Prop({ default: "24" }) width!: string;
  @Prop({ default: "24" }) height!: string;
}
</script>
