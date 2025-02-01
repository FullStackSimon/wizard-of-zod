<script setup lang="ts">
import {computed} from 'vue'
import type { Component } from 'vue'
import { z } from "zod"
import { useWizardStore } from '@/stores/useWizardStore'
import { cn } from '@/lib/utils'
import {Form, WizardClasses} from '@/types'

// Props with default values
const props = withDefaults(
    defineProps<{
      progressIndicator: Component | null
      forms?: Form<z.ZodObject<any>>[]
      classes?: WizardClasses
    }>(),
    {
      progressIndicator: null
    }
)

// Slots definition
defineSlots<{
  header?: () => void
  default: () => void
  footer?: () => void
  progressIndicator?: () => void
}>()

// Wizard store instance
const wizardStore = useWizardStore()

// Computed properties
const i18n = computed(() => wizardStore.i18n)
const totalForms = computed(() => props.forms?.length ?? 0)
const currentQuestion = computed(() => wizardStore.currentQuestion)
const year = computed(() => new Date().getFullYear())

const headerContent = computed(() => {
  if (wizardStore.isFormCompleted) return i18n.value.preview
  if (totalForms.value > 0) {
    return wizardStore.i18nVar('formXofY', { currentQuestion: currentQuestion.value, totalForms: totalForms.value })
  }
  return i18n.value.noQuestionsAvailable
})
</script>

<template>
  <div id="woz"
      :class="cn(
      'flex flex-col justify-between items-center h-full',
      classes?.woz
    )"
  >
    <!-- Header -->
    <slot name="header">
      <div
          id="woz-header"
          :class="cn('bg-gray-200 w-full p-4 flex justify-center', classes?.wozHeader)"
      >
        <h1 class="font-semibold">{{ headerContent }}</h1>
      </div>
    </slot>

    <div id="woz-body"
        :class="cn(
        'flex flex-col-reverse justify-center gap-20 w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/5 2xl:w-1/6 mx-auto p-6',
        classes?.wozBody
      )"
    >
      <slot />

      <slot name="progressIndicator">
        <component id="woz-progress"
            :is="props.progressIndicator"
            v-if="!wizardStore.isFormCompleted && progressIndicator"
            :class="classes?.wozProgress"
            :total-forms="totalForms"
            :current-form-index="currentQuestion"
        />
      </slot>
    </div>

    <!-- Footer -->
    <slot name="footer">
      <div
          id="woz-footer"
         :class="cn('bg-gray-200 w-full p-4 flex justify-center', classes?.wozFooter)"
      >
        <small>&copy; {{ year }}</small>
      </div>
    </slot>
  </div>
</template>