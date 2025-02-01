<script setup lang="ts">
import {
  Stepper,
  StepperItem,
  StepperSeparator,
  StepperTrigger,
} from '@/components/ui/stepper'

import { Circle, CircleCheck, CircleDot } from 'lucide-vue-next'
import { computed } from 'vue'

// Props definition
const props = defineProps<{
  totalForms: number
  currentFormIndex: number
}>()

// Computed property for current step
const currentStep = computed(() => props.currentFormIndex)
</script>

<template>
  <Stepper class="gap-0" :model-value="currentStep" linear>
    <!-- Iterate through steps -->
    <StepperItem
        v-for="n in totalForms"
        :key="n"
        :step="n"
        class="relative flex w-full flex-col items-center justify-center"
        v-slot="{ state }"
    >
      <!-- Step indicator -->
      <StepperTrigger class="p-0" as="span">
        <Circle v-if="state === 'inactive'" class="w-6 h-6" />
        <CircleDot v-if="state === 'active'" class="w-6 h-6" />
        <CircleCheck v-if="state === 'completed'" class="w-6 h-6" />
      </StepperTrigger>

      <!-- Step separator -->
      <StepperSeparator
          v-if="n !== totalForms"
          class="absolute left-[calc(50%+11px)] right-[calc(-50%+10px)] block h-0.5 shrink-0 rounded-full bg-muted group-data-[state=completed]:bg-primary"
      />
    </StepperItem>
  </Stepper>
</template>