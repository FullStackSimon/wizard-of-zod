import {z, ZodObject, ZodRawShape} from 'zod'

// Enum for available layout types
export type LayoutType = 'basic' | 'default'

export type ProgressIndicator  = 'bar' | 'stepper'

export type PreviewType  = 'cards' | 'list' | 'table'

interface CustomI18n {
    [key: string]: string
}

// Represents configuration for individual form fields
export type FieldConfig = Record<string, any>

// Defines the structure of a form used within the wizard
export interface Form<T extends z.ZodObject<any>> {
    title?: string
    description?: string
    schema: T
    fieldConfig?: FieldConfig
}

// Defines class overrides for the wizard templates
export interface WizardClasses {
    woz?: string
    wozHeader?: string
    wozBody?: string
    wozFormStepper?: string
    wozFormIntro?: string
    wozForm?: string
    wozFormButtons?: string
    wozFormButtonPrevious?: string
    wozFormButtonNext?: string
    wozProgress?: string
    wozPreview?: string
    wozPreviewIntro?: string
    wozFooter?: string
}

// Defines props passed to the Wizard component
export interface WizardProps {
    forms: Form<z.ZodObject<any>>[]
    layout?: LayoutType
    preview?: PreviewType
    progressIndicator: ProgressIndicator | null
    classes?: WizardClasses
    initialAnswers?: Record<string, any>
    lang?: 'en' | 'fr'
    customI18n?: CustomI18n
}

// Defines events emitted by the Wizard component
export interface WizardEvents {
    validated: (answer: Record<string, any>) => void
}

// Represents data used for previewing a form or question
export interface PreviewData {
    formIndex: number
    questionKey: string
    question: string
    answer: any
}

export type FormProps = {
    schema: Form<ZodObject<ZodRawShape>>
    fieldConfig?: Record<string, unknown>
    title?: string
    description?: string
    classes?: WizardClasses
}

export type Translations = {
    answer: string
    cancel: string
    complete: string
    formXofY: string
    next: string
    noQuestions: string
    noQuestionsAvailable: string
    preSubmitNotice: string
    preview: string
    previous: string
    question: string
    submit: string
    update: string
}

export type TranslationKey = keyof Translations