import { useApi } from '@/lib/hooks'
import api from '@/lib/api'

const typeLabels = { notaria: 'Notaría', abogado: 'Abogado', mensajeria: 'Mensajería', contador: 'Contador', otro: 'Otro' }

export default function AlliancesPage() {
  const { data: partners, loading, error } = useApi(() => api.getPartners())

  return (
    <div className="p-6 space-y-4">
      <div>
        <h1 className="text-xl font-bold text-white">Alianzas Estratégicas</h1>
        <p className="text-white/40 text-sm mt-0.5">{(partners || []).length} socios activos</p>
      </div>

      {loading ? <div className="text-white/40 text-sm py-8 text-center">Cargando...</div> :
      error ? <div className="text-red-400 text-sm py-8 text-center">Error: {error}</div> : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {(partners || []).map(p => (
            <div key={p.id} className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5 hover:border-white/[0.12] transition-all">
              <div className="flex items-start justify-between mb-2">
                <span className={`text-[10px] px-2 py-0.5 rounded-full ${p.is_active ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                  {p.is_active ? 'Activo' : 'Inactivo'}
                </span>
                <span className="text-[10px] text-white/30 capitalize">{typeLabels[p.type] || p.type}</span>
              </div>
              <h3 className="text-sm font-semibold text-white/90 mb-1">{p.name}</h3>
              <div className="space-y-1.5 text-xs mt-3">
                {p.contact_name && <div className="flex justify-between"><span className="text-white/30">Contacto</span><span className="text-white/50">{p.contact_name}</span></div>}
                {p.email && <div className="flex justify-between"><span className="text-white/30">Email</span><span className="text-white/50">{p.email}</span></div>}
                {p.phone && <div className="flex justify-between"><span className="text-white/30">Teléfono</span><span className="text-white/50">{p.phone}</span></div>}
                {p.commission_pct && <div className="flex justify-between"><span className="text-white/30">Comisión</span><span className="text-white/50">{p.commission_pct}%</span></div>}
              </div>
              {p.notes && <p className="text-[10px] text-white/20 mt-3 pt-2 border-t border-white/[0.04]">{p.notes}</p>}
            </div>
          ))}
          {(partners || []).length === 0 && <div className="col-span-full text-center py-8 text-white/30 text-sm">No hay socios</div>}
        </div>
      )}
    </div>
  )
}
