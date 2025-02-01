# Vue Wizard

Vue Wizard is a customizable and dynamic form management library for Vue 3. It enables developers to build, preview, and manage interactive multi-step forms with ease. Built with the Composition API, TypeScript, and Pinia, Vue Wizard is both scalable and developer-friendly.

---

## Features

- **Dynamic Form Management**: Create and manage multi-step forms with Zod validation.
- **Preview and Edit**: Easily preview and edit submitted form responses.
- **Customizable Templates**: Supports default and basic layouts with theming options.
- **Composable State Management**: Utilizes Pinia for state handling.
- **TypeScript Support**: Fully typed props, events, and states for a seamless development experience.
- **Slot-Based API**: Flexible slots for headers, footers, and custom components.
- **Progress Indicators**: Built-in stepper components for navigation.

---

## Installation

Install the package via npm:

```bash
npm install wizard-of-zod
```

Or using Yarn:

```bash
yarn add wizard-of-zod
```

---

## Usage

### Basic Example

```vue
<template>
  <Wizard
    :forms="forms"
    :initial-answers="{ name: 'John Doe' }"
    template="default"
    @completed="onCompleted"
  >
    <template #header>
      <h1>Custom Header</h1>
    </template>
    <template #footer>
      <footer>Custom Footer</footer>
    </template>
  </Wizard>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Wizard } from 'wizard-of-zod'
import { z } from 'zod'

const forms = ref([
  {
    title: 'Personal Information',
    description: 'Please provide your personal details.',
    schema: z.object({
      name: z.string().min(1, 'Name is required'),
      email: z.string().email('Invalid email address'),
    }),
    fieldConfig: {
      name: { label: 'Name', placeholder: 'Enter your name' },
      email: { label: 'Email', placeholder: 'Enter your email' },
    },
  },
])

const onCompleted = (answers: Record<string, any>) => {
  console.log('Form Completed:', answers)
}
</script>
```

---

## Components

### `Wizard`

The main component that manages forms, navigation, and previews.

#### Props

| Prop              | Type                  | Default     | Description                                      |
|-------------------|-----------------------|-------------|--------------------------------------------------|
| `forms`           | `Form<ZodSchema>[]`  | `[]`        | Array of forms to be displayed.                  |
| `template`        | `'default' | 'basic'` | `'default'` | The template layout to use.                      |
| `initialAnswers`  | `Record<string, any>` | `{}`        | Initial answers for the forms.                   |

#### Events

| Event       | Payload               | Description                                |
|-------------|-----------------------|--------------------------------------------|
| `completed` | `Record<string, any>` | Fired when all forms are completed.         |

### `Form`

Handles individual forms within the `Wizard`.

#### Props

| Prop          | Type                  | Default | Description                     |
|---------------|-----------------------|---------|---------------------------------|
| `title`       | `string`              | `null`  | Title of the form.              |
| `description` | `string`              | `null`  | Description of the form.        |
| `schema`      | `ZodSchema`           | `null`  | Validation schema for the form. |
| `fieldConfig` | `Record<string, any>` | `{}`    | Configuration for the fields.   |

### `Preview`

Displays a preview of form responses.

#### Props

| Prop    | Type                  | Default | Description                            |
|---------|-----------------------|---------|----------------------------------------|
| `forms` | `Form<ZodSchema>[]`  | `[]`    | Array of forms to preview.             |

#### Events

| Event       | Payload               | Description                                |
|-------------|-----------------------|--------------------------------------------|
| `edit`      | `PreviewData`         | Fired when a question is edited.           |
| `completed` | `Record<string, any>` | Fired when all forms are submitted.        |

---

## Theming

You can customize the appearance of templates using the `theme` prop. Both `LayoutDefault` and `LayoutBasic` support class-based theming.

Example:

```vue
<Wizard
  :forms="forms"
  :theme="{
    container: 'bg-gray-50',
    main: 'p-4',
  }"
/>
```

---

## Development

### Local Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/FullStackSimon/wizard-of-zod.git
   cd wizard-of-zod
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the development server:

   ```bash
   npm run dev
   ```

### Testing

Ensure your changes are working as expected by running the test suite:

```bash
npm run test
```

---

## Contributing

We welcome contributions! Please see the [CONTRIBUTING.md](CONTRIBUTING.md) for details on how to get started.

---

## Acknowledgements

Massive shout out and big ups to [Shadcn for Vue](https://www.shadcn-vue.com/) who this package would not be possible without.

---

## License

This project is licensed under the [MIT License](LICENSE).

