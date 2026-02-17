import { useState } from 'react'
import { useApi } from '@/lib/hooks'
import api from '@/lib/api'
import { useAuth } from '@/lib/AuthContext'

const roleLabels = {
  superadmin: 'Super Admin',
  admin: 'Administrador',
  abogado_senior: 'Abogado Senior',
  abogado: 'Abogado',
  paralegal: 'Paralegal',
  assistant: 'Asistente',
}
const isAdmin = (role) => ['superadmin', 'admin'].includes(role)

export default function TeamPage() {
  const { user } = useAuth()
  const { data: team, loading, error, refetch } = useApi(() => api.getTeam())
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({ name: '', email: '', role: 'abogado', specialty: '', phone: '', password: '' })
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')

  const resetForm = () => {
    setForm({ name: '', email: '', role: 'abogado', specialty: '', phone: '', password: '' })
    setEditing(null)
    setShowForm(false)
  }

  const startEdit = (m) => {
    setForm({ name: m.name || '', email: m.email || '', role: m.role || 'abogado', specialty: m.specialty || '', phone: m.phone || '', password: '' })
    setEditing(m.id)
    setShowForm(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true); setMsg('')
    try {
      if (editing) {
        const payload = { ...form }
        if (!payload.password) delete payload.password
        await api.updateUser(editing, payload)
        setMsg('Miembro actualizado')
      } else {
        if (!form.password) { setMsg('La contraseña es requerida'); setSaving(false); return }
        await api.createUser(form)
        setMsg('Miembro creado')
      }
      resetForm()
      refetch()
      setTimeout(() => setMsg(''), 3000)
    } catch (err) { setMsg('Error: ' + err.message) }
    finally { setSaving(false) }
  }

  const toggleActive = async (m) => {
    try {
      await api.updateUser(m.id, { active: !m.active })
      refetch()
    } catch (err) { alert(err.message) }
  }

  const members = team || []
  const canManage = isAdmin(user?.role)

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">Equipo</h1>
          <p className="text-white/40 text-sm mt-0.5">{members.length} miembros</p>
        </div>
        {canManage && (
          <button onClick={() => { if (showForm) resetForm(); else setShowForm(true) }}
            className="px-4 py-2 bg-blue-600/20 text-blue-400 rounded-lg text-sm hover:bg-blue-600/30">
            {showForm ? 'Cancelar' : '+ Nuevo miembro'}
          </button>
        )}
      </div>

      {msg && <div className={`text-sm px-4 py-2 rounded-lg ${msg.startsWith('Error') ? 'bg-red-500/10 text-red-400' : 'bg-green-500/10 text-green-400'}`}>{msg}</div>}

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5 space-y-3">
          <h3 className="text-sm font-semibold text-white mb-2">{editing ? 'Editar miembro' : 'Nuevo miembro'}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input type="text" placeholder="Nombre completo" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required
              className="bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-blue-500/50" />
            <input type="email" placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required
              className="bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-blue-500/50" />
            <select value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}
              className="bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-white/70 focus:outline-none">
              {Object.entries(roleLabels).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
            </select>
            <input type="text" placeholder="Especialidad" value={form.specialty} onChange={e => setForm({ ...form, specialty: e.target.value })}
              className="bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-blue-500/50" />
            <input type="text" placeholder="Teléfono" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
              className="bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-blue-500/50" />
            <input type="password" placeholder={editing ? 'Nueva contraseña (vacío = no cambiar)' : 'Contraseña'} value={form.password} onChange={e => setForm({ ...form, password: e.target.value })}
              {...(!editing && { required: true, minLength: 6 })}
              className="bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-blue-500/50" />
          </div>
          <div className="flex gap-2">
            <button type="submit" disabled={saving}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-500 disabled:opacity-50">
              {saving ? 'Guardando...' : editing ? 'Guardar cambios' : 'Crear miembro'}
            </button>
            {editing && <button type="button" onClick={resetForm} className="px-4 py-2 text-white/40 text-sm hover:text-white/60">Cancelar</button>}
          </div>
        </form>
      )}

      {loading ? <div className="text-white/40 text-sm py-8 text-center">Cargando...</div> :
      error ? <div className="text-red-400 text-sm py-8 text-center">Error: {error}</div> : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {members.map(m => (
            <div key={m.id} className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-white/10 flex items-center justify-center text-xs font-bold text-white/60">
                  {m.initials || m.name?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white/90 truncate">{m.name}</p>
                  <p className="text-[10px] text-white/30">{roleLabels[m.role] || m.role}</p>
                </div>
                {canManage && m.id !== user?.id && (
                  <button onClick={() => toggleActive(m)} title={m.active !== false ? 'Desactivar' : 'Activar'}
                    className={`w-2.5 h-2.5 rounded-full ${m.active !== false ? 'bg-green-400' : 'bg-red-400'} hover:ring-2 ring-white/20 transition-all`} />
                )}
              </div>
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between"><span className="text-white/30">Email</span><span className="text-white/50 truncate ml-2">{m.email}</span></div>
                {m.specialty && <div className="flex justify-between"><span className="text-white/30">Especialidad</span><span className="text-white/50 truncate ml-2">{m.specialty}</span></div>}
                {m.phone && <div className="flex justify-between"><span className="text-white/30">Teléfono</span><span className="text-white/50">{m.phone}</span></div>}
                <div className="flex justify-between"><span className="text-white/30">Estado</span>
                  <span className={m.active !== false ? 'text-green-400' : 'text-red-400'}>{m.active !== false ? 'Activo' : 'Inactivo'}</span>
                </div>
              </div>
              {canManage && (
                <button onClick={() => startEdit(m)}
                  className="mt-3 w-full text-center text-xs text-blue-400/60 hover:text-blue-400 py-1.5 border border-white/[0.04] rounded-lg hover:border-blue-500/20 transition-colors">
                  Editar
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
