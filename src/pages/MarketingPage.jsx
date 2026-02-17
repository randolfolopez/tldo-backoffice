import { useState } from 'react'
import { useApi, useDebounce } from '@/lib/hooks'
import api from '@/lib/api'
import { formatDate } from '@/lib/utils'

const statusLabels = { new: 'Nuevo', contacted: 'Contactado', qualified: 'Calificado', proposal: 'Propuesta', negotiation: 'Negociación', won: 'Ganado', lost: 'Perdido' }
const statusColors = { new: 'bg-blue-500/10 text-blue-400', contacted: 'bg-yellow-500/10 text-yellow-400', qualified: 'bg-purple-500/10 text-purple-400', proposal: 'bg-cyan-500/10 text-cyan-400', negotiation: 'bg-orange-500/10 text-orange-400', won: 'bg-green-500/10 text-green-400', lost: 'bg-red-500/10 text-red-400' }

export default function MarketingPage() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const debouncedSearch = useDebounce(search)

  const { data, loading, error, refetch } = useApi(
    () => api.getLeads({ search: debouncedSearch || undefined, status: statusFilter || undefined }),
    [debouncedSearch, statusFilter]
  )

  const leads = data?.data || []
  const [converting, setConverting] = useState(null)

  const convertLead = async (id) => {
    setConverting(id)
    try {
      const result = await api.convertLead(id)
      alert(`Lead convertido a cliente: ${result.client.display_id}`)
      refetch()
    } catch (err) { alert(err.message) }
    finally { setConverting(null) }
  }

  return (
    <div className="p-6 space-y-4">
      <div>
        <h1 className="text-xl font-bold text-white">Marketing — Leads</h1>
        <p className="text-white/40 text-sm mt-0.5">{data?.total || 0} leads en el pipeline</p>
      </div>

      <div className="flex items-center gap-3">
        <input type="text" placeholder="Buscar lead..." value={search} onChange={e => setSearch(e.target.value)}
          className="flex-1 max-w-sm bg-white/[0.04] border border-white/[0.08] rounded-lg px-3.5 py-2 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-blue-500/50" />
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
          className="bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-white/70 focus:outline-none">
          <option value="">Todos los estados</option>
          {Object.entries(statusLabels).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
        </select>
      </div>

      {loading ? <div className="text-white/40 text-sm py-8 text-center">Cargando...</div> :
      error ? <div className="text-red-400 text-sm py-8 text-center">Error: {error}</div> : (
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-white/[0.06] text-white/40 text-xs uppercase tracking-wider">
              <th className="text-left p-3 pl-4">Nombre</th><th className="text-left p-3">Email</th><th className="text-left p-3">Teléfono</th>
              <th className="text-left p-3">Fuente</th><th className="text-left p-3">Estado</th><th className="text-left p-3">Servicio</th>
              <th className="text-left p-3">Fecha</th><th className="p-3 pr-4"></th>
            </tr></thead>
            <tbody className="divide-y divide-white/[0.04]">
              {leads.map(l => (
                <tr key={l.id} className="hover:bg-white/[0.02]">
                  <td className="p-3 pl-4 text-white/80">{l.name}</td>
                  <td className="p-3 text-white/50 text-xs">{l.email || '—'}</td>
                  <td className="p-3 text-white/50 text-xs">{l.phone || '—'}</td>
                  <td className="p-3 text-white/40 text-xs capitalize">{l.source}</td>
                  <td className="p-3">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full ${statusColors[l.status] || ''}`}>{statusLabels[l.status] || l.status}</span>
                  </td>
                  <td className="p-3 text-white/40 text-xs">{l.interested_service || '—'}</td>
                  <td className="p-3 text-white/30 text-xs">{formatDate(l.created_at)}</td>
                  <td className="p-3 pr-4">
                    {l.status !== 'won' && l.status !== 'lost' && (
                      <button onClick={() => convertLead(l.id)} disabled={converting === l.id}
                        className="text-[10px] px-2 py-1 rounded bg-green-500/10 text-green-400 hover:bg-green-500/20 disabled:opacity-50">
                        {converting === l.id ? '...' : 'Convertir'}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {leads.length === 0 && <div className="text-center py-8 text-white/30 text-sm">No hay leads</div>}
        </div>
      )}
    </div>
  )
}
