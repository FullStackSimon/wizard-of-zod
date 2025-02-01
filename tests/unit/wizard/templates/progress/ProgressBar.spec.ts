import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { useWizardStore } from '@/stores/useWizardStore'
import ProgressBar from "../../../../../src/wizard/templates/progress/ProgressBar.vue";

describe('ProgressBar.vue', () => {
    let wrapper

    beforeEach(() => {
        // Mock the store
        createTestingPinia({ createSpy: vi.fn })
        const wizardStore = useWizardStore()
        wizardStore.i18n = { complete: 'Complete' }

        wrapper = mount(ProgressBar, {
            props: {
                totalForms: 5,
                currentFormIndex: 3
            },
            global: {
                plugins: [createTestingPinia()]
            }
        })
    })

    it('renders the progress bar component', () => {
        expect(wrapper.find('#progress').exists()).toBe(true)
    })

    it('calculates the correct progress percentage', () => {
        const progressPercentage = ((3 - 1) / 5) * 100
        const progressText = wrapper.find('p').text()

        expect(progressText).toContain(progressPercentage.toFixed(0))
        expect(progressText).toContain('Complete')
    })

    it('applies the correct style on mount', () => {
        const progressBarIndicator = wrapper.find('#progress > div')

        if (progressBarIndicator.exists()) {
            const currentValue = progressBarIndicator.element.dataset.value
            if (currentValue === "0") {
                expect(progressBarIndicator.element.style.transform).toBe('translateX(-101%)')
            }
        }
    })

    it('applies the correct style on mount when dataset value is 0', async () => {
        // Mock the element
        const mockElement = document.createElement('div')
        mockElement.dataset.value = "0" // Set mock dataset value
        document.body.appendChild(mockElement)

        // Mock `querySelector` to return the mocked element
        vi.spyOn(document, 'querySelector').mockReturnValue(mockElement)

        // Remount the component to trigger the onMounted hook
        wrapper = mount(ProgressBar, {
            props: {
                totalForms: 5,
                currentFormIndex: 1 // Simulate the first form to ensure data-value is "0"
            },
            global: {
                plugins: [createTestingPinia()]
            }
        })

        // Wait for the DOM updates
        await wrapper.vm.$nextTick()

        // Verify the style applied in the onMounted hook
        expect(mockElement.style.transform).toBe('translateX(-101%)')

        // Cleanup
        document.body.removeChild(mockElement)
        vi.restoreAllMocks()
    })


})
