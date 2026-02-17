import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApi, useDebounce } from '@/lib/hooks'
import api from '@/lib/api'
import { formatRD, formatDate } from '@/lib/utils'

const tierColors = { platinum: 'text-cyan-400', gold: 'text-yellow-400', silver: 'text-gray-300', bronze: 'text-orange-400' }

export default function ClientsPage() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [tierFilter, setTierFilter] = useState('')
  const debouncedSearch = useDebounce(search)

  const { data, loading, error } = useApi(
    () => api.getClients({ search: debouncedSearch || undefined, tier: tierFilter || undefined }),
    [debouncedSearch, tierFilter]
  )

  const clients = data?.data || []

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">CRM — Clientes</h1>
          <p className="text-white/40 text-sm mt-0.5">{data?.total || 0} clientes registrados</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <input type="text" placeholder="Buscar cliente..." value={search} onChange={e => setSearch(e.target.value)}
          className="flex-1 max-w-sm bg-white/[0.04] border border-white/[0.08] rounded-lg px-3.5 py-2 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-blue-500/50" />
        <select value={tierFilter} onChange={e => setTierFilter(e.target.value)}
          className="bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-white/70 focus:outline-none">
          <option value="">Todos los niveles</option>
          <option value="platinum">Platinum</option>
          <option value="gold">Gold</option>
          <option value="silver">Silver</option>
          <option value="bronze">Bronze</option>
        </select>
      </div>

      {loading ? <div className="text-white/40 text-sm py-8 text-center">Cargando...</div> :
      error ? <div className="text-red-400 text-sm py-8 text-center">Error: {error}</div> : (
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-white/[0.06] text-white/40 text-xs uppercase tracking-wider">
              <th className="text-left p-3 pl-4">ID</th><th className="text-left p-3">Nombre</th><th className="text-left p-3">Tipo</th>
              <th className="text-left p-3">Tier</th><th className="text-left p-3">Contacto</th><th className="text-right p-3">Órdenes</th>
              <th className="text-right p-3 pr-4">Revenue</th>
            </tr></thead>
            <tbody className="divide-y divide-white/[0.04]">
              {clients.map(c => (
                <tr key={c.id} className="hover:bg-white/[0.02] cursor-pointer" onClick={() => navigate(`/clientes/${c.display_id}`)}>
                  <td className="p-3 pl-4 font-mono text-white/50">{c.display_id}</td>
                  <td className="p-3 text-white/80">{c.name}</td>
                  <td className="p-3 text-white/40 text-xs capitalize">{c.type === 'juridica' ? 'Jurídica' : 'Física'}</td>
                  <td className={`p-3 text-xs font-medium capitalize ${tierColors[c.tier] || 'text-white/40'}`}>{c.tier}</td>
                  <td className="p-3 text-white/40 text-xs">{c.email || c.phone || '—'}</td>
                  <td className="p-3 text-right text-white/50">{c.order_count}</td>
                  <td className="p-3 pr-4 text-right text-white/60 font-medium">{formatRD(c.total_revenue)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {clients.length === 0 && <div className="text-center py-8 text-white/30 text-sm">No hay clientes</div>}
        </div>
      )}
    </div>
  )
}
