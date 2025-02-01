import {describe, it} from "vitest";
import {createPinia, setActivePinia} from "pinia";
import {DOMWrapper, mount} from "@vue/test-utils";
import {z} from "zod";
import {useWizardStore} from "@/stores/useWizardStore";
import PreviewList from "@/wizard/templates/preview/PreviewList.vue";

describe('PreviewCards.vue', (): void => {
    beforeEach(() => {
        setActivePinia(createPinia())
    })

    it('renders properly with default props', (): void => {
        const wrapper = mount(PreviewList, {
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

    it('emits the onEdit event', async (): Promise<void> => {
        const wrapper = mount(PreviewList, {
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

        const editButton: DOMWrapper<Element> = wrapper.find('[data-testid="preview-list"] > div > button')

        await editButton.trigger('click')
        expect(wrapper.emitted().edit).toBeTruthy()
    })

    it('emits the onCancel event', async (): Promise<void> => {
        const wrapper = mount(PreviewList, {
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

        const cancelButton: DOMWrapper<HTMLButtonElement> = wrapper.find('[data-testid="cancel-button"]')
        await cancelButton.trigger('click')

        expect(storeSpy).toHaveBeenCalledTimes(1)
    })

    it('emits the onSubmit event', async (): Promise<void> => {
        const wrapper = mount(PreviewList, {
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

        const submitButton: DOMWrapper<HTMLButtonElement> = wrapper.find('[data-testid="submit-button"]')
        await submitButton.trigger('click')

        expect(wrapper.emitted().completed).toBeTruthy()
    })

    it('accepts and applies custom classes', async (): Promise<void> => {
        const wrapper = mount(PreviewList, {
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
        const wrapper = mount(PreviewList, {
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

        const questionLabel = wrapper.find('[data-testid="preview-list"] > div > div > div')
        expect(questionLabel.text()).toBe('Given Name')
    })

})