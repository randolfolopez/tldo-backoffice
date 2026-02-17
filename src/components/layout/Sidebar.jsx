import { NavLink } from 'react-router-dom'
import { useAuth } from '@/lib/AuthContext'
import { NAV_ITEMS } from '@/lib/constants'

export default function Sidebar({ collapsed, onToggle }) {
  const { user, logout } = useAuth()

  return (
    <aside className={`fixed top-0 left-0 h-screen bg-[#0c1220] border-r border-white/[0.06] z-40 flex flex-col transition-all duration-200 ${collapsed ? 'w-16' : 'w-56'}`}>
      {/* Logo */}
      <div className="h-14 flex items-center px-4 border-b border-white/[0.06] shrink-0">
        <button onClick={onToggle} className="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-white/10 flex items-center justify-center text-sm shrink-0">⚖️</div>
          {!collapsed && <span className="text-sm font-bold text-white tracking-tight">tramiteslegales</span>}
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
        {NAV_ITEMS.map(item => (
          <NavLink key={item.path} to={item.path} end={item.path === '/'}
            className={({ isActive }) => `flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm transition-all ${isActive ? 'bg-blue-500/10 text-blue-400' : 'text-white/40 hover:text-white/60 hover:bg-white/[0.03]'}`}>
            <span className="text-base w-5 text-center shrink-0">{item.icon}</span>
            {!collapsed && <span className="truncate">{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* User / Logout */}
      <div className="border-t border-white/[0.06] p-3 shrink-0">
        {!collapsed ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-white/10 flex items-center justify-center text-[10px] font-bold text-white/50 shrink-0">
                {user?.name?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || '?'}
              </div>
              <div className="min-w-0">
                <p className="text-xs text-white/60 truncate">{user?.name || 'Usuario'}</p>
                <p className="text-[10px] text-white/25 capitalize">{user?.role}</p>
              </div>
            </div>
            <button onClick={logout} className="text-white/20 hover:text-red-400 transition-colors" title="Cerrar sesión">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
            </button>
          </div>
        ) : (
          <button onClick={logout} className="w-full flex justify-center text-white/20 hover:text-red-400 transition-colors" title="Cerrar sesión">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
          </button>
        )}
      </div>
    </aside>
  )
}
