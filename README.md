# start-vue-project

A CLI tool to quickly scaffold a Vue 3 project with Vite, TypeScript, Tailwind CSS, and other useful configurations for development and deployment.

[![Codacy Badge](https://app.codacy.com/project/badge/Grade/b10bbd9fb7674990bee223909fe90420)](https://app.codacy.com/gh/andrewmolyuk/start-vue-project/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade)
[![Codacy Badge](https://app.codacy.com/project/badge/Coverage/3e2386808dfc4c90b191098d7faa6f5f)](https://app.codacy.com/gh/andrewmolyuk/start-vue-project/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_coverage)
[![CodeQL](https://github.com/andrewmolyuk/start-vue-project/actions/workflows/github-code-scanning/codeql/badge.svg)](https://github.com/andrewmolyuk/start-vue-project/actions/workflows/github-code-scanning/codeql)
[![Copilot code review](https://github.com/andrewmolyuk/start-vue-project/actions/workflows/copilot-pull-request-reviewer/copilot-pull-request-reviewer/badge.svg)](https://github.com/andrewmolyuk/start-vue-project/actions/workflows/copilot-pull-request-reviewer/copilot-pull-request-reviewer)

> This project is currently in early development, so dont use it in production yet. The API may change without warning, and there may be bugs or incomplete features. Contributions and feedback are welcome!

## Usage

To use the CLI tool, run the following command in your terminal:

```bash
npx start-vue-project my-vue-app
```

This will create a new Vue 3 project in the directory you specify with the following features (some features are optional and can be enabled during setup):

- Vite as the build tool
- TypeScript for type safety
- Tailwind CSS for styling
- VS Code Devcontainer configuration
- Makefile with build and development commands
- Bun as the JavaScript runtime
- Oxlint for code quality
- Commitlint for commit message linting
- Oxfmt for code formatting
- GitHub Actions workflows for CI/CD
- Semantic Release for automated versioning and publishing
- Skills and Agent.md for advanced automation
- A README file with instructions for development and contribution
- A LICENSE file for open source projects

Most of the configuration files are generated from templates, allowing you to easily customize them to fit your specific needs.

## Development

To develop the CLI tool, clone this repository and run the following command to install dependencies:

```bash
make install
```

You can then run the CLI tool locally with:

```bash
make dev
```

This will start the CLI tool in development mode, allowing you to make changes and test them immediately.

## Contributing

Contributions to this project are welcome! If you have any ideas for improvements or new features, please open an issue or submit a pull request. Make sure to follow the existing code style and include tests for any new functionality.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
