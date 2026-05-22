import { useMemo, useState } from 'react'
import {
  COLOR_PRIMITIVES,
  EFFECTS_TOKENS,
  SIZE_TOKENS,
  TOKEN_META,
  isHex,
  type SimpleTokenRow,
} from '../tokens/collection'

function Swatch({ value }: { value?: string | null }) {
  if (!isHex(value)) return <span className="vds-swatch vds-swatch--empty">n/a</span>
  return <span className="vds-swatch" style={{ background: value }} title={value} />
}

function SimpleTable({ rows, valueLabel = 'Value' }: { rows: SimpleTokenRow[]; valueLabel?: string }) {
  if (!rows.length) return <p className="vds-empty">No tokens match.</p>

  return (
    <div className="vds-table-wrap">
      <table className="vds-table">
        <thead>
          <tr>
            <th>Token</th>
            <th>{valueLabel}</th>
            <th>Step</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.token}>
              <td>
                <code className="vds-token-code">{row.token}</code>
              </td>
              <td>
                <div className="vds-value-cell">
                  <Swatch value={row.value} />
                  <span>{row.value || 'n/a'}</span>
                </div>
              </td>
              <td className="vds-muted">{row.step || 'n/a'}</td>
              <td className="vds-muted">{row.type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function SimpleReference({
  title,
  rows,
  palettes,
  count,
}: {
  title: string
  rows: SimpleTokenRow[]
  palettes: string[]
  count: number
}) {
  const [query, setQuery] = useState('')
  const [palette, setPalette] = useState('all')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return rows.filter((row) => {
      if (palette !== 'all' && row.palette !== palette) return false
      if (!q) return true
      return row.token.toLowerCase().includes(q) || (row.value || '').toLowerCase().includes(q)
    })
  }, [rows, query, palette])

  const grouped = useMemo(() => {
    const map = new Map<string, SimpleTokenRow[]>()
    for (const row of filtered) {
      const p = row.palette || 'root'
      if (!map.has(p)) map.set(p, [])
      map.get(p)!.push(row)
    }
    return [...map.entries()].sort((a, b) => a[0].localeCompare(b[0]))
  }, [filtered])

  return (
    <div className="vds-ref">
      <div className="vds-ref__intro">
        <p>
          {title} ({count} tokens from Figma Collection).
        </p>
      </div>
      <div className="vds-ref__toolbar">
        <input
          className="vds-input"
          type="search"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select className="vds-select" value={palette} onChange={(e) => setPalette(e.target.value)}>
          <option value="all">All palettes</option>
          {palettes.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
        <span className="vds-count">{filtered.length} shown</span>
      </div>
      {palette === 'all'
        ? grouped.map(([p, groupRows]) => (
            <section key={p} className="vds-ref__section">
              <h3 className="vds-ref__group-title">
                <code>{p}</code>
                <span className="vds-count">{groupRows.length}</span>
              </h3>
              <SimpleTable rows={groupRows} />
            </section>
          ))
        : (
            <SimpleTable rows={filtered} />
          )}
    </div>
  )
}

export function ColorPrimitivesReference() {
  const palettes = [...new Set(COLOR_PRIMITIVES.map((r) => r.palette))].sort()
  return (
    <SimpleReference
      title="Color primitive scales (black, neutral, cyan, blue, etc.)"
      rows={COLOR_PRIMITIVES}
      palettes={palettes}
      count={TOKEN_META.counts['color-primitives']}
    />
  )
}

export function SizeTokensReference() {
  const palettes = [...new Set(SIZE_TOKENS.map((r) => r.palette))].sort()
  return (
    <SimpleReference
      title="Size tokens: icon, radius, space, stroke"
      rows={SIZE_TOKENS}
      palettes={palettes}
      count={TOKEN_META.counts.size}
    />
  )
}

export function EffectsTokensReference() {
  const palettes = [...new Set(EFFECTS_TOKENS.map((r) => r.palette))].sort()
  return (
    <SimpleReference
      title="Effect tokens: blur, opacity, scrim"
      rows={EFFECTS_TOKENS}
      palettes={palettes}
      count={TOKEN_META.counts.effects}
    />
  )
}
