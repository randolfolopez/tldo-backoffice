import { useParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  MapPin,
  Star,
  MessageSquare,
  ClipboardList,
  Clock,
  Send,
  PhoneCall,
  MessageCircle,
  MoreHorizontal,
  Award,
  TrendingUp,
  Calendar,
  Tag,
} from 'lucide-react'
import StatusBadge from '@/components/ui/StatusBadge'
import { formatRD, formatDate, cn } from '@/lib/utils'
import { clients, sourceLabels } from '@/lib/mock-clients'

const commIcons = {
  email: Mail,
  whatsapp: MessageCircle,
  call: PhoneCall,
}

const commColors = {
  email: 'text-blue-400 bg-blue-400/10',
  whatsapp: 'text-emerald-400 bg-emerald-400/10',
  call: 'text-amber-400 bg-amber-400/10',
}

const tierConfig = {
  gold: { label: 'Oro', icon: '🥇', bg: 'bg-amber-400/10', color: 'text-amber-400', border: 'border-amber-400/20' },
  silver: { label: 'Plata', icon: '🥈', bg: 'bg-gray-300/10', color: 'text-gray-300', border: 'border-gray-300/20' },
  bronze: { label: 'Bronce', icon: '🥉', bg: 'bg-orange-400/10', color: 'text-orange-400', border: 'border-orange-400/20' },
}

export default function ClientDetailPage() {
  const { clientId } = useParams()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('orders')
  const [newNote, setNewNote] = useState('')

  const client = clients.find((c) => c.id === clientId)

  if (!client) {
    return (
      <div className="text-center py-20">
        <p className="text-white/30 text-lg mb-4">Cliente no encontrado</p>
        <button onClick={() => navigate('/clientes')} className="text-brand-300 text-sm hover:underline">
          ← Volver a clientes
        </button>
      </div>
    )
  }

  const tier = tierConfig[client.tier]
  const source = sourceLabels[client.source]

  return (
    <div>
      {/* Back + actions */}
      <div className="flex items-center justify-between mb-5">
        <button
          onClick={() => navigate('/clientes')}
          className="flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors"
        >
          <ArrowLeft size={16} />
          Clientes
        </button>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 bg-surface-2 border border-white/[0.08] hover:border-white/[0.15] text-white/50 text-[12px] font-medium px-3 py-2 rounded-lg transition-colors">
            <MessageCircle size={14} />
            WhatsApp
          </button>
          <button className="flex items-center gap-2 bg-surface-2 border border-white/[0.08] hover:border-white/[0.15] text-white/50 text-[12px] font-medium px-3 py-2 rounded-lg transition-colors">
            <Mail size={14} />
            Email
          </button>
          <button className="p-2 rounded-lg border border-white/[0.06] hover:bg-white/[0.03] transition-colors">
            <MoreHorizontal size={16} className="text-white/30" />
          </button>
        </div>
      </div>

      {/* Header card */}
      <div className="bg-surface-1 border border-white/[0.06] rounded-xl p-5 mb-4">
        <div className="flex items-start gap-5">
          <div className="w-16 h-16 rounded-2xl bg-brand-600/20 flex items-center justify-center text-xl font-bold text-brand-300 flex-shrink-0">
            {client.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-xl font-bold text-white">{client.name}</h1>
              {client.tags.includes('VIP') && (
                <span className="flex items-center gap-1 text-[10px] font-bold bg-amber-400/10 text-amber-400 px-2 py-0.5 rounded">
                  <Star size={10} className="fill-amber-400" /> VIP
                </span>
              )}
              {tier && (
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${tier.bg} ${tier.color}`}>
                  {tier.icon} {tier.label}
                </span>
              )}
            </div>
            <p className="text-sm text-white/40">
              {client.type === 'juridica' ? 'Persona Jurídica' : 'Persona Física'} · {client.cedula}
            </p>
            <div className="flex items-center gap-4 mt-3">
              {client.tags.filter(t => t !== 'VIP').map((tag, i) => (
                <span key={i} className="flex items-center gap-1 text-[10px] bg-white/[0.04] text-white/30 px-2 py-0.5 rounded">
                  <Tag size={9} /> {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Quick stats */}
          <div className="flex gap-6 text-center flex-shrink-0">
            <div>
              <div className="text-xl font-bold text-white">{client.totalOrders}</div>
              <div className="text-[10px] text-white/25 font-medium uppercase tracking-wider">Órdenes</div>
            </div>
            <div>
              <div className="text-xl font-bold text-emerald-400">{formatRD(client.totalSpent)}</div>
              <div className="text-[10px] text-white/25 font-medium uppercase tracking-wider">Facturado</div>
            </div>
            <div>
              <div className="text-xl font-bold text-brand-300">{client.points}</div>
              <div className="text-[10px] text-white/25 font-medium uppercase tracking-wider">Puntos</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-3 gap-4">
        {/* Left: tabbed content */}
        <div className="col-span-2 space-y-4">
          {/* Tabs */}
          <div className="flex gap-1 bg-surface-1 border border-white/[0.06] rounded-xl p-1.5">
            {[
              { key: 'orders', label: `Órdenes (${client.orders.length})`, icon: ClipboardList },
              { key: 'comms', label: `Comunicaciones (${client.communications.length})`, icon: MessageSquare },
              { key: 'notes', label: `Notas (${client.notes.length})`, icon: MessageSquare },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={cn(
                  'flex items-center gap-2 px-4 py-2 rounded-lg text-[12px] font-medium transition-colors',
                  activeTab === tab.key ? 'bg-brand-300/10 text-brand-300' : 'text-white/30 hover:text-white/50'
                )}
              >
                <tab.icon size={14} />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Orders */}
          {activeTab === 'orders' && (
            <div className="bg-surface-1 border border-white/[0.06] rounded-xl overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/[0.06]">
                    {['Orden', 'Trámite', 'Estado', 'Monto', 'Fecha'].map((h, i) => (
                      <th key={i} className="text-[10px] font-semibold text-white/25 uppercase tracking-wider px-5 py-2.5 text-left">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {client.orders.map((order) => (
                    <tr
                      key={order.id}
                      onClick={() => navigate(`/ordenes/${order.id}`)}
                      className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors cursor-pointer"
                    >
                      <td className="px-5 py-3">
                        <span className="text-[12px] font-mono font-semibold text-brand-300">{order.id}</span>
                      </td>
                      <td className="px-5 py-3 text-[13px] text-white/50">{order.tramite}</td>
                      <td className="px-5 py-3"><StatusBadge status={order.status} /></td>
                      <td className="px-5 py-3 text-[13px] font-semibold text-white/60">{formatRD(order.amount)}</td>
                      <td className="px-5 py-3 text-[12px] text-white/30">{formatDate(order.date)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {client.orders.length === 0 && (
                <div className="p-10 text-center text-sm text-white/20">Sin órdenes registradas</div>
              )}
            </div>
          )}

          {/* Communications */}
          {activeTab === 'comms' && (
            <div className="bg-surface-1 border border-white/[0.06] rounded-xl p-5">
              <div className="space-y-0">
                {client.communications.length === 0 ? (
                  <p className="text-center text-sm text-white/20 py-10">Sin comunicaciones registradas</p>
                ) : (
                  client.communications.map((comm, i) => {
                    const Icon = commIcons[comm.type] || Mail
                    const colorClass = commColors[comm.type] || commColors.email
                    const isLast = i === client.communications.length - 1
                    const isInbound = comm.direction === 'inbound'
                    return (
                      <div key={i} className="flex gap-3">
                        <div className="flex flex-col items-center">
                          <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${colorClass}`}>
                            <Icon size={13} />
                          </div>
                          {!isLast && <div className="w-px flex-1 bg-white/[0.06] my-1" />}
                        </div>
                        <div className={cn('pb-5 flex-1', isLast && 'pb-0')}>
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`text-[10px] font-semibold uppercase tracking-wider ${isInbound ? 'text-emerald-400/60' : 'text-white/25'}`}>
                              {isInbound ? '← Entrante' : '→ Saliente'}
                            </span>
                            <span className="text-[10px] text-white/15">{comm.date}</span>
                          </div>
                          <p className="text-[13px] text-white/55 leading-relaxed">{comm.message}</p>
                          <span className="text-[10px] text-white/20 mt-1 block">{comm.user}</span>
                        </div>
                      </div>
                    )
                  })
                )}
              </div>
            </div>
          )}

          {/* Notes */}
          {activeTab === 'notes' && (
            <div className="bg-surface-1 border border-white/[0.06] rounded-xl p-5">
              <div className="mb-5">
                <div className="flex gap-3">
                  <div className="w-7 h-7 rounded-full bg-brand-500/25 flex items-center justify-center text-[9px] font-bold text-brand-300 flex-shrink-0 mt-1">AD</div>
                  <div className="flex-1">
                    <textarea
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                      placeholder="Agregar nota sobre este cliente..."
                      rows={3}
                      className="w-full bg-surface-2 border border-white/[0.06] rounded-lg px-3 py-2.5 text-[13px] text-white/70 placeholder:text-white/20 outline-none resize-none focus:border-brand-300/30 transition-colors"
                    />
                    <div className="flex justify-end mt-2">
                      <button disabled={!newNote.trim()} className="flex items-center gap-1.5 bg-brand-300 disabled:bg-white/10 text-brand-900 disabled:text-white/20 text-[12px] font-semibold px-3 py-1.5 rounded-lg transition-colors">
                        <Send size={12} /> Agregar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                {client.notes.length === 0 ? (
                  <p className="text-center text-sm text-white/20 py-6">Sin notas</p>
                ) : (
                  client.notes.map((note, i) => (
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

        {/* Right: info panels */}
        <div className="space-y-4">
          {/* Contact info */}
          <div className="bg-surface-1 border border-white/[0.06] rounded-xl p-4">
            <h3 className="text-[11px] font-semibold text-white/25 uppercase tracking-wider mb-3">Información de Contacto</h3>
            <div className="space-y-2.5">
              <div className="flex items-center gap-2.5 text-[12px] text-white/45">
                <Mail size={13} className="text-white/20 flex-shrink-0" />
                <span className="truncate">{client.email}</span>
              </div>
              <div className="flex items-center gap-2.5 text-[12px] text-white/45">
                <Phone size={13} className="text-white/20 flex-shrink-0" />
                {client.phone}
              </div>
              <div className="flex items-center gap-2.5 text-[12px] text-white/45">
                <MessageCircle size={13} className="text-emerald-400/40 flex-shrink-0" />
                {client.whatsapp}
              </div>
              <div className="flex items-start gap-2.5 text-[12px] text-white/45">
                <MapPin size={13} className="text-white/20 flex-shrink-0 mt-0.5" />
                <span>{client.address}</span>
              </div>
            </div>
          </div>

          {/* Account details */}
          <div className="bg-surface-1 border border-white/[0.06] rounded-xl p-4">
            <h3 className="text-[11px] font-semibold text-white/25 uppercase tracking-wider mb-3">Cuenta</h3>
            <div className="space-y-2.5">
              <div className="flex justify-between text-[12px]">
                <span className="text-white/35">Segmento</span>
                <span className="text-white/55 capitalize">{client.segment === 'b2c' ? 'Personal' : client.segment}</span>
              </div>
              <div className="flex justify-between text-[12px]">
                <span className="text-white/35">Canal de origen</span>
                <span className="text-white/55 flex items-center gap-1.5">
                  {source && <span className="w-1.5 h-1.5 rounded-full" style={{ background: source.color }} />}
                  {source?.label || client.source}
                </span>
              </div>
              <div className="flex justify-between text-[12px]">
                <span className="text-white/35">Responsable</span>
                <span className="text-white/55">{client.assignee}</span>
              </div>
              <div className="flex justify-between text-[12px]">
                <span className="text-white/35">Cliente desde</span>
                <span className="text-white/55">{formatDate(client.createdAt)}</span>
              </div>
              <div className="flex justify-between text-[12px]">
                <span className="text-white/35">Última actividad</span>
                <span className="text-white/55">{formatDate(client.lastActivity)}</span>
              </div>
            </div>
          </div>

          {/* Loyalty */}
          <div className={`bg-surface-1 border rounded-xl p-4 ${tier?.border || 'border-white/[0.06]'}`}>
            <h3 className="text-[11px] font-semibold text-white/25 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Award size={12} /> Fidelización
            </h3>
            <div className="text-center mb-3">
              <div className="text-3xl mb-1">{tier?.icon}</div>
              <div className={`text-sm font-bold ${tier?.color || 'text-white/40'}`}>Nivel {tier?.label}</div>
              <div className="text-[11px] text-white/25 mt-1">{client.points} puntos acumulados</div>
            </div>
            <div className="w-full h-1.5 bg-white/[0.05] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-brand-500 to-brand-300"
                style={{ width: `${Math.min((client.points / 500) * 100, 100)}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-white/20 mt-1.5">
              <span>{client.points} pts</span>
              <span>{client.tier === 'gold' ? 'Máximo nivel' : `${500 - client.points} pts para siguiente nivel`}</span>
            </div>
          </div>

          {/* Quick actions */}
          <div className="bg-surface-1 border border-white/[0.06] rounded-xl p-4">
            <h3 className="text-[11px] font-semibold text-white/25 uppercase tracking-wider mb-3">Acciones Rápidas</h3>
            <div className="space-y-1.5">
              <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[12px] text-white/40 hover:text-white/70 hover:bg-white/[0.03] transition-colors text-left">
                <ClipboardList size={14} /> Crear nueva orden
              </button>
              <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[12px] text-white/40 hover:text-white/70 hover:bg-white/[0.03] transition-colors text-left">
                <Calendar size={14} /> Programar seguimiento
              </button>
              <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[12px] text-white/40 hover:text-white/70 hover:bg-white/[0.03] transition-colors text-left">
                <TrendingUp size={14} /> Ofrecer iguala
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
