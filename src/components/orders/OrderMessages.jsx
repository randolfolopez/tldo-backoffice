import { useState, useEffect, useRef } from 'react'
import api from '@/lib/api'

function formatTime(dateStr) {
  return new Date(dateStr).toLocaleTimeString('es-DO', { hour: '2-digit', minute: '2-digit' })
}

export default function OrderMessages({ orderId, messages = [], onMessageSent }) {
  const [text, setText] = useState('')
  const [sending, setSending] = useState(false)
  const bottomRef = useRef(null)

  const list = messages || []

  useEffect(() => {
    if (list.length) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [list.length])

  const handleSend = async (e) => {
    e.preventDefault()
    const trimmed = text.trim()
    if (!trimmed) return

    setSending(true)
    try {
      await api.sendOrderMessage(orderId, { message: trimmed, sender_type: 'team' })
      setText('')
      onMessageSent?.()
    } catch (err) {
      alert(err.message)
    } finally {
      setSending(false)
    }
  }

  // Group messages by date
  const grouped = []
  let lastDate = null
  for (const msg of list) {
    const date = new Date(msg.created_at).toLocaleDateString('es-DO', {
      day: 'numeric', month: 'long', year: 'numeric',
    })
    if (date !== lastDate) {
      grouped.push({ type: 'date', date })
      lastDate = date
    }
    grouped.push({ type: 'msg', ...msg })
  }

  return (
    <div className="flex flex-col" style={{ minHeight: 340 }}>
      {/* Messages area */}
      <div className="flex-1 overflow-y-auto space-y-3 pb-2" style={{ maxHeight: 420 }}>
        {list.length === 0 && (
          <div className="text-center py-10">
            <div className="text-white/10 text-3xl mb-2">💬</div>
            <p className="text-white/20 text-sm">Sin mensajes del portal</p>
            <p className="text-white/10 text-xs mt-1">Los mensajes del cliente aparecerán aquí</p>
          </div>
        )}
        {grouped.map((item, i) => {
          if (item.type === 'date') {
            return (
              <div key={`d-${i}`} className="flex items-center gap-3 py-1">
                <div className="flex-1 border-t border-white/[0.04]" />
                <span className="text-[10px] text-white/20 shrink-0">{item.date}</span>
                <div className="flex-1 border-t border-white/[0.04]" />
              </div>
            )
          }

          const isTeam = item.sender_type === 'admin' || item.sender_type === 'team'

          return (
            <div key={item.id || i} className={`flex ${isTeam ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] rounded-xl px-3.5 py-2.5 ${
                isTeam
                  ? 'bg-blue-500/15 border border-blue-500/20'
                  : 'bg-white/[0.05] border border-white/[0.08]'
              }`}>
                <p className={`text-[10px] mb-1 ${isTeam ? 'text-blue-400/50' : 'text-white/30'}`}>
                  {item.sender_name || (isTeam ? 'Equipo' : 'Cliente')}
                </p>
                <p className="text-sm text-white/80 whitespace-pre-wrap break-words">{item.message}</p>
                <p className={`text-[10px] mt-1.5 text-right ${isTeam ? 'text-blue-400/30' : 'text-white/20'}`}>
                  {formatTime(item.created_at)}
                </p>
              </div>
            </div>
          )
        })}
        <div ref={bottomRef} />
      </div>

      {/* Reply input */}
      <form onSubmit={handleSend} className="flex gap-2 pt-3 border-t border-white/[0.06]">
        <input
          type="text"
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Escribe una respuesta..."
          className="flex-1 bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-blue-500/50"
          disabled={sending}
        />
        <button
          type="submit"
          disabled={sending || !text.trim()}
          className="px-4 py-2 bg-blue-600/20 text-blue-400 text-sm rounded-lg hover:bg-blue-600/30 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          {sending ? 'Enviando...' : 'Enviar'}
        </button>
      </form>
    </div>
  )
}
