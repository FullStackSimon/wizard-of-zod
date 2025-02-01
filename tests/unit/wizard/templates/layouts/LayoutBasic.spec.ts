import {describe, it} from "vitest";
import {createPinia, setActivePinia} from "pinia";
import {mount} from "@vue/test-utils";
import LayoutBasic from "@/wizard/templates/layouts/LayoutBasic.vue";

describe('LayoutBasic.vue', () => {
    beforeEach(() => {
        setActivePinia(createPinia())
    })

    it('renders properly with default props', () => {
        const wrapper = mount(LayoutBasic, {
            props: {
                totalForms: 5,
                progressIndicator: null
            }
        })

        expect(wrapper.find('#woz').exists()).toBe(true)
        expect(wrapper.find('#woz-body').exists()).toBe(true)
        expect(wrapper.find('#woz-progress').exists()).toBe(false)
    })

})