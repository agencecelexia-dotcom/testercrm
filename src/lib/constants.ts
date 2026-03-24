import type { ProspectStatus, InvoiceStatus, Role } from '@prisma/client'

// ---------------------------------------------------------------------------
// Prospect status labels (French)
// ---------------------------------------------------------------------------
export const PROSPECT_STATUS_LABELS: Record<ProspectStatus, string> = {
  A_TRAITER: 'À traiter',
  NON_QUALIFIE: 'Non qualifié',
  QUALIFIE: 'Qualifié',
  DEVIS_ENVOYE: 'Devis envoyé',
  DEVIS_ACCEPTE: 'Devis accepté',
  ACOMPTE_RECU: 'Acompte reçu',
  SOLDE_RECU: 'Solde reçu',
  TERMINE: 'Terminé',
}

// ---------------------------------------------------------------------------
// Invoice status labels (French)
// ---------------------------------------------------------------------------
export const INVOICE_STATUS_LABELS: Record<InvoiceStatus, string> = {
  PENDING: 'En attente',
  SENT: 'Envoyée',
  PAID: 'Payée',
  OVERDUE: 'En retard',
}

// ---------------------------------------------------------------------------
// Status color mappings (dark theme Tailwind classes)
// ---------------------------------------------------------------------------
export const PROSPECT_STATUS_COLORS: Record<ProspectStatus, string> = {
  A_TRAITER: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
  NON_QUALIFIE: 'bg-red-500/10 text-red-400 border border-red-500/20',
  QUALIFIE: 'bg-blue-500/10 text-blue-400 border border-blue-500/20',
  DEVIS_ENVOYE: 'bg-purple-500/10 text-purple-400 border border-purple-500/20',
  DEVIS_ACCEPTE: 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20',
  ACOMPTE_RECU: 'bg-teal-500/10 text-teal-400 border border-teal-500/20',
  SOLDE_RECU: 'bg-green-500/10 text-green-400 border border-green-500/20',
  TERMINE: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
}

export const INVOICE_STATUS_COLORS: Record<InvoiceStatus, string> = {
  PENDING: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
  SENT: 'bg-blue-500/10 text-blue-400 border border-blue-500/20',
  PAID: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
  OVERDUE: 'bg-red-500/10 text-red-400 border border-red-500/20',
}

// ---------------------------------------------------------------------------
// Navigation items per role
// ---------------------------------------------------------------------------
export interface NavItem {
  label: string
  href: string
  icon: string
}

export const NAV_ITEMS: Record<Role, NavItem[]> = {
  AGENCE: [
    { label: 'Tableau de bord', href: '/agence/dashboard', icon: 'LayoutDashboard' },
    { label: 'Clients', href: '/agence/clients', icon: 'Users' },
    { label: 'Closers', href: '/agence/closers', icon: 'Handshake' },
    { label: 'Tous les Prospects', href: '/agence/prospects', icon: 'UserSearch' },
    { label: 'Facturation', href: '/agence/facturation', icon: 'Receipt' },
    { label: 'Paramètres', href: '/agence/parametres', icon: 'Settings' },
  ],
  CLIENT: [
    { label: 'Tableau de bord', href: '/client/dashboard', icon: 'LayoutDashboard' },
    { label: 'Mes Appels', href: '/client/appels', icon: 'Phone' },
    { label: 'Mes Factures', href: '/client/factures', icon: 'FileText' },
    { label: 'Paramètres', href: '/client/parametres', icon: 'Settings' },
  ],
  CLOSER: [
    { label: 'Tableau de bord', href: '/closer/dashboard', icon: 'LayoutDashboard' },
    { label: 'Mes Clients', href: '/closer/clients', icon: 'Users' },
    { label: 'Commissions', href: '/closer/commissions', icon: 'Wallet' },
    { label: 'Paramètres', href: '/closer/parametres', icon: 'Settings' },
  ],
}

// ---------------------------------------------------------------------------
// Role-based dashboard redirect paths
// ---------------------------------------------------------------------------
export const ROLE_DASHBOARD: Record<Role, string> = {
  AGENCE: '/agence/dashboard',
  CLIENT: '/client/dashboard',
  CLOSER: '/closer/dashboard',
}
