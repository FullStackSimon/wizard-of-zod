import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import Wizard from '@/wizard/Wizard.vue'
import { useWizardStore } from '@/stores/useWizardStore'
import { createTestingPinia } from '@pinia/testing'
import Form from '@/wizard/Form.vue'
import Edit from '@/wizard/Edit.vue'

vi.mock('@/wizard/templates/layouts/LayoutDefault.vue', () => ({
    default: { template: '<div>LayoutDefault</div>' }
}))
vi.mock('@/wizard/templates/layouts/LayoutBasic.vue', () => ({
    default: { template: '<div>LayoutBasic</div>' }
}))
vi.mock('@/wizard/templates/progress/ProgressStepper.vue', () => ({
    default: { template: '<div>ProgressStepper</div>' }
}))
vi.mock('@/wizard/templates/preview/PreviewCards.vue', () => ({
    default: { template: '<div>PreviewCards</div>' }
}))

const mockForms = [
    { title: 'Form 1', description: 'Description 1', schema: {}, fieldConfig: {} },
    { title: 'Form 2', description: 'Description 2', schema: {}, fieldConfig: {} }
]

describe('Wizard.vue', () => {
    const pinia = createTestingPinia({ createSpy: vi.fn })
    const wizardStore = useWizardStore()

    it.todo('renders the correct layout based on props', () => {
        const wrapper = mount(Wizard, {
            global: {
                plugins: [pinia]
            },
            props: {
                layout: 'basic',
                preview: 'cards',
                forms: mockForms
            }
        })

        expect(wrapper.html()).toContain('LayoutBasic')
    })

    it.todo('emits completed event with correct data', async () => {
        const wrapper = mount(Wizard, {
            global: {
                plugins: [pinia]
            },
            props: {
                forms: mockForms
            }
        })

        await wrapper.vm.$emit('completed', { data: 'test' })

        expect(wrapper.emitted('completed')).toBeTruthy()
        expect(wrapper.emitted('completed')[0]).toEqual([{ data: 'test' }])
    })

    it.todo('renders Form component when not in edit mode and has questions', () => {
        wizardStore.currentQuestion = 1
        const wrapper = mount(Wizard, {
            global: {
                plugins: [pinia]
            },
            props: {
                forms: mockForms
            }
        })

        expect(wrapper.findComponent(Form).exists()).toBe(true)
    })

    it.todo('renders Edit component when in edit mode', () => {
        const wrapper = mount(Wizard, {
            global: {
                plugins: [pinia]
            },
            props: {
                forms: mockForms
            }
        })

        wrapper.setData({ isEditing: true })

        expect(wrapper.findComponent(Edit).exists()).toBe(true)
    })

    it.todo('calls saveAnswer when validated event is emitted by Form', async () => {
        wizardStore.saveAnswer = vi.fn()
        const wrapper = mount(Wizard, {
            global: {
                plugins: [pinia]
            },
            props: {
                forms: mockForms
            }
        })

        const formComponent = wrapper.findComponent(Form)
        await formComponent.vm.$emit('validated', { answer: 'test' })

        expect(wizardStore.saveAnswer).toHaveBeenCalledWith({ answer: 'test' })
    })

    it.todo('resets wizard store on completed', async () => {
        wizardStore.reset = vi.fn()

        const wrapper = mount(Wizard, {
            global: {
                plugins: [pinia]
            },
            props: {
                forms: mockForms
            }
        })

        await wrapper.vm.onCompleted({ finalData: 'test' })

        expect(wizardStore.reset).toHaveBeenCalled()
    })
})
