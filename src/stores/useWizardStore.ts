import { defineStore } from 'pinia'
import {computed, ref} from 'vue'
import { translations } from '../i18n'
import {TranslationKey} from "../types";

export const useWizardStore = defineStore('wizard', () => {
    const currentQuestion = ref<number>(1)
    const answers = ref<Record<string, any>>({})
    const isFormCompleted = ref<boolean>(false)
    const lang = ref<'en' | 'fr'>('en')
    const customI18n = ref<Record<string, string>>({})

    const i18n = computed(() => {
        const baseTranslations = translations[lang.value]
        return { ...baseTranslations, ...customI18n.value }
    })

    const i18nVar = (key: TranslationKey, variables?: Record<string, any>): string => {
        const template = i18n.value[key] || key
        if (!variables) return template
        return template.replace(/{(\w+)}/g, (_, placeholder) => variables[placeholder] || `{${placeholder}}`)
    }

    const setCurrentQuestion = (question: number): void => {
        currentQuestion.value = question
    }

    const saveAnswer = (values: Record<string, any>): void => {
        answers.value = { ...answers.value, ...values }
    }

    const markCompleted = (): void => {
        isFormCompleted.value = true
    }

    const reset = (): void => {
        answers.value = {}
        currentQuestion.value = 1
        isFormCompleted.value = false
    }

    const setLang = (newLang: 'en' | 'fr'): void => {
        lang.value = newLang
    }

    const setCustomI18n = (overrides: Record<string, string>): void => {
        customI18n.value = overrides
    }

    return {
        currentQuestion,
        answers,
        isFormCompleted,
        setCurrentQuestion,
        saveAnswer,
        markCompleted,
        reset,
        lang,
        customI18n,
        i18n,
        i18nVar,
        setLang,
        setCustomI18n,
    }
})