import { useState } from 'react'
import { useApi } from '@/lib/hooks'
import api from '@/lib/api'
import { formatRD, formatDate } from '@/lib/utils'

const statusColors = { active: 'text-green-400', paused: 'text-yellow-400', cancelled: 'text-red-400', expired: 'text-white/30' }

export default function IgualasPage() {
  const [statusFilter, setStatusFilter] = useState('')
  const { data, loading, error } = useApi(
    () => api.getSubscriptions({ status: statusFilter || undefined }),
    [statusFilter]
  )

  const subs = data?.data || []

  return (
    <div className="p-6 space-y-4">
      <div>
        <h1 className="text-xl font-bold text-white">Igualas / Suscripciones</h1>
        <p className="text-white/40 text-sm mt-0.5">{data?.total || 0} igualas registradas</p>
      </div>

      <div className="flex items-center gap-3">
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
          className="bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-white/70 focus:outline-none">
          <option value="">Todos</option>
          <option value="active">Activas</option>
          <option value="paused">Pausadas</option>
          <option value="cancelled">Canceladas</option>
        </select>
      </div>

      {loading ? <div className="text-white/40 text-sm py-8 text-center">Cargando...</div> :
      error ? <div className="text-red-400 text-sm py-8 text-center">Error: {error}</div> : (
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-white/[0.06] text-white/40 text-xs uppercase tracking-wider">
              <th className="text-left p-3 pl-4">ID</th><th className="text-left p-3">Cliente</th>
              <th className="text-left p-3">Plan</th><th className="text-left p-3">Estado</th>
              <th className="text-right p-3">Mensual</th><th className="text-left p-3">Inicio</th>
              <th className="text-left p-3">Renovación</th><th className="text-right p-3 pr-4">Horas</th>
            </tr></thead>
            <tbody className="divide-y divide-white/[0.04]">
              {subs.map(s => (
                <tr key={s.id} className="hover:bg-white/[0.02]">
                  <td className="p-3 pl-4 font-mono text-white/50">{s.display_id}</td>
                  <td className="p-3 text-white/70">{s.client_name}</td>
                  <td className="p-3 text-white/60 capitalize">{s.plan_name}</td>
                  <td className={`p-3 text-xs font-medium capitalize ${statusColors[s.status] || ''}`}>{s.status}</td>
                  <td className="p-3 text-right text-white/60 font-medium">{formatRD(s.monthly_amount)}</td>
                  <td className="p-3 text-white/30 text-xs">{formatDate(s.start_date)}</td>
                  <td className="p-3 text-white/30 text-xs">{s.next_billing ? formatDate(s.next_billing) : '—'}</td>
                  <td className="p-3 pr-4 text-right text-white/50">{s.hours_used}/{s.hours_included}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {subs.length === 0 && <div className="text-center py-8 text-white/30 text-sm">No hay igualas</div>}
        </div>
      )}
    </div>
  )
}
