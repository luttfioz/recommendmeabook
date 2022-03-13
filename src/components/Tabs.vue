<template>
  <div class="tabs">
    <div v-if="searchPlaceholder" class="flex items-center justify-center ">
      <div class="flex border-2 border-gray-200 rounded ml-auto ">
        <input
          class="px-4 py-2 w-80 border-none focus:outline-none focus:border-blue-400"
          type="text"
          :placeholder="searchPlaceholder"
        />
        <button class="">
          <img src="../assets/search.png" class="inline w-8" />
        </button>
      </div>
    </div>
    <div class="flex border-b">
      <div
        class="tab flex items-center justify-center rounded-t p-1 mr-8 cursor-pointer"
        :class="
          active === tab
            ? 'font-semibold text-blue-900 border-b-2 border-blue-900'
            : ''
        "
        v-for="(tab, index) in tabsNames"
        :key="index"
        @click="changeTab(tab, index)"
      >
        {{ tab }}
      </div>
    </div>
    <div class="tabs-details">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'Tabs',
  props: {
    tabsNames: {
      type: Array as PropType<Array<string>>,
      required: true,
    },
    searchPlaceholder: String,
  },
  data: function() {
    return {
      active:
        this.tabsNames && this.tabsNames.length > 0
          ? (this.tabsNames[0] as string)
          : '',
    };
  },
  emits: ['changed'],
  methods: {
    changeTab: function(name: string, index: number) {
      this.active = name;
      this.$emit('changed', { name, index });
    },
  },
});
</script>
