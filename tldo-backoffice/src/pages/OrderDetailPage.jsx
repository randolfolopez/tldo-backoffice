import { useParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  FileText,
  Clock,
  DollarSign,
  MessageSquare,
  Upload,
  Send,
  CheckCircle,
  AlertCircle,
  CreditCard,
  UserPlus,
  Bell,
  FileOutput,
  MoreHorizontal,
} from 'lucide-react'
import StatusBadge from '@/components/ui/StatusBadge'
import { ORDER_STATUSES } from '@/lib/constants'
import { formatRD, formatDate, cn } from '@/lib/utils'
import { orders } from '@/lib/mock-orders'

const timelineIcons = {
  system: Clock,
  payment: CreditCard,
  assignment: UserPlus,
  status: CheckCircle,
  document: FileText,
  notification: Bell,
}

const timelineColors = {
  system: 'text-white/30 bg-white/[0.06]',
  payment: 'text-emerald-400 bg-emerald-400/10',
  assignment: 'text-blue-400 bg-blue-400/10',
  status: 'text-amber-400 bg-amber-400/10',
  document: 'text-purple-400 bg-purple-400/10',
  notification: 'text-cyan-400 bg-cyan-400/10',
}

const docStatusConfig = {
  uploaded: { label: 'Subido', color: 'text-blue-400', bg: 'bg-blue-400/10' },
  draft: { label: 'Borrador', color: 'text-amber-400', bg: 'bg-amber-400/10' },
  review: { label: 'En Revisión', color: 'text-purple-400', bg: 'bg-purple-400/10' },
  pending: { label: 'Pendiente', color: 'text-red-400', bg: 'bg-red-400/10' },
  submitted: { label: 'Enviado', color: 'text-cyan-400', bg: 'bg-cyan-400/10' },
  completed: { label: 'Completado', color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
}

export default function OrderDetailPage() {
  const { orderId } = useParams()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('timeline')
  const [newNote, setNewNote] = useState('')

  const order = orders.find((o) => o.id === orderId)

  if (!order) {
    return (
      <div className="text-center py-20">
        <p className="text-white/30 text-lg mb-4">Orden no encontrada</p>
        <button onClick={() => navigate('/ordenes')} className="text-brand-300 text-sm hover:underline">
          ← Volver a órdenes
        </button>
      </div>
    )
  }

  const slaPercent = Math.round((order.slaUsed / order.slaHours) * 100)
  const slaOverdue = slaPercent > 100
  const paymentPercent = Math.round((order.amountPaid / order.amount) * 100)

  const statusEntries = Object.entries(ORDER_STATUSES)

  return (
    <div>
      {/* Back nav + actions */}
      <div className="flex items-center justify-between mb-5">
        <button
          onClick={() => navigate('/ordenes')}
          className="flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors"
        >
          <ArrowLeft size={16} />
          Órdenes
        </button>

        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 bg-surface-2 border border-white/[0.08] hover:border-white/[0.15] text-white/50 text-[12px] font-medium px-3 py-2 rounded-lg transition-colors">
            <FileOutput size={14} />
            Generar Documento
          </button>
          <button className="flex items-center gap-2 bg-surface-2 border border-white/[0.08] hover:border-white/[0.15] text-white/50 text-[12px] font-medium px-3 py-2 rounded-lg transition-colors">
            <Send size={14} />
            Notificar Cliente
          </button>
          <button className="p-2 rounded-lg border border-white/[0.06] hover:bg-white/[0.03] transition-colors">
            <MoreHorizontal size={16} className="text-white/30" />
          </button>
        </div>
      </div>

      {/* Header card */}
      <div className="bg-surface-1 border border-white/[0.06] rounded-xl p-5 mb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-brand-600/20 flex items-center justify-center text-lg font-bold text-brand-300">
              {order.id.slice(-3)}
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-lg font-bold text-white">{order.id}</h1>
                <StatusBadge status={order.status} />
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                  order.priority === 'high' ? 'bg-red-400/10 text-red-400' :
                  order.priority === 'medium' ? 'bg-amber-400/10 text-amber-400' :
                  'bg-emerald-400/10 text-emerald-400'
                }`}>
                  {order.priority === 'high' ? 'Alta' : order.priority === 'medium' ? 'Media' : 'Baja'}
                </span>
              </div>
              <p className="text-sm text-white/50">{order.tramite}</p>
              <p className="text-[11px] text-white/25 mt-1 capitalize">Categoría: {order.category} · Creada: {formatDate(order.createdAt)}</p>
            </div>
          </div>

          {/* Change status dropdown */}
          <select
            defaultValue={order.status}
            className="bg-surface-2 border border-white/[0.08] rounded-lg px-3 py-2 text-[12px] text-white/60 outline-none cursor-pointer"
          >
            {statusEntries.map(([key, val]) => (
              <option key={key} value={key}>{val.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-3 gap-4">
        {/* Left column: tabs content */}
        <div className="col-span-2 space-y-4">
          {/* Tabs */}
          <div className="flex gap-1 bg-surface-1 border border-white/[0.06] rounded-xl p-1.5">
            {[
              { key: 'timeline', label: 'Timeline', icon: Clock },
              { key: 'documents', label: `Documentos (${order.documents.length})`, icon: FileText },
              { key: 'notes', label: `Notas (${order.notes.length})`, icon: MessageSquare },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={cn(
                  'flex items-center gap-2 px-4 py-2 rounded-lg text-[12px] font-medium transition-colors',
                  activeTab === tab.key
                    ? 'bg-brand-300/10 text-brand-300'
                    : 'text-white/30 hover:text-white/50'
                )}
              >
                <tab.icon size={14} />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Timeline */}
          {activeTab === 'timeline' && (
            <div className="bg-surface-1 border border-white/[0.06] rounded-xl p-5">
              <div className="space-y-0">
                {[...order.timeline].reverse().map((event, i) => {
                  const Icon = timelineIcons[event.type] || Clock
                  const colorClass = timelineColors[event.type] || timelineColors.system
                  const isLast = i === order.timeline.length - 1
                  return (
                    <div key={i} className="flex gap-3">
                      {/* Line + icon */}
                      <div className="flex flex-col items-center">
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${colorClass}`}>
                          <Icon size={13} />
                        </div>
                        {!isLast && <div className="w-px flex-1 bg-white/[0.06] my-1" />}
                      </div>

                      {/* Content */}
                      <div className={cn('pb-5 flex-1 min-w-0', isLast && 'pb-0')}>
                        <p className="text-[13px] text-white/60 leading-relaxed">{event.event}</p>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-[10px] text-white/20">{event.date}</span>
                          <span className="text-[10px] text-white/15">por {event.user}</span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Documents */}
          {activeTab === 'documents' && (
            <div className="bg-surface-1 border border-white/[0.06] rounded-xl p-5">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-semibold text-white/25 uppercase tracking-wider">
                  Documentos del caso
                </span>
                <button className="flex items-center gap-1.5 text-[12px] text-brand-300 hover:text-brand-200 font-medium">
                  <Upload size={13} />
                  Subir documento
                </button>
              </div>

              <div className="space-y-2">
                {order.documents.map((doc, i) => {
                  const config = docStatusConfig[doc.status] || docStatusConfig.pending
                  return (
                    <div
                      key={i}
                      className="flex items-center justify-between p-3 rounded-lg border border-white/[0.04] hover:border-white/[0.08] transition-colors cursor-pointer group"
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className="w-9 h-9 rounded-lg bg-surface-3 flex items-center justify-center flex-shrink-0">
                          <FileText size={16} className="text-white/25" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-[13px] text-white/60 truncate group-hover:text-white/80 transition-colors">
                            {doc.name}
                          </div>
                          <div className="text-[10px] text-white/20 mt-0.5">
                            {doc.date ? formatDate(doc.date) : 'Pendiente de carga'}
                          </div>
                        </div>
                      </div>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${config.bg} ${config.color}`}>
                        {config.label}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Notes */}
          {activeTab === 'notes' && (
            <div className="bg-surface-1 border border-white/[0.06] rounded-xl p-5">
              {/* Add note */}
              <div className="mb-5">
                <div className="flex gap-3">
                  <div className="w-7 h-7 rounded-full bg-brand-500/25 flex items-center justify-center text-[9px] font-bold text-brand-300 flex-shrink-0 mt-1">
                    AD
                  </div>
                  <div className="flex-1">
                    <textarea
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                      placeholder="Agregar nota interna..."
                      rows={3}
                      className="w-full bg-surface-2 border border-white/[0.06] rounded-lg px-3 py-2.5 text-[13px] text-white/70 placeholder:text-white/20 outline-none resize-none focus:border-brand-300/30 transition-colors"
                    />
                    <div className="flex justify-end mt-2">
                      <button
                        disabled={!newNote.trim()}
                        className="flex items-center gap-1.5 bg-brand-300 disabled:bg-white/10 text-brand-900 disabled:text-white/20 text-[12px] font-semibold px-3 py-1.5 rounded-lg transition-colors"
                      >
                        <Send size={12} />
                        Agregar
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Existing notes */}
              <div className="space-y-4">
                {order.notes.length === 0 ? (
                  <p className="text-[13px] text-white/20 text-center py-6">Sin notas internas</p>
                ) : (
                  order.notes.map((note, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="w-7 h-7 rounded-full bg-surface-3 flex items-center justify-center text-[9px] font-bold text-white/30 flex-shrink-0 mt-0.5">
                        {note.user.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[12px] font-semibold text-white/50">{note.user}</span>
                          <span className="text-[10px] text-white/15">{note.date}</span>
                        </div>
                        <p className="text-[13px] text-white/45 leading-relaxed">{note.text}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right column: info panels */}
        <div className="space-y-4">
          {/* Client info */}
          <div className="bg-surface-1 border border-white/[0.06] rounded-xl p-4">
            <h3 className="text-[11px] font-semibold text-white/25 uppercase tracking-wider mb-3">Cliente</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-600/20 flex items-center justify-center text-sm font-bold text-brand-300">
                  {order.client.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>
                <div>
                  <div className="text-[13px] font-semibold text-white/70">{order.client.name}</div>
                  <div className="text-[10px] text-white/25">
                    {order.client.type === 'juridica' ? 'Persona Jurídica' : 'Persona Física'}
                  </div>
                </div>
              </div>
              <div className="space-y-2 pt-2 border-t border-white/[0.04]">
                <div className="flex items-center gap-2 text-[12px] text-white/40">
                  <User size={12} className="text-white/20" />
                  {order.client.cedula}
                </div>
                <div className="flex items-center gap-2 text-[12px] text-white/40">
                  <Mail size={12} className="text-white/20" />
                  {order.client.email}
                </div>
                <div className="flex items-center gap-2 text-[12px] text-white/40">
                  <Phone size={12} className="text-white/20" />
                  {order.client.phone}
                </div>
              </div>
            </div>
          </div>

          {/* Assignment */}
          <div className="bg-surface-1 border border-white/[0.06] rounded-xl p-4">
            <h3 className="text-[11px] font-semibold text-white/25 uppercase tracking-wider mb-3">Asignado a</h3>
            {order.assignee ? (
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-brand-500/25 flex items-center justify-center text-[11px] font-bold text-brand-300">
                  {order.assignee.avatar}
                </div>
                <div>
                  <div className="text-[13px] font-medium text-white/60">{order.assignee.name}</div>
                  <div className="text-[10px] text-white/25">{order.assignee.role}</div>
                </div>
              </div>
            ) : (
              <button className="w-full flex items-center justify-center gap-2 py-3 rounded-lg border border-dashed border-red-400/20 text-[12px] text-red-400/60 hover:bg-red-400/5 transition-colors">
                <UserPlus size={14} />
                Asignar responsable
              </button>
            )}
          </div>

          {/* Payment */}
          <div className="bg-surface-1 border border-white/[0.06] rounded-xl p-4">
            <h3 className="text-[11px] font-semibold text-white/25 uppercase tracking-wider mb-3">Pago</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-[12px] text-white/35">Total</span>
                <span className="text-[14px] font-bold text-white/70">{formatRD(order.amount)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[12px] text-white/35">Pagado</span>
                <span className="text-[13px] font-semibold text-emerald-400">{formatRD(order.amountPaid)}</span>
              </div>
              {order.amountPaid < order.amount && (
                <div className="flex justify-between">
                  <span className="text-[12px] text-white/35">Pendiente</span>
                  <span className="text-[13px] font-semibold text-amber-400">{formatRD(order.amount - order.amountPaid)}</span>
                </div>
              )}

              {/* Progress bar */}
              <div>
                <div className="w-full h-1.5 bg-white/[0.05] rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${paymentPercent >= 100 ? 'bg-emerald-400' : 'bg-amber-400'}`}
                    style={{ width: `${Math.min(paymentPercent, 100)}%` }}
                  />
                </div>
                <div className="text-[10px] text-white/20 mt-1">{paymentPercent}% pagado · {order.paymentMethod || 'Sin pago'}</div>
              </div>
            </div>
          </div>

          {/* SLA */}
          <div className="bg-surface-1 border border-white/[0.06] rounded-xl p-4">
            <h3 className="text-[11px] font-semibold text-white/25 uppercase tracking-wider mb-3">SLA / Tiempos</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-[12px]">
                <span className="text-white/35">Fecha límite</span>
                <span className={slaOverdue ? 'text-red-400 font-semibold' : 'text-white/50'}>
                  {formatDate(order.dueDate)}
                </span>
              </div>
              <div className="flex justify-between text-[12px]">
                <span className="text-white/35">SLA estimado</span>
                <span className="text-white/50">{order.slaHours}h</span>
              </div>
              <div className="flex justify-between text-[12px]">
                <span className="text-white/35">Tiempo transcurrido</span>
                <span className={`font-semibold ${slaOverdue ? 'text-red-400' : 'text-white/50'}`}>
                  {order.slaUsed}h
                </span>
              </div>

              <div>
                <div className="w-full h-1.5 bg-white/[0.05] rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${
                      slaPercent > 90 ? 'bg-red-400' : slaPercent > 70 ? 'bg-amber-400' : 'bg-emerald-400'
                    }`}
                    style={{ width: `${Math.min(slaPercent, 100)}%` }}
                  />
                </div>
                <div className="text-[10px] text-white/20 mt-1">
                  {slaPercent}% del tiempo utilizado
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
