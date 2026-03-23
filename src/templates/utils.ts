import fs from 'fs'
import path from 'path'
import { type Config } from '../types'

// Pragma for plain text file generation (Dockerfile, Makefile, Markdown, YAML, etc.)
export function text(_: null, __: null, ...children: string[]): string {
  return children.join('')
}

// Pragma for JSON file generation
export function json(_: null, props: object): string {
  return JSON.stringify(props, null, 2)
}

// Pragma for XML/HTML/SVG file generation
export function xml(tag: string, props: Record<string, any>, ...children: string[]): string {
  const attrs = Object.entries(props || {})
    .map(([k, v]) => ` ${k}="${v}"`)
    .join('')
  return `<${tag}${attrs}>${children.join('')}</${tag}>`
}

export const generate = (config: Config, template: (config: Config) => string, filename: string) => {
  const fullPath = path.join(config.destinationFolder, filename)
  const destDir = path.dirname(fullPath)
  fs.mkdirSync(destDir, { recursive: true })
  const content = template(config)
  fs.writeFileSync(fullPath, content)
  console.log(`Generated: ${fullPath}`)
}
