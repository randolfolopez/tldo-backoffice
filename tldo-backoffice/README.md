# tramiteslegales.do — Backoffice

Panel de administración para la plataforma LegalTech **tramiteslegales.do**, operada por **Agilex, SRL**.

## Stack

- **Vite + React** (SPA)
- **Tailwind CSS** (estilos)
- **React Router** (navegación)
- **Recharts** (gráficas)
- **Lucide** (iconos)

## Desarrollo Local

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Abrir http://localhost:3000
```

## Build

```bash
npm run build
# Output en /dist
```

## Deploy en Coolify (Hetzner)

### 1. Crear repo en GitHub

```bash
git init
git add .
git commit -m "feat: backoffice initial structure"
git remote add origin git@github.com:TU_USUARIO/tldo-backoffice.git
git push -u origin main
```

### 2. Configurar en Coolify

1. **New Resource** → **Application** → **GitHub**
2. Seleccionar el repo `tldo-backoffice`
3. **Build Pack**: Dockerfile
4. **Port**: 80
5. **Domain**: `admin.tramiteslegales.do` (o el subdominio que prefieras)
6. **Environment Variables** (Build Args):
   - `VITE_API_URL` = URL de tu backend API
   - `VITE_APP_NAME` = tramiteslegales.do
   - `VITE_APP_ENV` = production
7. **Deploy**

Coolify generará SSL automáticamente con Let's Encrypt.

### 3. Configurar DNS

Apuntar `admin.tramiteslegales.do` al IP de tu servidor Hetzner:

```
A   admin   TU_IP_HETZNER   3600
```

## Estructura del Proyecto

```
tldo-backoffice/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── AppLayout.jsx      # Layout principal con sidebar y topbar
│   │   │   └── Sidebar.jsx        # Navegación lateral colapsable
│   │   ├── orders/
│   │   │   ├── OrderFilters.jsx   # Barra de filtros y búsqueda
│   │   │   ├── OrderKanban.jsx    # Vista Kanban por estados
│   │   │   └── OrderTable.jsx     # Vista tabla de órdenes
│   │   ├── clients/
│   │   │   ├── ClientTable.jsx    # Tabla de clientes con métricas
│   │   │   └── LeadPipeline.jsx   # Pipeline Kanban de leads
│   │   ├── ui/
│   │   │   ├── StatCard.jsx       # Tarjeta de KPI reutilizable
│   │   │   └── StatusBadge.jsx    # Badge de estado de orden
│   │   └── dashboard/             # (componentes específicos del dashboard)
│   ├── pages/
│   │   ├── DashboardPage.jsx      # Dashboard principal con KPIs y gráficas
│   │   ├── OrdersPage.jsx         # Lista de órdenes con filtros y vistas
│   │   ├── OrderDetailPage.jsx    # Detalle de orden: timeline, docs, notas
│   │   ├── ClientsPage.jsx        # CRM: clientes + pipeline de leads
│   │   ├── ClientDetailPage.jsx   # Perfil de cliente: órdenes, comms, notas
│   │   └── PlaceholderPage.jsx    # Placeholder para módulos en desarrollo
│   ├── hooks/                     # Custom hooks
│   ├── lib/
│   │   ├── constants.js           # Navegación, estados, categorías
│   │   ├── mock-data.js           # Datos de prueba
│   │   └── utils.js               # Formateo RD$, fechas, helpers
│   ├── styles/
│   │   └── index.css              # Tailwind + estilos globales
│   ├── App.jsx                    # Router principal
│   └── main.jsx                   # Entry point
├── Dockerfile                     # Build multi-stage para Coolify
├── nginx.conf                     # Config nginx para SPA routing
├── tailwind.config.js
├── vite.config.js
└── package.json
```

## Módulos (11)

| # | Módulo | Estado |
|---|--------|--------|
| 1 | Dashboard | ✅ Implementado |
| 2 | Gestión de Órdenes | ✅ Implementado |
| 3 | CRM / Clientes | ✅ Implementado |
| 4 | Catálogo de Servicios | ✅ Implementado |
| 5 | Igualas / Suscripciones | ✅ Implementado |
| 6 | Finanzas y Facturación | ✅ Implementado |
| 7 | Equipo y Asignaciones | ✅ Implementado |
| 8 | Marketing y Captación | ✅ Implementado |
| 9 | Alianzas Estratégicas | ✅ Implementado |
| 10 | Portal del Cliente | ✅ Implementado |
| 11 | Configuración | ✅ Implementado |

---

**Agilex, SRL** — Operador de tramiteslegales.do
