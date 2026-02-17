import { useNavigate } from 'react-router-dom'
import StatusBadge from '@/components/ui/StatusBadge'
import { formatRD, formatDate } from '@/lib/utils'
import { AlertCircle, Clock, ChevronRight } from 'lucide-react'

const priorityDot = {
  high: 'bg-red-400',
  medium: 'bg-amber-400',
  low: 'bg-emerald-400',
}

export default function OrderTable({ orders }) {
  const navigate = useNavigate()

  if (orders.length === 0) {
    return (
      <div className="bg-surface-1 border border-white/[0.06] rounded-xl p-16 text-center">
        <p className="text-white/30 text-sm">No se encontraron órdenes con estos filtros.</p>
      </div>
    )
  }

  return (
    <div className="bg-surface-1 border border-white/[0.06] rounded-xl overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="border-b border-white/[0.06]">
            {['', 'Orden', 'Cliente', 'Trámite', 'Asignado', 'Estado', 'Monto', 'Vence', ''].map((h, i) => (
              <th key={i} className="text-[10px] font-semibold text-white/25 uppercase tracking-wider px-4 py-3 text-left">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => {
            const isOverdue = new Date(order.dueDate) < new Date() && !['completed', 'delivered', 'cancelled'].includes(order.status)
            const isPending = order.amountPaid < order.amount

            return (
              <tr
                key={order.id}
                onClick={() => navigate(`/ordenes/${order.id}`)}
                className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors cursor-pointer group"
              >
                {/* Priority dot */}
                <td className="pl-4 pr-0 py-3.5 w-4">
                  <span className={`block w-2 h-2 rounded-full ${priorityDot[order.priority]}`} title={`Prioridad ${order.priority}`} />
                </td>

                {/* Order ID */}
                <td className="px-4 py-3.5">
                  <span className="text-[12px] font-mono font-semibold text-brand-300">{order.id}</span>
                </td>

                {/* Client */}
                <td className="px-4 py-3.5">
                  <div>
                    <div className="text-[13px] text-white/70 font-medium">{order.client.name}</div>
                    <div className="text-[11px] text-white/25">{order.client.type === 'juridica' ? 'Empresa' : 'Personal'}</div>
                  </div>
                </td>

                {/* Tramite */}
                <td className="px-4 py-3.5 max-w-[220px]">
                  <div className="text-[12px] text-white/50 truncate">{order.tramite}</div>
                  <div className="text-[10px] text-white/20 capitalize mt-0.5">{order.category}</div>
                </td>

                {/* Assignee */}
                <td className="px-4 py-3.5">
                  {order.assignee ? (
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-brand-500/25 flex items-center justify-center text-[9px] font-bold text-brand-300">
                        {order.assignee.avatar}
                      </div>
                      <div>
                        <div className="text-[12px] text-white/50">{order.assignee.name}</div>
                      </div>
                    </div>
                  ) : (
                    <span className="text-[11px] text-red-400/60 italic">Sin asignar</span>
                  )}
                </td>

                {/* Status */}
                <td className="px-4 py-3.5">
                  <StatusBadge status={order.status} />
                </td>

                {/* Amount */}
                <td className="px-4 py-3.5">
                  <div className="text-[13px] font-semibold text-white/60">{formatRD(order.amount)}</div>
                  {isPending && (
                    <div className="text-[10px] text-amber-400/70 flex items-center gap-1 mt-0.5">
                      <AlertCircle size={10} />
                      Pendiente: {formatRD(order.amount - order.amountPaid)}
                    </div>
                  )}
                </td>

                {/* Due date */}
                <td className="px-4 py-3.5">
                  <div className={`text-[12px] flex items-center gap-1 ${isOverdue ? 'text-red-400' : 'text-white/35'}`}>
                    {isOverdue && <Clock size={11} />}
                    {formatDate(order.dueDate)}
                  </div>
                </td>

                {/* Arrow */}
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
