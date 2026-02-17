import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '@/lib/AuthContext'
import AppLayout from '@/components/layout/AppLayout'
import LoginPage from '@/pages/LoginPage'
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

function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth()
  if (loading) return (
    <div className="min-h-screen bg-[#0a0f1a] flex items-center justify-center">
      <div className="text-white/40 text-sm">Cargando...</div>
    </div>
  )
  return isAuthenticated ? children : <Navigate to="/login" replace />
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
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
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
