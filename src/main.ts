#!/usr/bin/env ts-node

import { getConfig } from './config'
import { generateDevcontainer } from './generators/devcontainer-generator'

async function main() {
  const config = await getConfig()
  console.log('Starting project setup with the following configuration:')
  console.log(JSON.stringify(config, null, 2))

  if (config.useDevcontainer) {
    await generateDevcontainer(config)
  }
}

void main()
