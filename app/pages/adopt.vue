<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { adoptSchema } from "@/schemas/adopt";

definePageMeta({ layout: "default" });

const schema = adoptSchema;

const catAgeOptions = [
  { label: "Kitten (0–1 year)", value: "kitten" },
  { label: "Young (1–3 years)", value: "young" },
  { label: "Adult (3–8 years)", value: "adult" },
  { label: "Senior (8+ years)", value: "senior" },
];

const submitted = ref(false);

function handleSubmit(values: Record<string, unknown>) {
  console.log("Adoption form submitted:", values);
  submitted.value = true;
}
</script>

<template>
  <div class="mx-auto max-w-lg py-12">
    <div class="mb-8">
      <h1 class="text-3xl font-bold">Adopt a Cat</h1>
      <p class="text-muted-foreground mt-1">
        Fill out the form below and we'll match you with your purrfect companion.
      </p>
    </div>

    <div v-if="submitted" class="border-border bg-muted rounded-lg border p-6 text-center">
      <p class="text-lg font-semibold">Application received!</p>
      <p class="text-muted-foreground mt-1">We'll be in touch within 2–3 business days.</p>
      <Button class="mt-4" @click="submitted = false">Submit another</Button>
    </div>

    <VeeForm v-else :validation-schema="schema" @submit="handleSubmit">
      <div class="flex flex-col gap-5">
        <FormInput name="name" label="Full name" placeholder="Jane Doe" required />

        <FormInput
          name="email"
          label="Email"
          placeholder="jane@example.com"
          type="email"
          required
        />

        <FormInput
          name="phone"
          label="Phone"
          placeholder="(000) 000-0000"
          mask="(###) ###-####"
          required
        />

        <FormSelect
          name="catAge"
          label="Preferred cat age"
          placeholder="Select an age range"
          :options="catAgeOptions"
          required
        />

        <FormTextarea
          name="message"
          label="Why do you want to adopt?"
          placeholder="Tell us about your home, lifestyle, and what you're looking for in a cat..."
          :rows="5"
          required
        />

        <FormCheckbox
          name="terms"
          label="I agree that cats are superior beings and will be treated accordingly"
        />

        <Button type="submit" class="w-full">Submit application</Button>
      </div>
    </VeeForm>
  </div>
</template>
