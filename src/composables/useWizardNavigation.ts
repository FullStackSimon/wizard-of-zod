import { computed } from 'vue'
import { useWizardStore } from '@/stores/useWizardStore'

export const useWizardNavigation = (formLength: number, store = useWizardStore()) => {
    const wizardStore = store

    // Access currentQuestion as a Ref<number>
    const currentQuestion = computed(() => wizardStore.currentQuestion)

    // Computed properties for total questions and navigation state
    const totalQuestions = computed(() => formLength)
    const isFirstQuestion = computed(() => currentQuestion.value === 1)
    const isLastQuestion = computed(() => currentQuestion.value >= totalQuestions.value)

    // Methods for navigation
    const goToNextQuestion = (): void => {
        if (!isLastQuestion.value) {
            wizardStore.setCurrentQuestion(currentQuestion.value + 1)
        }
    }

    const goToPreviousQuestion = (): void => {
        if (!isFirstQuestion.value) {
            wizardStore.setCurrentQuestion(currentQuestion.value - 1)
        }
    }

    return {
        totalQuestions,
        currentQuestion,
        isFirstQuestion,
        isLastQuestion,
        goToNextQuestion,
        goToPreviousQuestion,
    }
}