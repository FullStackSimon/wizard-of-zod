import {DOMWrapper, mount} from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { createTestingPinia } from '@pinia/testing'
import { z } from 'zod'
import { useWizardStore } from '@/stores/useWizardStore'
import { defineComponent } from 'vue'

// Mock AutoForm
vi.mock('@/components/ui/auto-form', () => {
    return {
        AutoForm: defineComponent({ name: 'AutoForm', template: '<form id="woz-form"><slot /></form>' }),
    }
})

// Mock Button
vi.mock('@/components/ui/button', () => {
    return {
        Button: defineComponent({ name: 'Button', template: '<button><slot /></button>' }),
    }
})

// Mock utility function
vi.mock('@/lib/utils', () => {
    return { cn: (...classes: string[]) => classes.join(' ') }
})

// Import the component after mocks
import Edit from '@/wizard/Edit.vue'

const mockI18n = {
    cancel: 'Cancel',
    update: 'Update',
}

describe('Edit.vue', () => {
    let wrapper
    let wizardStore
    const mockSchema = z.object({ question: z.string().min(1, 'Required') })
    const mockForm = {
        schema: mockSchema,
        fieldConfig: {
            question: { label: 'Question' },
        },
    }
    const mockAnswer = 'Mock Answer'

    beforeEach(() => {
        wrapper = mount(Edit, {
            global: {
                plugins: [
                    createTestingPinia({
                        createSpy: vi.fn,
                        stubActions: false,
                    }),
                ],
            },
            props: {
                form: mockForm,
                questionKey: 'question',
                answer: mockAnswer,
            },
        })

        wizardStore = useWizardStore()
        wizardStore.i18n = mockI18n
    })

    it('renders correctly', () => {
        expect(wrapper.find('#woz-form').exists()).toBe(true)
        expect(wrapper.find('#woz-form-button-previous').text()).toBe(mockI18n.cancel)
        expect(wrapper.find('#woz-form-button-next').text()).toBe(mockI18n.update)
    })

    it('calls cancelled event on cancel button click', async () => {
        const cancelButton = wrapper.find('#woz-form-button-previous')
        await cancelButton.trigger('click')
        expect(wrapper.emitted('cancelled')).toBeTruthy()
    })

    it('accepts and applies custom classes', async (): Promise<void> => {
        await wrapper.setProps({
            classes: {
                wozForm: 'custom-woz-form-class',
                wozFormButtons: 'custom-woz-form-buttons-class',
                wozFormButtonPrevious: 'custom-woz-form-button-previous-class',
                wozFormButtonNext: 'custom-woz-form-button-next-class',
            }
        })

        expect(wrapper.find('.custom-woz-form-class').exists()).toBe(true)
        expect(wrapper.find('.custom-woz-form-buttons-class').exists()).toBe(true)
        expect(wrapper.find('.custom-woz-form-button-previous-class').exists()).toBe(true)
        expect(wrapper.find('.custom-woz-form-button-next-class').exists()).toBe(true)
    })

    it('emits the onSubmit event', async (): Promise<void> => {

        const form = wrapper.find('#woz-form')
        await form.trigger('submit')

        expect(wrapper.emitted().updated).toBeTruthy()
    })

    it.todo('calls updated event and saves answer on form submit', async () => {
        const saveAnswerSpy = vi.spyOn(wizardStore, 'saveAnswer')

        const form = wrapper.find('form')
        const input = wrapper.find('input[name="question"]')

        expect(input.exists()).toBe(true) // Ensure input exists
        await input.setValue('New Answer')
        await form.trigger('submit.prevent')

        expect(saveAnswerSpy).toHaveBeenCalledWith({ question: 'New Answer' })
        expect(wrapper.emitted('updated')).toBeTruthy()
    })

    it.todo('sets the initial value of the field on mount', () => {
        const input = wrapper.find('input[name="question"]')
        expect(input.element.value).toBe(mockAnswer)
    })
})
