<script setup lang="ts">
const props = defineProps<{
  name: string;
  label?: string;
  disabled?: boolean;
}>();

const { value, errorMessage } = useField<boolean>(() => props.name);
</script>

<template>
  <div class="flex flex-col gap-1.5">
    <label
      :class="
        cn(
          'flex cursor-pointer items-center gap-2 text-sm',
          props.disabled && 'cursor-not-allowed opacity-50',
        )
      "
    >
      <input
        v-model="value"
        type="checkbox"
        :disabled="props.disabled"
        :class="
          cn(
            'border-input accent-primary h-4 w-4 rounded border',
            errorMessage && 'border-destructive',
          )
        "
      />
      <span v-if="props.label" class="text-foreground">{{ props.label }}</span>
    </label>

    <p v-if="errorMessage" class="text-destructive text-sm">{{ errorMessage }}</p>
  </div>
</template>
