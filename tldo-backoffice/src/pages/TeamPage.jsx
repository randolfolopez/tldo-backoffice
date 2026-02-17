import { useState } from 'react'
import { UserCog, Users, ClipboardList, Clock, Star, Plus, Mail, Phone, ChevronRight, BarChart3 } from 'lucide-react'
import { formatDate, cn } from '@/lib/utils'
import StatCard from '@/components/ui/StatCard'

const team = [
  { id: 'U-001', name: 'Lic. Juan Ramírez', initials: 'JR', role: 'Abogado Senior', specialty: 'Societario, Laboral', email: 'jramirez@tramiteslegales.do', phone: '809-555-9001', status: 'online', activeCases: 5, completedMonth: 12, avgTime: '8.2 días', rating: 4.8, workload: 78 },
  { id: 'U-002', name: 'Lic. Laura Peña', initials: 'LP', role: 'Abogada', specialty: 'PI, Inmobiliario', email: 'lpena@tramiteslegales.do', phone: '809-555-9002', status: 'online', activeCases: 4, completedMonth: 9, avgTime: '12.5 días', rating: 4.6, workload: 65 },
  { id: 'U-003', name: 'Lic. Marcos Santos', initials: 'MS', role: 'Abogado', specialty: 'Familia, Contratos', email: 'msantos@tramiteslegales.do', phone: '809-555-9003', status: 'busy', activeCases: 3, completedMonth: 8, avgTime: '15.0 días', rating: 4.5, workload: 52 },
  { id: 'U-004', name: 'Rosa Díaz', initials: 'RD', role: 'Paralegal', specialty: 'Certificaciones, Contratos', email: 'rdiaz@tramiteslegales.do', phone: '809-555-9004', status: 'online', activeCases: 6, completedMonth: 22, avgTime: '3.1 días', rating: 4.9, workload: 85 },
  { id: 'U-005', name: 'Carlos Méndez', initials: 'CM', role: 'Asesor Comercial', specialty: 'Ventas, Igualas', email: 'cmendez@tramiteslegales.do', phone: '809-555-9005', status: 'offline', activeCases: 0, completedMonth: 0, avgTime: 'N/A', rating: 4.3, workload: 40 },
  { id: 'U-006', name: 'Admin Principal', initials: 'AD', role: 'Superadmin', specialty: 'Administración General', email: 'admin@tramiteslegales.do', phone: '809-555-9000', status: 'online', activeCases: 2, completedMonth: 5, avgTime: '5.0 días', rating: 5.0, workload: 45 },
]

const statusDot = { online: 'bg-emerald-400', busy: 'bg-amber-400', offline: 'bg-white/20' }

const roles = [
  { name: 'Superadmin', perms: 'Acceso total al sistema', count: 1, color: '#ef4444' },
  { name: 'Abogado Senior', perms: 'Órdenes, Clientes, Documentos, Finanzas (lectura)', count: 1, color: '#f59e0b' },
  { name: 'Abogado', perms: 'Órdenes asignadas, Clientes, Documentos', count: 2, color: '#3b82f6' },
  { name: 'Paralegal', perms: 'Órdenes asignadas, Documentos, Clientes (lectura)', count: 1, color: '#8b5cf6' },
  { name: 'Asesor Comercial', perms: 'Leads, Clientes, Igualas', count: 1, color: '#10b981' },
  { name: 'Contable', perms: 'Finanzas, Facturas, Reportes DGII', count: 0, color: '#6b7280' },
]

export default function TeamPage() {
  const [tab, setTab] = useState('members')
  const totalCases = team.reduce((s, t) => s + t.activeCases, 0)

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-xl font-bold text-white">Equipo y Asignaciones</h1>
          <p className="text-sm text-white/30 mt-1">Gestión del equipo operativo: abogados, paralegales, asesores</p>
        </div>
        <button className="flex items-center gap-2 bg-brand-300 hover:bg-brand-400 text-brand-900 text-sm font-semibold px-4 py-2.5 rounded-lg"><Plus size={16} /> Agregar Miembro</button>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-5">
        <StatCard label="Miembros Activos" value={team.filter(t=>t.status!=='offline').length} subValue={`${team.length} total`} icon={Users} />
        <StatCard label="Casos Activos" value={totalCases} subValue="Distribuidos en equipo" icon={ClipboardList} />
        <StatCard label="Completados (mes)" value={team.reduce((s,t)=>s+t.completedMonth,0)} icon={Clock} trend={14} />
        <StatCard label="Rating Promedio" value={(team.reduce((s,t)=>s+t.rating,0)/team.length).toFixed(1)} subValue="Satisfacción cliente" icon={Star} />
      </div>

      <div className="flex gap-1 bg-surface-1 border border-white/[0.06] rounded-xl p-1.5 mb-4 w-fit">
        {[{ key: 'members', label: 'Equipo' }, { key: 'roles', label: 'Roles y Permisos' }].map(t => (
          <button key={t.key} onClick={() => setTab(t.key)} className={cn('px-4 py-2 rounded-lg text-[12px] font-medium transition-colors', tab === t.key ? 'bg-brand-300/10 text-brand-300' : 'text-white/30 hover:text-white/50')}>
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'members' && (
        <div className="grid grid-cols-2 gap-4">
          {team.map(member => (
            <div key={member.id} className="bg-surface-1 border border-white/[0.06] rounded-xl p-5 hover:border-white/[0.1] transition-colors cursor-pointer">
              <div className="flex items-start gap-4">
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl bg-brand-600/20 flex items-center justify-center text-sm font-bold text-brand-300">{member.initials}</div>
                  <span className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-surface-1 ${statusDot[member.status]}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-[14px] font-semibold text-white">{member.name}</h3>
                    <div className="flex items-center gap-1 text-[11px] text-amber-400">
                      <Star size={11} className="fill-amber-400" /> {member.rating}
                    </div>
                  </div>
                  <p className="text-[12px] text-white/40">{member.role} · {member.specialty}</p>

                  <div className="grid grid-cols-3 gap-3 mt-3 pt-3 border-t border-white/[0.04]">
                    <div>
                      <div className="text-[16px] font-bold text-white">{member.activeCases}</div>
                      <div className="text-[10px] text-white/25">Casos activos</div>
                    </div>
                    <div>
                      <div className="text-[16px] font-bold text-white">{member.completedMonth}</div>
                      <div className="text-[10px] text-white/25">Completados/mes</div>
                    </div>
                    <div>
                      <div className="text-[16px] font-bold text-white">{member.avgTime}</div>
                      <div className="text-[10px] text-white/25">Tiempo promedio</div>
                    </div>
                  </div>

                  {/* Workload bar */}
                  <div className="mt-3">
                    <div className="flex justify-between text-[10px] mb-1">
                      <span className="text-white/25">Carga de trabajo</span>
                      <span className={member.workload > 80 ? 'text-red-400' : member.workload > 60 ? 'text-amber-400' : 'text-emerald-400'}>{member.workload}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/[0.05] rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${member.workload > 80 ? 'bg-red-400' : member.workload > 60 ? 'bg-amber-400' : 'bg-emerald-400'}`} style={{ width: `${member.workload}%` }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'roles' && (
        <div className="space-y-3">
          {roles.map((role, i) => (
            <div key={i} className="bg-surface-1 border border-white/[0.06] rounded-xl p-4 flex items-center justify-between hover:border-white/[0.1] transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-3 h-10 rounded-full" style={{ background: role.color }} />
                <div>
                  <h3 className="text-[14px] font-semibold text-white">{role.name}</h3>
                  <p className="text-[12px] text-white/35 mt-0.5">{role.perms}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-[12px] text-white/25">{role.count} miembro{role.count !== 1 ? 's' : ''}</span>
                <button className="text-[11px] text-brand-300 font-medium hover:underline">Editar permisos</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
