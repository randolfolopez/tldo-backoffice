import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import { Bell, Search } from 'lucide-react'

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-surface-0">
      <Sidebar />

      {/* Main content */}
      <div className="ml-[240px] transition-all duration-300">
        {/* Top bar */}
        <header className="h-16 border-b border-white/[0.06] bg-surface-1/50 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-30">
          <div className="flex items-center gap-3 flex-1 max-w-md">
            <Search size={16} className="text-white/25" />
            <input
              type="text"
              placeholder="Buscar órdenes, clientes, trámites..."
              className="bg-transparent text-sm text-white/70 placeholder:text-white/20 outline-none w-full"
            />
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 rounded-lg hover:bg-white/[0.05] transition-colors">
              <Bell size={18} className="text-white/40" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </button>

            <div className="text-[11px] text-white/25 font-mono">
              {new Date().toLocaleDateString('es-DO', {
                weekday: 'short',
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
