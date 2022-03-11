<template>
  <div class="tabs">
    <div v-if="searchPlaceholder" class="flex"><input class="ml-auto" type="text" :placeholder="searchPlaceholder"></div>
    <div class="flex border-b">
      <div
        class="tab flex items-center justify-center border-t-2 border-l-2 border-r-2 rounded-t p-5 cursor-pointer"
        :class="active === tab ? 'border-4' : ''"
        v-for="(tab, index) in tabsNames"
        :key="index"
        @click="changeTab(tab)"
      >
        {{tab}}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'Tabs',
  props: {
    tabsNames: {
      type: Array as PropType<Array<string>>,
      required: true
    },
    searchPlaceholder: String
  },
  data: function () {
    return {
      active: this.tabsNames && this.tabsNames.length > 0 ? this.tabsNames[0] as string : ''
    }
  },
  emits: ['changed'],
  methods: {
    changeTab: function (tab: string) {
      this.active = tab
      this.$emit('changed', tab)
    }
  }
})
</script>
