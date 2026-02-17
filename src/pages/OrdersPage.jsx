import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApi, useDebounce } from '@/lib/hooks'
import api from '@/lib/api'
import { formatRD, formatDate } from '@/lib/utils'

const statusLabels = { received: 'Recibida', review: 'En revisión', processing: 'En proceso', waiting_entity: 'Esp. entidad', needs_info: 'Info requerida', completed: 'Completada', delivered: 'Entregada', cancelled: 'Cancelada' }
const statusColors = { received: 'bg-blue-500/10 text-blue-400 border-blue-500/20', review: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20', processing: 'bg-purple-500/10 text-purple-400 border-purple-500/20', waiting_entity: 'bg-orange-500/10 text-orange-400 border-orange-500/20', completed: 'bg-green-500/10 text-green-400 border-green-500/20', delivered: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20', cancelled: 'bg-red-500/10 text-red-400 border-red-500/20' }
const priorityColors = { urgent: 'text-red-400', high: 'text-orange-400', medium: 'text-yellow-400', low: 'text-green-400' }

export default function OrdersPage() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const debouncedSearch = useDebounce(search)

  const { data, loading, error, refetch } = useApi(
    () => api.getOrders({ search: debouncedSearch || undefined, status: statusFilter || undefined }),
    [debouncedSearch, statusFilter]
  )

  const orders = data?.data || []
  const total = data?.total || 0

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">Gestión de Órdenes</h1>
          <p className="text-white/40 text-sm mt-0.5">{total} órdenes en total</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3">
        <input
          type="text" placeholder="Buscar orden, cliente, servicio..."
          value={search} onChange={e => setSearch(e.target.value)}
          className="flex-1 max-w-sm bg-white/[0.04] border border-white/[0.08] rounded-lg px-3.5 py-2 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-blue-500/50"
        />
        <select
          value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
          className="bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-white/70 focus:outline-none"
        >
          <option value="">Todos los estados</option>
          {Object.entries(statusLabels).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
        </select>
      </div>

      {loading ? (
        <div className="text-white/40 text-sm py-8 text-center">Cargando órdenes...</div>
      ) : error ? (
        <div className="text-red-400 text-sm py-8 text-center">Error: {error}</div>
      ) : (
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.06] text-white/40 text-xs uppercase tracking-wider">
                <th className="text-left p-3 pl-4">ID</th>
                <th className="text-left p-3">Cliente</th>
                <th className="text-left p-3">Servicio</th>
                <th className="text-left p-3">Estado</th>
                <th className="text-left p-3">Prioridad</th>
                <th className="text-right p-3">Monto</th>
                <th className="text-left p-3">Pago</th>
                <th className="text-left p-3 pr-4">Fecha</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {orders.map(o => (
                <tr key={o.id} className="hover:bg-white/[0.02] cursor-pointer" onClick={() => navigate(`/ordenes/${o.display_id}`)}>
                  <td className="p-3 pl-4 font-mono text-white/50">{o.display_id}</td>
                  <td className="p-3 text-white/70">{o.client_name || '—'}</td>
                  <td className="p-3 text-white/60">{o.service_name || '—'}</td>
                  <td className="p-3">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full border ${statusColors[o.status] || ''}`}>
                      {statusLabels[o.status] || o.status}
                    </span>
                  </td>
                  <td className={`p-3 text-xs font-medium capitalize ${priorityColors[o.priority] || 'text-white/40'}`}>{o.priority}</td>
                  <td className="p-3 text-right text-white/60 font-medium">{formatRD(o.amount)}</td>
                  <td className="p-3"><span className={`text-xs ${o.payment_status === 'paid' ? 'text-green-400' : o.payment_status === 'partial' ? 'text-yellow-400' : 'text-white/30'}`}>{o.payment_status}</span></td>
                  <td className="p-3 pr-4 text-white/30 text-xs">{formatDate(o.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {orders.length === 0 && <div className="text-center py-8 text-white/30 text-sm">No hay órdenes</div>}
        </div>
      )}
    </div>
  )
}
