import { TOKEN_MAPPINGS } from '../tokens/token-data'

export function TokenMappingTable({ limit }: { limit?: number }) {
  const rows = limit ? TOKEN_MAPPINGS.slice(0, limit) : TOKEN_MAPPINGS

  return (
    <table className="token-table">
      <thead>
        <tr>
          <th>Legacy variable</th>
          <th>Color v2 token</th>
          <th>Notes</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.legacy}>
            <td>
              <code>{row.legacy}</code>
            </td>
            <td>
              <code>{row.v2}</code>
            </td>
            <td>{row.notes ?? '—'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
