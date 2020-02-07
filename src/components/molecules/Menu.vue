<template>
  <div class="menu" :class="{ open: isOpen }">
    <button class="menu-button" @click="onToggleMenu">
      <IconMenu v-show="!isEdit" width="42" height="42" />
      <IconBack v-show="isEdit" width="42" height="42" />
    </button>
    <div
      class="menu-button sub top"
      :class="[isOpen ? 'open' : 'close']"
      @click="onClickEditOpen"
    >
      <IconPlus width="32" height="32" />
    </div>
    <div class="menu-button sub top-right" :class="[isOpen ? 'open' : 'close']">
      <IconSync width="32" height="32" />
    </div>
    <div class="menu-button sub right" :class="[isOpen ? 'open' : 'close']">
      <IconSetting width="32" height="32" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import IconMenu from "../atoms/IconMenu.vue";
import IconBack from "../atoms/IconBack.vue";
import IconPlus from "../atoms/IconPlus.vue";
import IconSetting from "../atoms/IconSetting.vue";
import IconSync from "../atoms/IconSync.vue";

@Component({
  components: {
    IconMenu,
    IconBack,
    IconPlus,
    IconSetting,
    IconSync
  }
})
export default class Menu extends Vue {
  @Prop() onClickEditShow!: () => void;
  @Prop() onClickEditHide!: () => void;
  @Prop() onAddData!: () => void;
  @Prop() isEdit!: boolean;

  isOpen: boolean = false;

  onToggleMenu() {
    this.isOpen = !this.isOpen;
    if (this.isEdit) {
      this.onClickMenuClose();
      this.onClickEditHide();
    }
  }

  onClickMenuOpen() {
    this.isOpen = true;
  }

  onClickMenuClose() {
    this.isOpen = false;
  }

  onClickEditOpen() {
    this.onAddData();
    this.onClickMenuClose();
    this.onClickEditShow();
  }
}
</script>

<style scoped>
.menu {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 4rem;
  height: 4rem;
  border-radius: 0 100% 0 0;
  transition: background-color 100ms ease-out, width 100ms ease-in,
    height 100ms ease-in;
}

.menu.open {
  width: 12rem;
  height: 12rem;
  background-color: rgba(200, 200, 200, 0.25);
}

.menu-button {
  border: 1px solid #ccc;
  background-color: #fff;
  border-radius: 2rem;
  width: 4rem;
  height: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3;
  position: absolute;
  bottom: 1rem;
  left: 1rem;
}

.menu-button.sub {
  width: 3rem;
  height: 3rem;
  position: absolute;
  z-index: 1;
}

.menu-button.sub.open {
  transition: left 200ms ease-out, top 200ms ease-out, bottom 200ms ease-out,
    opacity 200ms linear;
  opacity: 1;
  transform: scale(1, 1);
}

.menu-button.sub.close {
  transition: left 200ms ease-out, top 200ms ease-out, bottom 200ms ease-out,
    opacity 200ms linear;
  opacity: 0;
  transform: scale(0.5, 0.5);
}

.menu-button.sub.top.open {
  bottom: 8rem;
  left: 1.5rem;
}

.menu-button.sub.top-right.open {
  bottom: 5.5rem;
  left: 5.5rem;
}

.menu-button.sub.right.open {
  bottom: 1.5rem;
  left: 8rem;
}

.menu-button.sub.top.close {
  bottom: 2.5rem;
  left: 1.5rem;
  opacity: 0;
}

.menu-button.sub.top-right.close {
  bottom: 2.5rem;
  left: 2.5rem;
  opacity: 0;
}

.menu-button.sub.right.close {
  bottom: 1.5rem;
  left: 2.5rem;
  opacity: 0;
}
</style>
