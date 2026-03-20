// src/utils/tsx-pragmas.ts

// Pragma for plain text Dockerfile generation
export function docker(_: any, __: any, ...children: any[]) {
  return children.join('')
}

// Pragma for JSON generation
export function json(_: any, props: any) {
  return JSON.stringify(props, null, 2)
}
