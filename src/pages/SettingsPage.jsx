import { useState } from 'react'
import { Settings, Building2, CreditCard, Bell, Shield, Plug, Database, Globe, Mail, MessageCircle, FileText, ChevronRight, CheckCircle, AlertCircle, ExternalLink } from 'lucide-react'
import { cn } from '@/lib/utils'

const sections = [
  { key: 'company', label: 'Empresa', icon: Building2 },
  { key: 'integrations', label: 'Integraciones', icon: Plug },
  { key: 'notifications', label: 'Notificaciones', icon: Bell },
  { key: 'billing', label: 'Facturación NCF', icon: CreditCard },
  { key: 'security', label: 'Seguridad', icon: Shield },
  { key: 'data', label: 'Datos y Backup', icon: Database },
]

const integrations = [
  { name: 'WhatsApp Business API', desc: 'Envío de notificaciones y comunicación con clientes', status: 'connected', icon: '💬', color: '#22c55e' },
  { name: 'Claude API (Anthropic)', desc: 'Revisión automática de contratos con IA', status: 'connected', icon: '🤖', color: '#8b5cf6' },
  { name: 'Azul Payment Gateway', desc: 'Procesamiento de pagos con tarjeta de crédito', status: 'connected', icon: '💳', color: '#0066CC' },
  { name: 'CardNET', desc: 'Procesamiento de pagos locales', status: 'connected', icon: '💳', color: '#E31937' },
  { name: 'DGII (e-CF)', desc: 'Facturación electrónica y comprobantes fiscales', status: 'pending', icon: '🏛️', color: '#f59e0b' },
  { name: 'Google Workspace', desc: 'Gmail, Calendar, Drive para equipo interno', status: 'connected', icon: '📧', color: '#3b82f6' },
  { name: 'ONAPI API', desc: 'Consulta de disponibilidad de marcas', status: 'development', icon: '🔍', color: '#6366f1' },
  { name: 'Hetzner / Coolify', desc: 'Infraestructura y deployment', status: 'connected', icon: '☁️', color: '#ef4444' },
]

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState('company')

  return (
    <div>
      <div className="mb-5">
        <h1 className="text-xl font-bold text-white">Configuración</h1>
        <p className="text-sm text-white/30 mt-1">Ajustes generales del sistema, integraciones y seguridad</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {/* Sidebar nav */}
        <div className="space-y-1">
          {sections.map(s => (
            <button
              key={s.key}
              onClick={() => setActiveSection(s.key)}
              className={cn(
                'w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[13px] font-medium transition-colors text-left',
                activeSection === s.key ? 'bg-brand-300/10 text-brand-300' : 'text-white/35 hover:text-white/55 hover:bg-white/[0.02]'
              )}
            >
              <s.icon size={16} /> {s.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="col-span-3">
          {activeSection === 'company' && (
            <div className="bg-surface-1 border border-white/[0.06] rounded-xl p-6">
              <h3 className="text-sm font-semibold text-white mb-5">Información de la Empresa</h3>
              <div className="grid grid-cols-2 gap-5">
                {[
                  { label: 'Razón Social', value: 'Agilex, SRL' },
                  { label: 'Nombre Comercial', value: 'tramiteslegales.do' },
                  { label: 'RNC', value: '132-XXXXXX-X' },
                  { label: 'Dirección', value: 'Santo Domingo, República Dominicana' },
                  { label: 'Teléfono Principal', value: '809-XXX-XXXX' },
                  { label: 'Email', value: 'info@tramiteslegales.do' },
                  { label: 'Sitio Web', value: 'tramiteslegales.do' },
                  { label: 'Actividad Económica', value: 'Servicios Legales (LegalTech)' },
                ].map((field, i) => (
                  <div key={i}>
                    <label className="text-[11px] text-white/25 uppercase tracking-wider font-semibold block mb-1.5">{field.label}</label>
                    <input
                      type="text"
                      defaultValue={field.value}
                      className="w-full bg-surface-2 border border-white/[0.06] rounded-lg px-3 py-2.5 text-[13px] text-white/60 outline-none focus:border-brand-300/30 transition-colors"
                    />
                  </div>
                ))}
              </div>
              <div className="mt-5 pt-5 border-t border-white/[0.04] flex justify-end">
                <button className="bg-brand-300 text-brand-900 text-sm font-semibold px-4 py-2.5 rounded-lg">Guardar Cambios</button>
              </div>
            </div>
          )}

          {activeSection === 'integrations' && (
            <div className="space-y-3">
              {integrations.map((int, i) => (
                <div key={i} className="bg-surface-1 border border-white/[0.06] rounded-xl p-4 flex items-center justify-between hover:border-white/[0.1] transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-xl bg-surface-2 flex items-center justify-center text-xl">{int.icon}</div>
                    <div>
                      <h4 className="text-[13px] font-semibold text-white">{int.name}</h4>
                      <p className="text-[11px] text-white/30">{int.desc}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                      int.status === 'connected' ? 'bg-emerald-400/10 text-emerald-400' :
                      int.status === 'pending' ? 'bg-amber-400/10 text-amber-400' :
                      'bg-blue-400/10 text-blue-400'
                    }`}>
                      {int.status === 'connected' ? 'Conectada' : int.status === 'pending' ? 'Pendiente' : 'En Desarrollo'}
                    </span>
                    <button className="text-[11px] text-brand-300 font-medium hover:underline">Configurar</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeSection === 'notifications' && (
            <div className="bg-surface-1 border border-white/[0.06] rounded-xl p-6">
              <h3 className="text-sm font-semibold text-white mb-5">Configuración de Notificaciones</h3>
              <div className="space-y-4">
                {[
                  { event: 'Nueva orden recibida', email: true, whatsapp: true, push: true },
                  { event: 'Cambio de estado de orden', email: true, whatsapp: true, push: true },
                  { event: 'Pago recibido', email: true, whatsapp: false, push: true },
                  { event: 'Documento listo para descarga', email: true, whatsapp: true, push: true },
                  { event: 'SLA próximo a vencer', email: true, whatsapp: false, push: true },
                  { event: 'Nuevo lead capturado', email: true, whatsapp: false, push: false },
                  { event: 'Renovación de iguala pendiente', email: true, whatsapp: true, push: false },
                  { event: 'Factura vencida', email: true, whatsapp: true, push: true },
                ].map((notif, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-white/[0.03] last:border-0">
                    <span className="text-[13px] text-white/55">{notif.event}</span>
                    <div className="flex items-center gap-4">
                      {[
                        { key: 'email', label: 'Email', icon: Mail },
                        { key: 'whatsapp', label: 'WhatsApp', icon: MessageCircle },
                        { key: 'push', label: 'Push', icon: Bell },
                      ].map(ch => (
                        <label key={ch.key} className="flex items-center gap-1.5 cursor-pointer">
                          <input type="checkbox" defaultChecked={notif[ch.key]} className="w-3.5 h-3.5 rounded accent-brand-300" />
                          <span className="text-[10px] text-white/25">{ch.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-5 pt-5 border-t border-white/[0.04] flex justify-end">
                <button className="bg-brand-300 text-brand-900 text-sm font-semibold px-4 py-2.5 rounded-lg">Guardar</button>
              </div>
            </div>
          )}

          {activeSection === 'billing' && (
            <div className="bg-surface-1 border border-white/[0.06] rounded-xl p-6">
              <h3 className="text-sm font-semibold text-white mb-5">Configuración de Facturación NCF</h3>
              <div className="grid grid-cols-2 gap-5 mb-5">
                {[
                  { label: 'Secuencia B01 (Consumidor Final)', value: 'B0100000001 - B0100000500', remaining: '411 disponibles' },
                  { label: 'Secuencia B02 (Crédito Fiscal)', value: 'B0200000001 - B0200000200', remaining: '182 disponibles' },
                  { label: 'Secuencia B14 (Régimen Especial)', value: 'B1400000001 - B1400000050', remaining: '47 disponibles' },
                  { label: 'Secuencia B15 (Gubernamental)', value: 'No configurada', remaining: null },
                ].map((seq, i) => (
                  <div key={i} className="p-4 rounded-lg border border-white/[0.04]">
                    <div className="text-[11px] text-white/25 font-semibold uppercase tracking-wider mb-1">{seq.label}</div>
                    <div className="text-[13px] text-white/60 font-mono">{seq.value}</div>
                    {seq.remaining && <div className="text-[10px] text-emerald-400/60 mt-1">{seq.remaining}</div>}
                  </div>
                ))}
              </div>
              <div className="space-y-3">
                {[
                  { label: 'ITBIS por defecto', value: '18%' },
                  { label: 'Moneda', value: 'DOP (Peso Dominicano)' },
                  { label: 'Días de crédito por defecto', value: '30 días' },
                  { label: 'Pie de factura', value: 'Gracias por confiar en tramiteslegales.do' },
                ].map((field, i) => (
                  <div key={i} className="flex items-center justify-between py-2">
                    <span className="text-[13px] text-white/40">{field.label}</span>
                    <span className="text-[13px] text-white/60">{field.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'security' && (
            <div className="space-y-4">
              <div className="bg-surface-1 border border-white/[0.06] rounded-xl p-6">
                <h3 className="text-sm font-semibold text-white mb-5">Autenticación</h3>
                <div className="space-y-3">
                  {[
                    { label: 'Autenticación de 2 factores (2FA)', value: 'Habilitada para admin', status: 'on' },
                    { label: 'Expiración de sesión', value: '8 horas de inactividad', status: 'on' },
                    { label: 'Política de contraseñas', value: 'Mínimo 12 caracteres, 1 número, 1 especial', status: 'on' },
                    { label: 'IP Whitelist', value: 'No configurada', status: 'off' },
                    { label: 'SSO / SAML', value: 'No disponible', status: 'off' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between py-2 border-b border-white/[0.03] last:border-0">
                      <div><div className="text-[13px] text-white/55">{item.label}</div><div className="text-[11px] text-white/25">{item.value}</div></div>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${item.status === 'on' ? 'bg-emerald-400/10 text-emerald-400' : 'bg-white/5 text-white/20'}`}>
                        {item.status === 'on' ? 'Activo' : 'Inactivo'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-surface-1 border border-white/[0.06] rounded-xl p-6">
                <h3 className="text-sm font-semibold text-white mb-3">Registro de Actividad</h3>
                <p className="text-[12px] text-white/30 mb-4">Últimas acciones del sistema</p>
                <div className="space-y-2">
                  {[
                    { action: 'Admin actualizó permisos de Lic. Santos', time: 'Hace 2 horas' },
                    { action: 'Lic. Ramírez descargó documentos ORD-001247', time: 'Hace 5 horas' },
                    { action: 'Sistema: Backup automático completado', time: 'Hoy 03:00' },
                    { action: 'Admin cambió configuración de notificaciones', time: 'Ayer 16:30' },
                    { action: 'Nuevo miembro agregado: Carlos Méndez', time: 'Feb 10' },
                  ].map((log, i) => (
                    <div key={i} className="flex items-center justify-between py-1.5 text-[12px]">
                      <span className="text-white/40">{log.action}</span>
                      <span className="text-white/15 text-[10px]">{log.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeSection === 'data' && (
            <div className="space-y-4">
              <div className="bg-surface-1 border border-white/[0.06] rounded-xl p-6">
                <h3 className="text-sm font-semibold text-white mb-5">Base de Datos</h3>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { label: 'Motor', value: 'PostgreSQL 16' },
                    { label: 'Servidor', value: 'Hetzner (Coolify)' },
                    { label: 'Tamaño', value: '2.4 GB' },
                    { label: 'Tablas', value: '38' },
                    { label: 'Último backup', value: 'Hoy 03:00' },
                    { label: 'Retención', value: '90 días' },
                  ].map((item, i) => (
                    <div key={i} className="p-3 rounded-lg border border-white/[0.04]">
                      <div className="text-[10px] text-white/25 uppercase tracking-wider font-semibold">{item.label}</div>
                      <div className="text-[14px] text-white/60 font-medium mt-1">{item.value}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-surface-1 border border-white/[0.06] rounded-xl p-6">
                <h3 className="text-sm font-semibold text-white mb-3">Acciones de Datos</h3>
                <div className="space-y-2">
                  {[
                    { label: 'Crear backup manual', desc: 'Genera una copia de seguridad inmediata', btn: 'Crear Backup' },
                    { label: 'Exportar datos', desc: 'Descargar clientes, órdenes o facturas en CSV', btn: 'Exportar' },
                    { label: 'Restaurar backup', desc: 'Restaurar desde un backup anterior', btn: 'Restaurar', danger: true },
                  ].map((action, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-white/[0.02]">
                      <div><div className="text-[13px] text-white/55">{action.label}</div><div className="text-[11px] text-white/25">{action.desc}</div></div>
                      <button className={`text-[11px] font-semibold px-3 py-1.5 rounded-lg border ${action.danger ? 'border-red-400/20 text-red-400 hover:bg-red-400/5' : 'border-white/[0.08] text-white/50 hover:bg-white/[0.03]'}`}>{action.btn}</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
