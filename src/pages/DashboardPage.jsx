import {
  ClipboardList,
  CheckCircle2,
  DollarSign,
  Users,
  Target,
  Star,
  Zap,
  TrendingUp,
  AlertTriangle,
  AlertCircle,
  Info,
  CheckCircle,
  CreditCard,
} from 'lucide-react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts'
import StatCard from '@/components/ui/StatCard'
import StatusBadge from '@/components/ui/StatusBadge'
import { formatRD, formatNumber, formatDate } from '@/lib/utils'
import {
  dashboardKpis as kpi,
  revenueData,
  topTramites,
  recentOrders,
  alerts,
  leadsByChannel,
} from '@/lib/mock-data'

const alertIcons = {
  warning: AlertTriangle,
  urgent: AlertCircle,
  info: Info,
  success: CheckCircle,
  payment: CreditCard,
}

const alertColors = {
  warning: 'text-amber-400',
  urgent: 'text-red-400',
  info: 'text-blue-400',
  success: 'text-emerald-400',
  payment: 'text-purple-400',
}

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-surface-2 border border-white/10 rounded-lg px-3 py-2 text-xs shadow-xl">
      <div className="font-semibold text-white/70 mb-1">{label}</div>
      {payload.map((p, i) => (
        <div key={i} className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full" style={{ background: p.color }} />
          <span className="text-white/50">{p.name}:</span>
          <span className="text-white font-semibold">{formatRD(p.value)}</span>
        </div>
      ))}
    </div>
  )
}

export default function DashboardPage() {
  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-bold text-white">Dashboard</h1>
        <p className="text-sm text-white/30 mt-1">
          Resumen operativo — {new Date().toLocaleDateString('es-DO', { month: 'long', year: 'numeric' })}
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <StatCard
          label="Órdenes activas"
          value={kpi.ordersActive}
          subValue={`${kpi.ordersCompleted} completadas total`}
          icon={ClipboardList}
          trend={12}
          trendLabel="vs mes ant."
        />
        <StatCard
          label="Ingresos del mes"
          value={formatRD(kpi.revenueMonth)}
          subValue={`Hoy: ${formatRD(kpi.revenueToday)}`}
          icon={DollarSign}
          trend={23}
          trendLabel="vs mes ant."
        />
        <StatCard
          label="Leads nuevos"
          value={kpi.leadsNew}
          subValue={`F2P: ${kpi.conversionF2P}%`}
          icon={Users}
          trend={8}
          trendLabel="vs mes ant."
        />
        <StatCard
          label="NPS"
          value={kpi.nps}
          subValue={`CAC: ${formatRD(kpi.cac)}`}
          icon={Star}
          trend={5}
          trendLabel="vs mes ant."
        />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {/* Revenue chart */}
        <div className="col-span-2 bg-surface-1 border border-white/[0.06] rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-white">Ingresos vs. Meta</h3>
              <p className="text-[11px] text-white/30 mt-0.5">Últimos 6 meses</p>
            </div>
            <div className="flex items-center gap-4 text-[11px]">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-brand-300" />
                <span className="text-white/40">Ingresos</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-white/15" />
                <span className="text-white/40">Meta</span>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#5bc0eb" stopOpacity={0.25} />
                  <stop offset="100%" stopColor="#5bc0eb" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="month" tick={{ fill: 'rgba(255,255,255,0.25)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'rgba(255,255,255,0.25)', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => formatNumber(v)} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="target" stroke="rgba(255,255,255,0.15)" strokeWidth={1.5} fill="none" name="Meta" strokeDasharray="4 4" />
              <Area type="monotone" dataKey="revenue" stroke="#5bc0eb" strokeWidth={2} fill="url(#revGrad)" name="Ingresos" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Leads by channel */}
        <div className="bg-surface-1 border border-white/[0.06] rounded-xl p-5">
          <h3 className="text-sm font-semibold text-white mb-1">Leads por Canal</h3>
          <p className="text-[11px] text-white/30 mb-4">Este mes</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={leadsByChannel} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" horizontal={false} />
              <XAxis type="number" tick={{ fill: 'rgba(255,255,255,0.25)', fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis dataKey="channel" type="category" tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 10 }} axisLine={false} tickLine={false} width={90} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="leads" fill="#1B6B93" radius={[0, 4, 4, 0]} name="Leads" />
              <Bar dataKey="converted" fill="#5bc0eb" radius={[0, 4, 4, 0]} name="Convertidos" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-3 gap-4">
        {/* Recent orders */}
        <div className="col-span-2 bg-surface-1 border border-white/[0.06] rounded-xl">
          <div className="flex items-center justify-between p-5 pb-0">
            <div>
              <h3 className="text-sm font-semibold text-white">Órdenes Recientes</h3>
              <p className="text-[11px] text-white/30 mt-0.5">Últimas actualizaciones</p>
            </div>
            <button className="text-[11px] text-brand-300 hover:text-brand-200 font-semibold">
              Ver todas →
            </button>
          </div>

          <div className="mt-4">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  {['Orden', 'Cliente', 'Trámite', 'Estado', 'Monto', 'Vence'].map((h) => (
                    <th key={h} className="text-[10px] font-semibold text-white/25 uppercase tracking-wider px-5 py-2.5 text-left">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors cursor-pointer">
                    <td className="px-5 py-3">
                      <span className="text-[12px] font-mono font-semibold text-brand-300">{order.id}</span>
                    </td>
                    <td className="px-5 py-3">
                      <span className="text-[13px] text-white/70">{order.client}</span>
                    </td>
                    <td className="px-5 py-3">
                      <span className="text-[12px] text-white/50 truncate block max-w-[200px]">{order.tramite}</span>
                    </td>
                    <td className="px-5 py-3">
                      <StatusBadge status={order.status} />
                    </td>
                    <td className="px-5 py-3">
                      <span className="text-[13px] font-semibold text-white/60">{formatRD(order.amount)}</span>
                    </td>
                    <td className="px-5 py-3">
                      <span className="text-[12px] text-white/35">{formatDate(order.dueDate)}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Alerts + Top tramites */}
        <div className="space-y-4">
          {/* Alerts */}
          <div className="bg-surface-1 border border-white/[0.06] rounded-xl p-5">
            <h3 className="text-sm font-semibold text-white mb-3">Alertas</h3>
            <div className="space-y-2.5">
              {alerts.map((alert, i) => {
                const Icon = alertIcons[alert.type]
                return (
                  <div key={i} className="flex items-start gap-2.5 group cursor-pointer">
                    <Icon size={14} className={`${alertColors[alert.type]} mt-0.5 flex-shrink-0`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-[12px] text-white/50 group-hover:text-white/70 transition-colors leading-relaxed">
                        {alert.message}
                      </p>
                      <span className="text-[10px] text-white/20">{alert.time}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Top tramites */}
          <div className="bg-surface-1 border border-white/[0.06] rounded-xl p-5">
            <h3 className="text-sm font-semibold text-white mb-3">Top Trámites</h3>
            <div className="space-y-3">
              {topTramites.map((t, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[12px] text-white/60 truncate flex-1 mr-2">{t.name}</span>
                    <span className="text-[11px] font-semibold text-white/40">{t.count}</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/[0.05] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-brand-500 to-brand-300"
                      style={{ width: `${t.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
