import { createRequire } from 'node:module'
const require = createRequire(import.meta.url)

export const readJSON = (path) => require(path)

export const compareStrings = (s1, s2) => {
  s1 = deAccenter(s1)
  s2 = deAccenter(s2)
  s1 = s1.replaceAll(' ', '').replaceAll('.', '').replaceAll('\'', '')
  s2 = s2.replaceAll(' ', '').replaceAll('.', '').replaceAll('\'', '')
  return s1 === s2
}

export const normalizeString = (s) => {
  if (typeof s !== typeof string) return s
  s = s.toLowerCase()
  s = s.replaceAll(' ', '').replaceAll('.', '').replaceAll('\'', '')
  return s
}

function deAccenter (str) {
  let r = str.toLowerCase()
  r = r.replace(/[àáâãäå]/g, 'a')
  r = r.replace(/[èéêë]/g, 'e')
  r = r.replace(/[ìíîï]/g, 'i')
  r = r.replace(/[òóôõö]/g, 'o')
  r = r.replace(/[ùúûü]/g, 'u')
  return r
}

export function isNumeric (n) {
  return !isNaN(parseFloat(n)) && isFinite(n)
}
