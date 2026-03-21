import fs from 'fs'
import path from 'path'
import { Config } from '../types'

// Pragma for plain text Dockerfile generation
export function docker(_: null, __: null, ...children: string[]): string {
  return children.join('')
}

// Pragma for JSON generation
export function json(_: null, props: object): string {
  return JSON.stringify(props, null, 2)
}

export const generate = (config: Config, template: (config: Config) => string, filename: string) => {
  const fullPath = path.join(config.destinationFolder, filename)
  const destDir = path.dirname(fullPath)
  fs.mkdirSync(destDir, { recursive: true })
  const content = template(config)
  fs.writeFileSync(fullPath, content)
  console.log(`Generated: ${fullPath}`)
}
