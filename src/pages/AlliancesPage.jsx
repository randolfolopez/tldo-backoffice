import { useState } from 'react'
import { Handshake, Users, DollarSign, TrendingUp, Plus, ExternalLink, Star, ChevronRight, Building2, UserCheck } from 'lucide-react'
import { formatRD, formatDate, cn } from '@/lib/utils'
import StatCard from '@/components/ui/StatCard'

const partners = [
  {
    id: 'ALI-001', name: 'Contadores Asociados RD', type: 'contabilidad', contact: 'Lic. María Torres', email: 'mtorres@contadoresrd.do', phone: '809-555-7001',
    status: 'active', since: '2025-03-01', commission: 15, referralsSent: 18, referralsReceived: 12, revenue: 486000,
    desc: 'Firma contable líder. Nos refieren clientes que necesitan constitución de empresas y contratos. Les referimos clientes para contabilidad y declaraciones fiscales.',
    tags: ['Top Partner', 'Contabilidad'],
  },
  {
    id: 'ALI-002', name: 'InmoCaribe Bienes Raíces', type: 'inmobiliaria', contact: 'Ing. Roberto Vásquez', email: 'rvasquez@inmocaribe.do', phone: '809-555-7002',
    status: 'active', since: '2025-06-15', commission: 10, referralsSent: 8, referralsReceived: 22, revenue: 990000,
    desc: 'Inmobiliaria premium en Santo Domingo. Nos envían todos sus clientes para transferencias de título, due diligence y contratos de compraventa.',
    tags: ['Alto Volumen', 'Inmobiliaria'],
  },
  {
    id: 'ALI-003', name: 'Notaría Pérez & Asociados', type: 'notaria', contact: 'Lic. Ana Pérez', email: 'aperez@notariaperez.do', phone: '809-555-7003',
    status: 'active', since: '2025-01-10', commission: 8, referralsSent: 5, referralsReceived: 15, revenue: 225000,
    desc: 'Notaría aliada para legalizaciones, poderes notariales y actos de notoriedad. Canal directo para certificaciones.',
    tags: ['Notaría'],
  },
  {
    id: 'ALI-004', name: 'TechHub RD (Coworking)', type: 'tecnologia', contact: 'Carlos Mejía', email: 'cmejia@techhubrd.com', phone: '829-555-7004',
    status: 'active', since: '2025-09-01', commission: 12, referralsSent: 3, referralsReceived: 9, revenue: 342000,
    desc: 'Coworking y aceleradora de startups. Nos refieren emprendedores para constitución de empresas, marcas y contratos.',
    tags: ['Startups', 'Tech'],
  },
  {
    id: 'ALI-005', name: 'Seguros Universal', type: 'seguros', contact: 'Lic. Fernando Díaz', email: 'fdiaz@segurosuniversal.do', phone: '809-555-7005',
    status: 'negotiation', since: null, commission: null, referralsSent: 0, referralsReceived: 0, revenue: 0,
    desc: 'En negociación para alianza de referidos cruzados. Potencial alto en clientes empresariales que necesitan servicios legales.',
    tags: ['En Negociación'],
  },
  {
    id: 'ALI-006', name: 'Cámara de Comercio Santo Domingo', type: 'institucional', contact: 'Departamento Jurídico', email: 'juridico@camarasd.org.do', phone: '809-555-7006',
    status: 'active', since: '2025-04-20', commission: 0, referralsSent: 0, referralsReceived: 8, revenue: 304000,
    desc: 'Alianza institucional. Aparecemos como firma recomendada en el directorio de servicios legales para nuevos comerciantes.',
    tags: ['Institucional', 'Directorio'],
  },
]

const typeIcons = { contabilidad: '📊', inmobiliaria: '🏠', notaria: '📋', tecnologia: '💻', seguros: '🛡️', institucional: '🏛️' }

export default function AlliancesPage() {
  const activePartners = partners.filter(p => p.status === 'active')
  const totalRevenue = partners.reduce((s, p) => s + p.revenue, 0)
  const totalRefs = partners.reduce((s, p) => s + p.referralsReceived, 0)

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-xl font-bold text-white">Alianzas Estratégicas</h1>
          <p className="text-sm text-white/30 mt-1">Red de socios, referidos cruzados y acuerdos comerciales</p>
        </div>
        <button className="flex items-center gap-2 bg-brand-300 hover:bg-brand-400 text-brand-900 text-sm font-semibold px-4 py-2.5 rounded-lg"><Plus size={16} /> Nueva Alianza</button>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-5">
        <StatCard label="Socios Activos" value={activePartners.length} subValue={`${partners.length} total`} icon={Handshake} />
        <StatCard label="Referidos Recibidos" value={totalRefs} subValue="Últimos 6 meses" icon={Users} trend={28} />
        <StatCard label="Ingresos por Alianzas" value={formatRD(totalRevenue)} icon={DollarSign} trend={35} trendLabel="vs semestre ant." />
        <StatCard label="Tasa Conversión Ref." value="68%" subValue="Referidos → Clientes" icon={TrendingUp} trend={5} />
      </div>

      <div className="space-y-4">
        {partners.map(partner => (
          <div key={partner.id} className="bg-surface-1 border border-white/[0.06] rounded-xl p-5 hover:border-white/[0.1] transition-colors cursor-pointer">
            <div className="flex items-start gap-5">
              <div className="w-14 h-14 rounded-xl bg-surface-2 flex items-center justify-center text-2xl flex-shrink-0">
                {typeIcons[partner.type] || '🤝'}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-[15px] font-bold text-white">{partner.name}</h3>
                  {partner.status === 'active' ? (
                    <span className="text-[10px] font-semibold bg-emerald-400/10 text-emerald-400 px-2 py-0.5 rounded">Activa</span>
                  ) : (
                    <span className="text-[10px] font-semibold bg-amber-400/10 text-amber-400 px-2 py-0.5 rounded">En Negociación</span>
                  )}
                  {partner.tags.filter(t => t !== 'En Negociación').map((tag, i) => (
                    <span key={i} className="text-[10px] bg-white/[0.04] text-white/25 px-2 py-0.5 rounded">{tag}</span>
                  ))}
                </div>
                <p className="text-[12px] text-white/35 mb-3 max-w-2xl">{partner.desc}</p>

                <div className="flex items-center gap-6 text-[12px]">
                  <div className="flex items-center gap-1.5 text-white/35"><UserCheck size={13} className="text-white/20" /> {partner.contact}</div>
                  <div className="flex items-center gap-1.5 text-white/35">{partner.email}</div>
                  {partner.since && <div className="text-white/20">Desde {formatDate(partner.since)}</div>}
                </div>
              </div>

              {partner.status === 'active' && (
                <div className="flex gap-6 text-center flex-shrink-0">
                  <div>
                    <div className="text-xl font-bold text-blue-400">{partner.referralsReceived}</div>
                    <div className="text-[9px] text-white/25 uppercase">Recibidos</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-brand-300">{partner.referralsSent}</div>
                    <div className="text-[9px] text-white/25 uppercase">Enviados</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-emerald-400">{formatRD(partner.revenue)}</div>
                    <div className="text-[9px] text-white/25 uppercase">Ingresos</div>
                  </div>
                  {partner.commission > 0 && (
                    <div>
                      <div className="text-xl font-bold text-amber-400">{partner.commission}%</div>
                      <div className="text-[9px] text-white/25 uppercase">Comisión</div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
