import { Search, SlidersHorizontal, LayoutList, Columns3, Download } from 'lucide-react'
import { ORDER_STATUSES, TRAMITE_CATEGORIES } from '@/lib/constants'
import { cn } from '@/lib/utils'

export default function OrderFilters({ view, setView, filters, setFilters, orderCount }) {
  return (
    <div className="space-y-3">
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="flex items-center gap-2 bg-surface-2 border border-white/[0.06] rounded-lg px-3 py-2 w-72">
            <Search size={14} className="text-white/25" />
            <input
              type="text"
              placeholder="Buscar # orden, cliente, trámite..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              className="bg-transparent text-sm text-white/70 placeholder:text-white/20 outline-none w-full"
            />
          </div>

          {/* Status filter */}
          <select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            className="bg-surface-2 border border-white/[0.06] rounded-lg px-3 py-2 text-sm text-white/60 outline-none cursor-pointer appearance-none"
          >
            <option value="">Todos los estados</option>
            {Object.entries(ORDER_STATUSES).map(([key, val]) => (
              <option key={key} value={key}>{val.label}</option>
            ))}
          </select>

          {/* Category filter */}
          <select
            value={filters.category}
            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
            className="bg-surface-2 border border-white/[0.06] rounded-lg px-3 py-2 text-sm text-white/60 outline-none cursor-pointer appearance-none"
          >
            <option value="">Todas las categorías</option>
            {TRAMITE_CATEGORIES.map((cat) => (
              <option key={cat.key} value={cat.key}>{cat.label}</option>
            ))}
          </select>

          {/* Priority */}
          <select
            value={filters.priority}
            onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
            className="bg-surface-2 border border-white/[0.06] rounded-lg px-3 py-2 text-sm text-white/60 outline-none cursor-pointer appearance-none"
          >
            <option value="">Prioridad</option>
            <option value="high">Alta</option>
            <option value="medium">Media</option>
            <option value="low">Baja</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          {/* Count */}
          <span className="text-xs text-white/25 mr-2">{orderCount} órdenes</span>

          {/* Export */}
          <button className="p-2 rounded-lg border border-white/[0.06] hover:bg-white/[0.03] transition-colors" title="Exportar">
            <Download size={15} className="text-white/30" />
          </button>

          {/* View toggle */}
          <div className="flex bg-surface-2 border border-white/[0.06] rounded-lg overflow-hidden">
            <button
              onClick={() => setView('table')}
              className={cn(
                'p-2 transition-colors',
                view === 'table' ? 'bg-brand-300/15 text-brand-300' : 'text-white/25 hover:text-white/50'
              )}
              title="Vista tabla"
            >
              <LayoutList size={15} />
            </button>
            <button
              onClick={() => setView('kanban')}
              className={cn(
                'p-2 transition-colors',
                view === 'kanban' ? 'bg-brand-300/15 text-brand-300' : 'text-white/25 hover:text-white/50'
              )}
              title="Vista Kanban"
            >
              <Columns3 size={15} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
