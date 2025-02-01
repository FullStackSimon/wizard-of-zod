import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import Form from '@/wizard/Form.vue'
import { useWizardStore } from '@/stores/useWizardStore'
import { useWizardNavigation } from '@/composables/useWizardNavigation'
import { AutoForm } from '@/components/ui/auto-form'
import { Button } from '@/components/ui/button'
import { z } from 'zod'
import {nextTick} from "vue";

vi.mock('@/stores/useWizardStore', () => ({
    useWizardStore: vi.fn(),
}))

vi.mock('@/composables/useWizardNavigation', () => ({
    useWizardNavigation: vi.fn(),
}))

describe('Component', () => {
    const mockSchema = z.object({
        field1: z.string().nonempty(),
        field2: z.number().min(1),
    })

    const mockWizardStore = {
        i18n: { previous: 'Previous', next: 'Next' },
        answers: { field1: 'test', field2: 5 },
    }

    const mockWizardNavigation = {
        isFirstQuestion: true,
        goToPreviousQuestion: vi.fn(),
    }

    beforeEach(() => {
        vi.resetAllMocks()

        useWizardStore.mockReturnValue(mockWizardStore)
        useWizardNavigation.mockReturnValue(mockWizardNavigation)
    })

    it('renders correctly with props and initial state', () => {
        const wrapper = mount(Form, {
            props: {
                schema: mockSchema,
                title: 'Test Title',
                description: 'Test Description',
                fieldConfig: {},
            },
        })

        expect(wrapper.find('#woz-form-intro').exists()).toBe(true)
        expect(wrapper.find('h1').text()).toBe('Test Title')
        expect(wrapper.find('p').text()).toBe('Test Description')
        expect(wrapper.findComponent(AutoForm).exists()).toBe(true)
    })

    it('disables the back button if it is the first question', () => {
        const wrapper = mount(Form, {
            props: {
                schema: mockSchema,
                fieldConfig: {},
            },
        })

        const backButton = wrapper.find('#woz-form-button-previous')
        expect(backButton.attributes('disabled')).toBe('')
    })

    it('emits "validated" event on form submission with valid data', async () => {
        const wrapper = mount(Form, {
            props: {
                schema: mockSchema,
                fieldConfig: {},
            },
        })

        const autoForm = wrapper.findComponent(AutoForm)
        const validData = { field1: 'valid', field2: 10 }

        await autoForm.vm.$emit('submit', validData)

        expect(wrapper.emitted().validated).toBeTruthy()
        expect(wrapper.emitted().validated[0]).toEqual([validData])
    })

    it('accepts and applies custom classes', async (): Promise<void> => {
        const wrapper = mount(Form, {
            props: {
                schema: mockSchema,
                fieldConfig: {},
                title: 'Foo',
                description: 'Bar',
                classes: {
                    wozFormStepper: 'custom-woz-form-stepper-class',
                    wozFormIntro: 'custom-woz-form-intro-class',
                    wozForm: 'custom-woz-form-class',
                    wozFormButtons: 'custom-woz-form-buttons-class',
                    wozFormButtonPrevious: 'custom-woz-form-button-previous-class',
                    wozFormButtonNext: 'custom-woz-form-button-next-class',
                }
            },
        })

        expect(wrapper.find('.custom-woz-form-stepper-class').exists()).toBe(true)
        expect(wrapper.find('.custom-woz-form-intro-class').exists()).toBe(true)
        expect(wrapper.find('.custom-woz-form-class').exists()).toBe(true)
        expect(wrapper.find('.custom-woz-form-buttons-class').exists()).toBe(true)
        expect(wrapper.find('.custom-woz-form-button-previous-class').exists()).toBe(true)
        expect(wrapper.find('.custom-woz-form-button-next-class').exists()).toBe(true)
    })

    it('doesn\'t render the description when it is not set', async (): Promise<void> => {
        const wrapper = mount(Form, {
            props: {
                schema: mockSchema,
                fieldConfig: {},
                title: 'Foo'
            },
        })

        const intro = wrapper.find('#woz-form-intro')
        expect(intro.find('p').exists()).toBe(false)
    })

    it('doesn\'t render the title when it is not set', async (): Promise<void> => {
        const wrapper = mount(Form, {
            props: {
                schema: mockSchema,
                fieldConfig: {},
                description: 'Bar'
            },
        })

        const intro = wrapper.find('#woz-form-intro')
        expect(intro.find('h1').exists()).toBe(false)
    })

    it('doesn\'t render when the schema is not set', async (): Promise<void> => {
        const wrapper = mount(Form, {
            props: {
                schema: {}
            },
        })
        expect(wrapper.text()).toBe('No schema detected.')
    })

    it.todo('calls goToPreviousQuestion when back button is clicked', async () => {
        const wrapper = mount(Form, {
            props: {
                schema: mockSchema,
                fieldConfig: {},
            },
        })

        const backButton = wrapper.find('#woz-form-button-previous')
        await backButton.trigger('click.prevent')

        expect(mockWizardNavigation.goToPreviousQuestion).toHaveBeenCalled()
    })

    it.todo('sets initial values in the form from wizard store answers', () => {
        const wrapper = mount(Form, {
            props: {
                schema: mockSchema,
                fieldConfig: {},
            },
        })

        const autoForm = wrapper.findComponent(AutoForm)

        expect(autoForm.props('form').initialValues).toEqual(mockWizardStore.answers)
    })
})