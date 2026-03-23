import { text } from '../utils'
import { Config } from '../../types'

export default function DockerfileTemplate(config: Config) {
  return text(
    null,
    null,
    `
# Base image
FROM mcr.microsoft.com/devcontainers/base:ubuntu

# Common dependencies
RUN apt-get update && apt-get install -y \\
    curl \\
    git \\
    ca-certificates \\
    && rm -rf /var/lib/apt/lists/*

`,
    config.useBun
      ? `
# Install Bun
RUN curl -fsSL https://bun.sh/install | bash
ENV PATH="/root/.bun/bin:$PATH"

`
      : '',
    config.useAgent
      ? `
# Copy Agent.md (if present in project root)
COPY ../Agent.md /workspace/Agent.md

`
      : '',
    config.useSkills
      ? `
# Copy skills directory (if present)
COPY ../skills /workspace/skills

`
      : '',
    `
# Set working directory
WORKDIR /workspace

# [Optional] Uncomment to install additional packages
# RUN apt-get update && apt-get install -y <package-name>
`
  )
}
