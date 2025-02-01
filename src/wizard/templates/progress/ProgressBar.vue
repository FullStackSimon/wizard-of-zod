<script setup lang="ts">
import { Progress } from '@/components/ui/progress'
import {computed, onMounted} from "vue";
import {useWizardStore} from "@/stores/useWizardStore";

// Props definition
const props = defineProps<{
  totalForms: number
  currentFormIndex: number
}>()

const wizardStore = useWizardStore()

const i18n = computed(() => wizardStore.i18n)

const progressPercentage = computed(() => ((props.currentFormIndex - 1) / props.totalForms) * 100)

onMounted(() => {
  const progressBarIndicator: HTMLDivElement | null = document.querySelector('#progress > div')
  if(progressBarIndicator) {
    const currentValue = progressBarIndicator.dataset.value
    if(currentValue === "0"){
      progressBarIndicator.style.transform = 'translateX(-101%)'
    }
  }
})
</script>

<template>
  <div>
    <Progress id="progress" :model-value="progressPercentage" />
    <p class="text-xs text-gray-500 text-center mt-1">{{ progressPercentage.toFixed(0) }}% {{ i18n.complete }}</p>
  </div>
</template>