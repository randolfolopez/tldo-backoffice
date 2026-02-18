import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useApi } from '@/lib/hooks'
import api from '@/lib/api'
import { formatRD, formatDate } from '@/lib/utils'
import OrderMessages from '@/components/orders/OrderMessages'

const statusLabels = { received: 'Recibida', review: 'En revisión', processing: 'En proceso', waiting_entity: 'Esp. entidad', completed: 'Completada', delivered: 'Entregada', cancelled: 'Cancelada' }
const statusFlow = ['received', 'review', 'processing', 'waiting_entity', 'completed', 'delivered']

const TABS = [
  { key: 'detalles', label: 'Detalles' },
  { key: 'historial', label: 'Historial' },
  { key: 'mensajes', label: 'Mensajes' },
]

export default function OrderDetailPage() {
  const { orderId } = useParams()
  const navigate = useNavigate()
  const { data: order, loading, error, refetch } = useApi(() => api.getOrder(orderId), [orderId])
  const [updating, setUpdating] = useState(false)
  const [activeTab, setActiveTab] = useState('detalles')

  const changeStatus = async (newStatus) => {
    setUpdating(true)
    try {
      await api.updateOrder(order.id, { status: newStatus })
      refetch()
    } catch (err) {
      alert(err.message)
    } finally {
      setUpdating(false)
    }
  }

  if (loading) return <div className="p-8 text-white/40">Cargando orden...</div>
  if (error) return <div className="p-8 text-red-400">Error: {error}</div>
  if (!order) return null

  const currentIdx = statusFlow.indexOf(order.status)
  const messageCount = (order.messages || []).length

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <button onClick={() => navigate('/ordenes')} className="text-white/40 text-xs hover:text-white/60 mb-1">← Volver a órdenes</button>
          <h1 className="text-xl font-bold text-white flex items-center gap-3">
            {order.display_id}
            <span className="text-sm font-normal text-white/40">{statusLabels[order.status]}</span>
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-4">
          {/* Status Flow */}
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4">
            <h3 className="text-xs text-white/40 uppercase tracking-wider mb-3">Progreso</h3>
            <div className="flex items-center gap-1">
              {statusFlow.map((s, i) => (
                <button key={s} onClick={() => changeStatus(s)} disabled={updating}
                  className={`flex-1 py-2 text-[10px] rounded-lg border transition-all ${i <= currentIdx ? 'bg-blue-500/10 border-blue-500/20 text-blue-400' : 'border-white/[0.06] text-white/20 hover:text-white/40'}`}>
                  {statusLabels[s]}
                </button>
              ))}
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 border-b border-white/[0.06] pb-0">
            {TABS.map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-2 text-xs font-medium rounded-t-lg transition-colors relative ${
                  activeTab === tab.key
                    ? 'bg-white/[0.05] text-white border border-white/[0.06] border-b-transparent -mb-px'
                    : 'text-white/30 hover:text-white/50'
                }`}
              >
                {tab.label}
                {tab.key === 'mensajes' && messageCount > 0 && (
                  <span className="ml-1.5 inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[10px] font-semibold rounded-full bg-blue-500/20 text-blue-400">
                    {messageCount}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5">
            {activeTab === 'detalles' && (
              <>
                <h3 className="text-xs text-white/40 uppercase tracking-wider mb-4">Detalles</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div><span className="text-white/30">Cliente:</span><p className="text-white/80 mt-0.5">{order.client_name || '—'}</p></div>
                  <div><span className="text-white/30">Servicio:</span><p className="text-white/80 mt-0.5">{order.service_name || '—'}</p></div>
                  <div><span className="text-white/30">Asignado a:</span><p className="text-white/80 mt-0.5">{order.assignee_name || 'Sin asignar'}</p></div>
                  <div><span className="text-white/30">Prioridad:</span><p className="text-white/80 mt-0.5 capitalize">{order.priority}</p></div>
                  <div><span className="text-white/30">Monto:</span><p className="text-white/80 mt-0.5 font-medium">{formatRD(order.amount)}</p></div>
                  <div><span className="text-white/30">Pagado:</span><p className="text-white/80 mt-0.5">{formatRD(order.amount_paid)} <span className="text-white/30">({order.payment_status})</span></p></div>
                  <div><span className="text-white/30">Creada:</span><p className="text-white/80 mt-0.5">{formatDate(order.created_at)}</p></div>
                  <div><span className="text-white/30">Vencimiento:</span><p className="text-white/80 mt-0.5">{order.due_date ? formatDate(order.due_date) : '—'}</p></div>
                </div>
                {order.notes && (
                  <div className="mt-4 pt-4 border-t border-white/[0.06]">
                    <span className="text-white/30 text-sm">Notas:</span>
                    <p className="text-white/60 text-sm mt-1">{order.notes}</p>
                  </div>
                )}
              </>
            )}

            {activeTab === 'historial' && (
              <>
                <h3 className="text-xs text-white/40 uppercase tracking-wider mb-4">Historial</h3>
                <div className="space-y-3">
                  {(order.timeline || []).map((t, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-blue-500/40 mt-1.5 shrink-0" />
                      <div>
                        <p className="text-sm text-white/70">{t.description}</p>
                        <p className="text-xs text-white/30 mt-0.5">{t.user_name} · {formatDate(t.created_at)}</p>
                      </div>
                    </div>
                  ))}
                  {(!order.timeline || order.timeline.length === 0) && <p className="text-white/20 text-sm">Sin historial</p>}
                </div>
              </>
            )}

            {activeTab === 'mensajes' && (
              <OrderMessages
                orderId={orderId}
                messages={order.messages || []}
                onMessageSent={refetch}
              />
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Payments */}
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5">
            <h3 className="text-xs text-white/40 uppercase tracking-wider mb-3">Pagos</h3>
            {(order.payments || []).length > 0 ? order.payments.map((p, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-white/[0.04] last:border-0">
                <div>
                  <p className="text-sm text-white/70">{formatRD(p.amount)}</p>
                  <p className="text-[10px] text-white/30">{p.method} · {formatDate(p.created_at)}</p>
                </div>
                <span className="text-xs text-green-400">{p.status}</span>
              </div>
            )) : <p className="text-white/20 text-sm">Sin pagos registrados</p>}
          </div>

          {/* Documents */}
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5">
            <h3 className="text-xs text-white/40 uppercase tracking-wider mb-3">Documentos</h3>
            {(order.documents || []).length > 0 ? order.documents.map((d, i) => (
              <div key={i} className="flex items-center gap-2 py-2 border-b border-white/[0.04] last:border-0">
                <span className="text-sm text-white/70">{d.name}</span>
              </div>
            )) : <p className="text-white/20 text-sm">Sin documentos</p>}
          </div>
        </div>
      </div>
    </div>
  )
}
