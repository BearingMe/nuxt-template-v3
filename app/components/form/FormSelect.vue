<script setup lang="ts">
export interface FormSelectOption {
  label: string;
  value: string;
}

const props = defineProps<{
  name: string;
  options: FormSelectOption[];
  label?: string;
  placeholder?: string;
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

    <select
      v-model="value"
      :disabled="props.disabled"
      :class="
        cn(
          'border-input flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-sm transition-colors',
          'focus-visible:ring-ring focus-visible:ring-1 focus-visible:outline-none',
          'disabled:cursor-not-allowed disabled:opacity-50',
          !value && 'text-muted-foreground',
          errorMessage && 'border-destructive focus-visible:ring-destructive',
        )
      "
      @blur="handleBlur"
    >
      <option v-if="props.placeholder" value="" disabled hidden>{{ props.placeholder }}</option>
      <option v-for="option in props.options" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>

    <p v-if="errorMessage" class="text-destructive text-sm">{{ errorMessage }}</p>
  </div>
</template>
