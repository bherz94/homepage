<template>
  <div class="relative w-64">
    <select hidden :value="modelValue">
      <option v-for="opt in options" :value="opt.value">
        {{ opt.label }}
      </option>
    </select>
    <button
      class="w-full border px-4 py-2 rounded text-left bg-white shadow cursor-pointer"
      @click="toggleDropdown"
    >
      {{ selectedOption?.label || placeholder }}
    </button>
    <ul
      v-if="isOpen"
      class="absolute z-10 mt-1 w-full bg-white border rounded shadow max-h-60 overflow-auto"
    >
      <li
        v-for="(option, index) in options"
        :key="index"
        class="px-4 py-2 hover:bg-gray-100 cursor-pointer"
        :class="[option.icon ? 'flex' : '']"
        @click="selectOption(option)"
      >
        <span :class="[option.icon ? 'flex-4/5' : '']">{{ option.label }}</span>
        <span v-if="option.icon" class="flex-1/5" :class="option.icon"></span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

export type SelectOption = {
  identifier: unknown;
  value: unknown;
  label: string;
  icon?: string;
};

const props = defineProps({
  options: {
    type: Array<SelectOption>,
    required: true,
  },
  modelValue: {
    required: false,
  },
  placeholder: {
    type: String,
    default: 'Select an option',
  },
});

const emit = defineEmits(['update:modelValue']);

const isOpen = ref(false);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const selectOption = (option: SelectOption) => {
  emit('update:modelValue', option.value);
  isOpen.value = false;
};

const selectedOption = computed(() => {
  return props.options.find((opt) => opt.value === props.modelValue);
});
</script>
