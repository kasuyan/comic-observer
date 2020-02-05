<template>
  <div id="app">
    <Button @click="onToggleEdit">button</Button>
    <Top />
    <Detail :isShow="isEdit" :onToggleEdit="onToggleEdit" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Top from "./components/pages/top.vue";
import Detail from "./components/pages/detail.vue";
import Button from "./components/atoms/Button.vue";

@Component({
  components: {
    Top,
    Detail
  }
})
export default class App extends Vue {
  isEdit: boolean = false;

  onToggleEdit() {
    this.isEdit = !this.isEdit;
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  position: relative;
  overflow: hidden;
}
</style>
