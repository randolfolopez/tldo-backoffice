import { useState } from 'react'
import { useApi } from '@/lib/hooks'
import { useAuth } from '@/lib/AuthContext'
import api from '@/lib/api'

export default function SettingsPage() {
  const { user } = useAuth()
  const { data: settings, loading, error, refetch } = useApi(() => api.getSettings())
  const [editKey, setEditKey] = useState(null)
  const [editVal, setEditVal] = useState('')
  const [saving, setSaving] = useState(false)

  const startEdit = (key, value) => { setEditKey(key); setEditVal(value || '') }
  const cancelEdit = () => { setEditKey(null); setEditVal('') }

  const saveEdit = async () => {
    setSaving(true)
    try {
      await api.updateSetting(editKey, editVal)
      cancelEdit()
      refetch()
    } catch (err) { alert(err.message) }
    finally { setSaving(false) }
  }

  const [pwForm, setPwForm] = useState({ current: '', newPw: '', confirm: '' })
  const [pwMsg, setPwMsg] = useState('')

  const changePassword = async (e) => {
    e.preventDefault()
    if (pwForm.newPw !== pwForm.confirm) { setPwMsg('Las contraseñas no coinciden'); return }
    try {
      await api.post('/api/auth/change-password', { current_password: pwForm.current, new_password: pwForm.newPw })
      setPwForm({ current: '', newPw: '', confirm: '' })
      setPwMsg('Contraseña actualizada')
    } catch (err) { setPwMsg(err.message) }
  }

  const settingsArr = Array.isArray(settings) ? settings : []

  const defaultSettings = [
    { key: 'company_name', label: 'Nombre de empresa' },
    { key: 'company_rnc', label: 'RNC' },
    { key: 'company_email', label: 'Email de contacto' },
    { key: 'company_phone', label: 'Teléfono' },
    { key: 'company_address', label: 'Dirección' },
    { key: 'itbis_rate', label: 'Tasa ITBIS (%)' },
    { key: 'invoice_prefix', label: 'Prefijo de factura' },
    { key: 'order_prefix', label: 'Prefijo de orden' },
  ]

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-xl font-bold text-white">Configuración</h1>
        <p className="text-white/40 text-sm mt-0.5">Configuración general del sistema</p>
      </div>

      {/* Company settings */}
      <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl">
        <div className="p-4 border-b border-white/[0.06]">
          <h2 className="text-sm font-semibold text-white">Datos de la Empresa</h2>
        </div>
        {loading ? <div className="p-4 text-white/40 text-sm">Cargando...</div> : (
          <div className="divide-y divide-white/[0.04]">
            {defaultSettings.map(ds => {
              const current = settingsArr.find(s => s.key === ds.key)
              const val = current?.value || ''
              return (
                <div key={ds.key} className="flex items-center justify-between px-4 py-3">
                  <div>
                    <p className="text-sm text-white/70">{ds.label}</p>
                    {editKey === ds.key ? (
                      <div className="flex items-center gap-2 mt-1">
                        <input type="text" value={editVal} onChange={e => setEditVal(e.target.value)}
                          className="bg-white/[0.04] border border-white/[0.08] rounded px-2 py-1 text-xs text-white focus:outline-none focus:border-blue-500/50 w-48" autoFocus />
                        <button onClick={saveEdit} disabled={saving} className="text-[10px] px-2 py-1 rounded bg-blue-500/20 text-blue-400">Guardar</button>
                        <button onClick={cancelEdit} className="text-[10px] px-2 py-1 rounded text-white/30">Cancelar</button>
                      </div>
                    ) : (
                      <p className="text-xs text-white/30 mt-0.5">{val || '(no definido)'}</p>
                    )}
                  </div>
                  {editKey !== ds.key && (
                    <button onClick={() => startEdit(ds.key, val)} className="text-[10px] text-white/30 hover:text-white/60">Editar</button>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Change password */}
      <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl">
        <div className="p-4 border-b border-white/[0.06]">
          <h2 className="text-sm font-semibold text-white">Cambiar Contraseña</h2>
        </div>
        <form onSubmit={changePassword} className="p-4 space-y-3 max-w-sm">
          {pwMsg && <p className={`text-xs ${pwMsg.includes('actualizada') ? 'text-green-400' : 'text-red-400'}`}>{pwMsg}</p>}
          <input type="password" placeholder="Contraseña actual" value={pwForm.current} onChange={e => setPwForm({ ...pwForm, current: e.target.value })} required
            className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-blue-500/50" />
          <input type="password" placeholder="Nueva contraseña" value={pwForm.newPw} onChange={e => setPwForm({ ...pwForm, newPw: e.target.value })} required minLength={6}
            className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-blue-500/50" />
          <input type="password" placeholder="Confirmar nueva contraseña" value={pwForm.confirm} onChange={e => setPwForm({ ...pwForm, confirm: e.target.value })} required
            className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-blue-500/50" />
          <button type="submit" className="px-4 py-2 bg-blue-600/20 text-blue-400 rounded-lg text-sm hover:bg-blue-600/30">Cambiar contraseña</button>
        </form>
      </div>

      {/* User info */}
      <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5">
        <h3 className="text-xs text-white/40 uppercase tracking-wider mb-3">Sesión Activa</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between"><span className="text-white/30">Usuario</span><span className="text-white/70">{user?.name}</span></div>
          <div className="flex justify-between"><span className="text-white/30">Email</span><span className="text-white/70">{user?.email}</span></div>
          <div className="flex justify-between"><span className="text-white/30">Rol</span><span className="text-white/70 capitalize">{user?.role}</span></div>
        </div>
      </div>
    </div>
  )
}
