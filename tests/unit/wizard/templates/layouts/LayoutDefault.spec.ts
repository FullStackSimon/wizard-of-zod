import {describe, it} from "vitest";
import {createPinia, setActivePinia} from "pinia";
import {DOMWrapper, mount} from "@vue/test-utils";
import LayoutDefault from "@/wizard/templates/layouts/LayoutDefault.vue";
import {z} from "zod";
import {useWizardStore} from "../../../../../src/stores/useWizardStore";

describe('LayoutDefault.vue', () => {
    beforeEach(() => {
        setActivePinia(createPinia())
    })

    it('doesn\'t render any forms', () => {
        const wrapper = mount(LayoutDefault, {
            props: {
                progressIndicator: null,
                forms: undefined
            }
        })

        const header: DOMWrapper<Element> = wrapper.find('#woz-header')
        expect(header.exists()).toBe(true)

        const h1: DOMWrapper<HTMLHeadingElement> = header.find('h1')
        expect(h1.exists()).toBe(true)
        expect(h1.text()).toBe('No questions available.')
    })

    it('renders a single form', () => {
        const wrapper = mount(LayoutDefault, {
            props: {
                progressIndicator: null,
                forms: [
                    {
                        schema: z.object({
                            givenName: z.string().min(2).describe('What is your given name?')
                        })
                    }
                ]
            }
        })

        const header: DOMWrapper<Element> = wrapper.find('#woz-header')
        expect(header.exists()).toBe(true)

        const h1: DOMWrapper<HTMLHeadingElement> = header.find('h1')
        expect(h1.exists()).toBe(true)
        expect(h1.text()).toBe('Form 1 of 1')
    })

    it('renders two forms', () => {
        const wrapper = mount(LayoutDefault, {
            props: {
                progressIndicator: null,
                forms: [
                    {
                        schema: z.object({
                            givenName: z.string().min(2).describe('What is your given name?')
                        })
                    },
                    {
                        schema: z.object({
                            familyName: z.string().min(2).describe('What is your family name?')
                        })
                    }
                ]
            }
        })

        const header: DOMWrapper<Element> = wrapper.find('#woz-header')
        expect(header.exists()).toBe(true)

        const h1: DOMWrapper<HTMLHeadingElement> = header.find('h1')
        expect(h1.exists()).toBe(true)
        expect(h1.text()).toBe('Form 1 of 2')
    })

    it('displays the preview header', () => {
        const store = useWizardStore()
        store.markCompleted()

        const wrapper = mount(LayoutDefault, {
            props: {
                progressIndicator: null,
                forms: [
                    {
                        schema: z.object({
                            givenName: z.string().min(2).describe('What is your given name?')
                        })
                    }
                ]
            }
        })

        const header: DOMWrapper<Element> = wrapper.find('#woz-header')
        expect(header.exists()).toBe(true)

        const h1: DOMWrapper<HTMLHeadingElement> = header.find('h1')
        expect(h1.exists()).toBe(true)
        expect(h1.text()).toBe('Preview')
    })

    it('accepts and applies custom header classes', () => {

        const wrapper = mount(LayoutDefault, {
            props: {
                progressIndicator: null,
                forms: undefined,
                classes: {
                    wozHeader: 'flex-col'
                }
            }
        })

        const header: DOMWrapper<Element> = wrapper.find('#woz-header')
        expect(header.classes()).toContain('flex-col')
    })

    it('accepts and applies custom footer classes', () => {

        const wrapper = mount(LayoutDefault, {
            props: {
                progressIndicator: null,
                forms: undefined,
                classes: {
                    wozFooter: 'flex-col'
                }
            }
        })

        const footer: DOMWrapper<Element> = wrapper.find('#woz-footer')
        expect(footer.classes()).toContain('flex-col')
    })

})