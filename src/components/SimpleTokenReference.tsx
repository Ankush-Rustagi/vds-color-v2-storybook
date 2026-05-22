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

function SimpleTable({
  rows,
  showPalette,
  valueLabel = 'Value',
}: {
  rows: SimpleTokenRow[]
  showPalette: boolean
  valueLabel?: string
}) {
  if (!rows.length) return <p className="vds-empty">No tokens match.</p>

  return (
    <div className="vds-table-wrap">
      <table className={`vds-table vds-table--simple${showPalette ? ' vds-table--with-group' : ''}`}>
        <thead>
          <tr>
            {showPalette ? <th>Palette</th> : null}
            <th>Token</th>
            <th>{valueLabel}</th>
            <th>Step</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.token}>
              {showPalette ? <td className="vds-group-cell">{row.palette}</td> : null}
              <td>
                <code className="vds-token-code">{row.token}</code>
              </td>
              <td>
                <div className="vds-value-cell">
                  <Swatch value={row.value} />
                  <span className="vds-value-cell__hex">{row.value || 'n/a'}</span>
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
  rows,
  palettes,
  count,
  paletteLabel = 'All palettes',
}: {
  rows: SimpleTokenRow[]
  palettes: string[]
  count: number
  paletteLabel?: string
}) {
  const [query, setQuery] = useState('')
  const [palette, setPalette] = useState('all')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    const next = rows.filter((row) => {
      if (palette !== 'all' && row.palette !== palette) return false
      if (!q) return true
      return (
        row.token.toLowerCase().includes(q) ||
        (row.palette || '').toLowerCase().includes(q) ||
        (row.value || '').toLowerCase().includes(q)
      )
    })
    return next.sort((a, b) => {
      const p = (a.palette || '').localeCompare(b.palette || '')
      return p !== 0 ? p : a.token.localeCompare(b.token)
    })
  }, [rows, query, palette])

  return (
    <div className="vds-ref">
      <div className="vds-ref__toolbar">
        <input
          className="vds-input"
          type="search"
          placeholder="Search token, palette, or value..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select className="vds-select" value={palette} onChange={(e) => setPalette(e.target.value)}>
          <option value="all">
            {paletteLabel} ({palettes.length})
          </option>
          {palettes.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
        <span className="vds-count">
          {filtered.length} of {count}
        </span>
      </div>
      <SimpleTable rows={filtered} showPalette={palette === 'all'} />
    </div>
  )
}

export function ColorPrimitivesReference() {
  const palettes = [...new Set(COLOR_PRIMITIVES.map((r) => r.palette))].sort()
  return (
    <SimpleReference
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
      rows={SIZE_TOKENS}
      palettes={palettes}
      count={TOKEN_META.counts.size}
      paletteLabel="All categories"
    />
  )
}

export function EffectsTokensReference() {
  const palettes = [...new Set(EFFECTS_TOKENS.map((r) => r.palette))].sort()
  return (
    <SimpleReference
      rows={EFFECTS_TOKENS}
      palettes={palettes}
      count={TOKEN_META.counts.effects}
      paletteLabel="All categories"
    />
  )
}
