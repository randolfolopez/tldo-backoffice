import { leadStages, sourceLabels } from '@/lib/mock-clients'
import { formatDate } from '@/lib/utils'
import { User, ArrowRight } from 'lucide-react'

const pipelineColumns = ['new', 'contacted', 'qualified', 'proposal', 'negotiation']

export default function LeadPipeline({ leads }) {
  return (
    <div className="flex gap-3 overflow-x-auto pb-4" style={{ minHeight: 440 }}>
      {pipelineColumns.map((stageKey) => {
        const config = leadStages[stageKey]
        const stageleads = leads.filter((l) => l.stage === stageKey)

        return (
          <div
            key={stageKey}
            className="flex-shrink-0 w-[250px] bg-surface-1/50 border border-white/[0.04] rounded-xl"
          >
            {/* Column header */}
            <div className="px-3.5 py-3 border-b border-white/[0.04] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: config.color }} />
                <span className="text-[12px] font-semibold text-white/60">{config.label}</span>
              </div>
              <span
                className="text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                style={{ background: config.bg, color: config.color }}
              >
                {stageleads.length}
              </span>
            </div>

            {/* Cards */}
            <div className="p-2 space-y-2 max-h-[500px] overflow-y-auto">
              {stageleads.length === 0 && (
                <div className="text-center py-8 text-[11px] text-white/15">Sin leads</div>
              )}

              {stageleads.map((lead) => {
                const source = sourceLabels[lead.source]
                return (
                  <div
                    key={lead.id}
                    className="bg-surface-2 border border-white/[0.06] rounded-lg p-3 cursor-pointer hover:border-white/[0.12] transition-all hover:translate-y-[-1px]"
                  >
                    {/* Score + source */}
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className="text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1"
                        style={{ background: source?.color + '18', color: source?.color }}
                      >
                        {source?.label || lead.source}
                      </span>
                      <div className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        lead.score >= 80 ? 'bg-emerald-400/10 text-emerald-400' :
                        lead.score >= 60 ? 'bg-amber-400/10 text-amber-400' :
                        'bg-white/5 text-white/30'
                      }`}>
                        {lead.score}
                      </div>
                    </div>

                    {/* Name */}
                    <div className="text-[13px] font-medium text-white/65 mb-1">{lead.name}</div>

                    {/* Interest */}
                    <div className="text-[11px] text-white/35 leading-relaxed mb-3 line-clamp-2">
                      {lead.interest}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-2 border-t border-white/[0.04]">
                      <span className="text-[10px] text-white/20">{formatDate(lead.capturedAt)}</span>
                      {lead.assignee ? (
                        <div className="flex items-center gap-1 text-[10px] text-white/30">
                          <User size={10} />
                          {lead.assignee}
                        </div>
                      ) : (
                        <span className="text-[10px] text-red-400/50 italic">Sin asignar</span>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}

      {/* Won column (summary) */}
      <div className="flex-shrink-0 w-[200px] bg-emerald-400/[0.03] border border-emerald-400/10 rounded-xl flex items-center justify-center">
        <div className="text-center p-4">
          <div className="text-3xl font-bold text-emerald-400 mb-1">
            {leads.filter(l => l.stage === 'won').length}
          </div>
          <div className="text-[11px] text-emerald-400/50 font-medium">Convertidos</div>
          <ArrowRight size={16} className="text-emerald-400/30 mx-auto mt-3" />
          <div className="text-[10px] text-emerald-400/30 mt-1">→ Clientes</div>
        </div>
      </div>
    </div>
  )
}
