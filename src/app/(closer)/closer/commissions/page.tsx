"use client";

import { formatCurrency, formatDate } from "@/lib/format";
import { useState } from "react";

/* ──────────────────────────────────────────────────────────────────────────── */
/*  Mock data                                                                  */
/* ──────────────────────────────────────────────────────────────────────────── */

const kpis = [
  { label: "Total commissions", value: formatCurrency(28500), icon: "account_balance_wallet", trend: "+15%" },
  { label: "Ce mois", value: formatCurrency(4250), icon: "calendar_month", trend: "+7%" },
  { label: "En attente", value: formatCurrency(4250), icon: "pending_actions", trend: "1 mois", isCount: true },
  { label: "Taux commission", value: "10%", icon: "percent", trend: "fixe", isCount: true },
];

const years = ["2026", "2025"];

const commissions = [
  {
    month: "Mars 2026",
    clients: [
      { name: "TechVision SAS", ca: 12500, commission: 1250 },
      { name: "DataFlow Corp", ca: 9800, commission: 980 },
      { name: "CloudNine Solutions", ca: 8200, commission: 820 },
      { name: "PixelForge Studio", ca: 6500, commission: 650 },
      { name: "Autres", ca: 5500, commission: 550 },
    ],
    total: 4250,
    status: "en_attente",
    datePaiement: "2026-04-05",
  },
  {
    month: "Février 2026",
    clients: [
      { name: "TechVision SAS", ca: 11800, commission: 1180 },
      { name: "DataFlow Corp", ca: 9200, commission: 920 },
      { name: "CloudNine Solutions", ca: 7600, commission: 760 },
      { name: "PixelForge Studio", ca: 6200, commission: 620 },
      { name: "Autres", ca: 5000, commission: 500 },
    ],
    total: 3980,
    status: "payé",
    datePaiement: "2026-03-05",
  },
  {
    month: "Janvier 2026",
    clients: [
      { name: "TechVision SAS", ca: 12200, commission: 1220 },
      { name: "DataFlow Corp", ca: 9500, commission: 950 },
      { name: "CloudNine Solutions", ca: 7900, commission: 790 },
      { name: "PixelForge Studio", ca: 6400, commission: 640 },
      { name: "Autres", ca: 5000, commission: 500 },
    ],
    total: 4100,
    status: "payé",
    datePaiement: "2026-02-05",
  },
  {
    month: "Décembre 2025",
    clients: [
      { name: "TechVision SAS", ca: 10800, commission: 1080 },
      { name: "DataFlow Corp", ca: 8800, commission: 880 },
      { name: "CloudNine Solutions", ca: 7200, commission: 720 },
      { name: "PixelForge Studio", ca: 5700, commission: 570 },
      { name: "Autres", ca: 5000, commission: 500 },
    ],
    total: 3750,
    status: "payé",
    datePaiement: "2026-01-05",
  },
  {
    month: "Novembre 2025",
    clients: [
      { name: "TechVision SAS", ca: 10200, commission: 1020 },
      { name: "DataFlow Corp", ca: 8400, commission: 840 },
      { name: "CloudNine Solutions", ca: 6800, commission: 680 },
      { name: "PixelForge Studio", ca: 5600, commission: 560 },
      { name: "Autres", ca: 5200, commission: 520 },
    ],
    total: 3620,
    status: "payé",
    datePaiement: "2025-12-05",
  },
  {
    month: "Octobre 2025",
    clients: [
      { name: "TechVision SAS", ca: 9800, commission: 980 },
      { name: "DataFlow Corp", ca: 8000, commission: 800 },
      { name: "CloudNine Solutions", ca: 6400, commission: 640 },
      { name: "PixelForge Studio", ca: 5200, commission: 520 },
      { name: "Autres", ca: 4600, commission: 460 },
    ],
    total: 3400,
    status: "payé",
    datePaiement: "2025-11-05",
  },
];

const statusColor: Record<string, string> = {
  en_attente: "bg-amber-500/20 text-amber-400",
  "payé": "bg-emerald-500/20 text-emerald-400",
};

const statusLabel: Record<string, string> = {
  en_attente: "En attente",
  "payé": "Payé",
};

/* ──────────────────────────────────────────────────────────────────────────── */
/*  Page                                                                       */
/* ──────────────────────────────────────────────────────────────────────────── */

export default function CommissionsPage() {
  const [expandedMonth, setExpandedMonth] = useState<string | null>("Mars 2026");
  const [activeYear, setActiveYear] = useState("2026");

  const filteredCommissions = commissions.filter((c) => c.month.includes(activeYear));

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white font-[family-name:var(--font-plus-jakarta-sans)]">Mes commissions</h1>
          <p className="text-sm text-[#c3c6d7] mt-1">Historique et suivi de vos commissions mensuelles</p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-lg bg-[#202a3d] border border-[#434655]/20 px-4 py-2 text-sm font-medium text-[#c3c6d7] hover:text-white transition">
          <span className="material-symbols-outlined text-base">download</span>
          Exporter
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
              {k.isCount ? (
                <span className="text-sm font-medium text-[#03b5d3]">{k.trend}</span>
              ) : (
                <>
                  <span className="material-symbols-outlined text-base text-emerald-400">trending_up</span>
                  <span className="text-sm font-medium bg-gradient-to-r from-emerald-400 to-[#03b5d3] bg-clip-text text-transparent">{k.trend}</span>
                  <span className="text-xs text-[#c3c6d7]">vs mois préc.</span>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="rounded-xl bg-[#202a3d]/60 backdrop-blur-xl border border-[#434655]/10 p-6 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-white font-[family-name:var(--font-plus-jakarta-sans)]">Évolution des commissions</h2>
            <p className="text-sm text-[#c3c6d7]">6 derniers mois</p>
          </div>
        </div>
        <div className="flex items-end gap-4 h-40">
          {commissions.slice().reverse().map((c) => {
            const maxTotal = Math.max(...commissions.map((cm) => cm.total));
            return (
              <div key={c.month} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-xs font-mono text-[#c3c6d7]">{formatCurrency(c.total)}</span>
                <div className="w-full flex items-end justify-center h-24">
                  <div
                    className={`w-8 rounded-t-md transition-all duration-500 ${
                      c.status === "en_attente"
                        ? "bg-gradient-to-t from-amber-500/60 to-amber-400/80"
                        : "bg-gradient-to-t from-[#2563eb] to-[#03b5d3]"
                    }`}
                    style={{ height: `${(c.total / maxTotal) * 100}%` }}
                  />
                </div>
                <span className="text-[10px] font-semibold text-[#c3c6d7] mt-1">
                  {c.month.split(" ")[0].slice(0, 3).toUpperCase()}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Year Filter */}
      <div className="flex items-center gap-1 rounded-xl bg-[#202a3d]/60 backdrop-blur-xl border border-[#434655]/10 p-1.5 w-fit">
        {years.map((y) => (
          <button
            key={y}
            onClick={() => setActiveYear(y)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
              activeYear === y
                ? "bg-[#2563eb] text-white shadow-lg shadow-[#2563eb]/25"
                : "text-[#c3c6d7] hover:text-white hover:bg-[#152032]/60"
            }`}
          >
            {y}
          </button>
        ))}
      </div>

      {/* Commission Details - Accordion */}
      <div className="space-y-4">
        {filteredCommissions.map((c) => (
          <div key={c.month} className="rounded-xl bg-[#202a3d]/60 backdrop-blur-xl border border-[#434655]/10 shadow-lg overflow-hidden">
            <button
              onClick={() => setExpandedMonth(expandedMonth === c.month ? null : c.month)}
              className="w-full flex items-center justify-between p-5 hover:bg-[#152032]/20 transition"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#152032] text-[#2563eb]">
                  <span className="material-symbols-outlined text-lg">calendar_month</span>
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-white">{c.month}</p>
                  <p className="text-xs text-[#c3c6d7]">Paiement : {formatDate(c.datePaiement)}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusColor[c.status]}`}>
                  {statusLabel[c.status]}
                </span>
                <p className="text-lg font-bold text-white">{formatCurrency(c.total)}</p>
                <span className={`material-symbols-outlined text-[#c3c6d7] transition-transform ${expandedMonth === c.month ? "rotate-180" : ""}`}>expand_more</span>
              </div>
            </button>

            {expandedMonth === c.month && (
              <div className="px-5 pb-5 border-t border-[#434655]/10">
                <table className="w-full mt-3">
                  <thead>
                    <tr className="border-b border-[#434655]/10">
                      <th className="text-left py-2 px-3 text-xs font-semibold text-[#c3c6d7] uppercase tracking-wider">Client</th>
                      <th className="text-right py-2 px-3 text-xs font-semibold text-[#c3c6d7] uppercase tracking-wider">CA généré</th>
                      <th className="text-right py-2 px-3 text-xs font-semibold text-[#c3c6d7] uppercase tracking-wider">Commission (10%)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {c.clients.map((cl) => (
                      <tr key={cl.name} className="border-b border-[#434655]/5">
                        <td className="py-2 px-3 text-sm text-white">{cl.name}</td>
                        <td className="py-2 px-3 text-sm text-[#c3c6d7] text-right">{formatCurrency(cl.ca)}</td>
                        <td className="py-2 px-3 text-sm font-semibold text-[#03b5d3] text-right">{formatCurrency(cl.commission)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="border-t border-[#434655]/15">
                      <td className="py-3 px-3 text-sm font-semibold text-white">Total</td>
                      <td className="py-3 px-3 text-sm font-semibold text-white text-right">{formatCurrency(c.clients.reduce((sum, cl) => sum + cl.ca, 0))}</td>
                      <td className="py-3 px-3 text-sm font-bold text-[#03b5d3] text-right">{formatCurrency(c.total)}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
