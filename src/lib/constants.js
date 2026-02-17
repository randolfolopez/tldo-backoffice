import {
  LayoutDashboard,
  ClipboardList,
  Users,
  Scale,
  RefreshCcw,
  DollarSign,
  UserCog,
  Megaphone,
  Handshake,
  Monitor,
  Settings,
} from 'lucide-react'

export const NAV_ITEMS = [
  { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/' },
  { key: 'ordenes', label: 'Órdenes', icon: ClipboardList, path: '/ordenes', badge: 12 },
  { key: 'clientes', label: 'Clientes / CRM', icon: Users, path: '/clientes' },
  { key: 'catalogo', label: 'Catálogo', icon: Scale, path: '/catalogo' },
  { key: 'igualas', label: 'Igualas', icon: RefreshCcw, path: '/igualas' },
  { key: 'finanzas', label: 'Finanzas', icon: DollarSign, path: '/finanzas' },
  { key: 'equipo', label: 'Equipo', icon: UserCog, path: '/equipo' },
  { key: 'marketing', label: 'Marketing', icon: Megaphone, path: '/marketing' },
  { key: 'alianzas', label: 'Alianzas', icon: Handshake, path: '/alianzas' },
  { key: 'portal', label: 'Portal Cliente', icon: Monitor, path: '/portal' },
  { key: 'config', label: 'Configuración', icon: Settings, path: '/config' },
]

export const ORDER_STATUSES = {
  received: { label: 'Recibida', color: '#6366f1', bg: 'rgba(99,102,241,0.12)' },
  review: { label: 'En Revisión', color: '#f59e0b', bg: 'rgba(245,158,11,0.12)' },
  processing: { label: 'En Proceso', color: '#3b82f6', bg: 'rgba(59,130,246,0.12)' },
  waiting_entity: { label: 'Esperando Entidad', color: '#8b5cf6', bg: 'rgba(139,92,246,0.12)' },
  completed: { label: 'Completada', color: '#10b981', bg: 'rgba(16,185,129,0.12)' },
  delivered: { label: 'Entregada', color: '#06b6d4', bg: 'rgba(6,182,212,0.12)' },
  paused: { label: 'Pausada', color: '#6b7280', bg: 'rgba(107,114,128,0.12)' },
  needs_info: { label: 'Requiere Info', color: '#ef4444', bg: 'rgba(239,68,68,0.12)' },
  cancelled: { label: 'Cancelada', color: '#dc2626', bg: 'rgba(220,38,38,0.12)' },
}

export const TRAMITE_CATEGORIES = [
  { key: 'societario', label: 'Societario', color: '#0F4C75' },
  { key: 'pi', label: 'Propiedad Intelectual', color: '#1B6B93' },
  { key: 'familia', label: 'Familia', color: '#3A7CA5' },
  { key: 'contratos', label: 'Contratos', color: '#2C5F7C' },
  { key: 'laboral', label: 'Laboral', color: '#1A5276' },
  { key: 'inmobiliario', label: 'Inmobiliario', color: '#154360' },
  { key: 'certificaciones', label: 'Certificaciones', color: '#0B3C5D' },
]
