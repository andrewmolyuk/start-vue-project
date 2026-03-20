import fs from 'fs'
import path from 'path'

import Dockerfile from '../templates/devcontainer/Dockerfile'
import DevcontainerJson from '../templates/devcontainer/devcontainer.json'

interface DevcontainerConfig {
  projectName: string
  useBun?: boolean
  useAgent?: boolean
  useSkills?: boolean
  destinationFolder: string
}

export function generateDevcontainer(config: DevcontainerConfig) {
  const destDir = path.join(config.destinationFolder, '.devcontainer')
  fs.mkdirSync(destDir, { recursive: true })

  // Generate Dockerfile
  const dockerfileContent = Dockerfile({
    useBun: config.useBun,
    useAgent: config.useAgent,
    useSkills: config.useSkills
  })
  fs.writeFileSync(path.join(destDir, 'Dockerfile'), dockerfileContent)
  console.log(`Generated: ${path.join(destDir, 'Dockerfile')}`)

  // Generate devcontainer.json
  const devcontainerJsonContent = DevcontainerJson({
    projectName: config.projectName,
    useBun: config.useBun
  })
  fs.writeFileSync(path.join(destDir, 'devcontainer.json'), devcontainerJsonContent)
  console.log(`Generated: ${path.join(destDir, 'devcontainer.json')}`)
}
