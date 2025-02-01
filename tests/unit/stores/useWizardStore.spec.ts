import { setActivePinia, createPinia } from 'pinia'
import { describe, it, expect, beforeEach } from 'vitest'
import {useWizardStore} from "../../../src/stores/useWizardStore";

describe('useWizardStore', () => {
    beforeEach(() => {
        setActivePinia(createPinia())
    })

    it('initializes with default values', () => {
        const store = useWizardStore()

        expect(store.currentQuestion).toBe(1)
        expect(store.answers).toEqual({})
        expect(store.isFormCompleted).toBe(false)
        expect(store.lang).toBe('en')
        expect(store.customI18n).toEqual({})
        expect(store.i18n).toEqual(expect.any(Object))
    })

    it('sets the current question', () => {
        const store = useWizardStore()

        store.setCurrentQuestion(5)

        expect(store.currentQuestion).toBe(5)
    })

    it('saves answers', () => {
        const store = useWizardStore()

        store.saveAnswer({ name: 'Alice' })
        expect(store.answers).toEqual({ name: 'Alice' })

        store.saveAnswer({ age: 30 })
        expect(store.answers).toEqual({ name: 'Alice', age: 30 })
    })

    it('marks the form as completed', () => {
        const store = useWizardStore()

        store.markCompleted()

        expect(store.isFormCompleted).toBe(true)
    })

    it('resets the store', () => {
        const store = useWizardStore()

        store.setCurrentQuestion(3)
        store.saveAnswer({ name: 'Alice' })
        store.markCompleted()

        store.reset()

        expect(store.currentQuestion).toBe(1)
        expect(store.answers).toEqual({})
        expect(store.isFormCompleted).toBe(false)
    })

    it('sets the language', () => {
        const store = useWizardStore()

        store.setLang('fr')

        expect(store.lang).toBe('fr')
    })

    it('sets custom i18n overrides', () => {
        const store = useWizardStore()

        store.setCustomI18n({ hello: 'Bonjour' })

        expect(store.customI18n).toEqual({ hello: 'Bonjour' })
    })

    it('computes i18n with custom overrides', () => {
        const store = useWizardStore()

        store.setLang('en')
        store.setCustomI18n({ greeting: 'Hi there' })

        expect(store.i18n.greeting).toBe('Hi there')
    })

    it('formats i18n variables correctly', () => {
        const store = useWizardStore()

        store.setLang('en')
        store.setCustomI18n({ welcome: 'Welcome, {name}!' })

        const result = store.i18nVar('welcome', { name: 'Alice' })
        expect(result).toBe('Welcome, Alice!')
    })

    it('returns placeholder with curly braces when variable is missing', () => {
        const store = useWizardStore()

        store.setLang('en')
        store.setCustomI18n({ greeting: 'Hello, {name}!' })

        const result = store.i18nVar('greeting', { age: 30 }) // Missing 'name' in variables
        expect(result).toBe('Hello, {name}!')
    })

    it('returns the key when no translation is found', () => {
        const store = useWizardStore()

        const result = store.i18nVar('unknown_key')
        expect(result).toBe('unknown_key')
    })
})