"use client";

import { formatCurrency } from "@/lib/format";

/* ──────────────────────────────────────────────────────────────────────────── */
/*  Mock data                                                                  */
/* ──────────────────────────────────────────────────────────────────────────── */

const kpis = [
  { label: "Clients actifs", value: "8", icon: "business", trend: "+2" },
  { label: "Prospects en cours", value: "34", icon: "people", trend: "+12" },
  { label: "CA ce mois", value: formatCurrency(42500), icon: "payments", trend: "+18%" },
  { label: "Commission estimée", value: formatCurrency(4250), icon: "account_balance_wallet", trend: "+18%" },
];

const performanceMonths = [
  { month: "OCT", ca: 28000 },
  { month: "NOV", ca: 32000 },
  { month: "DÉC", ca: 35500 },
  { month: "JAN", ca: 38000 },
  { month: "FÉV", ca: 39800 },
  { month: "MAR", ca: 42500 },
];

const maxCA = Math.max(...performanceMonths.map((m) => m.ca));

const clients = [
  { id: "CLI-001", name: "TechVision SAS", prospectsActifs: 8, appelsAujourdhui: 3, ca: 68000, taux: 48.2 },
  { id: "CLI-003", name: "DataFlow Corp", prospectsActifs: 6, appelsAujourdhui: 2, ca: 54000, taux: 52.1 },
  { id: "CLI-005", name: "CloudNine Solutions", prospectsActifs: 5, appelsAujourdhui: 4, ca: 42000, taux: 44.8 },
  { id: "CLI-007", name: "PixelForge Studio", prospectsActifs: 4, appelsAujourdhui: 1, ca: 38000, taux: 39.5 },
  { id: "CLI-009", name: "NeoBank Finance", prospectsActifs: 3, appelsAujourdhui: 0, ca: 31000, taux: 46.3 },
  { id: "CLI-012", name: "GreenTech Innovations", prospectsActifs: 4, appelsAujourdhui: 2, ca: 28000, taux: 41.7 },
  { id: "CLI-015", name: "MediSoft Santé", prospectsActifs: 2, appelsAujourdhui: 1, ca: 15000, taux: 37.2 },
  { id: "CLI-018", name: "EduPrime Formation", prospectsActifs: 2, appelsAujourdhui: 0, ca: 9000, taux: 33.8 },
];

const todayTasks = [
  { heure: "09:30", type: "Appel", prospect: "Pierre Dupont", client: "TechVision SAS", done: true },
  { heure: "10:15", type: "Relance", prospect: "Marie Laurent", client: "GreenTech", done: true },
  { heure: "11:00", type: "Appel", prospect: "Nicolas Blanc", client: "DataFlow Corp", done: false },
  { heure: "14:00", type: "Démo", prospect: "Isabelle Chevalier", client: "CloudNine", done: false },
  { heure: "15:30", type: "Relance", prospect: "François Girard", client: "TechVision SAS", done: false },
  { heure: "16:00", type: "Appel", prospect: "Camille Fabre", client: "GreenTech", done: false },
];

/* ──────────────────────────────────────────────────────────────────────────── */
/*  Page                                                                       */
/* ──────────────────────────────────────────────────────────────────────────── */

export default function CloserDashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white font-[family-name:var(--font-plus-jakarta-sans)]">Tableau de bord</h1>
        <p className="text-sm text-[#c3c6d7] mt-1">Bienvenue Julien ! Voici votre résumé du jour.</p>
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

      {/* Chart + Today Tasks */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-xl bg-[#202a3d]/60 backdrop-blur-xl border border-[#434655]/10 p-6 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-white font-[family-name:var(--font-plus-jakarta-sans)]">Évolution du CA</h2>
              <p className="text-sm text-[#c3c6d7]">6 derniers mois</p>
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
          <h2 className="text-lg font-semibold text-white font-[family-name:var(--font-plus-jakarta-sans)] mb-4">Aujourd&apos;hui</h2>
          <p className="text-xs text-[#c3c6d7] mb-4">{todayTasks.filter((t) => t.done).length}/{todayTasks.length} tâches complétées</p>
          <div className="space-y-2">
            {todayTasks.map((task, i) => (
              <div key={i} className={`flex items-center gap-3 rounded-lg px-3 py-2.5 transition ${task.done ? "bg-[#152032]/30 opacity-60" : "bg-[#152032]/60"}`}>
                <div className={`flex h-7 w-7 items-center justify-center rounded-full shrink-0 ${task.done ? "bg-emerald-500/20 text-emerald-400" : "bg-[#2563eb]/20 text-[#2563eb]"}`}>
                  <span className="material-symbols-outlined text-sm">{task.done ? "check" : "schedule"}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-xs font-medium truncate ${task.done ? "text-[#c3c6d7] line-through" : "text-white"}`}>{task.type} - {task.prospect}</p>
                  <p className="text-[10px] text-[#c3c6d7]">{task.heure} &middot; {task.client}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Clients Table */}
      <div className="rounded-xl bg-[#202a3d]/60 backdrop-blur-xl border border-[#434655]/10 p-6 shadow-lg">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-lg font-semibold text-white font-[family-name:var(--font-plus-jakarta-sans)]">Mes clients</h2>
            <p className="text-sm text-[#c3c6d7]">Vue d&apos;ensemble de vos clients assignés</p>
          </div>
          <a href="/closer/clients" className="inline-flex items-center gap-1 text-sm font-medium text-[#2563eb] hover:text-[#03b5d3] transition">
            Voir tout
            <span className="material-symbols-outlined text-base">arrow_forward</span>
          </a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#434655]/15">
                <th className="text-left py-3 px-4 text-xs font-semibold text-[#c3c6d7] uppercase tracking-wider">Client</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-[#c3c6d7] uppercase tracking-wider">Prospects actifs</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-[#c3c6d7] uppercase tracking-wider">Appels aujourd&apos;hui</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-[#c3c6d7] uppercase tracking-wider">CA généré</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-[#c3c6d7] uppercase tracking-wider">Taux conv.</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((c) => (
                <tr key={c.id} className="border-b border-[#434655]/10 hover:bg-[#152032]/30 transition cursor-pointer">
                  <td className="py-3 px-4">
                    <div>
                      <p className="text-sm font-medium text-white">{c.name}</p>
                      <p className="text-xs text-[#c3c6d7]">{c.id}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-[#c3c6d7]">{c.prospectsActifs}</td>
                  <td className="py-3 px-4">
                    <span className={`text-sm font-semibold ${c.appelsAujourdhui > 0 ? "text-[#03b5d3]" : "text-[#c3c6d7]"}`}>{c.appelsAujourdhui}</span>
                  </td>
                  <td className="py-3 px-4 text-sm font-semibold text-white">{formatCurrency(c.ca)}</td>
                  <td className="py-3 px-4">
                    <span className={`text-sm font-semibold ${c.taux >= 45 ? "text-emerald-400" : c.taux >= 38 ? "text-amber-400" : "text-red-400"}`}>{c.taux}%</span>
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
