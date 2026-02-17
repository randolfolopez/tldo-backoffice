import { NavLink } from 'react-router-dom'
import { NAV_ITEMS } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { LogOut, ChevronLeft } from 'lucide-react'
import { useState } from 'react'

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside
      className={cn(
        'fixed top-0 left-0 h-screen bg-surface-1 border-r border-white/[0.06] flex flex-col z-40 transition-all duration-300',
        collapsed ? 'w-[68px]' : 'w-[240px]'
      )}
    >
      {/* Brand */}
      <div className="h-16 flex items-center gap-3 px-4 border-b border-white/[0.06] flex-shrink-0">
        <div className="w-9 h-9 rounded-lg bg-brand-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
          ⚖️
        </div>
        {!collapsed && (
          <div className="min-w-0">
            <div className="text-sm font-bold text-white truncate leading-tight">
              tramiteslegales.do
            </div>
            <div className="text-[10px] text-white/30 font-medium tracking-wider uppercase">
              Backoffice
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-3 px-2">
        <div className="space-y-0.5">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.key}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium transition-all group',
                  isActive
                    ? 'bg-brand-300/10 text-brand-300'
                    : 'text-white/40 hover:text-white/70 hover:bg-white/[0.03]'
                )
              }
            >
              <item.icon size={18} className="flex-shrink-0" />
              {!collapsed && (
                <>
                  <span className="flex-1 truncate">{item.label}</span>
                  {item.badge && (
                    <span className="bg-brand-300/20 text-brand-300 text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center">
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Footer */}
      <div className="border-t border-white/[0.06] p-2 flex-shrink-0">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] text-white/30 hover:text-white/60 hover:bg-white/[0.03] w-full transition-all"
        >
          <ChevronLeft
            size={18}
            className={cn('transition-transform', collapsed && 'rotate-180')}
          />
          {!collapsed && <span>Colapsar</span>}
        </button>

        {!collapsed && (
          <div className="flex items-center gap-3 px-3 py-2.5 mt-1">
            <div className="w-7 h-7 rounded-full bg-brand-500/30 flex items-center justify-center text-[11px] font-bold text-brand-300 flex-shrink-0">
              AD
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[12px] font-medium text-white/60 truncate">Admin</div>
              <div className="text-[10px] text-white/25 truncate">Superadmin</div>
            </div>
            <LogOut size={14} className="text-white/20 hover:text-white/50 cursor-pointer flex-shrink-0" />
          </div>
        )}
      </div>
    </aside>
  )
}
