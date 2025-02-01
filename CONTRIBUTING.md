# Contributing to Vue Wizard

I'm excited that you’re interested in contributing to Wizard of Zod! Contributions of all kinds are welcome, including code, documentation, bug reports, and feature suggestions.

---

## Getting Started

### 1. Fork the Repository
- Start by forking the repository to your own GitHub account.
- Clone your forked repository locally:
  ```bash
  git clone https://github.com/FullStackSimon/wizard-of-zod.git
  cd wizard-of-zod
  ```

### 2. Install Dependencies
- Install the required dependencies using npm or Yarn:
  ```bash
  npm install
  # or
  yarn install
  ```

### 3. Run the Development Server
- Start the development server:
  ```bash
  npm run dev
  ```
- Open your browser and navigate to `http://localhost:3000` to see the project in action.

### 4. Create a New Branch
- Create a new branch for your contribution:
  ```bash
  git checkout -b my-feature-branch
  ```

---

## How to Contribute

### 1. Bug Reports
- Search existing issues to see if the bug has already been reported.
- If not, open a new issue and provide detailed information:
    - Steps to reproduce the bug.
    - Expected behavior vs. actual behavior.
    - Screenshots or error logs (if applicable).

### 2. Feature Requests
- Check existing issues to see if the feature has already been requested.
- If not, open a new issue and describe:
    - The problem the feature would solve.
    - How it would improve the library.
    - Any potential challenges or considerations.

### 3. Code Contributions
- Follow the steps in **Getting Started** to set up the project.
- Ensure your code adheres to the project’s style and linting rules by running:
  ```bash
  npm run lint
  ```
- Write unit tests for your changes, if applicable. Run the test suite to ensure all tests pass:
  ```bash
  npm run test
  ```
- Commit your changes with a meaningful commit message:
  ```bash
  git commit -m "feat: add new feature X"
  ```
- Push your branch to your forked repository:
  ```bash
  git push origin my-feature-branch
  ```
- Open a pull request (PR) against the `main` branch of the original repository.

### 4. Documentation Improvements
- Improve or add documentation in Markdown files (`README.md`, etc.).
- Ensure documentation is clear, concise, and adheres to the existing tone and style.
- Submit your changes as a pull request.

---

## Code Guidelines

### Coding Standards
- Use [TypeScript](https://www.typescriptlang.org/) for type safety.
- Follow Vue 3 best practices, using the Composition API and `script setup` syntax.
- Use [Tailwind CSS](https://tailwindcss.com/) for consistent styling.

### Commit Messages
- Use clear, descriptive commit messages. Follow [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/):
    - `feat: ` for new features.
    - `fix: ` for bug fixes.
    - `docs: ` for documentation updates.
    - `chore: ` for maintenance or minor updates.

### Pull Request Checklist
- Ensure your branch is up to date with `main`:
  ```bash
  git fetch origin
  git rebase origin/main
  ```
- Check for linting errors:
  ```bash
  npm run lint
  ```
- Run all tests and confirm they pass:
  ```bash
  npm run test
  ```
- Include a clear description of your changes in the PR.
- Reference any related issues (e.g., `Closes #123`).

---

## Community Guidelines

- Be respectful and constructive in discussions.
- Follow the [Code of Conduct](CODE_OF_CONDUCT.md).
- Acknowledge and thank other contributors for their efforts.

---

## Need Help?

If you have any questions or need assistance, feel free to:
- Open a discussion or issue on GitHub.

Thank you for your interest in contributing to Wizard of Zod! Together, we can make it even better. 🚀

