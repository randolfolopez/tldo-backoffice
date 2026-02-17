export default function PortalPage() {
  return (
    <div className="p-6 space-y-4">
      <div>
        <h1 className="text-xl font-bold text-white">Portal del Cliente</h1>
        <p className="text-white/40 text-sm mt-0.5">Configuración del portal de autoservicio para clientes</p>
      </div>
      <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-8 text-center">
        <p className="text-4xl mb-3">🔒</p>
        <p className="text-white/60 text-sm">Módulo en desarrollo</p>
        <p className="text-white/30 text-xs mt-1">Portal de autoservicio donde los clientes podrán ver el estado de sus trámites, subir documentos y comunicarse con el equipo.</p>
      </div>
    </div>
  )
}
