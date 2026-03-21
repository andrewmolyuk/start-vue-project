/** @jsx docker */
/** @jsxFrag docker */
// eslint-disable-next-line no-unused-vars

import { docker } from '../utils'
// import { Config } from '../../types'

export default function Dockerfile() {
  return docker(
    null,
    null,
    `FROM mcr.microsoft.com/devcontainers/base:ubuntu-24.04

# Install necessary packages for development
RUN apt-get update && apt-get install -y --no-install-recommends ca-certificates bash curl git gnupg make openssh-client python3 zsh unzip \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

`
  )
}
