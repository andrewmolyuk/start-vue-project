// src/templates/devcontainer/Dockerfile.tsx
/** @jsx docker */
/** @jsxFrag docker */
// eslint-disable-next-line no-unused-vars

import { docker } from '../utils'
import { Config } from '../../types'

export default function Dockerfile({ useBun, useAgent, useSkills }: Config) {
  return (
    <>
      {`# Base image\nFROM mcr.microsoft.com/devcontainers/base:ubuntu\n\n# Common dependencies\nRUN apt-get update && apt-get install -y \\\n    curl \\\n    git \\\n    ca-certificates \\\n    && rm -rf /var/lib/apt/lists/*\n\n`}
      {useBun && `# Install Bun\nRUN curl -fsSL https://bun.sh/install | bash\nENV PATH="/root/.bun/bin:$PATH"\n\n`}
      {useAgent && `# Copy Agent.md (if present in project root)\nCOPY ../Agent.md /workspace/Agent.md\n\n`}
      {useSkills && `# Copy skills directory (if present)\nCOPY ../skills /workspace/skills\n\n`}
      {`# Set working directory\nWORKDIR /workspace\n\n# [Optional] Uncomment to install additional packages\n# RUN apt-get update && apt-get install -y <package-name>\n`}
    </>
  )
}
