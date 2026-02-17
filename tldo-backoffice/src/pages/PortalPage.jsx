import { useState } from 'react'
import { Globe, Eye, Layout, Bell, Shield, Palette, Smartphone, CheckCircle, AlertCircle, ExternalLink, ToggleLeft, ToggleRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import StatCard from '@/components/ui/StatCard'

const portalFeatures = [
  { id: 'tracking', name: 'Seguimiento de Órdenes', desc: 'El cliente ve el estado en tiempo real de sus trámites', enabled: true, icon: Eye },
  { id: 'documents', name: 'Descarga de Documentos', desc: 'Acceso a documentos generados y certificaciones', enabled: true, icon: Layout },
  { id: 'payments', name: 'Pagos en Línea', desc: 'Pagar facturas pendientes con Azul o CardNET', enabled: true, icon: Shield },
  { id: 'notifications', name: 'Notificaciones Push', desc: 'Alertas de cambios de estado y vencimientos', enabled: true, icon: Bell },
  { id: 'chat', name: 'Chat con Abogado', desc: 'Mensajería directa con el abogado asignado', enabled: false, icon: Smartphone },
  { id: 'calculator', name: 'Mis Calculadoras Guardadas', desc: 'Historial de simulaciones y cálculos realizados', enabled: true, icon: Layout },
  { id: 'iguala', name: 'Portal de Iguala', desc: 'Dashboard de consumo, consultas disponibles y renovación', enabled: false, icon: Shield },
  { id: 'referrals', name: 'Programa de Referidos', desc: 'Referir amigos y ganar puntos de fidelización', enabled: true, icon: Globe },
]

const portalStats = {
  registered: 42,
  activeMonthly: 28,
  documentsDownloaded: 156,
  paymentsOnline: 35,
}

const portalPages = [
  { name: 'Login / Registro', url: '/portal/login', status: 'live' },
  { name: 'Dashboard del Cliente', url: '/portal/dashboard', status: 'live' },
  { name: 'Mis Órdenes', url: '/portal/ordenes', status: 'live' },
  { name: 'Detalle de Orden', url: '/portal/ordenes/:id', status: 'live' },
  { name: 'Mis Documentos', url: '/portal/documentos', status: 'live' },
  { name: 'Pagos', url: '/portal/pagos', status: 'live' },
  { name: 'Mi Iguala', url: '/portal/iguala', status: 'development' },
  { name: 'Chat con Abogado', url: '/portal/chat', status: 'planned' },
  { name: 'Referidos', url: '/portal/referidos', status: 'development' },
  { name: 'Mi Perfil', url: '/portal/perfil', status: 'live' },
]

const statusLabels = {
  live: { label: 'En Producción', color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
  development: { label: 'En Desarrollo', color: 'text-amber-400', bg: 'bg-amber-400/10' },
  planned: { label: 'Planificado', color: 'text-white/30', bg: 'bg-white/5' },
}

export default function PortalPage() {
  const [features, setFeatures] = useState(portalFeatures)

  const toggleFeature = (id) => {
    setFeatures(prev => prev.map(f => f.id === id ? { ...f, enabled: !f.enabled } : f))
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-xl font-bold text-white">Portal del Cliente</h1>
          <p className="text-sm text-white/30 mt-1">Configuración del portal web donde los clientes ven sus trámites</p>
        </div>
        <a href="#" className="flex items-center gap-2 bg-surface-2 border border-white/[0.08] text-white/50 text-[12px] font-medium px-4 py-2.5 rounded-lg hover:border-white/[0.15] transition-colors">
          <ExternalLink size={14} /> Ver Portal (tramiteslegales.do/portal)
        </a>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-5">
        <StatCard label="Clientes Registrados" value={portalStats.registered} icon={Globe} trend={18} trendLabel="vs mes ant." />
        <StatCard label="Activos Mensual" value={portalStats.activeMonthly} subValue={`${Math.round(portalStats.activeMonthly/portalStats.registered*100)}% del total`} icon={Eye} />
        <StatCard label="Documentos Descargados" value={portalStats.documentsDownloaded} subValue="Este mes" icon={Layout} trend={22} />
        <StatCard label="Pagos Online" value={portalStats.paymentsOnline} subValue="Este mes" icon={Shield} trend={40} />
      </div>

      <div className="grid grid-cols-3 gap-4">
        {/* Features toggle */}
        <div className="col-span-2 space-y-4">
          <div className="bg-surface-1 border border-white/[0.06] rounded-xl p-5">
            <h3 className="text-sm font-semibold text-white mb-4">Funcionalidades del Portal</h3>
            <div className="space-y-1">
              {features.map(feature => {
                const Icon = feature.icon
                return (
                  <div key={feature.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-white/[0.02] transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${feature.enabled ? 'bg-brand-300/10 text-brand-300' : 'bg-white/[0.04] text-white/20'}`}>
                        <Icon size={16} />
                      </div>
                      <div>
                        <div className="text-[13px] font-medium text-white/70">{feature.name}</div>
                        <div className="text-[11px] text-white/30">{feature.desc}</div>
                      </div>
                    </div>
                    <button onClick={() => toggleFeature(feature.id)} className="flex-shrink-0">
                      {feature.enabled ? (
                        <ToggleRight size={28} className="text-brand-300" />
                      ) : (
                        <ToggleLeft size={28} className="text-white/15" />
                      )}
                    </button>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Payment gateways */}
          <div className="bg-surface-1 border border-white/[0.06] rounded-xl p-5">
            <h3 className="text-sm font-semibold text-white mb-4">Pasarelas de Pago</h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                { name: 'Azul', desc: 'Visa, Mastercard, Amex', status: 'connected', color: '#0066CC' },
                { name: 'CardNET', desc: 'Visa, Mastercard locales', status: 'connected', color: '#E31937' },
                { name: 'Transferencia Bancaria', desc: 'Popular, BHD, Reservas', status: 'active', color: '#22c55e' },
                { name: 'Depósito', desc: 'Referencia bancaria manual', status: 'active', color: '#f59e0b' },
              ].map((gw, i) => (
                <div key={i} className="p-4 rounded-lg border border-white/[0.04] flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-[11px]" style={{ background: gw.color + '20', color: gw.color }}>
                    {gw.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <div className="text-[13px] font-medium text-white/70">{gw.name}</div>
                    <div className="text-[10px] text-white/25">{gw.desc}</div>
                  </div>
                  <span className="text-[10px] font-semibold bg-emerald-400/10 text-emerald-400 px-2 py-0.5 rounded">
                    {gw.status === 'connected' ? 'Conectada' : 'Activa'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pages list */}
        <div className="bg-surface-1 border border-white/[0.06] rounded-xl p-5">
          <h3 className="text-sm font-semibold text-white mb-4">Páginas del Portal</h3>
          <div className="space-y-2">
            {portalPages.map((page, i) => {
              const sl = statusLabels[page.status]
              return (
                <div key={i} className="flex items-center justify-between py-2 px-2 rounded-lg hover:bg-white/[0.02]">
                  <div>
                    <div className="text-[12px] text-white/55 font-medium">{page.name}</div>
                    <div className="text-[10px] text-white/15 font-mono">{page.url}</div>
                  </div>
                  <span className={`text-[9px] font-semibold px-2 py-0.5 rounded ${sl.bg} ${sl.color}`}>{sl.label}</span>
                </div>
              )
            })}
          </div>

          <div className="mt-4 pt-4 border-t border-white/[0.04]">
            <h4 className="text-[11px] font-semibold text-white/25 uppercase tracking-wider mb-3">Branding del Portal</h4>
            <div className="space-y-2.5 text-[12px]">
              <div className="flex justify-between"><span className="text-white/30">Dominio</span><span className="text-white/50">tramiteslegales.do/portal</span></div>
              <div className="flex justify-between"><span className="text-white/30">Logo</span><span className="text-brand-300 text-[11px]">Configurado ✓</span></div>
              <div className="flex justify-between"><span className="text-white/30">Colores</span><span className="text-white/50">Brand System</span></div>
              <div className="flex justify-between"><span className="text-white/30">Idioma</span><span className="text-white/50">Español (ES-DO)</span></div>
              <div className="flex justify-between"><span className="text-white/30">SSL</span><span className="text-emerald-400 text-[11px]">Activo ✓</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
