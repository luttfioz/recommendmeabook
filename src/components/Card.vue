<template>
  <div class="rounded-lg overflow-hidden border-2 m-4">
    <div
      v-if="header"
      class="font-semibold text-gray-500 text-xl border-b-2 p-2 pl-4 bg-gray-100"
    >
      {{ header }}
    </div>
    <div class="px-12 py-4">
      <div class="inline mr-8">
        <slot name="image"></slot>
      </div>

      <div class="inline font-bold text-xl mb-2">
        <slot name="title"></slot>
      </div>
      <div class="text-gray-300 text-base">
        <slot name="body"></slot>
      </div>
    </div>
    <div class="px-6 pt-4 pb-2">
      <slot name="button"></slot>
      <section v-if="likeCount">
        <img src="../assets/like.png" class="inline-block w-8" />
        <span
          class="inline-block px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
          >{{ likeCount }}
        </span>
        <img src="../assets/view.png" class="inline-block w-8" />
        <span
          class="inline-block px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
          >{{ viewCount }}
        </span>
        <img src="../assets/share.png" class="inline-block w-8" />
        <span
          class="inline-block px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
          >{{ shareCount }}
        </span>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Card',
  props: {
    id: { default: null },
    name: { required: false },
    header: { required: false },
    likeCount: { required: false },
    viewCount: { required: false },
    shareCount: { required: false },
  },
});
</script>

<style></style>
