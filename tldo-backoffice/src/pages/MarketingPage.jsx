import { useState } from 'react'
import { Megaphone, Users, Target, TrendingUp, Zap, Globe, MousePointerClick, ArrowUpRight } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { formatRD, cn } from '@/lib/utils'
import StatCard from '@/components/ui/StatCard'

const freemiumTools = [
  { name: 'Calculadora Liquidación Laboral', icon: '🧮', users: 1240, leads: 186, converted: 14, convRate: 7.5, revenue: 490000, status: 'active' },
  { name: 'Simulador Disponibilidad Marca (ONAPI)', icon: '🔍', users: 890, leads: 124, converted: 9, convRate: 7.3, revenue: 252000, status: 'active' },
  { name: 'Calculadora Costos Inmobiliarios', icon: '🏠', users: 650, leads: 78, converted: 5, convRate: 6.4, revenue: 225000, status: 'active' },
  { name: 'Generador Términos y Condiciones', icon: '📜', users: 520, leads: 62, converted: 8, convRate: 12.9, revenue: 96000, status: 'active' },
  { name: 'Diagnóstico de Divorcio', icon: '💔', users: 380, leads: 45, converted: 4, convRate: 8.9, revenue: 140000, status: 'active' },
  { name: 'Revisión Contratos por IA (RCCI)', icon: '🤖', users: 290, leads: 38, converted: 3, convRate: 7.9, revenue: 105000, status: 'beta' },
]

const channels = [
  { name: 'Google Ads', spend: 85000, leads: 94, converted: 12, cac: 7083, roi: 3.2, color: '#3b82f6' },
  { name: 'Meta Ads (FB+IG)', spend: 65000, leads: 72, converted: 8, cac: 8125, roi: 2.8, color: '#6366f1' },
  { name: 'WhatsApp Orgánico', spend: 0, leads: 45, converted: 18, cac: 0, roi: null, color: '#22c55e' },
  { name: 'SEO / Orgánico', spend: 25000, leads: 38, converted: 6, cac: 4167, roi: 5.1, color: '#f59e0b' },
  { name: 'Referidos', spend: 0, leads: 28, converted: 15, cac: 0, roi: null, color: '#f97316' },
]

const channelChart = channels.map(c => ({ name: c.name.split(' ')[0], leads: c.leads, converted: c.converted }))

const seoKeywords = [
  { keyword: 'constituir empresa dominicana', position: 3, volume: 1200, trend: 'up' },
  { keyword: 'registro de marca RD', position: 5, volume: 880, trend: 'up' },
  { keyword: 'divorcio mutuo acuerdo dominicana', position: 7, volume: 720, trend: 'stable' },
  { keyword: 'calculadora liquidacion laboral', position: 1, volume: 1500, trend: 'up' },
  { keyword: 'contrato alquiler dominicana', position: 4, volume: 950, trend: 'up' },
  { keyword: 'tramites legales online RD', position: 2, volume: 650, trend: 'up' },
]

export default function MarketingPage() {
  const [tab, setTab] = useState('freemium')
  const totalLeads = freemiumTools.reduce((s, t) => s + t.leads, 0) + channels.reduce((s, c) => s + c.leads, 0)
  const totalConv = freemiumTools.reduce((s, t) => s + t.converted, 0) + channels.reduce((s, c) => s + c.converted, 0)

  return (
    <div>
      <div className="mb-5">
        <h1 className="text-xl font-bold text-white">Marketing y Captación</h1>
        <p className="text-sm text-white/30 mt-1">Herramientas freemium, campañas, SEO y analítica de adquisición</p>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-5">
        <StatCard label="Leads Totales (mes)" value={totalLeads} icon={Users} trend={22} trendLabel="vs mes ant." />
        <StatCard label="Conversiones" value={totalConv} subValue={`Tasa: ${((totalConv/totalLeads)*100).toFixed(1)}%`} icon={Target} trend={8} />
        <StatCard label="Usuarios Freemium" value={freemiumTools.reduce((s,t)=>s+t.users,0).toLocaleString()} icon={Zap} trend={35} />
        <StatCard label="Gasto Marketing" value={formatRD(channels.reduce((s,c)=>s+c.spend,0))} subValue="Este mes" icon={Megaphone} />
      </div>

      <div className="flex gap-1 bg-surface-1 border border-white/[0.06] rounded-xl p-1.5 mb-4 w-fit">
        {[
          { key: 'freemium', label: 'Herramientas Freemium' },
          { key: 'channels', label: 'Canales Pagados' },
          { key: 'seo', label: 'SEO / Contenido' },
        ].map(t => (
          <button key={t.key} onClick={() => setTab(t.key)} className={cn('px-4 py-2 rounded-lg text-[12px] font-medium transition-colors', tab === t.key ? 'bg-brand-300/10 text-brand-300' : 'text-white/30 hover:text-white/50')}>
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'freemium' && (
        <div className="grid grid-cols-2 gap-4">
          {freemiumTools.map((tool, i) => (
            <div key={i} className="bg-surface-1 border border-white/[0.06] rounded-xl p-5 hover:border-white/[0.1] transition-colors">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{tool.icon}</span>
                  <div>
                    <h3 className="text-[13px] font-semibold text-white">{tool.name}</h3>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${tool.status === 'beta' ? 'bg-purple-400/10 text-purple-400' : 'bg-emerald-400/10 text-emerald-400'}`}>
                      {tool.status === 'beta' ? 'Beta' : 'Activa'}
                    </span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-3 pt-3 border-t border-white/[0.04]">
                <div><div className="text-[16px] font-bold text-white">{tool.users.toLocaleString()}</div><div className="text-[9px] text-white/25 uppercase">Usuarios</div></div>
                <div><div className="text-[16px] font-bold text-blue-400">{tool.leads}</div><div className="text-[9px] text-white/25 uppercase">Leads</div></div>
                <div><div className="text-[16px] font-bold text-emerald-400">{tool.converted}</div><div className="text-[9px] text-white/25 uppercase">Convertidos</div></div>
                <div><div className="text-[16px] font-bold text-amber-400">{tool.convRate}%</div><div className="text-[9px] text-white/25 uppercase">Conv.</div></div>
              </div>
              <div className="mt-3 pt-3 border-t border-white/[0.04] flex justify-between items-center">
                <span className="text-[11px] text-white/25">Ingresos generados</span>
                <span className="text-[14px] font-bold text-white/60">{formatRD(tool.revenue)}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'channels' && (
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2 bg-surface-1 border border-white/[0.06] rounded-xl p-5">
            <h3 className="text-sm font-semibold text-white mb-4">Leads por Canal</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={channelChart}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="name" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} axisLine={false} />
                <YAxis tick={{ fill: 'rgba(255,255,255,0.25)', fontSize: 11 }} axisLine={false} />
                <Tooltip contentStyle={{ background: '#151d30', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, fontSize: 12 }} />
                <Bar dataKey="leads" fill="#1B6B93" radius={[4,4,0,0]} name="Leads" />
                <Bar dataKey="converted" fill="#5bc0eb" radius={[4,4,0,0]} name="Convertidos" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-3">
            {channels.map((ch, i) => (
              <div key={i} className="bg-surface-1 border border-white/[0.06] rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: ch.color }} />
                  <span className="text-[13px] font-semibold text-white/70">{ch.name}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div><span className="text-white/25">Inversión: </span><span className="text-white/50">{ch.spend > 0 ? formatRD(ch.spend) : 'Orgánico'}</span></div>
                  <div><span className="text-white/25">Leads: </span><span className="text-white/50">{ch.leads}</span></div>
                  <div><span className="text-white/25">CAC: </span><span className="text-white/50">{ch.cac > 0 ? formatRD(ch.cac) : 'N/A'}</span></div>
                  <div><span className="text-white/25">ROI: </span><span className={ch.roi ? (ch.roi > 3 ? 'text-emerald-400' : 'text-amber-400') : 'text-white/25'}>{ch.roi ? `${ch.roi}x` : 'N/A'}</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'seo' && (
        <div className="bg-surface-1 border border-white/[0.06] rounded-xl overflow-hidden">
          <div className="px-5 pt-5 pb-3"><h3 className="text-sm font-semibold text-white">Keywords Posicionadas</h3></div>
          <table className="w-full">
            <thead><tr className="border-b border-white/[0.06]">
              {['Keyword', 'Posición', 'Vol. Mensual', 'Tendencia'].map((h,i) => (
                <th key={i} className="text-[10px] font-semibold text-white/25 uppercase tracking-wider px-5 py-2.5 text-left">{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {seoKeywords.map((kw, i) => (
                <tr key={i} className="border-b border-white/[0.03]">
                  <td className="px-5 py-3 text-[13px] text-white/60">{kw.keyword}</td>
                  <td className="px-5 py-3"><span className={`text-[14px] font-bold ${kw.position <= 3 ? 'text-emerald-400' : kw.position <= 5 ? 'text-amber-400' : 'text-white/40'}`}>#{kw.position}</span></td>
                  <td className="px-5 py-3 text-[13px] text-white/40">{kw.volume.toLocaleString()}</td>
                  <td className="px-5 py-3">{kw.trend === 'up' ? <ArrowUpRight size={14} className="text-emerald-400" /> : <span className="text-[11px] text-white/25">Estable</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
