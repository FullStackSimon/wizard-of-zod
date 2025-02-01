import {describe, it} from "vitest";
import {createPinia, setActivePinia} from "pinia";
import {DOMWrapper, mount} from "@vue/test-utils";
import PreviewCards from "@/wizard/templates/preview/PreviewCards.vue";
import {z} from "zod";
import {useWizardStore} from "../../../../../src/stores/useWizardStore";

describe('PreviewCards.vue', (): void => {
    beforeEach(() => {
        setActivePinia(createPinia())
    })

    it('renders properly with default props', (): void => {
        const wrapper = mount(PreviewCards, {
            props: {
                forms: [
                    {
                        schema: z.object({
                            givenName: z.string().min(2).describe('What is your given name?')
                        })
                    }
                ]
            }
        })

        const previewIntro: DOMWrapper<Element> = wrapper.find('#woz-preview-intro')

        expect(previewIntro.exists()).toBe(true)
        expect(previewIntro.text()).toBe('You are about to submit the following information.')
    })

    it('renders with a form description', (): void => {
        const wrapper = mount(PreviewCards, {
            props: {
                forms: [
                    {
                        schema: z.object({
                            givenName: z.string().min(2).describe('What is your given name?')
                        }),
                        description: "Personal Details"
                    }
                ]
            }
        })

        const descriptionContainer: DOMWrapper<HTMLParagraphElement> = wrapper.find('.text-sm.text-muted-foreground')

        expect(descriptionContainer.exists()).toBe(true)
        expect(descriptionContainer.text()).toBe('Personal Details')
    })

    it('emits the onEdit event', async (): Promise<void> => {
        const wrapper = mount(PreviewCards, {
            props: {
                forms: [
                    {
                        schema: z.object({
                            givenName: z.string().min(2).describe('What is your given name?')
                        })
                    }
                ]
            }
        })

        const button: DOMWrapper<HTMLButtonElement> = wrapper.find('table > tbody > tr > td:nth-child(3) > button')

        await button.trigger('click')
        expect(wrapper.emitted().edit).toBeTruthy()
    })

    it('emits the onCancel event', async (): Promise<void> => {
        const wrapper = mount(PreviewCards, {
            props: {
                forms: [
                    {
                        schema: z.object({
                            givenName: z.string().min(2).describe('What is your given name?')
                        })
                    }
                ]
            }
        })

        const store = useWizardStore();
        const storeSpy = vi.spyOn(store, 'reset')

        const cancelButton: DOMWrapper<HTMLButtonElement> = wrapper.find('.flex.justify-between.w-full > button:nth-child(1)')
        await cancelButton.trigger('click')

        expect(storeSpy).toHaveBeenCalledTimes(1)
    })

    it('emits the onSubmit event', async (): Promise<void> => {
        const wrapper = mount(PreviewCards, {
            props: {
                forms: [
                    {
                        schema: z.object({
                            givenName: z.string().min(2).describe('What is your given name?')
                        })
                    }
                ]
            }
        })

        const submitButton: DOMWrapper<HTMLButtonElement> = wrapper.find('.flex.justify-between.w-full > button:nth-child(2)')
        await submitButton.trigger('click')

        expect(wrapper.emitted().completed).toBeTruthy()
    })

    it('accepts and applies custom classes', async (): Promise<void> => {
        const wrapper = mount(PreviewCards, {
            props: {
                forms: [
                    {
                        schema: z.object({
                            givenName: z.string().min(2).describe('What is your given name?')
                        })
                    }
                ],
                classes: {
                    wozPreview: 'custom-woz-preview-class',
                    wozPreviewIntro: 'custom-woz-preview-intro-class',
                    wozFormButtons: 'custom-woz-form-buttons-class',
                    wozFormButtonPrevious: 'custom-woz-form-button-previous-class',
                    wozFormButtonNext: 'custom-woz-form-button-next-class',
                }
            }
        })

        expect(wrapper.find('.custom-woz-preview-class').exists()).toBe(true)
        expect(wrapper.find('.custom-woz-preview-intro-class').exists()).toBe(true)
        expect(wrapper.find('.custom-woz-form-buttons-class').exists()).toBe(true)
        expect(wrapper.find('.custom-woz-form-button-previous-class').exists()).toBe(true)
        expect(wrapper.find('.custom-woz-form-button-next-class').exists()).toBe(true)
    })

    it('beautify\'s the question label', async (): Promise<void> => {
        const wrapper = mount(PreviewCards, {
            props: {
                forms: [
                    {
                        schema: z.object({
                            givenName: z.string().min(2)
                        })
                    }
                ]
            }
        })

        const store = useWizardStore()
        await store.saveAnswer({ givenName: 'zzz' })

        const questionCell = wrapper.find('table > tbody > tr > td:nth-child(1)')
        expect(questionCell.text()).toBe('Given Name')
    })

})