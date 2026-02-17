import { useState } from 'react'
import { useApi } from '@/lib/hooks'
import api from '@/lib/api'
import { formatRD, formatDate } from '@/lib/utils'

const statusColors = { pending: 'text-yellow-400', paid: 'text-green-400', partial: 'text-orange-400', overdue: 'text-red-400', cancelled: 'text-red-400/50' }

export default function FinancePage() {
  const [statusFilter, setStatusFilter] = useState('')
  const { data, loading, error, refetch } = useApi(
    () => api.getInvoices({ status: statusFilter || undefined }),
    [statusFilter]
  )

  const invoices = data?.data || []
  const [payingId, setPayingId] = useState(null)

  const recordPayment = async (invoiceId, total) => {
    const method = prompt('Método de pago (transferencia, efectivo, tarjeta, cheque):')
    if (!method) return
    setPayingId(invoiceId)
    try {
      await api.payInvoice(invoiceId, { amount: total, method, reference: `PAY-${Date.now()}` })
      refetch()
    } catch (err) { alert(err.message) }
    finally { setPayingId(null) }
  }

  return (
    <div className="p-6 space-y-4">
      <div>
        <h1 className="text-xl font-bold text-white">Finanzas — Facturación</h1>
        <p className="text-white/40 text-sm mt-0.5">{data?.total || 0} facturas</p>
      </div>

      <div className="flex items-center gap-3">
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
          className="bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-white/70 focus:outline-none">
          <option value="">Todos los estados</option>
          <option value="pending">Pendiente</option>
          <option value="paid">Pagada</option>
          <option value="partial">Parcial</option>
          <option value="overdue">Vencida</option>
        </select>
      </div>

      {loading ? <div className="text-white/40 text-sm py-8 text-center">Cargando...</div> :
      error ? <div className="text-red-400 text-sm py-8 text-center">Error: {error}</div> : (
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-white/[0.06] text-white/40 text-xs uppercase tracking-wider">
              <th className="text-left p-3 pl-4">Factura</th><th className="text-left p-3">Cliente</th>
              <th className="text-left p-3">Estado</th><th className="text-right p-3">Subtotal</th>
              <th className="text-right p-3">ITBIS</th><th className="text-right p-3">Total</th>
              <th className="text-left p-3">Vencimiento</th><th className="p-3 pr-4"></th>
            </tr></thead>
            <tbody className="divide-y divide-white/[0.04]">
              {invoices.map(inv => (
                <tr key={inv.id} className="hover:bg-white/[0.02]">
                  <td className="p-3 pl-4 font-mono text-white/50">{inv.display_id}</td>
                  <td className="p-3 text-white/70">{inv.client_name}</td>
                  <td className={`p-3 text-xs font-medium capitalize ${statusColors[inv.status] || 'text-white/40'}`}>{inv.status}</td>
                  <td className="p-3 text-right text-white/50">{formatRD(inv.subtotal)}</td>
                  <td className="p-3 text-right text-white/30">{formatRD(inv.tax)}</td>
                  <td className="p-3 text-right text-white/70 font-medium">{formatRD(inv.total)}</td>
                  <td className="p-3 text-white/30 text-xs">{inv.due_date ? formatDate(inv.due_date) : '—'}</td>
                  <td className="p-3 pr-4">
                    {inv.status !== 'paid' && inv.status !== 'cancelled' && (
                      <button onClick={() => recordPayment(inv.id, inv.total)} disabled={payingId === inv.id}
                        className="text-[10px] px-2 py-1 rounded bg-green-500/10 text-green-400 hover:bg-green-500/20 disabled:opacity-50">
                        {payingId === inv.id ? '...' : 'Pagar'}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {invoices.length === 0 && <div className="text-center py-8 text-white/30 text-sm">No hay facturas</div>}
        </div>
      )}
    </div>
  )
}
