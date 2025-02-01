<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { z } from 'zod'
import { Pencil } from 'lucide-vue-next'
import { useWizardStore } from '@/stores/useWizardStore'
import {computed} from "vue";
import {Form, PreviewData, WizardClasses} from '@/types'
import {beautifyObjectName, cn} from "@/lib/utils";

// Define props and emits
const props = defineProps<{
  forms: Form<z.ZodObject<any>>[]
  classes?: WizardClasses
}>()

const emit = defineEmits<{
  (e: 'edit', data: PreviewData): void
  (e: 'completed', answers: Record<string, any>): void
}>()

// Wizard store instance
const wizardStore = useWizardStore()

const i18n = computed(() => wizardStore.i18n)

// Generate preview data for the specified form
const previewData = (formIndex: number): PreviewData[] => {
  const answers = wizardStore.answers
  const schemaShape = props.forms[formIndex].schema.shape

  return Object.keys(schemaShape).map((key) => ({
    formIndex,
    questionKey: key,
    question: beautifyObjectName(schemaShape[key].description || key),
    answer: answers[key],
  }))
}

// Emit events
const onEdit = (data: PreviewData): void => {
  emit('edit', data)
}

const onCancel = (): void => {
  wizardStore.reset()
}

const onSubmit = (): void => {
  emit('completed', wizardStore.answers)
}
</script>

<template>
  <div
      id="woz-preview"
      :class="cn('flex flex-col', classes?.wozPreview)"
  >
    <p
        id="woz-preview-intro"
        :class="cn('text-gray-500 text-sm text-center mb-6', classes?.wozPreviewIntro)"
    >
      {{ i18n.preSubmitNotice }}
    </p>

    <div
      v-for="(form, formIndex) in forms"
      class="border-b hover:bg-gray-50"
      :key="formIndex"
      data-testid="preview-list"
    >

      <div class="border-b" v-if="form.title || form.description">
        <h1 v-if="form.title">{{ form.title }}</h1>
        <p v-if="form.description">{{ form.description }}</p>
      </div>

      <div
        v-for="(data, index) in previewData(formIndex)"
        class="flex gap-6 items-center p-6"
        :key="index"
      >
        <div class="flex-1">
          <div class="font-semibold">{{ data.question }}</div>
          <div class="text-gray-500">{{ data.answer }}</div>
        </div>
        <Button variant="ghost" @click="onEdit(data)">
          <Pencil class="w-4 h-4" />
        </Button>
      </div>
    </div>

    <div
        :class="cn('flex justify-between w-full mt-6', classes?.wozFormButtons)"
    >
      <Button
        variant="outline"
        :class="classes?.wozFormButtonPrevious"
        @click="onCancel"
        data-testid="cancel-button"
      >
        {{ i18n.cancel }}
      </Button>
      <Button
        :class="classes?.wozFormButtonNext"
        @click="onSubmit"
        data-testid="submit-button"
      >
        {{ i18n.submit }}
      </Button>
    </div>
  </div>
</template>