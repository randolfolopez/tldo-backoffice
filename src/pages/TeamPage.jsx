import { useState } from 'react'
import { useApi } from '@/lib/hooks'
import api from '@/lib/api'
import { useAuth } from '@/lib/AuthContext'

const roleLabels = { admin: 'Administrador', lawyer: 'Abogado', paralegal: 'Paralegal', assistant: 'Asistente' }

export default function TeamPage() {
  const { user } = useAuth()
  const { data: team, loading, error, refetch } = useApi(() => api.getTeam())
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', role: 'assistant', password: '' })
  const [saving, setSaving] = useState(false)

  const handleCreate = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      await api.createUser(form)
      setForm({ name: '', email: '', role: 'assistant', password: '' })
      setShowForm(false)
      refetch()
    } catch (err) { alert(err.message) }
    finally { setSaving(false) }
  }

  const members = team || []

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">Equipo</h1>
          <p className="text-white/40 text-sm mt-0.5">{members.length} miembros</p>
        </div>
        {user?.role === 'admin' && (
          <button onClick={() => setShowForm(!showForm)}
            className="px-4 py-2 bg-blue-600/20 text-blue-400 rounded-lg text-sm hover:bg-blue-600/30">
            {showForm ? 'Cancelar' : '+ Nuevo miembro'}
          </button>
        )}
      </div>

      {showForm && (
        <form onSubmit={handleCreate} className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <input type="text" placeholder="Nombre completo" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required
              className="bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-blue-500/50" />
            <input type="email" placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required
              className="bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-blue-500/50" />
            <select value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}
              className="bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-white/70 focus:outline-none">
              {Object.entries(roleLabels).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
            </select>
            <input type="password" placeholder="Contraseña" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required minLength={6}
              className="bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-blue-500/50" />
          </div>
          <button type="submit" disabled={saving}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-500 disabled:opacity-50">
            {saving ? 'Creando...' : 'Crear miembro'}
          </button>
        </form>
      )}

      {loading ? <div className="text-white/40 text-sm py-8 text-center">Cargando...</div> :
      error ? <div className="text-red-400 text-sm py-8 text-center">Error: {error}</div> : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {members.map(m => (
            <div key={m.id} className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-white/10 flex items-center justify-center text-xs font-bold text-white/60">
                  {m.name?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white/90">{m.name}</p>
                  <p className="text-[10px] text-white/30">{roleLabels[m.role] || m.role}</p>
                </div>
              </div>
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between"><span className="text-white/30">Email</span><span className="text-white/50">{m.email}</span></div>
                <div className="flex justify-between"><span className="text-white/30">Estado</span>
                  <span className={m.is_active ? 'text-green-400' : 'text-red-400'}>{m.is_active ? 'Activo' : 'Inactivo'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
