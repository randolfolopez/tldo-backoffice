import { useState } from 'react'
import { DollarSign, FileText, CreditCard, TrendingUp, Download, AlertCircle, CheckCircle, Clock, BarChart3 } from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { formatRD, formatDate, cn } from '@/lib/utils'
import StatCard from '@/components/ui/StatCard'

const monthlyData = [
  { month: 'Sep', revenue: 320000, expenses: 180000 },
  { month: 'Oct', revenue: 450000, expenses: 200000 },
  { month: 'Nov', revenue: 580000, expenses: 220000 },
  { month: 'Dic', revenue: 710000, expenses: 250000 },
  { month: 'Ene', revenue: 890000, expenses: 280000 },
  { month: 'Feb', revenue: 1285000, expenses: 320000 },
]

const revenueByCategory = [
  { name: 'Societario', value: 1970000, color: '#0F4C75' },
  { name: 'PI', value: 1391000, color: '#1B6B93' },
  { name: 'Familia', value: 1529000, color: '#3A7CA5' },
  { name: 'Contratos', value: 1607000, color: '#2C5F7C' },
  { name: 'Laboral', value: 666000, color: '#1A5276' },
  { name: 'Inmobiliario', value: 891000, color: '#154360' },
  { name: 'Certificaciones', value: 417000, color: '#0B3C5D' },
]

const invoices = [
  { id: 'FAC-2026-0089', client: 'María González', ncf: 'B0100000089', type: 'Consumidor Final', amount: 38000, status: 'paid', date: '2026-02-03', order: 'ORD-001247' },
  { id: 'FAC-2026-0088', client: 'TechStart, SRL', ncf: 'B0100000088', type: 'Crédito Fiscal', amount: 28000, status: 'paid', date: '2026-01-20', order: 'ORD-001246' },
  { id: 'FAC-2026-0087', client: 'José Martínez', ncf: 'B0100000087', type: 'Consumidor Final', amount: 17500, status: 'partial', date: '2026-02-08', order: 'ORD-001245' },
  { id: 'FAC-2026-0086', client: 'Inversiones Caribe, SRL', ncf: 'B0100000086', type: 'Crédito Fiscal', amount: 8500, status: 'paid', date: '2026-02-06', order: 'ORD-001244' },
  { id: 'FAC-2026-0085', client: 'Constructora del Este', ncf: 'B0100000085', type: 'Crédito Fiscal', amount: 45000, status: 'pending', date: '2026-02-16', order: 'ORD-001240' },
  { id: 'FAC-2026-0084', client: 'Inversiones Caribe, SRL', ncf: 'B0100000084', type: 'Crédito Fiscal', amount: 35000, status: 'overdue', date: '2026-01-15', order: 'SUB-001' },
]

const statusConfig = {
  paid: { label: 'Pagada', color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
  partial: { label: 'Parcial', color: 'text-amber-400', bg: 'bg-amber-400/10' },
  pending: { label: 'Pendiente', color: 'text-blue-400', bg: 'bg-blue-400/10' },
  overdue: { label: 'Vencida', color: 'text-red-400', bg: 'bg-red-400/10' },
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

export default function FinancePage() {
  const [tab, setTab] = useState('overview')
  const pending = invoices.filter(i => i.status === 'pending' || i.status === 'overdue').reduce((s, i) => s + i.amount, 0)

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-xl font-bold text-white">Finanzas y Facturación</h1>
          <p className="text-sm text-white/30 mt-1">Control financiero, pagos, facturación NCF y reportes</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 bg-surface-2 border border-white/[0.08] text-white/50 text-[12px] font-medium px-3 py-2 rounded-lg"><Download size={14} /> Reporte DGII</button>
          <button className="flex items-center gap-2 bg-brand-300 text-brand-900 text-sm font-semibold px-4 py-2.5 rounded-lg"><FileText size={16} /> Nueva Factura</button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-5">
        <StatCard label="Ingresos Feb" value={formatRD(1285000)} icon={DollarSign} trend={23} trendLabel="vs ene" />
        <StatCard label="Cuentas x Cobrar" value={formatRD(pending)} subValue={`${invoices.filter(i=>i.status==='overdue').length} vencidas`} icon={AlertCircle} />
        <StatCard label="Facturas Emitidas" value={invoices.length} subValue="Este mes" icon={FileText} trend={10} />
        <StatCard label="Margen Operativo" value="75%" subValue="Promedio últimos 3 meses" icon={TrendingUp} trend={4} />
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-surface-1 border border-white/[0.06] rounded-xl p-1.5 mb-4 w-fit">
        {[{ key: 'overview', label: 'Resumen' }, { key: 'invoices', label: 'Facturas' }, { key: 'reports', label: 'Reportes DGII' }].map(t => (
          <button key={t.key} onClick={() => setTab(t.key)} className={cn('px-4 py-2 rounded-lg text-[12px] font-medium transition-colors', tab === t.key ? 'bg-brand-300/10 text-brand-300' : 'text-white/30 hover:text-white/50')}>
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'overview' && (
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2 bg-surface-1 border border-white/[0.06] rounded-xl p-5">
            <h3 className="text-sm font-semibold text-white mb-4">Ingresos vs. Gastos</h3>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient id="revG" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#5bc0eb" stopOpacity={0.2}/><stop offset="100%" stopColor="#5bc0eb" stopOpacity={0}/></linearGradient>
                  <linearGradient id="expG" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#ef4444" stopOpacity={0.15}/><stop offset="100%" stopColor="#ef4444" stopOpacity={0}/></linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="month" tick={{ fill: 'rgba(255,255,255,0.25)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'rgba(255,255,255,0.25)', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `${(v/1000000).toFixed(1)}M`} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="revenue" stroke="#5bc0eb" strokeWidth={2} fill="url(#revG)" name="Ingresos" />
                <Area type="monotone" dataKey="expenses" stroke="#ef4444" strokeWidth={1.5} fill="url(#expG)" name="Gastos" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-surface-1 border border-white/[0.06] rounded-xl p-5">
            <h3 className="text-sm font-semibold text-white mb-4">Ingresos por Categoría</h3>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie data={revenueByCategory} cx="50%" cy="50%" innerRadius={45} outerRadius={75} paddingAngle={2} dataKey="value">
                  {revenueByCategory.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Pie>
                <Tooltip formatter={v => formatRD(v)} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-1.5 mt-2">
              {revenueByCategory.map((c, i) => (
                <div key={i} className="flex items-center justify-between text-[11px]">
                  <span className="flex items-center gap-1.5 text-white/40"><span className="w-2 h-2 rounded-full" style={{ background: c.color }} />{c.name}</span>
                  <span className="text-white/30">{formatRD(c.value)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === 'invoices' && (
        <div className="bg-surface-1 border border-white/[0.06] rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.06]">
                {['Factura', 'NCF', 'Cliente', 'Tipo', 'Monto', 'Estado', 'Fecha', 'Orden'].map((h, i) => (
                  <th key={i} className="text-[10px] font-semibold text-white/25 uppercase tracking-wider px-4 py-3 text-left">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {invoices.map(inv => {
                const sc = statusConfig[inv.status]
                return (
                  <tr key={inv.id} className="border-b border-white/[0.03] hover:bg-white/[0.02] cursor-pointer">
                    <td className="px-4 py-3"><span className="text-[12px] font-mono font-semibold text-brand-300">{inv.id}</span></td>
                    <td className="px-4 py-3"><span className="text-[11px] font-mono text-white/25">{inv.ncf}</span></td>
                    <td className="px-4 py-3"><span className="text-[13px] text-white/60">{inv.client}</span></td>
                    <td className="px-4 py-3"><span className="text-[11px] text-white/35">{inv.type}</span></td>
                    <td className="px-4 py-3"><span className="text-[13px] font-semibold text-white/60">{formatRD(inv.amount)}</span></td>
                    <td className="px-4 py-3"><span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${sc.bg} ${sc.color}`}>{sc.label}</span></td>
                    <td className="px-4 py-3"><span className="text-[12px] text-white/30">{formatDate(inv.date)}</span></td>
                    <td className="px-4 py-3"><span className="text-[11px] font-mono text-white/25">{inv.order}</span></td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'reports' && (
        <div className="grid grid-cols-3 gap-4">
          {[
            { code: '606', title: 'Compras de Bienes y Servicios', desc: 'Reporte mensual de compras para DGII', period: 'Febrero 2026', status: 'pending' },
            { code: '607', title: 'Ventas de Bienes y Servicios', desc: 'Reporte mensual de ventas para DGII', period: 'Febrero 2026', status: 'pending' },
            { code: 'IT-1', title: 'Declaración Jurada del ITBIS', desc: 'Declaración mensual de ITBIS', period: 'Febrero 2026', status: 'pending' },
            { code: 'IR-17', title: 'Retenciones del ISR', desc: 'Reporte mensual de retenciones', period: 'Febrero 2026', status: 'pending' },
            { code: 'IR-2', title: 'Declaración Jurada Anual ISR', desc: 'Declaración anual de impuesto sobre la renta', period: '2025', status: 'submitted' },
            { code: '608', title: 'Compras a Informales', desc: 'Reporte de compras sin comprobante fiscal', period: 'Febrero 2026', status: 'not_required' },
          ].map((r, i) => (
            <div key={i} className="bg-surface-1 border border-white/[0.06] rounded-xl p-4 hover:border-white/[0.1] transition-colors">
              <div className="flex items-center justify-between mb-2">
                <span className="text-lg font-bold text-white">{r.code}</span>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                  r.status === 'submitted' ? 'bg-emerald-400/10 text-emerald-400' : r.status === 'not_required' ? 'bg-white/5 text-white/20' : 'bg-amber-400/10 text-amber-400'
                }`}>{r.status === 'submitted' ? 'Enviado' : r.status === 'not_required' ? 'N/A' : 'Pendiente'}</span>
              </div>
              <h4 className="text-[13px] font-medium text-white/60 mb-1">{r.title}</h4>
              <p className="text-[11px] text-white/30 mb-3">{r.desc}</p>
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-white/20">{r.period}</span>
                {r.status === 'pending' && <button className="text-[11px] text-brand-300 font-medium hover:underline">Generar →</button>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
