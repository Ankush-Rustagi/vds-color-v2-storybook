import { useMemo, useState } from 'react'
import {
  SEMANTIC_GROUPS,
  SEMANTIC_TOKENS,
  TOKEN_META,
  isHex,
  type SemanticTokenRow,
} from '../tokens/collection'

function Swatch({ value }: { value?: string | null }) {
  if (!isHex(value)) return <span className="vds-swatch vds-swatch--empty">n/a</span>
  return (
    <span
      className="vds-swatch"
      style={{ background: value }}
      title={value}
      aria-label={value}
    />
  )
}

function ValueCell({ hex, step }: { hex?: string | null; step?: string | null }) {
  return (
    <div className="vds-value-cell">
      <Swatch value={hex} />
      <div>
        <div className="vds-value-cell__hex">{hex || 'n/a'}</div>
        {step && <div className="vds-value-cell__step">{step}</div>}
      </div>
    </div>
  )
}

function TokenTable({ rows }: { rows: SemanticTokenRow[] }) {
  if (rows.length === 0) {
    return <p className="vds-empty">No tokens match your filters.</p>
  }

  return (
    <div className="vds-table-wrap">
      <table className="vds-table">
        <thead>
          <tr>
            <th>Token</th>
            <th>Light</th>
            <th>Dark (testing)</th>
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
                <ValueCell hex={row.light} step={row.lightStep} />
              </td>
              <td>
                <ValueCell hex={row.dark} step={row.darkStep} />
              </td>
              <td className="vds-muted">{row.type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function SemanticTokenReference() {
  const [query, setQuery] = useState('')
  const [group, setGroup] = useState('all')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return SEMANTIC_TOKENS.filter((row) => {
      if (group !== 'all' && row.group !== group) return false
      if (!q) return true
      return (
        row.token.toLowerCase().includes(q) ||
        row.group.toLowerCase().includes(q) ||
        (row.light || '').toLowerCase().includes(q) ||
        (row.dark || '').toLowerCase().includes(q)
      )
    })
  }, [query, group])

  const grouped = useMemo(() => {
    const map = new Map<string, SemanticTokenRow[]>()
    for (const row of filtered) {
      const g = row.group || 'root'
      if (!map.has(g)) map.set(g, [])
      map.get(g)!.push(row)
    }
    return [...map.entries()].sort((a, b) => a[0].localeCompare(b[0]))
  }, [filtered])

  return (
    <div className="vds-ref">
      <div className="vds-ref__intro">
        <p>
          Full semantic color inventory from Figma Collection ({TOKEN_META.counts['semantic-colors']} tokens,{' '}
          {SEMANTIC_GROUPS.length} groups). Dark column is labeled <strong>Dark Mode Testing</strong> in Figma.
        </p>
        <p className="vds-muted">
          Strategy hub:{' '}
          <a href="https://ankush-rustagi.github.io/vds-color-v2/" target="_blank" rel="noreferrer">
            ankush-rustagi.github.io/vds-color-v2/
          </a>
        </p>
      </div>

      <div className="vds-ref__toolbar">
        <input
          className="vds-input"
          type="search"
          placeholder="Search token name or hex..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select className="vds-select" value={group} onChange={(e) => setGroup(e.target.value)}>
          <option value="all">All groups ({SEMANTIC_TOKENS.length})</option>
          {SEMANTIC_GROUPS.map(([g, count]) => (
            <option key={g} value={g}>
              {g} ({count})
            </option>
          ))}
        </select>
        <span className="vds-count">{filtered.length} shown</span>
      </div>

      {group === 'all' ? (
        grouped.map(([g, rows]) => (
          <section key={g} className="vds-ref__section">
            <h3 className="vds-ref__group-title">
              <code>{g}</code>
              <span className="vds-count">{rows.length}</span>
            </h3>
            <TokenTable rows={rows} />
          </section>
        ))
      ) : (
        <TokenTable rows={filtered} />
      )}
    </div>
  )
}
