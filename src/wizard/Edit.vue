<script setup lang="ts">
import { AutoForm } from '@/components/ui/auto-form'
import { Button } from '@/components/ui/button'
import {ZodObject} from 'zod'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import {Form, WizardClasses} from '@/types'
import {computed, onMounted} from 'vue'
import { useWizardStore } from '@/stores/useWizardStore'
import {cn} from "@/lib/utils";

// Define props
const props = defineProps<{
  form: Form<ZodObject<any>>
  questionKey: string
  answer: any
  classes?: WizardClasses
}>()

// Define emits
const emit = defineEmits<{
  (event: 'cancelled'): void
  (event: 'updated'): void
}>()

// Wizard store instance
const wizardStore = useWizardStore()

const i18n = computed(() => wizardStore.i18n)

// Extract schema for the specific question
const schema = props.form.schema.pick({ [props.questionKey]: true })

// Initialize the form with validation
const validationForm = useForm({
  validationSchema: toTypedSchema(schema),
})

// Cancel action
const onCancel = (): void => {
  emit('cancelled')
}

// Submit action
const onSubmit = (values: Record<string, any>): void => {
  wizardStore.saveAnswer(values)
  emit('updated')
}

// Set initial value on mount
onMounted(() => {
  validationForm.setFieldValue(props.questionKey, props.answer)
})
</script>

<template>
  <AutoForm
      id="woz-form"
      :class="cn('w-auto space-y-6', classes?.wozForm)"
      :schema="schema"
      :fieldConfig="form.fieldConfig"
      :form="validationForm"
      @submit="onSubmit"
  >
    <div
        id="woz-form-buttons"
        :class="cn('flex justify-between gap-6', classes?.wozFormButtons)"
    >
      <Button
          id="woz-form-button-previous"
          :class="classes?.wozFormButtonPrevious"
          variant="outline"
          type="button"
          @click.prevent="onCancel"
      >
        {{ i18n.cancel }}
      </Button>
      <Button
          id="woz-form-button-next"
          :class="classes?.wozFormButtonNext"
          type="submit"
          data-testid="submit-button"
      >
        {{ i18n.update }}
      </Button>
    </div>
  </AutoForm>
</template>