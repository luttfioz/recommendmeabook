<template>
  <section
    class="tabs-component-panel"
    :id="id"
    role="tabpanel"
    :class="{ 'is-active': isActive }"
  >
    <slot />
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Tab',
  props: {
    id: { default: null },
    name: { required: true },
    isActive: { default: false },
  },
});
</script>

<style>
.tabs-component-panel {
  display: none;
}
.is-active {
  display: block;
}
</style>
