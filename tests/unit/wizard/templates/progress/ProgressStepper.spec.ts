import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import { Circle, CircleCheck, CircleDot } from 'lucide-vue-next'
import ProgressStepper from "../../../../../src/wizard/templates/progress/ProgressStepper.vue";

describe('ProgressStepper.vue', () => {
    it('renders the correct number of steps', () => {
        const wrapper = mount(ProgressStepper, {
            props: {
                totalForms: 3,
                currentFormIndex: 1
            },
            global: {
                components: { Circle, CircleCheck, CircleDot }
            }
        })

        const stepItems = wrapper.findAll('.relative.flex.w-full.flex-col')
        expect(stepItems.length).toBe(3)
    })

    it('renders the correct current step', () => {
        const wrapper = mount(ProgressStepper, {
            props: {
                totalForms: 3,
                currentFormIndex: 2
            },
            global: {
                components: { Circle, CircleCheck, CircleDot }
            }
        })

        const activeStep = wrapper.findAllComponents(CircleDot)
        expect(activeStep.length).toBe(1)
    })

    it('renders completed steps correctly', () => {
        const wrapper = mount(ProgressStepper, {
            props: {
                totalForms: 3,
                currentFormIndex: 2
            },
            global: {
                components: { Circle, CircleCheck, CircleDot }
            }
        })

        const completedSteps = wrapper.findAllComponents(CircleCheck)
        expect(completedSteps.length).toBe(1)
    })

    it('does not show separators for the last step', () => {
        const wrapper = mount(ProgressStepper, {
            props: {
                totalForms: 3,
                currentFormIndex: 1
            },
            global: {
                components: { Circle, CircleCheck, CircleDot }
            }
        })

        const separators = wrapper.findAll('.rounded-full.bg-muted')
        expect(separators.length).toBe(2) // totalForms - 1
    })
})
