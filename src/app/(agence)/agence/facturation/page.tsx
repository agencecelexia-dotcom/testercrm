"use client";

import { formatCurrency, formatDate } from "@/lib/format";
import { useState } from "react";

/* ──────────────────────────────────────────────────────────────────────────── */
/*  Mock data                                                                  */
/* ──────────────────────────────────────────────────────────────────────────── */

const kpis = [
  { label: "CA total", value: formatCurrency(1248000), icon: "payments", trend: "+18%" },
  { label: "Factures en attente", value: "12", icon: "pending_actions", trend: "+3" },
  { label: "Montant dû", value: formatCurrency(86500), icon: "account_balance", trend: "-8%", trendDown: true },
  { label: "Commissions dues", value: formatCurrency(42300), icon: "account_balance_wallet", trend: "+12%" },
];

const months = ["Mars 2026", "Février 2026", "Janvier 2026", "Décembre 2025", "Novembre 2025", "Octobre 2025"];

const invoices = [
  { id: "FAC-2026-0312", client: "TechVision SAS", montant: 12500, commission: 1250, dateEmission: "2026-03-15", dateEcheance: "2026-04-15", status: "en_attente" },
  { id: "FAC-2026-0311", client: "DataFlow Corp", montant: 9800, commission: 980, dateEmission: "2026-03-12", dateEcheance: "2026-04-12", status: "en_attente" },
  { id: "FAC-2026-0310", client: "CloudNine Solutions", montant: 15200, commission: 1520, dateEmission: "2026-03-10", dateEcheance: "2026-04-10", status: "envoyée" },
  { id: "FAC-2026-0309", client: "PixelForge Studio", montant: 8400, commission: 840, dateEmission: "2026-03-08", dateEcheance: "2026-04-08", status: "payée" },
  { id: "FAC-2026-0308", client: "NeoBank Finance", montant: 22000, commission: 2200, dateEmission: "2026-03-05", dateEcheance: "2026-04-05", status: "payée" },
  { id: "FAC-2026-0307", client: "GreenTech Innovations", montant: 6800, commission: 680, dateEmission: "2026-03-03", dateEcheance: "2026-04-03", status: "en_retard" },
  { id: "FAC-2026-0306", client: "MediSoft Santé", montant: 11500, commission: 1150, dateEmission: "2026-03-01", dateEcheance: "2026-03-31", status: "payée" },
  { id: "FAC-2026-0305", client: "EduPrime Formation", montant: 4200, commission: 420, dateEmission: "2026-02-28", dateEcheance: "2026-03-28", status: "en_retard" },
];

const statusColor: Record<string, string> = {
  en_attente: "bg-amber-500/20 text-amber-400",
  "envoyée": "bg-blue-500/20 text-blue-400",
  "payée": "bg-emerald-500/20 text-emerald-400",
  en_retard: "bg-red-500/20 text-red-400",
};

const statusLabel: Record<string, string> = {
  en_attente: "En attente",
  "envoyée": "Envoyée",
  "payée": "Payée",
  en_retard: "En retard",
};

/* ──────────────────────────────────────────────────────────────────────────── */
/*  Page                                                                       */
/* ──────────────────────────────────────────────────────────────────────────── */

export default function FacturationPage() {
  const [activeMonth, setActiveMonth] = useState(0);
  const [search, setSearch] = useState("");

  const filtered = invoices.filter(
    (inv) =>
      inv.client.toLowerCase().includes(search.toLowerCase()) ||
      inv.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white font-[family-name:var(--font-plus-jakarta-sans)]">Facturation</h1>
          <p className="text-sm text-[#c3c6d7] mt-1">Suivi des factures et des paiements</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-2 rounded-lg bg-[#202a3d] border border-[#434655]/20 px-4 py-2 text-sm font-medium text-[#c3c6d7] hover:text-white transition">
            <span className="material-symbols-outlined text-base">download</span>
            Exporter
          </button>
          <button className="inline-flex items-center gap-2 rounded-lg bg-gradient-brand px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-[#2563eb]/25">
            <span className="material-symbols-outlined text-base">add_circle</span>
            Nouvelle facture
          </button>
        </div>
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
              <span className={`material-symbols-outlined text-base ${k.trendDown ? "text-red-400" : "text-emerald-400"}`}>
                {k.trendDown ? "trending_down" : "trending_up"}
              </span>
              <span className={`text-sm font-medium ${k.trendDown ? "text-red-400" : "bg-gradient-to-r from-emerald-400 to-[#03b5d3] bg-clip-text text-transparent"}`}>
                {k.trend}
              </span>
              <span className="text-xs text-[#c3c6d7]">vs mois préc.</span>
            </div>
          </div>
        ))}
      </div>

      {/* Month Tabs + Search */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
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
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#c3c6d7] text-lg">search</span>
          <input
            type="text"
            placeholder="Rechercher une facture..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full lg:w-72 rounded-lg bg-[#202a3d]/60 backdrop-blur-xl border border-[#434655]/10 pl-10 pr-4 py-2.5 text-sm text-white placeholder-[#c3c6d7]/50 focus:outline-none focus:ring-2 focus:ring-[#2563eb]/50"
          />
        </div>
      </div>

      {/* Summary Bar */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: "Payées", count: 3, color: "bg-emerald-500" },
          { label: "Envoyées", count: 1, color: "bg-blue-500" },
          { label: "En attente", count: 2, color: "bg-amber-500" },
          { label: "En retard", count: 2, color: "bg-red-500" },
        ].map((s) => (
          <div key={s.label} className="flex items-center gap-3 rounded-lg bg-[#152032]/40 border border-[#434655]/10 px-4 py-3">
            <div className={`h-3 w-3 rounded-full ${s.color}`} />
            <div>
              <p className="text-xs text-[#c3c6d7]">{s.label}</p>
              <p className="text-lg font-bold text-white">{s.count}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Invoice Table */}
      <div className="rounded-xl bg-[#202a3d]/60 backdrop-blur-xl border border-[#434655]/10 shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#434655]/15">
                <th className="text-left py-3 px-4 text-xs font-semibold text-[#c3c6d7] uppercase tracking-wider">N° Facture</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-[#c3c6d7] uppercase tracking-wider">Client</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-[#c3c6d7] uppercase tracking-wider">Montant</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-[#c3c6d7] uppercase tracking-wider">Commission</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-[#c3c6d7] uppercase tracking-wider">Émission</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-[#c3c6d7] uppercase tracking-wider">Échéance</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-[#c3c6d7] uppercase tracking-wider">Statut</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-[#c3c6d7] uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((inv) => (
                <tr key={inv.id} className="border-b border-[#434655]/10 hover:bg-[#152032]/30 transition">
                  <td className="py-3 px-4 text-sm font-mono font-medium text-[#03b5d3]">{inv.id}</td>
                  <td className="py-3 px-4 text-sm font-medium text-white">{inv.client}</td>
                  <td className="py-3 px-4 text-sm font-semibold text-white">{formatCurrency(inv.montant)}</td>
                  <td className="py-3 px-4 text-sm text-[#c3c6d7]">{formatCurrency(inv.commission)}</td>
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
                      <button className="rounded-lg p-1.5 text-[#c3c6d7] hover:text-white hover:bg-[#152032]/60 transition">
                        <span className="material-symbols-outlined text-base">send</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
