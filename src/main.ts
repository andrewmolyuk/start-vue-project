#!/usr/bin/env ts-node

import { getConfig } from './config'
import { generate } from './templates/utils'
import Dockerfile from './templates/devcontainer/Dockerfile'
import DevcontainerJson from './templates/devcontainer/devcontainer.json'

async function main() {
  const config = await getConfig()
  console.log('Starting project setup with the following configuration:')
  console.log(JSON.stringify(config, null, 2))

  if (config.useDevcontainer) {
    generate(config, Dockerfile, '.devcontainer/Dockerfile')
    generate(config, DevcontainerJson, '.devcontainer/devcontainer.json')
  }
}

void main()
