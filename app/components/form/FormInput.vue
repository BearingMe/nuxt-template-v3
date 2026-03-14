<script setup lang="ts">
import { vMaska } from "maska/vue";

const props = defineProps<{
  name: string;
  label?: string;
  placeholder?: string;
  type?: string;
  mask?: string;
  disabled?: boolean;
  required?: boolean;
}>();

const { value, errorMessage, handleBlur } = useField<string>(() => props.name);
</script>

<template>
  <div class="flex flex-col gap-1.5">
    <label v-if="props.label" class="text-foreground text-sm font-medium">
      {{ props.label }}
      <span v-if="props.required" class="text-destructive">*</span>
    </label>

    <input
      v-model="value"
      v-maska="props.mask"
      :type="props.type ?? 'text'"
      :placeholder="props.placeholder"
      :disabled="props.disabled"
      :class="
        cn(
          'border-input flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-sm transition-colors',
          'placeholder:text-muted-foreground',
          'focus-visible:ring-ring focus-visible:ring-1 focus-visible:outline-none',
          'disabled:cursor-not-allowed disabled:opacity-50',
          errorMessage && 'border-destructive focus-visible:ring-destructive',
        )
      "
      @blur="handleBlur"
    />

    <p v-if="errorMessage" class="text-destructive text-sm">{{ errorMessage }}</p>
  </div>
</template>
