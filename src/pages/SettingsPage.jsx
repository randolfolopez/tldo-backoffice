import { useState, useEffect } from 'react'
import { useApi } from '@/lib/hooks'
import { useAuth } from '@/lib/AuthContext'
import api from '@/lib/api'

export default function SettingsPage() {
  const { user } = useAuth()
  const { data: settings, loading, error, refetch } = useApi(() => api.getSettings())
  const [company, setCompany] = useState({ name: '', rnc: '', phone: '', email: '', address: '' })
  const [billing, setBilling] = useState({ tax_rate: 18, currency: 'DOP', ncf_prefix: 'B01' })
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')

  useEffect(() => {
    if (settings) {
      if (settings.company) setCompany(settings.company)
      if (settings.billing) setBilling(settings.billing)
    }
  }, [settings])

  const saveCompany = async () => {
    setSaving(true); setMsg('')
    try {
      await api.put('/api/settings/company', { value: company })
      setMsg('Datos de empresa guardados')
      setTimeout(() => setMsg(''), 3000)
    } catch (err) { setMsg('Error: ' + err.message) }
    finally { setSaving(false) }
  }

  const saveBilling = async () => {
    setSaving(true); setMsg('')
    try {
      await api.put('/api/settings/billing', { value: billing })
      setMsg('Configuración de facturación guardada')
      setTimeout(() => setMsg(''), 3000)
    } catch (err) { setMsg('Error: ' + err.message) }
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

  if (loading) return <div className="p-8 text-white/40">Cargando configuración...</div>
  if (error) return <div className="p-8 text-red-400">Error: {error}</div>

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-xl font-bold text-white">Configuración</h1>
        <p className="text-white/40 text-sm mt-0.5">Configuración general del sistema</p>
      </div>

      {msg && <div className={`text-sm px-4 py-2 rounded-lg ${msg.startsWith('Error') ? 'bg-red-500/10 text-red-400' : 'bg-green-500/10 text-green-400'}`}>{msg}</div>}

      {/* Company */}
      <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl">
        <div className="flex items-center justify-between p-4 border-b border-white/[0.06]">
          <h2 className="text-sm font-semibold text-white">Datos de la Empresa</h2>
          <button onClick={saveCompany} disabled={saving} className="px-3 py-1.5 bg-blue-600/20 text-blue-400 rounded-lg text-xs hover:bg-blue-600/30 disabled:opacity-50">
            {saving ? 'Guardando...' : 'Guardar'}
          </button>
        </div>
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { key: 'name', label: 'Nombre de empresa' },
            { key: 'rnc', label: 'RNC' },
            { key: 'email', label: 'Email de contacto' },
            { key: 'phone', label: 'Teléfono' },
            { key: 'address', label: 'Dirección' },
          ].map(f => (
            <div key={f.key}>
              <label className="block text-white/40 text-xs mb-1">{f.label}</label>
              <input type="text" value={company[f.key] || ''} onChange={e => setCompany({ ...company, [f.key]: e.target.value })}
                className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-blue-500/50" />
            </div>
          ))}
        </div>
      </div>

      {/* Billing */}
      <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl">
        <div className="flex items-center justify-between p-4 border-b border-white/[0.06]">
          <h2 className="text-sm font-semibold text-white">Facturación</h2>
          <button onClick={saveBilling} disabled={saving} className="px-3 py-1.5 bg-blue-600/20 text-blue-400 rounded-lg text-xs hover:bg-blue-600/30 disabled:opacity-50">
            {saving ? 'Guardando...' : 'Guardar'}
          </button>
        </div>
        <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <label className="block text-white/40 text-xs mb-1">Tasa ITBIS (%)</label>
            <input type="number" value={billing.tax_rate || ''} onChange={e => setBilling({ ...billing, tax_rate: Number(e.target.value) })}
              className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500/50" />
          </div>
          <div>
            <label className="block text-white/40 text-xs mb-1">Moneda</label>
            <input type="text" value={billing.currency || ''} onChange={e => setBilling({ ...billing, currency: e.target.value })}
              className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500/50" />
          </div>
          <div>
            <label className="block text-white/40 text-xs mb-1">Prefijo NCF</label>
            <input type="text" value={billing.ncf_prefix || ''} onChange={e => setBilling({ ...billing, ncf_prefix: e.target.value })}
              className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500/50" />
          </div>
        </div>
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

      {/* Session info */}
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
