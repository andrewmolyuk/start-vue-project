export interface Config {
  projectName: string
  destinationFolder: string
  useDevcontainer: boolean
  useMakefile: boolean
  useBun: boolean
  useOxlint: boolean
  useCommitlint: boolean
  useOxfmt: boolean
  useGithubActions: boolean
  useSemanticRelease: boolean
  useSkills: boolean
  useAgent: boolean
}
