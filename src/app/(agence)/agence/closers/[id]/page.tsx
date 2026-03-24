"use client";

import { formatCurrency, formatDate } from "@/lib/format";
import { useState } from "react";

/* ──────────────────────────────────────────────────────────────────────────── */
/*  Mock data                                                                  */
/* ──────────────────────────────────────────────────────────────────────────── */

const closer = {
  id: "CLO-001",
  name: "Julien Marchand",
  avatar: "JM",
  email: "julien@celexia.fr",
  phone: "06 12 34 56 78",
  location: "Lyon, France",
  status: "actif",
  joinedAt: "2025-06-01",
  commissionRate: 10,
};

const kpis = [
  { label: "Clients gérés", value: "8", icon: "business", trend: "+2" },
  { label: "Prospects actifs", value: "142", icon: "people", trend: "+18" },
  { label: "CA généré", value: formatCurrency(285000), icon: "payments", trend: "+22%" },
  { label: "Taux de conversion", value: "45.8%", icon: "trending_up", trend: "+3.2%" },
];

const clients = [
  { id: "CLI-001", name: "TechVision SAS", ca: 68000, prospects: 32, commission: 6800, status: "actif" },
  { id: "CLI-003", name: "DataFlow Corp", ca: 54000, prospects: 28, commission: 5400, status: "actif" },
  { id: "CLI-005", name: "CloudNine Solutions", ca: 42000, prospects: 22, commission: 4200, status: "actif" },
  { id: "CLI-007", name: "PixelForge Studio", ca: 38000, prospects: 18, commission: 3800, status: "actif" },
  { id: "CLI-009", name: "NeoBank Finance", ca: 31000, prospects: 15, commission: 3100, status: "pause" },
  { id: "CLI-012", name: "GreenTech Innovations", ca: 28000, prospects: 14, commission: 2800, status: "actif" },
  { id: "CLI-015", name: "MediSoft Santé", ca: 15000, prospects: 8, commission: 1500, status: "actif" },
  { id: "CLI-018", name: "EduPrime Formation", ca: 9000, prospects: 5, commission: 900, status: "inactif" },
];

const commissionHistory = [
  { month: "Mars 2026", montant: 4250, status: "en_attente", date: "2026-03-31" },
  { month: "Février 2026", montant: 3980, status: "payé", date: "2026-03-05" },
  { month: "Janvier 2026", montant: 4100, status: "payé", date: "2026-02-05" },
  { month: "Décembre 2025", montant: 3750, status: "payé", date: "2026-01-05" },
  { month: "Novembre 2025", montant: 3620, status: "payé", date: "2025-12-05" },
  { month: "Octobre 2025", montant: 3400, status: "payé", date: "2025-11-05" },
];

const performanceMonths = [
  { month: "OCT", ca: 34000, conv: 38 },
  { month: "NOV", ca: 36200, conv: 41 },
  { month: "DÉC", ca: 37500, conv: 43 },
  { month: "JAN", ca: 41000, conv: 46 },
  { month: "FÉV", ca: 39800, conv: 44 },
  { month: "MAR", ca: 42500, conv: 48 },
];

const maxCA = Math.max(...performanceMonths.map((m) => m.ca));

const tabs = [
  { label: "Vue générale", icon: "dashboard" },
  { label: "Clients", icon: "business" },
  { label: "Commissions", icon: "account_balance_wallet" },
];

/* ──────────────────────────────────────────────────────────────────────────── */
/*  Page                                                                       */
/* ──────────────────────────────────────────────────────────────────────────── */

export default function CloserDetailPage() {
  const [activeTab, setActiveTab] = useState(0);

  const statusColor: Record<string, string> = {
    actif: "bg-emerald-500/20 text-emerald-400",
    pause: "bg-amber-500/20 text-amber-400",
    inactif: "bg-red-500/20 text-red-400",
    en_attente: "bg-amber-500/20 text-amber-400",
    "payé": "bg-emerald-500/20 text-emerald-400",
  };

  const statusLabel: Record<string, string> = {
    actif: "Actif",
    pause: "En pause",
    inactif: "Inactif",
    en_attente: "En attente",
    "payé": "Payé",
  };

  return (
    <div className="space-y-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[#c3c6d7]">
        <a href="/agence/closers" className="hover:text-white transition-colors">Closers</a>
        <span className="material-symbols-outlined text-xs">chevron_right</span>
        <span className="text-white font-medium">{closer.name}</span>
      </div>

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-brand text-white text-lg font-bold shrink-0">
            {closer.avatar}
          </div>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-2xl font-bold text-white font-[family-name:var(--font-plus-jakarta-sans)]">{closer.name}</h1>
              <span className="inline-flex items-center rounded-full bg-[#152032] px-2.5 py-0.5 text-xs font-medium text-[#c3c6d7] border border-[#434655]/20">{closer.id}</span>
              <span className="inline-flex items-center rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-xs font-semibold text-emerald-400">Actif</span>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-sm text-[#c3c6d7]">
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-base">mail</span>
                {closer.email}
              </span>
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-base">phone</span>
                {closer.phone}
              </span>
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-base">location_on</span>
                {closer.location}
              </span>
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-base">calendar_today</span>
                Depuis le {formatDate(closer.joinedAt)}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-2 rounded-lg bg-[#202a3d] border border-[#434655]/20 px-4 py-2 text-sm font-medium text-[#c3c6d7] hover:text-white transition">
            <span className="material-symbols-outlined text-base">edit</span>
            Modifier
          </button>
          <button className="inline-flex items-center gap-2 rounded-lg bg-gradient-brand px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-[#2563eb]/25">
            <span className="material-symbols-outlined text-base">account_balance_wallet</span>
            Payer commissions
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 rounded-xl bg-[#202a3d]/60 backdrop-blur-xl border border-[#434655]/10 p-1.5 w-fit">
        {tabs.map((tab, i) => (
          <button
            key={tab.label}
            onClick={() => setActiveTab(i)}
            className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition ${
              activeTab === i
                ? "bg-[#2563eb] text-white shadow-lg shadow-[#2563eb]/25"
                : "text-[#c3c6d7] hover:text-white hover:bg-[#152032]/60"
            }`}
          >
            <span className="material-symbols-outlined text-base">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
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
              <span className="material-symbols-outlined text-base text-emerald-400">trending_up</span>
              <span className="text-sm font-medium bg-gradient-to-r from-emerald-400 to-[#03b5d3] bg-clip-text text-transparent">{k.trend}</span>
              <span className="text-xs text-[#c3c6d7]">ce mois</span>
            </div>
          </div>
        ))}
      </div>

      {/* Performance Chart + Info Sidebar */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-xl bg-[#202a3d]/60 backdrop-blur-xl border border-[#434655]/10 p-6 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-white font-[family-name:var(--font-plus-jakarta-sans)]">Performance</h2>
              <p className="text-sm text-[#c3c6d7]">CA généré par mois</p>
            </div>
          </div>
          <div className="flex items-end gap-4 h-48">
            {performanceMonths.map((m) => (
              <div key={m.month} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-xs font-mono text-[#c3c6d7]">{formatCurrency(m.ca)}</span>
                <div className="w-full flex items-end justify-center h-32">
                  <div
                    className="w-8 rounded-t-md bg-gradient-to-t from-[#2563eb] to-[#03b5d3] transition-all duration-500"
                    style={{ height: `${(m.ca / maxCA) * 100}%` }}
                  />
                </div>
                <span className="text-xs font-semibold text-[#c3c6d7] mt-1">{m.month}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl bg-[#202a3d]/60 backdrop-blur-xl border border-[#434655]/10 p-6 shadow-lg">
          <h2 className="text-lg font-semibold text-white font-[family-name:var(--font-plus-jakarta-sans)] mb-4">Informations</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-lg bg-[#152032]/60 px-4 py-3">
              <span className="text-sm text-[#c3c6d7]">Taux commission</span>
              <span className="text-sm font-semibold text-white">{closer.commissionRate}%</span>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-[#152032]/60 px-4 py-3">
              <span className="text-sm text-[#c3c6d7]">Total commissions</span>
              <span className="text-sm font-semibold text-white">{formatCurrency(28500)}</span>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-[#152032]/60 px-4 py-3">
              <span className="text-sm text-[#c3c6d7]">Taux conversion</span>
              <span className="text-sm font-semibold text-emerald-400">45.8%</span>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-[#152032]/60 px-4 py-3">
              <span className="text-sm text-[#c3c6d7]">Ancienneté</span>
              <span className="text-sm font-semibold text-white">9 mois</span>
            </div>
          </div>
        </div>
      </div>

      {/* Clients Table */}
      <div className="rounded-xl bg-[#202a3d]/60 backdrop-blur-xl border border-[#434655]/10 p-6 shadow-lg">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-lg font-semibold text-white font-[family-name:var(--font-plus-jakarta-sans)]">Clients assignés</h2>
            <p className="text-sm text-[#c3c6d7]">{clients.length} clients au total</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#434655]/15">
                <th className="text-left py-3 px-4 text-xs font-semibold text-[#c3c6d7] uppercase tracking-wider">Client</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-[#c3c6d7] uppercase tracking-wider">CA généré</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-[#c3c6d7] uppercase tracking-wider">Prospects</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-[#c3c6d7] uppercase tracking-wider">Commission</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-[#c3c6d7] uppercase tracking-wider">Statut</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((c) => (
                <tr key={c.id} className="border-b border-[#434655]/10 hover:bg-[#152032]/30 transition">
                  <td className="py-3 px-4">
                    <div>
                      <p className="text-sm font-medium text-white">{c.name}</p>
                      <p className="text-xs text-[#c3c6d7]">{c.id}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm font-semibold text-white">{formatCurrency(c.ca)}</td>
                  <td className="py-3 px-4 text-sm text-[#c3c6d7]">{c.prospects}</td>
                  <td className="py-3 px-4 text-sm font-semibold text-[#03b5d3]">{formatCurrency(c.commission)}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusColor[c.status]}`}>
                      {statusLabel[c.status]}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Commission History */}
      <div className="rounded-xl bg-[#202a3d]/60 backdrop-blur-xl border border-[#434655]/10 p-6 shadow-lg">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-lg font-semibold text-white font-[family-name:var(--font-plus-jakarta-sans)]">Historique des commissions</h2>
            <p className="text-sm text-[#c3c6d7]">Paiements mensuels</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#434655]/15">
                <th className="text-left py-3 px-4 text-xs font-semibold text-[#c3c6d7] uppercase tracking-wider">Période</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-[#c3c6d7] uppercase tracking-wider">Montant</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-[#c3c6d7] uppercase tracking-wider">Date paiement</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-[#c3c6d7] uppercase tracking-wider">Statut</th>
              </tr>
            </thead>
            <tbody>
              {commissionHistory.map((c) => (
                <tr key={c.month} className="border-b border-[#434655]/10 hover:bg-[#152032]/30 transition">
                  <td className="py-3 px-4 text-sm font-medium text-white">{c.month}</td>
                  <td className="py-3 px-4 text-sm font-semibold text-white">{formatCurrency(c.montant)}</td>
                  <td className="py-3 px-4 text-sm text-[#c3c6d7]">{formatDate(c.date)}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusColor[c.status]}`}>
                      {statusLabel[c.status]}
                    </span>
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
