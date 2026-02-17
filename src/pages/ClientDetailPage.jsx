import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useApi } from '@/lib/hooks'
import api from '@/lib/api'
import { formatRD, formatDate } from '@/lib/utils'

export default function ClientDetailPage() {
  const { clientId } = useParams()
  const navigate = useNavigate()
  const { data: client, loading, error, refetch } = useApi(() => api.getClient(clientId), [clientId])
  const [noteText, setNoteText] = useState('')
  const [saving, setSaving] = useState(false)

  const addNote = async () => {
    if (!noteText.trim()) return
    setSaving(true)
    try {
      await api.addClientNote(client.id, { text: noteText })
      setNoteText('')
      refetch()
    } catch (err) { alert(err.message) }
    finally { setSaving(false) }
  }

  if (loading) return <div className="p-8 text-white/40">Cargando cliente...</div>
  if (error) return <div className="p-8 text-red-400">Error: {error}</div>
  if (!client) return null

  return (
    <div className="p-6 space-y-6">
      <div>
        <button onClick={() => navigate('/clientes')} className="text-white/40 text-xs hover:text-white/60 mb-1">← Volver a clientes</button>
        <h1 className="text-xl font-bold text-white">{client.name}</h1>
        <p className="text-white/40 text-sm">{client.display_id} · {client.type === 'juridica' ? 'Persona Jurídica' : 'Persona Física'} · Tier: <span className="capitalize">{client.tier}</span></p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {/* Contact Info */}
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5">
            <h3 className="text-xs text-white/40 uppercase tracking-wider mb-4">Información de Contacto</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div><span className="text-white/30">Cédula/RNC:</span><p className="text-white/80 mt-0.5">{client.cedula || '—'}</p></div>
              <div><span className="text-white/30">Email:</span><p className="text-white/80 mt-0.5">{client.email || '—'}</p></div>
              <div><span className="text-white/30">Teléfono:</span><p className="text-white/80 mt-0.5">{client.phone || '—'}</p></div>
              <div><span className="text-white/30">WhatsApp:</span><p className="text-white/80 mt-0.5">{client.whatsapp || '—'}</p></div>
              <div><span className="text-white/30">Dirección:</span><p className="text-white/80 mt-0.5">{client.address || '—'}</p></div>
              <div><span className="text-white/30">Fuente:</span><p className="text-white/80 mt-0.5 capitalize">{client.source || '—'}</p></div>
            </div>
          </div>

          {/* Orders */}
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5">
            <h3 className="text-xs text-white/40 uppercase tracking-wider mb-3">Órdenes ({(client.orders || []).length})</h3>
            <div className="divide-y divide-white/[0.04]">
              {(client.orders || []).map((o, i) => (
                <div key={i} className="flex items-center justify-between py-2.5 cursor-pointer hover:bg-white/[0.02] -mx-2 px-2 rounded" onClick={() => navigate(`/ordenes/${o.display_id}`)}>
                  <div>
                    <span className="text-xs font-mono text-white/40">{o.display_id}</span>
                    <span className="text-sm text-white/70 ml-2">{o.service_name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-white/30 capitalize">{o.status}</span>
                    <span className="text-sm text-white/60">{formatRD(o.amount)}</span>
                  </div>
                </div>
              ))}
              {(!client.orders || client.orders.length === 0) && <p className="text-white/20 text-sm py-2">Sin órdenes</p>}
            </div>
          </div>

          {/* Notes */}
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5">
            <h3 className="text-xs text-white/40 uppercase tracking-wider mb-3">Notas</h3>
            <div className="flex gap-2 mb-3">
              <input type="text" value={noteText} onChange={e => setNoteText(e.target.value)} placeholder="Agregar nota..."
                className="flex-1 bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-blue-500/50"
                onKeyDown={e => e.key === 'Enter' && addNote()} />
              <button onClick={addNote} disabled={saving}
                className="px-4 py-2 bg-blue-600/20 text-blue-400 rounded-lg text-sm hover:bg-blue-600/30 disabled:opacity-50">Agregar</button>
            </div>
            <div className="space-y-2">
              {(client.notes || []).map((n, i) => (
                <div key={i} className="bg-white/[0.02] rounded-lg p-3">
                  <p className="text-sm text-white/70">{n.text}</p>
                  <p className="text-[10px] text-white/30 mt-1">{n.user_name} · {formatDate(n.created_at)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5">
            <h3 className="text-xs text-white/40 uppercase tracking-wider mb-3">Resumen</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-white/30">Segmento</span><span className="text-white/70 capitalize">{client.segment || '—'}</span></div>
              <div className="flex justify-between"><span className="text-white/30">Asignado</span><span className="text-white/70">{client.assignee_name || 'Sin asignar'}</span></div>
              <div className="flex justify-between"><span className="text-white/30">Puntos</span><span className="text-white/70">{client.points || 0}</span></div>
              <div className="flex justify-between"><span className="text-white/30">Cliente desde</span><span className="text-white/70">{formatDate(client.created_at)}</span></div>
            </div>
          </div>

          {/* Invoices */}
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5">
            <h3 className="text-xs text-white/40 uppercase tracking-wider mb-3">Facturas</h3>
            {(client.invoices || []).length > 0 ? client.invoices.map((inv, i) => (
              <div key={i} className="flex justify-between py-2 border-b border-white/[0.04] last:border-0">
                <span className="text-xs text-white/50">{inv.display_id}</span>
                <span className="text-sm text-white/70">{formatRD(inv.total)}</span>
              </div>
            )) : <p className="text-white/20 text-sm">Sin facturas</p>}
          </div>

          {/* Communications */}
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5">
            <h3 className="text-xs text-white/40 uppercase tracking-wider mb-3">Comunicaciones</h3>
            {(client.communications || []).length > 0 ? client.communications.slice(0, 5).map((c, i) => (
              <div key={i} className="py-2 border-b border-white/[0.04] last:border-0">
                <div className="flex items-center gap-2"><span className="text-xs text-white/40 capitalize">{c.type}</span><span className="text-[10px] text-white/20">{c.direction}</span></div>
                <p className="text-sm text-white/60 mt-0.5 line-clamp-2">{c.message}</p>
              </div>
            )) : <p className="text-white/20 text-sm">Sin comunicaciones</p>}
          </div>
        </div>
      </div>
    </div>
  )
}
