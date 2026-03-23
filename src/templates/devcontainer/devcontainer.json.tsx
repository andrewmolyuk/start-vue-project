/** @jsx json */
/** @jsxFrag json */
import { json } from '../utils'

import { Config } from '../../types'

export default function DevcontainerJson({ projectName, useBun }: Config) {
  return json(null, {
    name: `${projectName}-devcontainer`,
    build: { dockerfile: 'Dockerfile' },
    settings: { 'terminal.integrated.shell.linux': '/bin/bash' },
    extensions: ['oxc.oxc-vscode', ...(useBun ? ['oven-sh.bun-vscode'] : []), 'streetsidesoftware.code-spell-checker'],
    postCreateCommand: 'make install'
  })
}
