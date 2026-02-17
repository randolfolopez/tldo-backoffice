import { useNavigate } from 'react-router-dom'
import { ORDER_STATUSES } from '@/lib/constants'
import { formatRD, formatDate } from '@/lib/utils'
import { Clock, AlertCircle } from 'lucide-react'

const kanbanColumns = ['received', 'review', 'processing', 'waiting_entity', 'needs_info', 'completed', 'delivered']

const priorityBorder = {
  high: 'border-l-red-400/60',
  medium: 'border-l-amber-400/40',
  low: 'border-l-emerald-400/30',
}

export default function OrderKanban({ orders }) {
  const navigate = useNavigate()

  return (
    <div className="flex gap-3 overflow-x-auto pb-4" style={{ minHeight: 500 }}>
      {kanbanColumns.map((statusKey) => {
        const config = ORDER_STATUSES[statusKey]
        const columnOrders = orders.filter((o) => o.status === statusKey)

        return (
          <div
            key={statusKey}
            className="flex-shrink-0 w-[260px] bg-surface-1/50 border border-white/[0.04] rounded-xl"
          >
            {/* Column header */}
            <div className="px-3.5 py-3 border-b border-white/[0.04] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: config.color }} />
                <span className="text-[12px] font-semibold text-white/60">{config.label}</span>
              </div>
              <span
                className="text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center"
                style={{ background: config.bg, color: config.color }}
              >
                {columnOrders.length}
              </span>
            </div>

            {/* Cards */}
            <div className="p-2 space-y-2 max-h-[600px] overflow-y-auto">
              {columnOrders.length === 0 && (
                <div className="text-center py-8 text-[11px] text-white/15">
                  Sin órdenes
                </div>
              )}

              {columnOrders.map((order) => {
                const isOverdue = new Date(order.dueDate) < new Date() && !['completed', 'delivered'].includes(order.status)
                const isPending = order.amountPaid < order.amount

                return (
                  <div
                    key={order.id}
                    onClick={() => navigate(`/ordenes/${order.id}`)}
                    className={`bg-surface-2 border border-white/[0.06] rounded-lg p-3 cursor-pointer 
                      hover:border-white/[0.12] transition-all border-l-[3px] ${priorityBorder[order.priority]}
                      hover:translate-y-[-1px] hover:shadow-lg hover:shadow-black/20`}
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono font-bold text-brand-300">{order.id}</span>
                      {isOverdue && <Clock size={12} className="text-red-400" />}
                      {isPending && <AlertCircle size={12} className="text-amber-400" />}
                    </div>

                    {/* Tramite */}
                    <div className="text-[12px] text-white/60 font-medium leading-tight mb-1.5 line-clamp-2">
                      {order.tramite}
                    </div>

                    {/* Client */}
                    <div className="text-[11px] text-white/35 mb-3">
                      {order.client.name}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-2 border-t border-white/[0.04]">
                      <div className="text-[11px] font-semibold text-white/40">
                        {formatRD(order.amount)}
                      </div>

                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] ${isOverdue ? 'text-red-400' : 'text-white/20'}`}>
                          {formatDate(order.dueDate)}
                        </span>

                        {order.assignee ? (
                          <div
                            className="w-5 h-5 rounded-full bg-brand-500/25 flex items-center justify-center text-[8px] font-bold text-brand-300"
                            title={order.assignee.name}
                          >
                            {order.assignee.avatar}
                          </div>
                        ) : (
                          <div className="w-5 h-5 rounded-full border border-dashed border-red-400/30 flex items-center justify-center text-[8px] text-red-400/50">
                            ?
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}
