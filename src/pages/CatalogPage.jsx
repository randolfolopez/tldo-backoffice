import { useState, useMemo } from 'react'
import { Search, Plus, Scale, Package, Zap, DollarSign, BarChart3, ChevronRight, ToggleLeft, ToggleRight } from 'lucide-react'
import { TRAMITE_CATEGORIES } from '@/lib/constants'
import { tramites, catalogStats } from '@/lib/mock-catalog'
import { formatRD, cn } from '@/lib/utils'
import StatCard from '@/components/ui/StatCard'

const autoColors = { high: 'text-emerald-400 bg-emerald-400/10', medium: 'text-amber-400 bg-amber-400/10', low: 'text-red-400 bg-red-400/10' }
const autoLabels = { high: 'Alto', medium: 'Medio', low: 'Bajo' }

export default function CatalogPage() {
  const [search, setSearch] = useState('')
  const [catFilter, setCatFilter] = useState('')
  const [autoFilter, setAutoFilter] = useState('')

  const filtered = useMemo(() => {
    return tramites.filter(t => {
      if (search && !t.name.toLowerCase().includes(search.toLowerCase()) && !t.id.toLowerCase().includes(search.toLowerCase())) return false
      if (catFilter && t.category !== catFilter) return false
      if (autoFilter && t.automation !== autoFilter) return false
      return true
    })
  }, [search, catFilter, autoFilter])

  const catCounts = TRAMITE_CATEGORIES.map(c => ({ ...c, count: tramites.filter(t => t.category === c.key).length }))

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-xl font-bold text-white">Catálogo de Servicios</h1>
          <p className="text-sm text-white/30 mt-1">Administración de los 40 trámites legales y configuraciones</p>
        </div>
        <button className="flex items-center gap-2 bg-brand-300 hover:bg-brand-400 text-brand-900 text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors">
          <Plus size={16} /> Nuevo Trámite
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-5">
        <StatCard label="Total Servicios" value={`${catalogStats.active}/${catalogStats.total}`} subValue="activos" icon={Scale} />
        <StatCard label="Órdenes Totales" value={catalogStats.totalOrders} icon={Package} trend={18} trendLabel="vs mes ant." />
        <StatCard label="Ingresos Acumulados" value={formatRD(catalogStats.totalRevenue)} icon={DollarSign} trend={23} trendLabel="vs mes ant." />
        <StatCard label="Automatización Promedio" value={`${catalogStats.avgAutomation}%`} icon={Zap} trend={5} trendLabel="vs mes ant." />
      </div>

      {/* Category pills */}
      <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-1">
        <button onClick={() => setCatFilter('')} className={cn('px-3 py-1.5 rounded-lg text-[12px] font-medium whitespace-nowrap transition-colors', !catFilter ? 'bg-brand-300/12 text-brand-300' : 'text-white/30 hover:text-white/50 hover:bg-white/[0.03]')}>
          Todas ({tramites.length})
        </button>
        {catCounts.map(c => (
          <button key={c.key} onClick={() => setCatFilter(c.key === catFilter ? '' : c.key)} className={cn('flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-medium whitespace-nowrap transition-colors', catFilter === c.key ? 'bg-brand-300/12 text-brand-300' : 'text-white/30 hover:text-white/50 hover:bg-white/[0.03]')}>
            <span className="w-2 h-2 rounded-full" style={{ background: c.color }} /> {c.label} ({c.count})
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex items-center gap-2 bg-surface-2 border border-white/[0.06] rounded-lg px-3 py-2 w-72">
          <Search size={14} className="text-white/25" />
          <input type="text" placeholder="Buscar trámite..." value={search} onChange={e => setSearch(e.target.value)} className="bg-transparent text-sm text-white/70 placeholder:text-white/20 outline-none w-full" />
        </div>
        <select value={autoFilter} onChange={e => setAutoFilter(e.target.value)} className="bg-surface-2 border border-white/[0.06] rounded-lg px-3 py-2 text-sm text-white/60 outline-none cursor-pointer">
          <option value="">Automatización</option>
          <option value="high">Alto</option>
          <option value="medium">Medio</option>
          <option value="low">Bajo</option>
        </select>
        <span className="text-xs text-white/25 ml-auto">{filtered.length} servicios</span>
      </div>

      {/* Table */}
      <div className="bg-surface-1 border border-white/[0.06] rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/[0.06]">
              {['ID', 'Servicio', 'Categoría', 'Precio', 'Tasas', 'Tiempo', 'Autom.', 'Órdenes', 'Ingresos', 'Estado'].map((h, i) => (
                <th key={i} className="text-[10px] font-semibold text-white/25 uppercase tracking-wider px-4 py-3 text-left">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(t => {
              const cat = TRAMITE_CATEGORIES.find(c => c.key === t.category)
              return (
                <tr key={t.id} className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors cursor-pointer">
                  <td className="px-4 py-3"><span className="text-[11px] font-mono text-white/25">{t.id}</span></td>
                  <td className="px-4 py-3"><span className="text-[13px] text-white/65 font-medium">{t.name}</span></td>
                  <td className="px-4 py-3">
                    <span className="flex items-center gap-1.5 text-[11px] text-white/40">
                      <span className="w-2 h-2 rounded-full" style={{ background: cat?.color }} /> {cat?.label}
                    </span>
                  </td>
                  <td className="px-4 py-3"><span className="text-[13px] font-semibold text-white/60">{formatRD(t.price)}</span></td>
                  <td className="px-4 py-3"><span className="text-[12px] text-white/30">{formatRD(t.tasas)}</span></td>
                  <td className="px-4 py-3"><span className="text-[11px] text-white/35">{t.timeEstimate}</span></td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-12 h-1.5 bg-white/[0.05] rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${t.automationPct >= 70 ? 'bg-emerald-400' : t.automationPct >= 50 ? 'bg-amber-400' : 'bg-red-400'}`} style={{ width: `${t.automationPct}%` }} />
                      </div>
                      <span className="text-[10px] text-white/25">{t.automationPct}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3"><span className="text-[13px] text-white/50">{t.orders}</span></td>
                  <td className="px-4 py-3"><span className="text-[12px] text-white/40">{formatRD(t.revenue)}</span></td>
                  <td className="px-4 py-3">
                    {t.active ? (
                      <span className="text-[10px] font-semibold bg-emerald-400/10 text-emerald-400 px-2 py-0.5 rounded">Activo</span>
                    ) : (
                      <span className="text-[10px] font-semibold bg-white/5 text-white/25 px-2 py-0.5 rounded">Inactivo</span>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
