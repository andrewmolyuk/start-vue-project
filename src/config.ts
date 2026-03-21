import inquirer from 'inquirer'
import { Config } from './types'

export async function getConfig(): Promise<Config> {
  const args = process.argv.slice(2)

  handleEarlyExits(args)

  const argsConfig = getConfigFromArgs(args)

  if (args.includes('--quiet') || args.includes('-q')) {
    return getQuietConfig(argsConfig)
  }

  return getInteractiveConfig(argsConfig)
}

const handleEarlyExits = (args: string[]): void => {
  if (args.includes('--help') || args.includes('-h')) showHelp()
  if (args.includes('--version') || args.includes('-v')) showVersion()
}

const getQuietConfig = (argsConfig: Config): Config => {
  if (argsConfig.projectName === '' || argsConfig.destinationFolder === '') {
    console.error('Error: --project-name and --destination-folder cannot be empty.')
    process.exit(1)
  }
  return argsConfig
}

const getInteractiveConfig = async (argsConfig: Config): Promise<Config> => {
  const answers = await inquirer.prompt([
    { name: 'projectName', message: 'Project name:', type: 'input', default: argsConfig.projectName || 'my-vue-app' },
    { name: 'destinationFolder', message: 'Destination folder:', type: 'input', default: argsConfig.destinationFolder || 'my-vue-app' },
    { name: 'devcontainer', message: 'Add Devcontainer?', type: 'confirm' },
    { name: 'makefile', message: 'Add Makefile?', type: 'confirm' },
    { name: 'bun', message: 'Use Bun instead of Node?', type: 'confirm', default: argsConfig.useBun },
    { name: 'oxlint', message: 'Add Oxlint for code quality?', type: 'confirm' },
    { name: 'commitlint', message: 'Add Commitlint for commit message linting?', type: 'confirm' },
    { name: 'oxfmt', message: 'Add Oxfmt for code formatting?', type: 'confirm' },
    { name: 'githubActions', message: 'Add GitHub Actions?', type: 'confirm' },
    { name: 'semanticRelease', message: 'Add Semantic Release?', type: 'confirm' },
    { name: 'skills', message: 'Add Skills?', type: 'confirm' },
    { name: 'agent', message: 'Add Agent.md?', type: 'confirm' }
  ])

  return {
    projectName: answers.projectName,
    destinationFolder: answers.destinationFolder,
    useDevcontainer: answers.devcontainer,
    useMakefile: answers.makefile,
    useBun: answers.bun,
    useOxlint: answers.oxlint,
    useCommitlint: answers.commitlint,
    useOxfmt: answers.oxfmt,
    useGithubActions: answers.githubActions,
    useSemanticRelease: answers.semanticRelease,
    useSkills: answers.skills,
    useAgent: answers.agent
  }
}

const showHelp = () => {
  console.log('')
  console.log('Start Vue Project - A CLI tool to quickly set up a new Vue.js project with optional features.')
  console.log('')
  console.log('Usage: start-vue-project [options]')
  console.log('')
  console.log('Project options:')
  console.log('  --project-name       Project name (default: my-vue-app)')
  console.log('  --destination-folder Destination folder (default: .)')
  console.log('  --devcontainer       Add VS Code devcontainer')
  console.log('  --makefile           Add Makefile file')
  console.log('  --bun                Use Bun instead of Node')
  console.log('  --oxlint             Add Oxlint for code quality')
  console.log('  --commitlint         Add Commitlint for commit message linting')
  console.log('  --oxfmt              Add Oxfmt for code formatting')
  console.log('  --github-actions     Add GitHub Actions')
  console.log('  --semantic-release   Add Semantic Release')
  console.log('  --skills             Add general and Vue related skills')
  console.log('  --agent              Add Agent.md file')
  console.log('')
  console.log('Available options:')
  console.log('  --help, -h           Show help')
  console.log('  --version, -v        Show version number')
  console.log('  --quiet, -q          Run quietly without prompts')
  console.log('')
  console.log('Example:')
  console.log('  npx start-vue-project --project-name my-app --destination-folder ./my-app --devcontainer --makefile --semantic-release')
  console.log('')
  process.exit(0)
}

const showVersion = () => {
  console.log('Start Vue Project version 1.0.0')
  process.exit(0)
}

const getConfigFromArgs = (args: string[]): Config => {
  return {
    projectName: getArgValue(args, '--project-name') ?? '',
    destinationFolder: getArgValue(args, '--destination-folder') ?? '',
    useDevcontainer: args.includes('--devcontainer'),
    useMakefile: args.includes('--makefile'),
    useBun: args.includes('--bun'),
    useOxlint: args.includes('--oxlint'),
    useCommitlint: args.includes('--commitlint'),
    useOxfmt: args.includes('--oxfmt'),
    useGithubActions: args.includes('--github-actions'),
    useSemanticRelease: args.includes('--semantic-release'),
    useSkills: args.includes('--skills'),
    useAgent: args.includes('--agent')
  }
}

const getArgValue = (args: string[], name: string): string | null => {
  const index = args.indexOf(name)
  if (index !== -1 && index < args.length - 1) {
    return args[index + 1]
  }
  return null
}
