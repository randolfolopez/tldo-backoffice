import { ORDER_STATUSES } from '@/lib/constants'

export default function StatusBadge({ status }) {
  const config = ORDER_STATUSES[status]
  if (!config) return null

  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold"
      style={{ background: config.bg, color: config.color }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: config.color }} />
      {config.label}
    </span>
  )
}
