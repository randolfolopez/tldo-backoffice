import { useState, useMemo } from 'react'
import { Search, Plus, Users, UserPlus, DollarSign, Target } from 'lucide-react'
import { clients, leads, clientStats, sourceLabels } from '@/lib/mock-clients'
import { formatRD } from '@/lib/utils'
import { cn } from '@/lib/utils'
import StatCard from '@/components/ui/StatCard'
import ClientTable from '@/components/clients/ClientTable'
import LeadPipeline from '@/components/clients/LeadPipeline'

export default function ClientsPage() {
  const [activeTab, setActiveTab] = useState('clients')
  const [search, setSearch] = useState('')
  const [segmentFilter, setSegmentFilter] = useState('')
  const [sourceFilter, setSourceFilter] = useState('')

  const filteredClients = useMemo(() => {
    return clients.filter((c) => {
      if (search) {
        const s = search.toLowerCase()
        if (!c.name.toLowerCase().includes(s) && !c.id.toLowerCase().includes(s) && !c.email.toLowerCase().includes(s)) return false
      }
      if (segmentFilter && c.segment !== segmentFilter) return false
      if (sourceFilter && c.source !== sourceFilter) return false
      return true
    })
  }, [search, segmentFilter, sourceFilter])

  const filteredLeads = useMemo(() => {
    return leads.filter((l) => {
      if (search) {
        const s = search.toLowerCase()
        if (!l.name.toLowerCase().includes(s) && !l.interest.toLowerCase().includes(s)) return false
      }
      if (sourceFilter && l.source !== sourceFilter) return false
      return true
    })
  }, [search, sourceFilter])

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-xl font-bold text-white">CRM / Clientes</h1>
          <p className="text-sm text-white/30 mt-1">Base de datos de clientes, leads y relaciones comerciales</p>
        </div>
        <button className="flex items-center gap-2 bg-brand-300 hover:bg-brand-400 text-brand-900 text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors">
          <Plus size={16} />
          {activeTab === 'clients' ? 'Nuevo Cliente' : 'Nuevo Lead'}
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-4 mb-5">
        <StatCard
          label="Total Clientes"
          value={clientStats.totalClients}
          subValue={`${clientStats.active} activos`}
          icon={Users}
          trend={15}
          trendLabel="vs mes ant."
        />
        <StatCard
          label="Leads Activos"
          value={clientStats.totalLeads}
          subValue={`${clientStats.newLeads} nuevos esta semana`}
          icon={UserPlus}
          trend={22}
          trendLabel="vs mes ant."
        />
        <StatCard
          label="Ingresos Totales"
          value={formatRD(clientStats.totalRevenue)}
          subValue="Clientes activos"
          icon={DollarSign}
          trend={18}
          trendLabel="vs mes ant."
        />
        <StatCard
          label="Ticket Promedio"
          value={formatRD(clientStats.avgTicket)}
          subValue="Por orden"
          icon={Target}
          trend={5}
          trendLabel="vs mes ant."
        />
      </div>

      {/* Tabs */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-1 bg-surface-1 border border-white/[0.06] rounded-xl p-1.5">
          {[
            { key: 'clients', label: 'Clientes', icon: Users, count: clients.length },
            { key: 'leads', label: 'Pipeline de Leads', icon: UserPlus, count: leads.length },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => { setActiveTab(tab.key); setSearch(''); setSegmentFilter(''); setSourceFilter('') }}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-lg text-[12px] font-medium transition-colors',
                activeTab === tab.key
                  ? 'bg-brand-300/10 text-brand-300'
                  : 'text-white/30 hover:text-white/50'
              )}
            >
              <tab.icon size={14} />
              {tab.label}
              <span className={`text-[10px] font-bold ${activeTab === tab.key ? 'text-brand-300/50' : 'text-white/15'}`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 bg-surface-2 border border-white/[0.06] rounded-lg px-3 py-2 w-64">
            <Search size={14} className="text-white/25" />
            <input
              type="text"
              placeholder={activeTab === 'clients' ? 'Buscar cliente...' : 'Buscar lead...'}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent text-sm text-white/70 placeholder:text-white/20 outline-none w-full"
            />
          </div>

          {activeTab === 'clients' && (
            <select
              value={segmentFilter}
              onChange={(e) => setSegmentFilter(e.target.value)}
              className="bg-surface-2 border border-white/[0.06] rounded-lg px-3 py-2 text-sm text-white/60 outline-none cursor-pointer"
            >
              <option value="">Todos los segmentos</option>
              <option value="b2c">B2C Personal</option>
              <option value="emprendedor">Emprendedor</option>
              <option value="pyme">PYME</option>
              <option value="empresa">Empresa</option>
              <option value="diaspora">Diáspora</option>
            </select>
          )}

          <select
            value={sourceFilter}
            onChange={(e) => setSourceFilter(e.target.value)}
            className="bg-surface-2 border border-white/[0.06] rounded-lg px-3 py-2 text-sm text-white/60 outline-none cursor-pointer"
          >
            <option value="">Todos los canales</option>
            {Object.entries(sourceLabels).map(([key, val]) => (
              <option key={key} value={key}>{val.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Content */}
      {activeTab === 'clients' ? (
        <ClientTable clients={filteredClients} />
      ) : (
        <LeadPipeline leads={filteredLeads} />
      )}
    </div>
  )
}
