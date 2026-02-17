import { useState, useMemo } from 'react'
import { Plus } from 'lucide-react'
import { ORDER_STATUSES } from '@/lib/constants'
import { orders, orderStats } from '@/lib/mock-orders'
import OrderFilters from '@/components/orders/OrderFilters'
import OrderTable from '@/components/orders/OrderTable'
import OrderKanban from '@/components/orders/OrderKanban'

export default function OrdersPage() {
  const [view, setView] = useState('table')
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    category: '',
    priority: '',
  })

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      if (filters.search) {
        const s = filters.search.toLowerCase()
        const match =
          order.id.toLowerCase().includes(s) ||
          order.client.name.toLowerCase().includes(s) ||
          order.tramite.toLowerCase().includes(s)
        if (!match) return false
      }
      if (filters.status && order.status !== filters.status) return false
      if (filters.category && order.category !== filters.category) return false
      if (filters.priority && order.priority !== filters.priority) return false
      return true
    })
  }, [filters])

  // Status summary tabs
  const statusTabs = [
    { key: '', label: 'Todas', count: orders.length },
    { key: 'received', label: 'Recibidas', count: orderStats.received },
    { key: 'review', label: 'Revisión', count: orderStats.review },
    { key: 'processing', label: 'En Proceso', count: orderStats.processing },
    { key: 'waiting_entity', label: 'Esp. Entidad', count: orderStats.waiting_entity },
    { key: 'needs_info', label: 'Req. Info', count: orderStats.needs_info },
    { key: 'completed', label: 'Completadas', count: orderStats.completed },
    { key: 'delivered', label: 'Entregadas', count: orderStats.delivered },
  ]

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-xl font-bold text-white">Gestión de Órdenes</h1>
          <p className="text-sm text-white/30 mt-1">Control del ciclo de vida de cada trámite contratado</p>
        </div>
        <button className="flex items-center gap-2 bg-brand-300 hover:bg-brand-400 text-brand-900 text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors">
          <Plus size={16} />
          Nueva Orden
        </button>
      </div>

      {/* Status tabs */}
      <div className="flex items-center gap-1 mb-4 overflow-x-auto pb-1">
        {statusTabs.map((tab) => {
          const isActive = filters.status === tab.key
          const statusConfig = tab.key ? ORDER_STATUSES[tab.key] : null
          return (
            <button
              key={tab.key}
              onClick={() => setFilters({ ...filters, status: tab.key })}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-medium whitespace-nowrap transition-colors ${
                isActive
                  ? 'bg-brand-300/12 text-brand-300'
                  : 'text-white/30 hover:text-white/50 hover:bg-white/[0.03]'
              }`}
            >
              {statusConfig && (
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: statusConfig.color }} />
              )}
              {tab.label}
              <span className={`text-[10px] font-bold ${isActive ? 'text-brand-300/60' : 'text-white/15'}`}>
                {tab.count}
              </span>
            </button>
          )
        })}
      </div>

      {/* Filters */}
      <div className="mb-4">
        <OrderFilters
          view={view}
          setView={setView}
          filters={filters}
          setFilters={setFilters}
          orderCount={filteredOrders.length}
        />
      </div>

      {/* Content */}
      {view === 'table' ? (
        <OrderTable orders={filteredOrders} />
      ) : (
        <OrderKanban orders={filteredOrders} />
      )}
    </div>
  )
}
