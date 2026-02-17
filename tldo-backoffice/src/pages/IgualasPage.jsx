import { useState } from 'react'
import { RefreshCcw, Users, DollarSign, TrendingUp, ChevronRight, AlertCircle, CheckCircle, Clock } from 'lucide-react'
import { formatRD, formatDate, cn } from '@/lib/utils'
import StatCard from '@/components/ui/StatCard'

const plans = [
  { id: 'basico', name: 'Básico', price: 8500, color: '#3b82f6', features: ['2 consultas/mes (30 min)', '10% descuento en trámites', 'Acceso a calculadoras', 'Soporte email'], subscribers: 12 },
  { id: 'profesional', name: 'Profesional', price: 18000, color: '#8b5cf6', features: ['5 consultas/mes (45 min)', '20% descuento en trámites', '1 revisión de contrato/mes (IA)', 'Soporte WhatsApp prioritario', 'Alertas de vencimiento'], subscribers: 8 },
  { id: 'empresarial', name: 'Empresarial', price: 35000, color: '#f59e0b', features: ['Consultas ilimitadas', '30% descuento en trámites', 'Revisiones de contrato ilimitadas (IA)', 'Abogado asignado dedicado', 'Soporte 24/7', 'Reportes mensuales', 'Capacitación legal equipo'], subscribers: 4 },
]

const subscribers = [
  { id: 'SUB-001', client: 'Inversiones Caribe, SRL', plan: 'empresarial', startDate: '2025-06-01', renewalDate: '2026-03-01', status: 'active', monthlyAmount: 35000, consumedHours: 8, totalHours: null, tramitesUsed: 3 },
  { id: 'SUB-002', client: 'TechStart, SRL', plan: 'basico', startDate: '2025-12-01', renewalDate: '2026-03-01', status: 'active', monthlyAmount: 8500, consumedHours: 1.5, totalHours: 2, tramitesUsed: 1 },
  { id: 'SUB-003', client: 'Farmacia San Juan, SRL', plan: 'profesional', startDate: '2026-01-01', renewalDate: '2026-04-01', status: 'active', monthlyAmount: 18000, consumedHours: 3, totalHours: 5, tramitesUsed: 2 },
  { id: 'SUB-004', client: 'Distribuidora Norte', plan: 'profesional', startDate: '2025-10-01', renewalDate: '2026-02-28', status: 'renewal_due', monthlyAmount: 18000, consumedHours: 4.5, totalHours: 5, tramitesUsed: 4 },
  { id: 'SUB-005', client: 'Constructora del Este', plan: 'empresarial', startDate: '2025-08-01', renewalDate: '2026-04-01', status: 'active', monthlyAmount: 35000, consumedHours: 12, totalHours: null, tramitesUsed: 7 },
  { id: 'SUB-006', client: 'María González', plan: 'basico', startDate: '2026-02-01', renewalDate: '2026-05-01', status: 'active', monthlyAmount: 8500, consumedHours: 0.5, totalHours: 2, tramitesUsed: 0 },
]

const mrr = plans.reduce((s, p) => s + (p.price * p.subscribers), 0)
const totalSubs = subscribers.length

export default function IgualasPage() {
  const [view, setView] = useState('plans')

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-xl font-bold text-white">Igualas / Suscripciones</h1>
          <p className="text-sm text-white/30 mt-1">Gestión del modelo de ingresos recurrentes</p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-5">
        <StatCard label="MRR" value={formatRD(mrr)} subValue="Ingreso recurrente mensual" icon={DollarSign} trend={12} trendLabel="vs mes ant." />
        <StatCard label="Suscriptores" value={totalSubs} subValue={`${subscribers.filter(s => s.status === 'active').length} activos`} icon={Users} trend={8} />
        <StatCard label="Tasa Retención" value="87%" subValue="Últimos 6 meses" icon={RefreshCcw} trend={3} />
        <StatCard label="ARR Proyectado" value={formatRD(mrr * 12)} subValue="Ingresos anuales" icon={TrendingUp} trend={15} />
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-surface-1 border border-white/[0.06] rounded-xl p-1.5 mb-4 w-fit">
        {[{ key: 'plans', label: 'Planes' }, { key: 'subscribers', label: 'Suscriptores' }].map(tab => (
          <button key={tab.key} onClick={() => setView(tab.key)} className={cn('px-4 py-2 rounded-lg text-[12px] font-medium transition-colors', view === tab.key ? 'bg-brand-300/10 text-brand-300' : 'text-white/30 hover:text-white/50')}>
            {tab.label}
          </button>
        ))}
      </div>

      {view === 'plans' && (
        <div className="grid grid-cols-3 gap-4">
          {plans.map(plan => (
            <div key={plan.id} className="bg-surface-1 border border-white/[0.06] rounded-xl overflow-hidden hover:border-white/[0.1] transition-colors">
              <div className="p-5 border-b border-white/[0.04]" style={{ borderTop: `3px solid ${plan.color}` }}>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-bold text-white">{plan.name}</h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded" style={{ background: plan.color + '18', color: plan.color }}>{plan.subscribers} suscriptores</span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-white">{formatRD(plan.price)}</span>
                  <span className="text-[12px] text-white/30">/mes</span>
                </div>
              </div>
              <div className="p-5">
                <div className="space-y-2.5">
                  {plan.features.map((f, i) => (
                    <div key={i} className="flex items-start gap-2 text-[12px] text-white/45">
                      <CheckCircle size={13} className="text-emerald-400/60 mt-0.5 flex-shrink-0" /> {f}
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-white/[0.04] text-center">
                  <div className="text-[11px] text-white/25">Ingreso mensual del plan</div>
                  <div className="text-lg font-bold" style={{ color: plan.color }}>{formatRD(plan.price * plan.subscribers)}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {view === 'subscribers' && (
        <div className="bg-surface-1 border border-white/[0.06] rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.06]">
                {['ID', 'Cliente', 'Plan', 'Monto', 'Inicio', 'Renovación', 'Consumo', 'Estado'].map((h, i) => (
                  <th key={i} className="text-[10px] font-semibold text-white/25 uppercase tracking-wider px-4 py-3 text-left">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {subscribers.map(sub => {
                const plan = plans.find(p => p.id === sub.plan)
                const isRenewal = sub.status === 'renewal_due'
                return (
                  <tr key={sub.id} className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors cursor-pointer">
                    <td className="px-4 py-3"><span className="text-[11px] font-mono text-white/25">{sub.id}</span></td>
                    <td className="px-4 py-3"><span className="text-[13px] text-white/65 font-medium">{sub.client}</span></td>
                    <td className="px-4 py-3">
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded" style={{ background: plan.color + '18', color: plan.color }}>{plan.name}</span>
                    </td>
                    <td className="px-4 py-3"><span className="text-[13px] font-semibold text-white/60">{formatRD(sub.monthlyAmount)}</span></td>
                    <td className="px-4 py-3"><span className="text-[12px] text-white/30">{formatDate(sub.startDate)}</span></td>
                    <td className="px-4 py-3">
                      <span className={`text-[12px] ${isRenewal ? 'text-amber-400 font-semibold' : 'text-white/30'}`}>
                        {isRenewal && <Clock size={11} className="inline mr-1" />}{formatDate(sub.renewalDate)}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {sub.totalHours ? (
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-1.5 bg-white/[0.05] rounded-full overflow-hidden">
                            <div className={`h-full rounded-full ${sub.consumedHours/sub.totalHours > 0.8 ? 'bg-amber-400' : 'bg-brand-300'}`} style={{ width: `${(sub.consumedHours/sub.totalHours)*100}%` }} />
                          </div>
                          <span className="text-[10px] text-white/25">{sub.consumedHours}/{sub.totalHours}h</span>
                        </div>
                      ) : (
                        <span className="text-[10px] text-white/20">Ilimitado · {sub.consumedHours}h usadas</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {isRenewal ? (
                        <span className="text-[10px] font-semibold bg-amber-400/10 text-amber-400 px-2 py-0.5 rounded flex items-center gap-1 w-fit"><AlertCircle size={10} /> Renovar</span>
                      ) : (
                        <span className="text-[10px] font-semibold bg-emerald-400/10 text-emerald-400 px-2 py-0.5 rounded">Activa</span>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
