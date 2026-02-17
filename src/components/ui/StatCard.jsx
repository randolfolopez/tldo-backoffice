import { cn } from '@/lib/utils'
import { TrendingUp, TrendingDown } from 'lucide-react'

export default function StatCard({ label, value, subValue, icon: Icon, trend, trendLabel, className }) {
  const isPositive = trend > 0

  return (
    <div
      className={cn(
        'bg-surface-1 border border-white/[0.06] rounded-xl p-5 hover:border-white/[0.1] transition-colors',
        className
      )}
    >
      <div className="flex items-start justify-between mb-3">
        <span className="text-[11px] font-semibold text-white/35 uppercase tracking-wider">
          {label}
        </span>
        {Icon && (
          <div className="w-8 h-8 rounded-lg bg-brand-300/10 flex items-center justify-center">
            <Icon size={16} className="text-brand-300" />
          </div>
        )}
      </div>

      <div className="text-2xl font-bold text-white tracking-tight">{value}</div>

      <div className="flex items-center justify-between mt-2">
        {subValue && (
          <span className="text-[12px] text-white/30">{subValue}</span>
        )}
        {trend !== undefined && (
          <div
            className={cn(
              'flex items-center gap-1 text-[11px] font-semibold',
              isPositive ? 'text-emerald-400' : 'text-red-400'
            )}
          >
            {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            <span>{isPositive ? '+' : ''}{trend}%</span>
            {trendLabel && <span className="text-white/20 font-normal ml-1">{trendLabel}</span>}
          </div>
        )}
      </div>
    </div>
  )
}
