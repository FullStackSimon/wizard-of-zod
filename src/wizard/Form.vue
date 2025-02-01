<script setup lang="ts">
import { AutoForm } from '@/components/ui/auto-form'
import { Button } from '@/components/ui/button'
import type {z} from 'zod'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { useWizardNavigation } from '@/composables/useWizardNavigation'
import {computed, onMounted} from 'vue'
import { useWizardStore } from '@/stores/useWizardStore'
import type { FormProps } from '@/types'
import {cn} from "@/lib/utils";

// Define props with defaults
const props = withDefaults(defineProps<FormProps>(), {
  fieldConfig: () => ({})
})

// Define emits
const emit = defineEmits<{
  (e: 'validated', answer: z.infer<typeof props.schema>): void
}>()

const hasSchema = computed(() => Object.keys(props.schema).length > 0)

// State and composables
const wizardStore = useWizardStore()
const { isFirstQuestion, goToPreviousQuestion } = useWizardNavigation(hasSchema.value ? 1 : 0)

const i18n = computed(() => wizardStore.i18n)

// Back button state
const backButtonDisabled = isFirstQuestion
const onGoBack = goToPreviousQuestion

// Initialize form with validation schema
const form = useForm({
  validationSchema: hasSchema.value ? toTypedSchema(props.schema) : null,
})

// Submit handler
const onSubmit = (values: z.infer<typeof props.schema>): void => {
  emit('validated', values)
  form.resetForm()
}

// Populate form with existing answers
onMounted(() => {
  const existingAnswers = wizardStore.answers
  const initialValues: Record<string, any> = {}

  if(hasSchema.value) {

    // Populate initial values from the schema and existing answers
    Object.keys(props.schema.shape).forEach((key: string) => {
      if (existingAnswers[key] !== undefined) {
        initialValues[key] = existingAnswers[key]
      }
    })

    // Set initial values in the form without triggering validation
    Object.entries(initialValues).forEach(([key, value]) => {
      form.setFieldValue(key, value, false)
    })
  }
})
</script>

<template>
  <div
      id="woz-form-stepper"
      :class="classes?.wozFormStepper"
  >
    <!-- Form Header -->
    <div
        id="woz-form-intro"
        v-if="title || description"
        :class="cn('flex flex-col gap-y-1.5 pb-6', classes?.wozFormIntro)"
    >
      <h1 v-if="title" class="text-xl font-semibold leading-none">{{ title }}</h1>
      <p v-if="description" class="text-sm text-gray-400">{{ description }}</p>
    </div>

    <!-- AutoForm Component -->
    <AutoForm
        v-if="hasSchema"
        id="woz-form"
        :class="cn('space-y-6', classes?.wozForm)"
        :schema="schema"
        :fieldConfig="fieldConfig"
        :form="form"
        @submit="onSubmit"
    >
      <!-- Navigation Buttons -->
      <div
          id="woz-form-buttons"
          :class="cn('flex justify-between gap-6', classes?.wozFormButtons)"
      >
        <Button
            id="woz-form-button-previous"
            :class="classes?.wozFormButtonPrevious"
            variant="outline"
            @click.prevent="onGoBack"
            :disabled="backButtonDisabled"
        >
          {{ i18n.previous }}
        </Button>
        <Button
            id="woz-form-button-next"
            :class="classes?.wozFormButtonNext"
            type="submit"
        >
          {{ i18n.next }}
        </Button>
      </div>
    </AutoForm>
    <p class="text-red-500">No schema detected.</p>
  </div>
</template>