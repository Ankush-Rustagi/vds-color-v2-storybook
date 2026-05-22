export type TokenMapping = {
  legacy: string
  v2: string
  notes?: string
}

export const TOKEN_MAPPINGS: TokenMapping[] = [
  { legacy: '--bg-canvas', v2: '--background/canvas', notes: 'Page background' },
  { legacy: '--color-surface-default', v2: '--background/surface-01', notes: 'Subtle panel background' },
  { legacy: '--color-text-primary', v2: '--text/primary', notes: 'Body text' },
  { legacy: '--color-text-secondary', v2: '--text/secondary', notes: 'Supporting text' },
  { legacy: '--fg-primary', v2: '--text/emphasis', notes: 'High emphasis text' },
  { legacy: '--button-danger-bg', v2: '--button/background/alert', notes: 'Destructive actions' },
  { legacy: '--button-danger-hover', v2: '--button/background/alert-hover', notes: 'Destructive hover' },
  { legacy: '--button-primary-bg', v2: '--button/background/primary', notes: 'Primary CTA' },
  { legacy: '--bg-alert', v2: '--background/alert', notes: 'Alert banner background' },
  { legacy: '--color-warning', v2: '--support/warning', notes: 'Warning indicators' },
  { legacy: '--checkbox-bg', v2: '--checkbox/default-background', notes: 'Checkbox fill' },
  { legacy: '--checkbox-border', v2: '--checkbox/default-border', notes: 'Checkbox border' },
  { legacy: '--focus-ring', v2: '--focus', notes: 'Focus outline (brand cyan)' },
  { legacy: '--vc-axis-label', v2: '--text/secondary', notes: 'Chart axis labels (Verity charts)' },
  { legacy: '--vc-grid-line', v2: '--border/subtle', notes: 'Chart grid lines' },
  { legacy: '--vc-series-1', v2: '--chart/series-01', notes: 'Primary chart series' },
  { legacy: '--vs-badge-bg', v2: '--badges/muted/background', notes: 'Status badge background' },
  { legacy: '--vd-link-text', v2: '--link/text/default', notes: 'Inline links' },
  { legacy: '--color-border-default', v2: '--border/default', notes: 'Standard borders' },
  { legacy: '--color-border-focus', v2: '--border/focus-ring', notes: 'Focused input borders' },
  { legacy: '--text-disabled', v2: '--text/disabled', notes: 'Disabled label text' },
  { legacy: '--button-disabled-bg', v2: '--button/background/alert-disabled', notes: 'Disabled button fill' },
  { legacy: '--surface-elevated', v2: '--background/elevated', notes: 'Cards and modals' },
  { legacy: '--icon-primary', v2: '--icon/default', notes: 'Default icon color' },
  { legacy: '--icon-secondary', v2: '--icon/subtle', notes: 'Secondary icons' },
]

export type ProductTeam = {
  id: string
  name: string
  surface: string
  example: string
  mapping: TokenMapping
  status: 'example-ready' | 'in-progress' | 'not-started'
  designOwner: string
  engOwner: string
}

export const PRODUCT_TEAMS: ProductTeam[] = [
  {
    id: 'video-security',
    name: 'Video Security',
    surface: 'Camera grid, live view chrome, device health badges',
    example: 'Status pill colors on camera tiles',
    mapping: { legacy: '--color-text-secondary', v2: '--text/secondary' },
    status: 'not-started',
    designOwner: 'VDS + Video design',
    engOwner: 'Web Platform',
  },
  {
    id: 'access-control',
    name: 'Access Control',
    surface: 'Door reader panels, lock state indicators, credential modals',
    example: 'Alert button on forced-door events',
    mapping: { legacy: '--button-danger-bg', v2: '--button/background/alert' },
    status: 'not-started',
    designOwner: 'AC design',
    engOwner: 'Access Control eng',
  },
  {
    id: 'alarms',
    name: 'Alarms',
    surface: 'Incident banners, zone status, arming controls',
    example: 'Critical alert banner background',
    mapping: { legacy: '--bg-alert', v2: '--background/alert' },
    status: 'not-started',
    designOwner: 'Alarms design',
    engOwner: 'Alarms eng',
  },
  {
    id: 'intercom',
    name: 'Intercom',
    surface: 'Call UI, directory search, door release buttons',
    example: 'Primary action button on call panel',
    mapping: { legacy: '--button-primary-bg', v2: '--button/background/primary' },
    status: 'not-started',
    designOwner: 'Intercom design',
    engOwner: 'Intercom eng',
  },
  {
    id: 'sensors',
    name: 'Environmental Sensors',
    surface: 'Sensor reading cards, threshold alerts, trend charts',
    example: 'Warning state on CO2 threshold breach',
    mapping: { legacy: '--color-warning', v2: '--support/warning' },
    status: 'not-started',
    designOwner: 'Sensors design',
    engOwner: 'Sensors eng',
  },
  {
    id: 'guest',
    name: 'Guest / Workplace',
    surface: 'Visitor check-in, badge printing, host notifications',
    example: 'Checkbox on visitor consent form',
    mapping: { legacy: '--checkbox-bg', v2: '--checkbox/default-background' },
    status: 'not-started',
    designOwner: 'Guest design',
    engOwner: 'Guest eng',
  },
  {
    id: 'maps',
    name: 'Maps',
    surface: 'Site hierarchy, floor overlays, device pins',
    example: 'Surface background on map sidebar',
    mapping: { legacy: '--bg-canvas', v2: '--background/surface-01' },
    status: 'in-progress',
    designOwner: 'Maps design',
    engOwner: 'Maps eng',
  },
  {
    id: 'command-analytics',
    name: 'Command Analytics',
    surface: 'Dashboard charts, KPI cards, date range controls',
    example: 'Chart axis label and series palette colors',
    mapping: { legacy: '--vc-axis-label', v2: '--text/secondary' },
    status: 'in-progress',
    designOwner: 'Analytics design',
    engOwner: 'Command Analytics eng',
  },
]

export const SEMANTIC_TOKEN_SAMPLES = [
  { token: '--button/background/alert', light: '#CB2939', dark: '#CB2939', group: 'button' },
  { token: '--button/background/alert-hover', light: '#8D162A', dark: '#8D162A', group: 'button' },
  { token: '--button/background/primary', light: '#0285C8', dark: '#0285C8', group: 'button' },
  { token: '--background/surface-01', light: '#F7F9FB', dark: '#1F2832', group: 'background' },
  { token: '--background/canvas', light: '#FFFFFF', dark: '#0E1720', group: 'background' },
  { token: '--text/emphasis', light: '#030E16', dark: '#FFFFFF', group: 'text' },
  { token: '--text/primary', light: '#232426', dark: '#E6EAEE', group: 'text' },
  { token: '--text/secondary', light: '#536573', dark: '#B0B6BE', group: 'text' },
  { token: '--checkbox/default-background', light: '#536573', dark: '#536573', group: 'checkbox' },
  { token: '--checkbox/alert-background', light: '#CB2939', dark: '#CB2939', group: 'checkbox' },
  { token: '--focus', light: '#0285C8', dark: '#0285C8', group: 'border' },
  { token: '--support/warning', light: '#F2B81A', dark: '#FFD959', group: 'support' },
]

export const COLOR_PRIMITIVES = [
  { name: 'cyan-500', hex: '#0285C8', usage: 'Brand primary' },
  { name: 'red-alert', hex: '#CB2939', usage: 'Alert / destructive' },
  { name: 'neutral-200', hex: '#B0B6BE', usage: 'Disabled states' },
  { name: 'neutral-700', hex: '#536573', usage: 'Secondary text, checkbox default' },
  { name: 'neutral-off-white-50', hex: '#F7F9FB', usage: 'Surface-01 light' },
  { name: 'neutral-900', hex: '#0E1720', usage: 'Canvas dark' },
  { name: 'green-500', hex: '#14BA74', usage: 'Success' },
  { name: 'yellow-600', hex: '#F2B81A', usage: 'Warning' },
]
