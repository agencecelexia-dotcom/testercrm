"use client";

import { formatCurrency, formatDate } from "@/lib/format";
import { useState } from "react";

/* ──────────────────────────────────────────────────────────────────────────── */
/*  Mock data                                                                  */
/* ──────────────────────────────────────────────────────────────────────────── */

const kpis = [
  { label: "Total facturé", value: formatCurrency(142500), icon: "payments", trend: "+12%" },
  { label: "Payé", value: formatCurrency(118200), icon: "check_circle", trend: "+15%" },
  { label: "En attente", value: formatCurrency(24300), icon: "pending_actions", trend: "-5%", trendDown: true },
  { label: "Prochaine échéance", value: "28 mars", icon: "event", trend: "3 jours", isDate: true },
];

const months = ["Mars 2026", "Février 2026", "Janvier 2026", "Décembre 2025", "Novembre 2025"];

type Invoice = {
  id: string;
  description: string;
  montant: number;
  dateEmission: string;
  dateEcheance: string;
  status: string;
};

const invoices: Record<string, Invoice[]> = {
  "Mars 2026": [
    { id: "FAC-2026-0312", description: "Abonnement Premium - Mars 2026", montant: 4500, dateEmission: "2026-03-01", dateEcheance: "2026-03-31", status: "en_attente" },
    { id: "FAC-2026-0298", description: "Appels supplémentaires - Février", montant: 1250, dateEmission: "2026-03-05", dateEcheance: "2026-03-28", status: "en_attente" },
  ],
  "Février 2026": [
    { id: "FAC-2026-0245", description: "Abonnement Premium - Février 2026", montant: 4500, dateEmission: "2026-02-01", dateEcheance: "2026-02-28", status: "payée" },
    { id: "FAC-2026-0220", description: "Appels supplémentaires - Janvier", montant: 980, dateEmission: "2026-02-05", dateEcheance: "2026-02-28", status: "payée" },
  ],
  "Janvier 2026": [
    { id: "FAC-2026-0102", description: "Abonnement Premium - Janvier 2026", montant: 4500, dateEmission: "2026-01-01", dateEcheance: "2026-01-31", status: "payée" },
  ],
  "Décembre 2025": [
    { id: "FAC-2025-1201", description: "Abonnement Premium - Décembre 2025", montant: 4500, dateEmission: "2025-12-01", dateEcheance: "2025-12-31", status: "payée" },
    { id: "FAC-2025-1190", description: "Setup initial closer", montant: 2500, dateEmission: "2025-12-05", dateEcheance: "2025-12-31", status: "payée" },
  ],
  "Novembre 2025": [
    { id: "FAC-2025-1101", description: "Abonnement Premium - Novembre 2025", montant: 4500, dateEmission: "2025-11-01", dateEcheance: "2025-11-30", status: "payée" },
  ],
};

const statusColor: Record<string, string> = {
  en_attente: "bg-amber-500/20 text-amber-400",
  "payée": "bg-emerald-500/20 text-emerald-400",
  en_retard: "bg-red-500/20 text-red-400",
};

const statusLabel: Record<string, string> = {
  en_attente: "En attente",
  "payée": "Payée",
  en_retard: "En retard",
};

/* ──────────────────────────────────────────────────────────────────────────── */
/*  Page                                                                       */
/* ──────────────────────────────────────────────────────────────────────────── */

export default function ClientFacturesPage() {
  const [activeMonth, setActiveMonth] = useState(0);

  const currentMonth = months[activeMonth];
  const currentInvoices = invoices[currentMonth] ?? [];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white font-[family-name:var(--font-plus-jakarta-sans)]">Mes factures</h1>
          <p className="text-sm text-[#c3c6d7] mt-1">Consultez et téléchargez vos factures mensuelles</p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-lg bg-[#202a3d] border border-[#434655]/20 px-4 py-2 text-sm font-medium text-[#c3c6d7] hover:text-white transition">
          <span className="material-symbols-outlined text-base">download</span>
          Tout télécharger
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((k) => (
          <div key={k.label} className="rounded-xl bg-[#202a3d]/60 backdrop-blur-xl border border-[#434655]/10 p-6 shadow-lg">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-medium text-[#c3c6d7]">{k.label}</p>
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#152032] text-[#2563eb]">
                <span className="material-symbols-outlined text-lg">{k.icon}</span>
              </div>
            </div>
            <p className="text-2xl font-bold text-white">{k.value}</p>
            <div className="mt-2 flex items-center gap-1.5">
              {k.isDate ? (
                <span className="text-sm font-medium text-[#03b5d3]">dans {k.trend}</span>
              ) : (
                <>
                  <span className={`material-symbols-outlined text-base ${k.trendDown ? "text-red-400" : "text-emerald-400"}`}>
                    {k.trendDown ? "trending_down" : "trending_up"}
                  </span>
                  <span className={`text-sm font-medium ${k.trendDown ? "text-red-400" : "bg-gradient-to-r from-emerald-400 to-[#03b5d3] bg-clip-text text-transparent"}`}>
                    {k.trend}
                  </span>
                  <span className="text-xs text-[#c3c6d7]">vs mois préc.</span>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Month Tabs */}
      <div className="flex items-center gap-1 rounded-xl bg-[#202a3d]/60 backdrop-blur-xl border border-[#434655]/10 p-1.5 overflow-x-auto">
        {months.map((m, i) => (
          <button
            key={m}
            onClick={() => setActiveMonth(i)}
            className={`whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition ${
              activeMonth === i
                ? "bg-[#2563eb] text-white shadow-lg shadow-[#2563eb]/25"
                : "text-[#c3c6d7] hover:text-white hover:bg-[#152032]/60"
            }`}
          >
            {m}
          </button>
        ))}
      </div>

      {/* Invoice Table */}
      <div className="rounded-xl bg-[#202a3d]/60 backdrop-blur-xl border border-[#434655]/10 shadow-lg overflow-hidden">
        <div className="p-4 border-b border-[#434655]/10">
          <h2 className="text-lg font-semibold text-white font-[family-name:var(--font-plus-jakarta-sans)]">{currentMonth}</h2>
          <p className="text-sm text-[#c3c6d7]">{currentInvoices.length} facture(s)</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#434655]/15">
                <th className="text-left py-3 px-4 text-xs font-semibold text-[#c3c6d7] uppercase tracking-wider">N° Facture</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-[#c3c6d7] uppercase tracking-wider">Description</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-[#c3c6d7] uppercase tracking-wider">Montant</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-[#c3c6d7] uppercase tracking-wider">Émission</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-[#c3c6d7] uppercase tracking-wider">Échéance</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-[#c3c6d7] uppercase tracking-wider">Statut</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-[#c3c6d7] uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentInvoices.map((inv) => (
                <tr key={inv.id} className="border-b border-[#434655]/10 hover:bg-[#152032]/30 transition">
                  <td className="py-3 px-4 text-sm font-mono font-medium text-[#03b5d3]">{inv.id}</td>
                  <td className="py-3 px-4 text-sm text-white">{inv.description}</td>
                  <td className="py-3 px-4 text-sm font-semibold text-white">{formatCurrency(inv.montant)}</td>
                  <td className="py-3 px-4 text-sm text-[#c3c6d7]">{formatDate(inv.dateEmission)}</td>
                  <td className="py-3 px-4 text-sm text-[#c3c6d7]">{formatDate(inv.dateEcheance)}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusColor[inv.status]}`}>
                      {statusLabel[inv.status]}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1">
                      <button className="rounded-lg p-1.5 text-[#c3c6d7] hover:text-white hover:bg-[#152032]/60 transition">
                        <span className="material-symbols-outlined text-base">visibility</span>
                      </button>
                      <button className="rounded-lg p-1.5 text-[#c3c6d7] hover:text-white hover:bg-[#152032]/60 transition">
                        <span className="material-symbols-outlined text-base">download</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {currentInvoices.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-sm text-[#c3c6d7]">Aucune facture pour cette période</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Info */}
      <div className="rounded-xl bg-[#202a3d]/60 backdrop-blur-xl border border-[#434655]/10 p-6 shadow-lg">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#2563eb]/20 text-[#2563eb] shrink-0">
            <span className="material-symbols-outlined text-lg">info</span>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white mb-1">Informations de paiement</h3>
            <p className="text-sm text-[#c3c6d7] leading-relaxed">
              Les factures sont payables sous 30 jours. Pour toute question concernant votre facturation, contactez votre gestionnaire de compte ou envoyez un email à <span className="text-[#03b5d3]">facturation@celexia.fr</span>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
