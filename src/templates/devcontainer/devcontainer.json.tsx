// src/templates/devcontainer/devcontainer.json.tsx
/** @jsx json */
/** @jsxFrag json */
import { json } from '../../utils/tsx-pragmas'

export interface DevcontainerJsonProps {
  projectName: string
  useBun?: boolean
}

export default function DevcontainerJson({ projectName, useBun }: DevcontainerJsonProps) {
  return json(null, {
    name: `${projectName}-devcontainer`,
    build: { dockerfile: 'Dockerfile' },
    settings: { 'terminal.integrated.shell.linux': '/bin/bash' },
    extensions: ['oxc.oxc-vscode', ...(useBun ? ['oven-sh.bun-vscode'] : []), 'streetsidesoftware.code-spell-checker'],
    postCreateCommand: 'make install'
  })
}
