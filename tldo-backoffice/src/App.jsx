import { Routes, Route } from 'react-router-dom'
import AppLayout from '@/components/layout/AppLayout'
import DashboardPage from '@/pages/DashboardPage'
import OrdersPage from '@/pages/OrdersPage'
import OrderDetailPage from '@/pages/OrderDetailPage'
import ClientsPage from '@/pages/ClientsPage'
import ClientDetailPage from '@/pages/ClientDetailPage'
import CatalogPage from '@/pages/CatalogPage'
import IgualasPage from '@/pages/IgualasPage'
import FinancePage from '@/pages/FinancePage'
import TeamPage from '@/pages/TeamPage'
import MarketingPage from '@/pages/MarketingPage'
import AlliancesPage from '@/pages/AlliancesPage'
import PortalPage from '@/pages/PortalPage'
import SettingsPage from '@/pages/SettingsPage'

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<DashboardPage />} />

        <Route path="/ordenes" element={<OrdersPage />} />
        <Route path="/ordenes/:orderId" element={<OrderDetailPage />} />

        <Route path="/clientes" element={<ClientsPage />} />
        <Route path="/clientes/:clientId" element={<ClientDetailPage />} />

        <Route path="/catalogo" element={<CatalogPage />} />
        <Route path="/igualas" element={<IgualasPage />} />
        <Route path="/finanzas" element={<FinancePage />} />
        <Route path="/equipo" element={<TeamPage />} />
        <Route path="/marketing" element={<MarketingPage />} />
        <Route path="/alianzas" element={<AlliancesPage />} />
        <Route path="/portal" element={<PortalPage />} />
        <Route path="/config" element={<SettingsPage />} />

        {/* 404 */}
        <Route
          path="*"
          element={
            <div className="flex items-center justify-center h-[60vh] text-center">
              <div>
                <div className="text-6xl font-bold text-white/10 mb-2">404</div>
                <p className="text-white/30">Página no encontrada</p>
              </div>
            </div>
          }
        />
      </Route>
    </Routes>
  )
}
