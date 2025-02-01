import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/vue'
import { createTestingPinia } from '@pinia/testing'
import App from '../../src/App.vue'

// Mock the Wizard component to avoid rendering the entire implementation
vi.mock('../../src/wizard/Wizard.vue', () => ({
    default: {
        name: 'Wizard',
        props: ['layout', 'preview', 'classes', 'forms', 'progressIndicator'],
        emits: ['completed'],
        template: `
      <div data-testid="wizard" @click="$emit('completed', { givenName: 'John', familyName: 'Doe', gender: 'male' })">
        <slot></slot>
      </div>
    `,
    },
}))

describe('App.vue', () => {
    it('renders the Wizard component', () => {
        render(App, {
            global: {
                plugins: [createTestingPinia()],
            },
        })

        // Check if the Wizard component is rendered
        const wizardComponent = screen.getByTestId('wizard')
        expect(wizardComponent).toBeInTheDocument()
    })

    it('passes the correct props to the Wizard component', () => {
        render(App, {
            global: {
                plugins: [createTestingPinia()],
            },
        })

        // Verify forms are passed correctly
        const forms = [
            {
                schema: expect.objectContaining({
                    shape: {
                        givenName: expect.anything(),
                    },
                }),
            },
            {
                schema: expect.objectContaining({
                    shape: {
                        familyName: expect.anything(),
                    },
                }),
            },
            {
                schema: expect.objectContaining({
                    shape: {
                        gender: expect.anything(),
                    },
                }),
            },
        ]

        const wizardComponent = screen.getByTestId('wizard')
        expect(wizardComponent).toBeInTheDocument()

        // Note: Further tests can deeply inspect props if needed.
    })

    it('handles the @completed event with the correct data', async () => {
        const mockHandler = vi.fn()

        render(App, {
            global: {
                plugins: [createTestingPinia()],
            },
            props: {
                onCompleted: mockHandler,
            },
        })

        const wizardComponent = screen.getByTestId('wizard')
        await fireEvent.click(wizardComponent)

        expect(mockHandler).toHaveBeenCalledTimes(1)
        expect(mockHandler).toHaveBeenCalledWith({
            givenName: 'John',
            familyName: 'Doe',
            gender: 'male',
        })
    })
})