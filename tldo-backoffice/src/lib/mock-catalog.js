// Catalog of 40 legal services for tramiteslegales.do

export const tramites = [
  // SOCIETARIO (1-6)
  { id: 'T-001', name: 'Constitución de Compañía (SRL)', category: 'societario', price: 38000, tasas: 12000, timeEstimate: '15-20 días hábiles', automation: 'high', automationPct: 85, entity: 'Cámara de Comercio / DGII', law: 'Ley 479-08', active: true, orders: 32, revenue: 1216000 },
  { id: 'T-002', name: 'Constitución de Compañía (SA)', category: 'societario', price: 55000, tasas: 18000, timeEstimate: '20-25 días hábiles', automation: 'high', automationPct: 80, entity: 'Cámara de Comercio / DGII', law: 'Ley 479-08', active: true, orders: 8, revenue: 440000 },
  { id: 'T-003', name: 'Modificación de Estatutos', category: 'societario', price: 22000, tasas: 5000, timeEstimate: '10-15 días', automation: 'medium', automationPct: 60, entity: 'Cámara de Comercio', law: 'Ley 479-08', active: true, orders: 5, revenue: 110000 },
  { id: 'T-004', name: 'Disolución y Liquidación', category: 'societario', price: 35000, tasas: 8000, timeEstimate: '30-45 días', automation: 'low', automationPct: 40, entity: 'Cámara de Comercio / DGII', law: 'Ley 479-08', active: true, orders: 2, revenue: 70000 },
  { id: 'T-005', name: 'Cambio de Denominación Social', category: 'societario', price: 18000, tasas: 5000, timeEstimate: '10-15 días', automation: 'high', automationPct: 75, entity: 'Cámara de Comercio', law: 'Ley 479-08', active: true, orders: 3, revenue: 54000 },
  { id: 'T-006', name: 'Aumento de Capital Social', category: 'societario', price: 20000, tasas: 5000, timeEstimate: '10-15 días', automation: 'medium', automationPct: 65, entity: 'Cámara de Comercio / DGII', law: 'Ley 479-08', active: true, orders: 4, revenue: 80000 },

  // PROPIEDAD INTELECTUAL (7-12)
  { id: 'T-007', name: 'Registro de Marca (1 clase)', category: 'pi', price: 28000, tasas: 6370, timeEstimate: '4-5 meses', automation: 'high', automationPct: 80, entity: 'ONAPI', law: 'Ley 20-00', active: true, orders: 28, revenue: 784000 },
  { id: 'T-008', name: 'Registro de Nombre Comercial', category: 'pi', price: 18000, tasas: 4755, timeEstimate: '2-3 meses', automation: 'high', automationPct: 85, entity: 'ONAPI', law: 'Ley 20-00', active: true, orders: 18, revenue: 324000 },
  { id: 'T-009', name: 'Renovación de Marca', category: 'pi', price: 15000, tasas: 4755, timeEstimate: '1-2 meses', automation: 'high', automationPct: 90, entity: 'ONAPI', law: 'Ley 20-00', active: true, orders: 6, revenue: 90000 },
  { id: 'T-010', name: 'Registro de Lema Comercial', category: 'pi', price: 16000, tasas: 4755, timeEstimate: '2-3 meses', automation: 'high', automationPct: 85, entity: 'ONAPI', law: 'Ley 20-00', active: true, orders: 3, revenue: 48000 },
  { id: 'T-011', name: 'Oposición a Registro de Marca', category: 'pi', price: 35000, tasas: 3000, timeEstimate: '3-6 meses', automation: 'low', automationPct: 30, entity: 'ONAPI', law: 'Ley 20-00', active: true, orders: 2, revenue: 70000 },
  { id: 'T-012', name: 'Búsqueda de Anterioridad ONAPI', category: 'pi', price: 5000, tasas: 0, timeEstimate: '24-48 horas', automation: 'high', automationPct: 95, entity: 'ONAPI', law: 'Ley 20-00', active: true, orders: 15, revenue: 75000 },

  // FAMILIA (13-18)
  { id: 'T-013', name: 'Divorcio por Mutuo Acuerdo', category: 'familia', price: 35000, tasas: 5000, timeEstimate: '45-60 días', automation: 'high', automationPct: 75, entity: 'Tribunal de Familia', law: 'Código Civil', active: true, orders: 22, revenue: 770000 },
  { id: 'T-014', name: 'Divorcio por Causa Determinada', category: 'familia', price: 65000, tasas: 8000, timeEstimate: '3-6 meses', automation: 'low', automationPct: 35, entity: 'Tribunal de Familia', law: 'Código Civil', active: true, orders: 5, revenue: 325000 },
  { id: 'T-015', name: 'Pensión Alimentaria', category: 'familia', price: 25000, tasas: 3000, timeEstimate: '30-60 días', automation: 'medium', automationPct: 55, entity: 'Tribunal de Familia', law: 'Ley 136-03', active: true, orders: 8, revenue: 200000 },
  { id: 'T-016', name: 'Reconocimiento de Hijo/a', category: 'familia', price: 12000, tasas: 2000, timeEstimate: '15-30 días', automation: 'high', automationPct: 80, entity: 'Oficialía del Estado Civil', law: 'Ley 659', active: true, orders: 4, revenue: 48000 },
  { id: 'T-017', name: 'Acto de Notoriedad', category: 'familia', price: 15000, tasas: 2000, timeEstimate: '7-15 días', automation: 'high', automationPct: 85, entity: 'Notaría', law: 'Código Civil', active: true, orders: 6, revenue: 90000 },
  { id: 'T-018', name: 'Autorización de Viaje Menor', category: 'familia', price: 8000, tasas: 500, timeEstimate: '24-48 horas', automation: 'high', automationPct: 95, entity: 'Notaría / PGR', law: 'Ley 136-03', active: true, orders: 12, revenue: 96000 },

  // CONTRATOS (19-25)
  { id: 'T-019', name: 'Contrato de Alquiler', category: 'contratos', price: 8500, tasas: 500, timeEstimate: '24-48 horas', automation: 'high', automationPct: 95, entity: 'Notaría', law: 'Código Civil', active: true, orders: 35, revenue: 297500 },
  { id: 'T-020', name: 'Contratos Sencillos (NDA, Servicios)', category: 'contratos', price: 6500, tasas: 0, timeEstimate: '24-48 horas', automation: 'high', automationPct: 95, entity: 'N/A', law: 'Código Civil', active: true, orders: 45, revenue: 292500 },
  { id: 'T-021', name: 'Contrato de Compraventa Inmueble', category: 'contratos', price: 45000, tasas: 5000, timeEstimate: '5-10 días', automation: 'medium', automationPct: 70, entity: 'Notaría / Registro de Títulos', law: 'Ley 108-05', active: true, orders: 10, revenue: 450000 },
  { id: 'T-022', name: 'Contrato de Trabajo', category: 'contratos', price: 7500, tasas: 0, timeEstimate: '24-48 horas', automation: 'high', automationPct: 95, entity: 'N/A', law: 'Ley 16-92', active: true, orders: 20, revenue: 150000 },
  { id: 'T-023', name: 'Contrato de Sociedad / Joint Venture', category: 'contratos', price: 35000, tasas: 0, timeEstimate: '5-10 días', automation: 'medium', automationPct: 60, entity: 'N/A', law: 'Código Civil', active: true, orders: 3, revenue: 105000 },
  { id: 'T-024', name: 'Poder de Representación', category: 'contratos', price: 8000, tasas: 1500, timeEstimate: '24-48 horas', automation: 'high', automationPct: 90, entity: 'Notaría', law: 'Código Civil', active: true, orders: 18, revenue: 144000 },
  { id: 'T-025', name: 'Términos y Condiciones Web', category: 'contratos', price: 12000, tasas: 0, timeEstimate: '3-5 días', automation: 'high', automationPct: 90, entity: 'N/A', law: 'Ley 172-13', active: true, orders: 14, revenue: 168000 },

  // LABORAL (26-31)
  { id: 'T-026', name: 'Registro Reglamento Interno', category: 'laboral', price: 18000, tasas: 2000, timeEstimate: '15-20 días', automation: 'medium', automationPct: 65, entity: 'Ministerio de Trabajo', law: 'Ley 16-92', active: true, orders: 7, revenue: 126000 },
  { id: 'T-027', name: 'Demanda Laboral por Desahucio', category: 'laboral', price: 35000, tasas: 3000, timeEstimate: '2-4 meses', automation: 'low', automationPct: 35, entity: 'Juzgado de Trabajo', law: 'Ley 16-92', active: true, orders: 6, revenue: 210000 },
  { id: 'T-028', name: 'Cálculo de Liquidación Laboral', category: 'laboral', price: 5000, tasas: 0, timeEstimate: '24 horas', automation: 'high', automationPct: 95, entity: 'N/A', law: 'Ley 16-92', active: true, orders: 25, revenue: 125000 },
  { id: 'T-029', name: 'Contrato Colectivo de Trabajo', category: 'laboral', price: 45000, tasas: 3000, timeEstimate: '15-30 días', automation: 'low', automationPct: 40, entity: 'Ministerio de Trabajo', law: 'Ley 16-92', active: false, orders: 1, revenue: 45000 },
  { id: 'T-030', name: 'Asesoría Laboral Empresarial', category: 'laboral', price: 25000, tasas: 0, timeEstimate: '5-10 días', automation: 'medium', automationPct: 50, entity: 'N/A', law: 'Ley 16-92', active: true, orders: 4, revenue: 100000 },
  { id: 'T-031', name: 'Mediación Laboral', category: 'laboral', price: 20000, tasas: 1500, timeEstimate: '15-30 días', automation: 'low', automationPct: 25, entity: 'Ministerio de Trabajo', law: 'Ley 16-92', active: true, orders: 3, revenue: 60000 },

  // INMOBILIARIO (32-36)
  { id: 'T-032', name: 'Transferencia de Título de Propiedad', category: 'inmobiliario', price: 45000, tasas: 15000, timeEstimate: '30-45 días', automation: 'medium', automationPct: 55, entity: 'Registro de Títulos', law: 'Ley 108-05', active: true, orders: 8, revenue: 360000 },
  { id: 'T-033', name: 'Deslinde y Mensura', category: 'inmobiliario', price: 55000, tasas: 20000, timeEstimate: '2-4 meses', automation: 'low', automationPct: 30, entity: 'Tribunal de Tierras', law: 'Ley 108-05', active: true, orders: 3, revenue: 165000 },
  { id: 'T-034', name: 'Certificación de Estado Jurídico', category: 'inmobiliario', price: 8000, tasas: 2000, timeEstimate: '5-10 días', automation: 'high', automationPct: 85, entity: 'Registro de Títulos', law: 'Ley 108-05', active: true, orders: 12, revenue: 96000 },
  { id: 'T-035', name: 'Hipoteca / Levantamiento de Hipoteca', category: 'inmobiliario', price: 30000, tasas: 10000, timeEstimate: '15-30 días', automation: 'medium', automationPct: 50, entity: 'Registro de Títulos', law: 'Ley 108-05', active: true, orders: 4, revenue: 120000 },
  { id: 'T-036', name: 'Due Diligence Inmobiliario', category: 'inmobiliario', price: 25000, tasas: 3000, timeEstimate: '7-15 días', automation: 'medium', automationPct: 60, entity: 'Varios', law: 'Ley 108-05', active: true, orders: 6, revenue: 150000 },

  // CERTIFICACIONES (37-40)
  { id: 'T-037', name: 'Certificación Buena Conducta', category: 'certificaciones', price: 4500, tasas: 500, timeEstimate: '3-5 días', automation: 'high', automationPct: 80, entity: 'PGR', law: 'Código Penal', active: true, orders: 30, revenue: 135000 },
  { id: 'T-038', name: 'Obtención Acta de Nacimiento', category: 'certificaciones', price: 2800, tasas: 200, timeEstimate: '1-3 días', automation: 'high', automationPct: 90, entity: 'JCE / Oficialía', law: 'Ley 659', active: true, orders: 40, revenue: 112000 },
  { id: 'T-039', name: 'Legalización de Documentos', category: 'certificaciones', price: 5000, tasas: 1000, timeEstimate: '3-5 días', automation: 'high', automationPct: 85, entity: 'PGR / MIREX', law: 'Convenio Apostilla', active: true, orders: 22, revenue: 110000 },
  { id: 'T-040', name: 'Certificación de No Objeción Fiscal', category: 'certificaciones', price: 6000, tasas: 500, timeEstimate: '5-7 días', automation: 'high', automationPct: 80, entity: 'DGII', law: 'Código Tributario', active: true, orders: 10, revenue: 60000 },
]

export const catalogStats = {
  total: tramites.length,
  active: tramites.filter(t => t.active).length,
  totalRevenue: tramites.reduce((s, t) => s + t.revenue, 0),
  totalOrders: tramites.reduce((s, t) => s + t.orders, 0),
  avgAutomation: Math.round(tramites.reduce((s, t) => s + t.automationPct, 0) / tramites.length),
}
