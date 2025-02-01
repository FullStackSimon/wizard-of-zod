<script setup lang="ts">
import { computed, defineAsyncComponent, onMounted, ref } from 'vue'
import type { Component } from 'vue'
import { useWizardStore } from '@/stores/useWizardStore'
import { useWizardNavigation } from '@/composables/useWizardNavigation'
import {WizardProps, PreviewData} from '@/types'
import Form from '@/wizard/Form.vue'
import Edit from '@/wizard/Edit.vue'

// Define props with default values
const props = withDefaults(defineProps<WizardProps>(), {
  layout: 'basic',
  preview: 'cards',
  initialAnswers: undefined,
  progressIndicator: null,
  lang: 'en',
})

// Define slots
defineSlots<{
  header?: (props: { totalQuestions: number; currentQuestion: number }) => void
  default: () => void
  footer?: () => void
  progressIndicator?: (props: { totalQuestions: number; currentQuestion: number; completed: boolean }) => void
}>()

// Define emits
const emit = defineEmits<{
  (e: 'completed', data: Record<string, any>): void
}>()

// State and composables
const wizardStore = useWizardStore()
const { totalQuestions, currentQuestion, isLastQuestion, goToNextQuestion } = useWizardNavigation(props.forms.length)

// Get current language and translations
wizardStore.setLang(props.lang)
const i18n = computed(() => wizardStore.i18n)

// Dynamic layout selection
const layouts = {
  default: defineAsyncComponent(() => import('@/wizard/templates/layouts/LayoutDefault.vue')),
  basic: defineAsyncComponent(() => import('@/wizard/templates/layouts/LayoutBasic.vue')),
}

// Dynamic progress indicators
const progressIndicators = {
  stepper: defineAsyncComponent(() => import('@/wizard/templates/progress/ProgressStepper.vue')),
  bar: defineAsyncComponent(() => import('@/wizard/templates/progress/ProgressBar.vue'))
}

// Dynamic progress indicators
const previews = {
  cards: defineAsyncComponent(() => import('@/wizard/templates/preview/PreviewCards.vue')),
  list: defineAsyncComponent(() => import('@/wizard/templates/preview/PreviewList.vue')),
  table: defineAsyncComponent(() => import('@/wizard/templates/preview/PreviewTable.vue'))
}

const selectedLayout = computed<Component>(() => layouts[props.layout])
const selectedPreview = computed<Component>(() => previews[props.preview])
const selectedProgressIndicator = computed<Component | null>(() => {
  return props.progressIndicator ? progressIndicators[props.progressIndicator] : null
})
const hasQuestions = computed(() => totalQuestions.value > 0)
const isEditing = ref(false)

// Question and form navigation
const currentQuestionIndex = computed(() => {
  const index = wizardStore.currentQuestion - 1
  return Math.max(0, Math.min(index, totalQuestions.value - 1))
})

const currentFieldConfig = computed(() => props.forms[currentQuestionIndex.value]?.fieldConfig || {})

// Save and edit logic
const saveAnswer = (answer: Record<string, any>): void => {
  wizardStore.saveAnswer(answer)
  if (isLastQuestion.value) {
    wizardStore.markCompleted()
  } else {
    goToNextQuestion()
  }
}

const onSaveAnswer = (answer: Record<string, any>): void => saveAnswer(answer)

const editFormIndex = ref<number>(0)
const editQuestionKey = ref<string>('')
const editAnswer = ref<any>(null)

const returnToPreview = (): void => {
  isEditing.value = false
}

const edit = (data?: PreviewData): void => {
  editFormIndex.value = data?.formIndex || 0
  editQuestionKey.value = data?.questionKey || ''
  editAnswer.value = data?.answer || null
  isEditing.value = true
}

// Emit completed event
const onCompleted = (data: Record<string, any>): void => {
  emit('completed', data)
  wizardStore.reset()
}

// Initial answers setup
onMounted(() => {
  if (props.initialAnswers && Object.keys(props.initialAnswers).length > 0) {
    wizardStore.saveAnswer(props.initialAnswers)
  }
})
</script>

<template>
  <component
      :is="selectedLayout"
      :classes="classes"
      :forms="forms"
      :progress-indicator="selectedProgressIndicator"
      :total-forms="forms.length"
  >
    <!-- Edit Mode -->
    <Edit
        v-if="isEditing"
        :classes="classes"
        :form="forms[editFormIndex]"
        :question-key="editQuestionKey"
        :answer="editAnswer"
        @cancelled="returnToPreview"
        @updated="returnToPreview"
    />

    <template v-else>
      <template v-if="!wizardStore.isFormCompleted">
        <Form
            v-if="hasQuestions"
            :classes="classes"
            :title="forms[currentQuestionIndex]?.title"
            :description="forms[currentQuestionIndex]?.description"
            :schema="forms[currentQuestionIndex]?.schema"
            :field-config="currentFieldConfig"
            @validated="onSaveAnswer"
            :key="wizardStore.currentQuestion"
        />
        <p v-else>{{ i18n.noQuestions }}</p>
      </template>

      <Component
          v-else
          :is="selectedPreview"
          :classes="classes"
          :forms="forms"
          @edit="edit"
          @completed="onCompleted"
      />
    </template>

    <template #header>
      <slot
        name="header"
        :total-questions="totalQuestions"
        :current-question="currentQuestion"
      />
    </template>
    <template #footer>
      <slot name="footer" />
    </template>
    <template #progressIndicator>
      <slot
        name="progressIndicator"
        :total-questions="totalQuestions"
        :current-question="currentQuestion"
        :completed="wizardStore.isFormCompleted"
      />
    </template>
  </component>
</template>