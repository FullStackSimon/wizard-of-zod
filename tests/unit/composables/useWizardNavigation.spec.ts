import { describe, it, expect, beforeEach, vi } from 'vitest'
import { reactive } from 'vue'
import {useWizardNavigation} from "../../../src/composables/useWizardNavigation";

// Mock the store
const createMockStore = (initialQuestion = 1) => {
    const state = reactive({
        currentQuestion: initialQuestion,
    })

    return {
        get currentQuestion() {
            return state.currentQuestion
        },
        setCurrentQuestion: vi.fn((value) => {
            state.currentQuestion = value
        }),
    }
}

describe('useWizardNavigation', () => {
    let store

    beforeEach(() => {
        store = createMockStore()
    })

    it('should initialize computed properties correctly', () => {
        const { totalQuestions, currentQuestion, isFirstQuestion, isLastQuestion } = useWizardNavigation(3, store)

        expect(totalQuestions.value).toBe(3)
        expect(currentQuestion.value).toBe(1)
        expect(isFirstQuestion.value).toBe(true)
        expect(isLastQuestion.value).toBe(false)
    })

    it('should correctly identify the last question', () => {
        const { isLastQuestion } = useWizardNavigation(3, store)

        store.setCurrentQuestion(3)
        expect(isLastQuestion.value).toBe(true)
    })

    it('should correctly identify the first question', () => {
        const { isFirstQuestion } = useWizardNavigation(3, store)

        store.setCurrentQuestion(1)
        expect(isFirstQuestion.value).toBe(true)
    })

    it('should navigate to the next question', () => {
        const { goToNextQuestion } = useWizardNavigation(3, store)

        goToNextQuestion()
        expect(store.setCurrentQuestion).toHaveBeenCalledWith(2)
        expect(store.currentQuestion).toBe(2)
    })

    it('should not navigate past the last question', () => {
        const { goToNextQuestion } = useWizardNavigation(3, store)

        store.setCurrentQuestion(3)
        goToNextQuestion()
        expect(store.setCurrentQuestion).not.toHaveBeenCalledWith(4)
        expect(store.currentQuestion).toBe(3)
    })

    it('should navigate to the previous question', () => {
        const { goToPreviousQuestion } = useWizardNavigation(3, store)

        store.setCurrentQuestion(2)
        goToPreviousQuestion()
        expect(store.setCurrentQuestion).toHaveBeenCalledWith(1)
        expect(store.currentQuestion).toBe(1)
    })

    it('should not navigate before the first question', () => {
        const { goToPreviousQuestion } = useWizardNavigation(3, store)

        store.setCurrentQuestion(1)
        goToPreviousQuestion()
        expect(store.setCurrentQuestion).not.toHaveBeenCalledWith(0)
        expect(store.currentQuestion).toBe(1)
    })
})
