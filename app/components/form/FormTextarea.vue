<script setup lang="ts">
const props = defineProps<{
  name: string;
  label?: string;
  placeholder?: string;
  rows?: number;
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

    <textarea
      v-model="value"
      :placeholder="props.placeholder"
      :rows="props.rows ?? 4"
      :disabled="props.disabled"
      :class="
        cn(
          'border-input flex w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-sm transition-colors',
          'placeholder:text-muted-foreground',
          'focus-visible:ring-ring focus-visible:ring-1 focus-visible:outline-none',
          'resize-none disabled:cursor-not-allowed disabled:opacity-50',
          errorMessage && 'border-destructive focus-visible:ring-destructive',
        )
      "
      @blur="handleBlur"
    ></textarea>

    <p v-if="errorMessage" class="text-destructive text-sm">{{ errorMessage }}</p>
  </div>
</template>
