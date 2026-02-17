import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApi } from '@/lib/hooks'
import api from '@/lib/api'
import { formatRD, formatDate } from '@/lib/utils'

const statusColors = {
  received: 'bg-blue-500/10 text-blue-400',
  review: 'bg-yellow-500/10 text-yellow-400',
  processing: 'bg-purple-500/10 text-purple-400',
  waiting_entity: 'bg-orange-500/10 text-orange-400',
  completed: 'bg-green-500/10 text-green-400',
  delivered: 'bg-cyan-500/10 text-cyan-400',
  cancelled: 'bg-red-500/10 text-red-400',
}

const statusLabels = {
  received: 'Recibida', review: 'En revisión', processing: 'En proceso',
  waiting_entity: 'Esp. entidad', completed: 'Completada', delivered: 'Entregada', cancelled: 'Cancelada'
}

export default function DashboardPage() {
  const navigate = useNavigate()
  const { data, loading, error } = useApi(() => api.getDashboard())

  if (loading) return <div className="p-8 text-white/40">Cargando dashboard...</div>
  if (error) return <div className="p-8 text-red-400">Error: {error}</div>
  if (!data) return null

  const { orders, clients, leads, revenue, recent_orders, team_workload } = data

  const stats = [
    { label: 'Órdenes Activas', value: orders.active, sub: `${orders.urgent} urgentes`, color: 'from-blue-500 to-blue-600' },
    { label: 'Ingresos Mes', value: formatRD(revenue.this_month), sub: `${formatRD(revenue.pending_collection)} pendiente`, color: 'from-emerald-500 to-emerald-600' },
    { label: 'Clientes', value: clients.total, sub: `${clients.new_this_month} nuevos este mes`, color: 'from-purple-500 to-purple-600' },
    { label: 'Leads', value: leads.total, sub: `${leads.qualified} calificados`, color: 'from-amber-500 to-amber-600' },
  ]

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-xl font-bold text-white">Dashboard</h1>
        <p className="text-white/40 text-sm mt-0.5">Resumen general de operaciones</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <div key={i} className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5">
            <p className="text-white/40 text-xs uppercase tracking-wider mb-2">{s.label}</p>
            <p className="text-2xl font-bold text-white">{s.value}</p>
            <p className="text-white/30 text-xs mt-1">{s.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white/[0.03] border border-white/[0.06] rounded-xl">
          <div className="flex items-center justify-between p-4 border-b border-white/[0.06]">
            <h2 className="text-sm font-semibold text-white">Órdenes Recientes</h2>
            <button onClick={() => navigate('/ordenes')} className="text-xs text-blue-400 hover:text-blue-300">Ver todas →</button>
          </div>
          <div className="divide-y divide-white/[0.04]">
            {(recent_orders || []).slice(0, 8).map((o, i) => (
              <div key={i} className="flex items-center justify-between px-4 py-3 hover:bg-white/[0.02] cursor-pointer" onClick={() => navigate(`/ordenes/${o.display_id}`)}>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-white/40">{o.display_id}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${statusColors[o.status] || 'text-white/40'}`}>
                      {statusLabels[o.status] || o.status}
                    </span>
                  </div>
                  <p className="text-sm text-white/70 truncate mt-0.5">{o.client_name} — {o.service_name}</p>
                </div>
                <span className="text-sm font-medium text-white/60 ml-4">{formatRD(o.amount)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Team Workload */}
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl">
          <div className="p-4 border-b border-white/[0.06]">
            <h2 className="text-sm font-semibold text-white">Carga del Equipo</h2>
          </div>
          <div className="divide-y divide-white/[0.04]">
            {(team_workload || []).map((m, i) => (
              <div key={i} className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-white/10 flex items-center justify-center text-[10px] font-bold text-white/60">
                    {m.initials}
                  </div>
                  <div>
                    <p className="text-sm text-white/80">{m.name}</p>
                    <p className="text-[10px] text-white/30">{m.role}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-sm font-medium text-white/60">{m.active_orders}</span>
                  <p className="text-[10px] text-white/30">activas</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
