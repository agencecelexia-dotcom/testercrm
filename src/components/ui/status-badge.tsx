type ProspectStatus = 'A_TRAITER' | 'NON_QUALIFIE' | 'QUALIFIE' | 'DEVIS_ENVOYE' | 'DEVIS_ACCEPTE' | 'ACOMPTE_RECU' | 'SOLDE_RECU' | 'TERMINE';
type InvoiceStatus = 'PENDING' | 'SENT' | 'PAID' | 'OVERDUE';
import { Badge } from "@/components/ui/badge";
import {
  PROSPECT_STATUS_LABELS,
  INVOICE_STATUS_LABELS,
} from "@/lib/constants";

// ---------------------------------------------------------------------------
// Dark-theme color mapping for prospect statuses
// ---------------------------------------------------------------------------
const PROSPECT_BADGE_VARIANT: Record<
  ProspectStatus,
  { className: string }
> = {
  A_TRAITER: { className: "bg-gray-500/20 text-gray-400 border-transparent" },
  NON_QUALIFIE: {
    className: "bg-red-500/20 text-red-400 border-transparent",
  },
  QUALIFIE: {
    className: "bg-blue-500/20 text-blue-400 border-transparent",
  },
  DEVIS_ENVOYE: {
    className: "bg-yellow-500/20 text-yellow-400 border-transparent",
  },
  DEVIS_ACCEPTE: {
    className: "bg-emerald-500/20 text-emerald-400 border-transparent",
  },
  ACOMPTE_RECU: {
    className: "bg-teal-500/20 text-teal-400 border-transparent",
  },
  SOLDE_RECU: {
    className: "bg-green-500/20 text-green-400 border-transparent",
  },
  TERMINE: {
    className: "bg-purple-500/20 text-purple-400 border-transparent",
  },
};

// ---------------------------------------------------------------------------
// Dark-theme color mapping for invoice statuses
// ---------------------------------------------------------------------------
const INVOICE_BADGE_VARIANT: Record<
  InvoiceStatus,
  { className: string }
> = {
  PENDING: { className: "bg-gray-500/20 text-gray-400 border-transparent" },
  SENT: { className: "bg-blue-500/20 text-blue-400 border-transparent" },
  PAID: { className: "bg-green-500/20 text-green-400 border-transparent" },
  OVERDUE: { className: "bg-red-500/20 text-red-400 border-transparent" },
};

// ---------------------------------------------------------------------------
// Components
// ---------------------------------------------------------------------------
export function ProspectStatusBadge({
  status,
}: {
  status: ProspectStatus;
}) {
  const { className } = PROSPECT_BADGE_VARIANT[status];
  return <Badge className={className}>{PROSPECT_STATUS_LABELS[status]}</Badge>;
}

export function InvoiceStatusBadge({
  status,
}: {
  status: InvoiceStatus;
}) {
  const { className } = INVOICE_BADGE_VARIANT[status];
  return <Badge className={className}>{INVOICE_STATUS_LABELS[status]}</Badge>;
}
