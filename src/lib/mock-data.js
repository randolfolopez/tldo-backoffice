// Mock data for development — replace with API calls

export const dashboardKpis = {
  ordersActive: 24,
  ordersCompleted: 156,
  revenueMonth: 1285000,
  revenueToday: 87500,
  leadsNew: 38,
  conversionF2P: 6.2,
  nps: 72,
  cac: 3200,
}

export const revenueData = [
  { month: 'Ene', revenue: 420000, target: 500000 },
  { month: 'Feb', revenue: 580000, target: 600000 },
  { month: 'Mar', revenue: 710000, target: 700000 },
  { month: 'Abr', revenue: 890000, target: 800000 },
  { month: 'May', revenue: 1050000, target: 900000 },
  { month: 'Jun', revenue: 1285000, target: 1000000 },
]

export const topTramites = [
  { name: 'Constitución SRL', count: 32, revenue: 1216000, pct: 21 },
  { name: 'Registro de Marca', count: 28, revenue: 784000, pct: 18 },
  { name: 'Divorcio Mutuo Acuerdo', count: 22, revenue: 770000, pct: 14 },
  { name: 'Contratos (NDA/Servicios)', count: 45, revenue: 292500, pct: 29 },
  { name: 'Nombre Comercial', count: 18, revenue: 324000, pct: 12 },
]

export const recentOrders = [
  {
    id: 'ORD-001247',
    client: 'María González',
    tramite: 'Constitución de Compañía (SRL)',
    category: 'societario',
    status: 'processing',
    amount: 38000,
    assignee: 'Lic. Ramírez',
    createdAt: '2026-02-14',
    dueDate: '2026-03-10',
  },
  {
    id: 'ORD-001246',
    client: 'TechStart, SRL',
    tramite: 'Registro de Marca (1 clase)',
    category: 'pi',
    status: 'waiting_entity',
    amount: 28000,
    assignee: 'Lic. Peña',
    createdAt: '2026-02-12',
    dueDate: '2026-06-15',
  },
  {
    id: 'ORD-001245',
    client: 'José Martínez',
    tramite: 'Divorcio por Mutuo Acuerdo',
    category: 'familia',
    status: 'review',
    amount: 35000,
    assignee: 'Lic. Santos',
    createdAt: '2026-02-13',
    dueDate: '2026-04-10',
  },
  {
    id: 'ORD-001244',
    client: 'Inversiones Caribe',
    tramite: 'Contrato de Alquiler',
    category: 'contratos',
    status: 'completed',
    amount: 8500,
    assignee: 'Paralegal Díaz',
    createdAt: '2026-02-10',
    dueDate: '2026-02-12',
  },
  {
    id: 'ORD-001243',
    client: 'Ana Fernández',
    tramite: 'Certificación Buena Conducta',
    category: 'certificaciones',
    status: 'delivered',
    amount: 4500,
    assignee: 'Paralegal Díaz',
    createdAt: '2026-02-08',
    dueDate: '2026-02-13',
  },
  {
    id: 'ORD-001242',
    client: 'Pedro Almonte',
    tramite: 'Registro Reglamento Interno',
    category: 'laboral',
    status: 'needs_info',
    amount: 18000,
    assignee: 'Lic. Ramírez',
    createdAt: '2026-02-11',
    dueDate: '2026-03-01',
  },
]

export const alerts = [
  { type: 'warning', message: 'ORD-001242 requiere documentos del cliente (3 días sin respuesta)', time: 'Hace 2h' },
  { type: 'urgent', message: 'ORD-001239 vence mañana — esperando respuesta de ONAPI', time: 'Hace 4h' },
  { type: 'info', message: '5 nuevos leads del Calculadora Laboral pendientes de asignación', time: 'Hace 6h' },
  { type: 'success', message: 'ORD-001244 completada y entregada al cliente', time: 'Hoy 9:15 AM' },
  { type: 'payment', message: 'Pago pendiente de Inversiones Caribe — RD$28,000 (Iguala Profesional)', time: 'Ayer' },
]

export const leadsByChannel = [
  { channel: 'Calc. Laboral', leads: 14, converted: 2 },
  { channel: 'Simulador ONAPI', leads: 8, converted: 1 },
  { channel: 'Google Ads', leads: 6, converted: 2 },
  { channel: 'WhatsApp', leads: 5, converted: 3 },
  { channel: 'Referidos', leads: 3, converted: 2 },
  { channel: 'Meta Ads', leads: 2, converted: 0 },
]
