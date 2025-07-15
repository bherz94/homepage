<template>
  <div v-if="!loading" class="flex flex-col gap-5">
    <h3 class="text-2xl">{{ headline }}</h3>
    <div class="flex flex-wrap gap-3">
      <div
        v-for="item in items"
        class="rounded-xl border-2 p-3 hover:shadow-md hover:shadow-accent/20 cursor-pointer hover:scale-105 transition ease-in-out select-none"
        :class="[
          selectedItem && selectedItem.id === item.id
            ? 'border-accent/50 scale-105'
            : 'border-primary/50',
        ]"
        @click="() => setSelected(item)"
      >
        <i v-if="item.icon" :class="`devicon-${item.icon}-plain colored`"></i>
        {{ item.label }}
      </div>
    </div>
    <div
      class="transition-[max-height, margin-bottom] duration-500 ease-in-out overflow-hidden select-text"
      :class="[
        detailViewEnabled && selectedItem ? 'max-h-80 md:max-h-60' : 'max-h-0',
        !selectedItem ? '-mb-5' : '',
      ]"
    >
      {{ currentDesc }}
    </div>
  </div>
  <div v-else class="flex flex-col gap-5">
    <SkeletonLoader height="md" width="lg"></SkeletonLoader>
    <SkeletonLoader
      type="cardList"
      height="lg"
      :dynamicWidth="{ min: 100, max: 200 }"
      :count="Utils.getRandomInRange(3, 5)"
    ></SkeletonLoader>
  </div>
</template>

<script
  setup
  lang="ts"
  generic="T extends {label: string, id: number, description?: string, icon?: string}"
>
import SkeletonLoader from '@/components/shared/SkeletonLoader.vue';
import { Utils } from '@/utils/utils';
import { ref, watch, type PropType } from 'vue';

const props = defineProps({
  headline: {
    type: String,
    required: true,
  },
  items: {
    type: Object as PropType<Array<T>>,
    default: [],
  },
  detailViewEnabled: Boolean,
  loading: Boolean,
});

const emits = defineEmits(['selectedValue']);

const selectedItem = ref<T>();
const currentDesc = ref<string>();

const timeout = ref();

const setSelected = (item: T) => {
  if (timeout.value) return;
  if (selectedItem.value && selectedItem.value.id === item.id) {
    selectedItem.value = undefined;
    timeout.value = animationDelay(undefined, 500);
  } else {
    selectedItem.value = item;
    currentDesc.value = item.description;
  }
};

const animationDelay = (val: string | undefined, duration: number) =>
  setTimeout(() => {
    currentDesc.value = val;
    emits('selectedValue', selectedItem.value);
    timeout.value = undefined;
  }, duration);

watch(
  () => props.loading,
  (newVal) => {
    if (newVal) {
      selectedItem.value = undefined;
      currentDesc.value = undefined;
      timeout.value = undefined;
    }
  }
);
</script>
