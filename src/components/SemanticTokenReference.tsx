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
      <div className="vds-value-cell__text">
        <div className="vds-value-cell__hex">{hex || 'n/a'}</div>
        {step ? <div className="vds-value-cell__step">{step}</div> : null}
      </div>
    </div>
  )
}

function TokenTable({ rows, showGroup }: { rows: SemanticTokenRow[]; showGroup: boolean }) {
  if (rows.length === 0) {
    return <p className="vds-empty">No tokens match your filters.</p>
  }

  return (
    <div className="vds-table-wrap">
      <table className={`vds-table vds-table--semantic${showGroup ? ' vds-table--with-group' : ''}`}>
        <thead>
          <tr>
            {showGroup ? <th>Group</th> : null}
            <th>Token</th>
            <th>Light</th>
            <th>Dark (testing)</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.token}>
              {showGroup ? <td className="vds-group-cell">{row.group}</td> : null}
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
    const rows = SEMANTIC_TOKENS.filter((row) => {
      if (group !== 'all' && row.group !== group) return false
      if (!q) return true
      return (
        row.token.toLowerCase().includes(q) ||
        row.group.toLowerCase().includes(q) ||
        (row.light || '').toLowerCase().includes(q) ||
        (row.dark || '').toLowerCase().includes(q) ||
        (row.lightStep || '').toLowerCase().includes(q) ||
        (row.darkStep || '').toLowerCase().includes(q)
      )
    })
    return rows.sort((a, b) => {
      const g = a.group.localeCompare(b.group)
      return g !== 0 ? g : a.token.localeCompare(b.token)
    })
  }, [query, group])

  return (
    <div className="vds-ref">
      <div className="vds-ref__toolbar">
        <input
          className="vds-input"
          type="search"
          placeholder="Search token, group, hex, or step..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search semantic tokens"
        />
        <select
          className="vds-select"
          value={group}
          onChange={(e) => setGroup(e.target.value)}
          aria-label="Filter by group"
        >
          <option value="all">All groups ({SEMANTIC_GROUPS.length})</option>
          {SEMANTIC_GROUPS.map(([g, count]) => (
            <option key={g} value={g}>
              {g} ({count})
            </option>
          ))}
        </select>
        <span className="vds-count">
          {filtered.length} of {SEMANTIC_TOKENS.length}
        </span>
      </div>

      <p className="vds-ref__meta vds-muted">
        {TOKEN_META.counts['semantic-colors']} tokens from Figma Collection. Dark column is{' '}
        <strong>Dark Mode Testing</strong> in Figma.
      </p>

      <TokenTable rows={filtered} showGroup={group === 'all'} />
    </div>
  )
}
