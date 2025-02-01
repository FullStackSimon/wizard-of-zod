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
      :class="cn('flex flex-col gap-6 items-center h-full', classes?.wozPreview)">
    <p
        id="woz-preview-intro"
        :class="cn('text-gray-500 text-sm text-center', classes?.wozPreviewIntro)"
    >
      {{ i18n.preSubmitNotice }}
    </p>
    <Table>
      <TableHeader class="bg-gray-50">
        <TableRow>
          <TableHead class="w-2/3">{{ i18n.question }}</TableHead>
          <TableHead class="w-1/3">{{ i18n.answer }}</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <template
        v-for="(form, formIndex) in forms"
        :key="formIndex">
        <TableHeader v-if="form.title || form.description">
          <TableRow>
            <TableHead class="text-center bg-gray-100" colspan="3">
              {{ form.title }} - {{ form.description }}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody class="border-b">
          <TableRow
            v-for="(data, index) in previewData(formIndex)"
            :key="index"
          >
            <TableCell class="font-medium">{{ data.question }}</TableCell>
            <TableCell>{{ data.answer }}</TableCell>
            <TableCell class="text-right">
              <Button variant="ghost" @click="onEdit(data)">
                <Pencil class="w-4 h-4" />
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </template>
    </Table>

    <!-- Actions -->
    <div
      :class="cn('flex justify-between w-full', classes?.wozFormButtons)"
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