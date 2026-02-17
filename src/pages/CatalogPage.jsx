import { useState } from 'react'
import { useApi } from '@/lib/hooks'
import api from '@/lib/api'
import { formatRD } from '@/lib/utils'

export default function CatalogPage() {
  const { data: categories, loading: loadingCats } = useApi(() => api.getCategories())
  const { data: services, loading: loadingServices, refetch } = useApi(() => api.getServices())
  const [selectedCat, setSelectedCat] = useState(null)

  const filtered = selectedCat ? (services || []).filter(s => s.category_id === selectedCat) : (services || [])
  const loading = loadingCats || loadingServices

  return (
    <div className="p-6 space-y-4">
      <div>
        <h1 className="text-xl font-bold text-white">Catálogo de Servicios</h1>
        <p className="text-white/40 text-sm mt-0.5">{(services || []).length} servicios en {(categories || []).length} categorías</p>
      </div>

      {/* Category tabs */}
      <div className="flex items-center gap-2 flex-wrap">
        <button onClick={() => setSelectedCat(null)}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${!selectedCat ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' : 'text-white/40 border border-white/[0.06] hover:text-white/60'}`}>
          Todos
        </button>
        {(categories || []).map(cat => (
          <button key={cat.id} onClick={() => setSelectedCat(cat.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${selectedCat === cat.id ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' : 'text-white/40 border border-white/[0.06] hover:text-white/60'}`}>
            {cat.name} ({cat.service_count})
          </button>
        ))}
      </div>

      {loading ? <div className="text-white/40 text-sm py-8 text-center">Cargando...</div> : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(s => (
            <div key={s.id} className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5 hover:border-white/[0.12] transition-all">
              <div className="flex items-start justify-between mb-2">
                <span className="text-[10px] font-mono text-white/30">{s.code}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full ${s.is_active ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                  {s.is_active ? 'Activo' : 'Inactivo'}
                </span>
              </div>
              <h3 className="text-sm font-semibold text-white/90 mb-1">{s.name}</h3>
              <p className="text-xs text-white/30 mb-3">{s.category_name}</p>
              <div className="flex items-center justify-between text-xs">
                <span className="text-white/50">{formatRD(s.price_min)} — {formatRD(s.price_max)}</span>
                <span className="text-white/30">{s.timeline}</span>
              </div>
              {s.entity && <p className="text-[10px] text-white/20 mt-2">Entidad: {s.entity}</p>}
              {s.order_count > 0 && <p className="text-[10px] text-blue-400/50 mt-1">{s.order_count} órdenes</p>}
            </div>
          ))}
          {filtered.length === 0 && <div className="col-span-full text-center py-8 text-white/30 text-sm">No hay servicios</div>}
        </div>
      )}
    </div>
  )
}
