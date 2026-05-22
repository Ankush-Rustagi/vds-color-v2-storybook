/**
 * Parses Figma Collection frame metadata XML into structured token JSON.
 * Source: VDS Figma Collection (73102:139464)
 *
 * Usage: node scripts/parse-figma-collection.mjs [path-to-xml]
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const defaultInput =
  process.argv[2] ||
  join(
    process.env.HOME,
    '.cursor/projects/Users-ankush-rustagi-Verkada-Code/agent-tools/9f913e5d-7a56-4475-8e89-b212a2181620.txt',
  )

const OUT_DIR = join(__dirname, '../src/tokens/generated')

function extractTextNames(cellXml) {
  return [...cellXml.matchAll(/<text[^>]* name="([^"]*)"/g)].map((m) => m[1])
}

function parseHex(cellXml) {
  const hexMatch = cellXml.match(/\(#([0-9A-Fa-f]{6,8})\)/)
  const stepMatch = cellXml.match(/<text[^>]* name="(\d+|transparent|scrim)"[^>]*\/>/)
  return {
    hex: hexMatch ? `#${hexMatch[1].toUpperCase()}` : null,
    step: stepMatch ? stepMatch[1] : null,
  }
}

function parseValueCell(cellXml) {
  const texts = extractTextNames(cellXml)
  const { hex, step } = parseHex(cellXml)
  // Non-color values: px, %, numbers
  const raw = texts.filter((t) => !t.startsWith('(') && t !== 'Rectangle').join(' ')
  return { hex, step, raw: raw || null }
}

function normalizeGroup(header) {
  return header.replace(/^--/, '').trim()
}

function buildTokenName(group, variable) {
  if (variable.startsWith('--')) return variable
  if (!group) return `--${variable}`
  const g = group.startsWith('--') ? group.slice(2) : group
  return `--${g}/${variable}`
}

function parseTable(tableXml, tableName) {
  const rows = []
  let currentGroup = ''

  const rowBlocks = [...tableXml.matchAll(/<frame id="[^"]*" name="(Header|Row)"[^>]*>([\s\S]*?)<\/frame>/g)]

  for (const [, kind, body] of rowBlocks) {
    if (kind === 'Header') {
      const headerMatch = body.match(/<text[^>]* name="([^"]*)"/)
      if (headerMatch) currentGroup = normalizeGroup(headerMatch[1])
      continue
    }

    const cells = [...body.matchAll(/<frame id="[^"]*" name="Cell"[^>]*>([\s\S]*?)<\/frame>/g)]
    if (cells.length < 2) continue

    const variableTexts = extractTextNames(cells[0][1])
    const variable = variableTexts[0]
    if (!variable || variable === 'Variable' || variable === 'Type') continue

    const typeTexts = extractTextNames(cells[1][1])
    const type = typeTexts[0] || 'unknown'

    const light = cells[2] ? parseValueCell(cells[2][1]) : { hex: null, step: null, raw: null }
    const dark = cells[3] ? parseValueCell(cells[3][1]) : { hex: null, step: null, raw: null }

    const token = buildTokenName(currentGroup, variable)
    const group = token.includes('/') ? token.split('/').slice(0, 2).join('/') : currentGroup || 'root'

    rows.push({
      token,
      group,
      type,
      light: light.hex || light.raw,
      lightStep: light.step,
      dark: dark.hex || dark.raw,
      darkStep: dark.step,
    })
  }

  return { table: tableName, count: rows.length, rows }
}

function main() {
  const xml = readFileSync(defaultInput, 'utf8')

  const tableBlocks = [...xml.matchAll(/<frame id="[^"]*" name="Table"[^>]*>([\s\S]*?)<\/frame>\s*(?=<frame id="[^"]*" name="Table"|<\/frame>\s*<\/frame>\s*$)/g)]

  // Fallback: split on Table frames inside Collection
  let tables = tableBlocks.map((m, i) => m[1])
  if (tables.length === 0) {
    const collection = xml.match(/<frame id="73102:139464"[\s\S]*/)?.[0] || xml
    tables = [...collection.matchAll(/<frame id="[^"]*" name="Table" x="[^"]*" y="[^"]*" width="[^"]*" height="[^"]*">([\s\S]*?)(?=<frame id="[^"]*" name="Table"|<\/frame>\s*<\/frame>\s*$)/g)].map(
      (m) => m[1],
    )
  }

  const tableNames = ['semantic-colors', 'color-primitives', 'size', 'effects']
  const parsed = {}

  tables.forEach((tableXml, i) => {
    const name = tableNames[i] || `table-${i}`
    parsed[name] = parseTable(tableXml, name)
  })

  // Group summary for semantic colors
  const semantic = parsed['semantic-colors']
  const groupCounts = {}
  for (const row of semantic?.rows || []) {
    const top = row.group.replace(/^--/, '')
    groupCounts[top] = (groupCounts[top] || 0) + 1
  }

  mkdirSync(OUT_DIR, { recursive: true })

  writeFileSync(join(OUT_DIR, 'semantic-colors.json'), JSON.stringify(semantic, null, 2))
  writeFileSync(join(OUT_DIR, 'color-primitives.json'), JSON.stringify(parsed['color-primitives'], null, 2))
  writeFileSync(join(OUT_DIR, 'size.json'), JSON.stringify(parsed['size'], null, 2))
  writeFileSync(join(OUT_DIR, 'effects.json'), JSON.stringify(parsed['effects'], null, 2))
  writeFileSync(
    join(OUT_DIR, 'meta.json'),
    JSON.stringify(
      {
        source: 'VDS Figma Collection 73102:139464',
        exportedAt: new Date().toISOString().slice(0, 10),
        counts: Object.fromEntries(Object.entries(parsed).map(([k, v]) => [k, v.count])),
        semanticGroups: groupCounts,
      },
      null,
      2,
    ),
  )

  console.log('Parsed token counts:')
  for (const [k, v] of Object.entries(parsed)) {
    console.log(`  ${k}: ${v.count}`)
  }
  console.log(`  semantic groups: ${Object.keys(groupCounts).length}`)
  console.log(`Written to ${OUT_DIR}`)
}

main()
