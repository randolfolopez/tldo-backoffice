import { useNavigate } from 'react-router-dom'
import { formatRD, formatDate } from '@/lib/utils'
import { sourceLabels } from '@/lib/mock-clients'
import { ChevronRight, Star } from 'lucide-react'

const tierConfig = {
  gold: { label: 'Oro', bg: 'bg-amber-400/10', color: 'text-amber-400' },
  silver: { label: 'Plata', bg: 'bg-gray-300/10', color: 'text-gray-300' },
  bronze: { label: 'Bronce', bg: 'bg-orange-400/10', color: 'text-orange-400' },
}

export default function ClientTable({ clients }) {
  const navigate = useNavigate()

  if (clients.length === 0) {
    return (
      <div className="bg-surface-1 border border-white/[0.06] rounded-xl p-16 text-center">
        <p className="text-white/30 text-sm">No se encontraron clientes.</p>
      </div>
    )
  }

  return (
    <div className="bg-surface-1 border border-white/[0.06] rounded-xl overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="border-b border-white/[0.06]">
            {['Cliente', 'Tipo', 'Nivel', 'Canal', 'Órdenes', 'Total Facturado', 'Última Actividad', ''].map((h, i) => (
              <th key={i} className="text-[10px] font-semibold text-white/25 uppercase tracking-wider px-4 py-3 text-left">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => {
            const tier = tierConfig[client.tier]
            const source = sourceLabels[client.source]
            return (
              <tr
                key={client.id}
                onClick={() => navigate(`/clientes/${client.id}`)}
                className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors cursor-pointer group"
              >
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-brand-600/20 flex items-center justify-center text-[10px] font-bold text-brand-300 flex-shrink-0">
                      {client.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </div>
                    <div>
                      <div className="text-[13px] text-white/70 font-medium flex items-center gap-1.5">
                        {client.name}
                        {client.tags.includes('VIP') && <Star size={11} className="text-amber-400 fill-amber-400" />}
                      </div>
                      <div className="text-[10px] text-white/20 font-mono">{client.id}</div>
                    </div>
                  </div>
                </td>

                <td className="px-4 py-3.5">
                  <span className="text-[12px] text-white/40">
                    {client.type === 'juridica' ? 'Empresa' : 'Personal'}
                  </span>
                </td>

                <td className="px-4 py-3.5">
                  {tier && (
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${tier.bg} ${tier.color}`}>
                      {tier.label}
                    </span>
                  )}
                </td>

                <td className="px-4 py-3.5">
                  {source && (
                    <span className="text-[11px] text-white/40 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: source.color }} />
                      {source.label}
                    </span>
                  )}
                </td>

                <td className="px-4 py-3.5">
                  <div className="text-[13px] text-white/50">{client.totalOrders}</div>
                  {client.activeOrders > 0 && (
                    <div className="text-[10px] text-brand-300">{client.activeOrders} activa{client.activeOrders > 1 ? 's' : ''}</div>
                  )}
                </td>

                <td className="px-4 py-3.5">
                  <span className="text-[13px] font-semibold text-white/60">{formatRD(client.totalSpent)}</span>
                </td>

                <td className="px-4 py-3.5">
                  <span className="text-[12px] text-white/30">{formatDate(client.lastActivity)}</span>
                </td>

                <td className="px-4 py-3.5 w-8">
                  <ChevronRight size={14} className="text-white/10 group-hover:text-white/30 transition-colors" />
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
