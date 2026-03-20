import { mock, describe, test, expect, beforeEach, afterEach, vi } from 'bun:test'

const promptMock = vi.fn()

// mock.module is hoisted by Bun, so inquirer is mocked before config.ts binds it
mock.module('inquirer', () => ({
  default: { prompt: promptMock }
}))

import { getConfig } from '../src/config'

const config = {
  projectName: 'my-vue-app',
  destinationFolder: '.',
  devcontainer: false,
  makefile: false,
  bun: false,
  oxlint: false,
  commitlint: false,
  oxfmt: false,
  githubActions: false,
  semanticRelease: false,
  skills: false,
  agent: false
}

// Helper to set process.argv
const setArgv = (args: string[]) => {
  process.argv = ['node', 'script.js', ...args]
}

describe('getConfig (no injection)', () => {
  let originalArgv: string[]
  let originalExit: typeof process.exit
  let exitMock: ReturnType<typeof vi.fn>

  beforeEach(() => {
    originalArgv = process.argv
    originalExit = process.exit
    exitMock = vi.fn((code?: number) => {
      throw new Error(`process.exit: ${code}`)
    })
    // @ts-ignore
    process.exit = exitMock
    promptMock.mockResolvedValue(config)
  })

  afterEach(() => {
    process.argv = originalArgv
    process.exit = originalExit
    vi.clearAllMocks()
  })

  // ==============================================================================================

  test('returns config with prompt values when no args are passed', async () => {
    // Arrange
    setArgv([])

    // Act
    const config = await getConfig()

    // Assert
    expect(promptMock).toHaveBeenCalledTimes(1)
    expect(exitMock).not.toHaveBeenCalled()
    expect(config.projectName).toBe('my-vue-app')
    expect(config.destinationFolder).toBe('.')
    expect(config.useDevcontainer).toBe(false)
    expect(config.useMakefile).toBe(false)
    expect(config.useBun).toBe(false)
    expect(config.useOxlint).toBe(false)
    expect(config.useCommitlint).toBe(false)
    expect(config.useOxfmt).toBe(false)
    expect(config.useGithubActions).toBe(false)
    expect(config.useSemanticRelease).toBe(false)
    expect(config.useSkills).toBe(false)
    expect(config.useAgent).toBe(false)
  })

  // ==============================================================================================

  test('returns config from args in --quiet mode', async () => {
    // Arrange
    setArgv(['--quiet', '--project-name', 'test-app', '--destination-folder', './test-folder', '--bun', '--makefile'])

    // Act
    const config = await getConfig()

    // Assert
    expect(config.projectName).toBe('test-app')
    expect(config.destinationFolder).toBe('./test-folder')
    expect(config.useBun).toBe(true)
    expect(config.useMakefile).toBe(true)
    expect(config.useDevcontainer).toBe(false)
    expect(exitMock).not.toHaveBeenCalled()
  })

  // ==============================================================================================

  test('exits with error if --quiet is passed without --project-name and --destination-folder', async () => {
    // Arrange
    setArgv(['--quiet'])
    const errorMock = vi.spyOn(console, 'error').mockImplementation(() => {})

    // Act
    let exited = false
    try {
      await getConfig()
    } catch {
      exited = true
    }

    // Assert
    expect(errorMock).toHaveBeenCalledWith('Error: --project-name and --destination-folder cannot be empty.')
    expect(exitMock).toHaveBeenCalledWith(1)
    expect(exited).toBe(true)
    errorMock.mockRestore()
  })

  // ==============================================================================================

  test('shows help and exits if --help is passed', async () => {
    // Arrange
    setArgv(['--help'])
    const logMock = vi.spyOn(console, 'log').mockImplementation(() => {})

    // Act
    let exited = false
    try {
      await getConfig()
    } catch {
      exited = true
    }

    // Assert
    expect(logMock).toHaveBeenCalledWith('Usage: start-vue-project [options]')
    expect(exitMock).toHaveBeenCalledWith(0)
    expect(exited).toBe(true)
    logMock.mockRestore()
  })

  // ==============================================================================================

  test('shows version and exits if --version is passed', async () => {
    // Arrange
    setArgv(['--version'])
    const logMock = vi.spyOn(console, 'log').mockImplementation(() => {})

    // Act
    let exited = false
    try {
      await getConfig()
    } catch {
      exited = true
    }

    // Assert
    expect(logMock).toHaveBeenCalledWith('Start Vue Project version 1.0.0')
    expect(exitMock).toHaveBeenCalledWith(0)
    expect(exited).toBe(true)
    logMock.mockRestore()
  })
})
