<script setup lang="ts">
import { useWizardStore } from '@/stores/useWizardStore'
import {computed} from 'vue'
import type { Component } from 'vue'
import {cn} from "@/lib/utils";
import {WizardClasses} from "@/types";

// Props with defaults
const props = withDefaults(
    defineProps<{
      progressIndicator: Component | null
      classes?: WizardClasses
      totalForms: number,
    }>(),
    {
      progressIndicator: null,
      classes: () => ({}),
    }
)

// Slots definition
defineSlots<{
  default: () => void
  progressIndicator: () => void
}>()

// Disable attribute inheritance
defineOptions({
  inheritAttrs: false,
})

// Wizard store instance
const wizardStore = useWizardStore()

// Computed property for current question
const currentQuestion = computed(() => wizardStore.currentQuestion)
</script>

<template>
  <div
      id="woz"
      :class="cn(
      'p-6',
      classes?.woz
    )"
  >
    <div id="woz-body"
        :class="cn(
        'flex flex-col justify-center gap-10',
        classes?.wozBody
      )"
    >

      <slot />

      <slot name="progressIndicator">
        <component id="woz-progress"
          :is="props.progressIndicator"
          v-if="!wizardStore.isFormCompleted && progressIndicator"
          :total-forms="totalForms"
          :current-form-index="currentQuestion"
          :class="classes?.wozProgress"
        />
      </slot>
    </div>
  </div>
</template>