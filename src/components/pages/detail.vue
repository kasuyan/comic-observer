<template>
  <div class="detail-page" :class="{ 'is-show': isShow }">
    <Button @onClick="onToggleEdit">back</Button>
    <h2>BookTitle</h2>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Button from "../atoms/Button.vue";

@Component({
  components: {
    Button
  }
})
export default class DetailPage extends Vue {
  @Prop() private isShow!: boolean;
  @Prop() private onToggleEdit!: () => {};
  bookName: string = "hoge";
}
</script>

<style scoped>
h2 {
  color: green;
}

.detail-page {
  width: 100vw;
  min-height: 100vh;
  position: absolute;
  top: 0;
  background-color: #fff;
  left: 100vw;
  transition: left 200ms ease-out;
}

.detail-page.is-show {
  left: 0;
}
</style>
