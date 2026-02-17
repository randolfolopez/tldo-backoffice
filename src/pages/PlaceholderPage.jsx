import { Construction } from 'lucide-react'

export default function PlaceholderPage({ title, description, items = [] }) {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-bold text-white">{title}</h1>
        <p className="text-sm text-white/30 mt-1">{description}</p>
      </div>

      <div className="bg-surface-1 border border-white/[0.06] rounded-xl p-12 text-center">
        <div className="w-16 h-16 rounded-2xl bg-brand-300/10 flex items-center justify-center mx-auto mb-4">
          <Construction size={28} className="text-brand-300" />
        </div>
        <h2 className="text-lg font-semibold text-white/70 mb-2">Módulo en Desarrollo</h2>
        <p className="text-sm text-white/30 max-w-md mx-auto mb-6">
          Este módulo está planificado y será implementado en las próximas iteraciones del backoffice.
        </p>

        {items.length > 0 && (
          <div className="max-w-sm mx-auto text-left">
            <p className="text-[11px] font-semibold text-white/25 uppercase tracking-wider mb-3">
              Funcionalidades planificadas
            </p>
            <div className="space-y-2">
              {items.map((item, i) => (
                <div key={i} className="flex items-center gap-2.5 text-[13px] text-white/40">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-300/40" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
