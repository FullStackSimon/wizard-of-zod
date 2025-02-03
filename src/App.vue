<script setup lang="ts">
import { z } from "zod";
import {Form, WizardClasses} from './types';
import Wizard from "@/wizard/Wizard.vue";

const emit = defineEmits<{
  (e: 'completed', data: Record<string, any>): void
}>()

const forms: Form<z.ZodObject<any>>[] = [
  {
    schema: z.object({
      givenName: z.string().min(2).describe('What is your given name?'),
      familyNames: z.string().describe('What is your family name?')
    }),
  },
  {
    schema: z.object({
      familyName: z.string().describe('What is your family name?')
    }),
  },
  {
    schema: z.object({
      gender: z.enum(['male', 'female']).describe('What is your gender?'),
    }),
  }
]

const classes: WizardClasses = {}

const handleCompleted = (data: Record<string, any>) => {
  console.log(data);
  emit('completed', data); // Emit the event so it can be tested
};
</script>

<template>
  <div class="h-screen">
    <Wizard
      data-testid="wizard"
      layout="default"
      preview="table"
      :classes="classes"
      :forms="forms"
      progress-indicator="stepper"
      @completed="handleCompleted"
    />
  </div>
</template>
