"use client";

import { formatCurrency } from "@/lib/format";

/* ──────────────────────────────────────────────────────────────────────────── */
/*  Mock data                                                                  */
/* ──────────────────────────────────────────────────────────────────────────── */

const kpis = [
  {
    label: "Revenus ce mois",
    value: formatCurrency(4230),
    trend: "+12.4%",
    trendUp: true,
    icon: "payments",
  },
  {
    label: "Commission pr\u00e9visionnelle",
    value: formatCurrency(1540.2),
    trend: "+8.1%",
    trendUp: true,
    icon: "account_balance_wallet",
  },
  {
    label: "Clients actifs",
    value: "24",
    trend: "+3",
    trendUp: true,
    icon: "group",
  },
  {
    label: "Appels g\u00e9n\u00e9r\u00e9s",
    value: "142",
    trend: "+18.2%",
    trendUp: true,
    icon: "call",
  },
];

const revenueMonths = [
  { month: "JAN", value: 2800 },
  { month: "F\u00c9V", value: 3200 },
  { month: "MAR", value: 4230 },
  { month: "AVR", value: 3900 },
  { month: "MAI", value: 4600 },
  { month: "JUN", value: 5100 },
];

const donutSegments = [
  { label: "TechVision SAS", pct: 35, color: "#2563eb" },
  { label: "DigiMarketing", pct: 25, color: "#03b5d3" },
  { label: "SolairePro", pct: 20, color: "#8b5cf6" },
  { label: "FormaPilot", pct: 12, color: "#10b981" },
  { label: "Autres", pct: 8, color: "#6b7280" },
];

const performanceRows = [
  {
    client: "TechVision SAS",
    closer: "Julien M.",
    appels: 48,
    qualifies: 22,
    devis: 14,
    ca: 18500,
    commission: 1850,
    statut: "Actif",
  },
  {
    client: "DigiMarketing",
    closer: "Sophie L.",
    appels: 36,
    qualifies: 18,
    devis: 10,
    ca: 12400,
    commission: 1240,
    statut: "Actif",
  },
  {
    client: "SolairePro",
    closer: "Marc D.",
    appels: 28,
    qualifies: 12,
    devis: 8,
    ca: 9200,
    commission: 920,
    statut: "Actif",
  },
  {
    client: "FormaPilot",
    closer: "Emma R.",
    appels: 18,
    qualifies: 9,
    devis: 5,
    ca: 6800,
    commission: 680,
    statut: "En pause",
  },
  {
    client: "CleanOffice",
    closer: "Julien M.",
    appels: 12,
    qualifies: 5,
    devis: 3,
    ca: 3600,
    commission: 360,
    statut: "Actif",
  },
];

const recentDeals = [
  {
    prospect: "Laurent Dupuis",
    client: "TechVision SAS",
    montant: 4500,
    date: "Il y a 2h",
    statut: "Devis accept\u00e9",
  },
  {
    prospect: "Marie Lefebvre",
    client: "DigiMarketing",
    montant: 2800,
    date: "Il y a 5h",
    statut: "Acompte re\u00e7u",
  },
  {
    prospect: "Pierre Martin",
    client: "SolairePro",
    montant: 3200,
    date: "Hier",
    statut: "Qualifi\u00e9",
  },
  {
    prospect: "Camille Bernard",
    client: "FormaPilot",
    montant: 1900,
    date: "Hier",
    statut: "Devis envoy\u00e9",
  },
];

/* ──────────────────────────────────────────────────────────────────────────── */
/*  Helpers                                                                    */
/* ──────────────────────────────────────────────────────────────────────────── */

const maxRevenue = Math.max(...revenueMonths.map((m) => m.value));

function statusColor(s: string) {
  if (s === "Actif") return "bg-emerald-500/20 text-emerald-400";
  if (s === "En pause") return "bg-yellow-500/20 text-yellow-400";
  return "bg-gray-500/20 text-gray-400";
}

function dealStatusColor(s: string) {
  if (s.includes("accept")) return "text-emerald-400";
  if (s.includes("Acompte")) return "text-teal-400";
  if (s.includes("Qualifi")) return "text-blue-400";
  return "text-yellow-400";
}

/* ──────────────────────────────────────────────────────────────────────────── */
/*  Page                                                                       */
/* ──────────────────────────────────────────────────────────────────────────── */

export default function AgenceDashboardPage() {
  return (
    <div className="space-y-8">
      {/* ── Header ──────────────────────────────────────────────────────── */}
      <div>
        <h1 className="text-3xl font-bold text-white font-[family-name:var(--font-plus-jakarta-sans)]">
          Tableau de Bord Global
        </h1>
        <p className="mt-1 text-[#c3c6d7]">
          Vue d&apos;ensemble de l&apos;activit\u00e9 de votre agence Celexia
        </p>
      </div>

      {/* ── KPI Cards ───────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((k) => (
          <div
            key={k.label}
            className="group rounded-xl bg-[#202a3d]/60 backdrop-blur-xl border border-[#434655]/10 p-6 shadow-lg transition-transform duration-200 hover:scale-[1.02]"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-[#c3c6d7]">{k.label}</p>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#152032] text-[#2563eb]">
                <span className="material-symbols-outlined text-xl">
                  {k.icon}
                </span>
              </div>
            </div>
            <div className="mt-3">
              <p className="text-2xl font-bold text-white">{k.value}</p>
            </div>
            <div className="mt-2 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-base text-emerald-400">
                {k.trendUp ? "trending_up" : "trending_down"}
              </span>
              <span className="text-sm font-medium bg-gradient-to-r from-emerald-400 to-[#03b5d3] bg-clip-text text-transparent">
                {k.trend}
              </span>
              <span className="text-xs text-[#c3c6d7]">vs mois dernier</span>
            </div>
          </div>
        ))}
      </div>

      {/* ── Charts Row ──────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Revenue Bar Chart */}
        <div className="lg:col-span-2 rounded-xl bg-[#202a3d]/60 backdrop-blur-xl border border-[#434655]/10 p-6 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-white font-[family-name:var(--font-plus-jakarta-sans)]">
                Revenus mensuels
              </h2>
              <p className="text-sm text-[#c3c6d7]">
                \u00c9volution du chiffre d&apos;affaires
              </p>
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-[#152032] px-3 py-1.5 text-xs text-[#c3c6d7]">
              <span className="material-symbols-outlined text-base">
                calendar_month
              </span>
              6 derniers mois
            </div>
          </div>
          <div className="flex items-end gap-3 h-48">
            {revenueMonths.map((m) => (
              <div
                key={m.month}
                className="flex-1 flex flex-col items-center gap-2"
              >
                <span className="text-xs font-medium text-[#c3c6d7]">
                  {formatCurrency(m.value)}
                </span>
                <div
                  className="w-full rounded-t-md bg-gradient-to-t from-[#2563eb] to-[#03b5d3] transition-all duration-500"
                  style={{
                    height: `${(m.value / maxRevenue) * 100}%`,
                    minHeight: "12px",
                  }}
                />
                <span className="text-xs font-semibold text-[#c3c6d7]">
                  {m.month}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Donut Chart */}
        <div className="rounded-xl bg-[#202a3d]/60 backdrop-blur-xl border border-[#434655]/10 p-6 shadow-lg">
          <h2 className="text-lg font-semibold text-white font-[family-name:var(--font-plus-jakarta-sans)] mb-4">
            R\u00e9partition par client
          </h2>
          {/* Donut placeholder */}
          <div className="relative mx-auto h-40 w-40 mb-6">
            <svg viewBox="0 0 36 36" className="h-full w-full -rotate-90">
              {donutSegments.reduce(
                (acc, seg) => {
                  const el = (
                    <circle
                      key={seg.label}
                      cx="18"
                      cy="18"
                      r="15.9155"
                      fill="none"
                      stroke={seg.color}
                      strokeWidth="3.5"
                      strokeDasharray={`${seg.pct} ${100 - seg.pct}`}
                      strokeDashoffset={`${-acc.offset}`}
                      className="transition-all duration-700"
                    />
                  );
                  acc.elements.push(el);
                  acc.offset += seg.pct;
                  return acc;
                },
                { elements: [] as React.ReactNode[], offset: 0 }
              ).elements}
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold text-white">5</span>
              <span className="text-[10px] text-[#c3c6d7]">clients</span>
            </div>
          </div>
          <div className="space-y-2">
            {donutSegments.map((seg) => (
              <div key={seg.label} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: seg.color }}
                  />
                  <span className="text-[#c3c6d7]">{seg.label}</span>
                </div>
                <span className="font-medium text-white">{seg.pct}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Performance Table ───────────────────────────────────────────── */}
      <div className="rounded-xl bg-[#202a3d]/60 backdrop-blur-xl border border-[#434655]/10 shadow-lg overflow-hidden">
        <div className="p-6 border-b border-[#434655]/10">
          <h2 className="text-lg font-semibold text-white font-[family-name:var(--font-plus-jakarta-sans)]">
            Performance par client
          </h2>
          <p className="text-sm text-[#c3c6d7]">
            D\u00e9tail des m\u00e9triques cl\u00e9s de chaque client
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#434655]/10 text-[#c3c6d7]">
                <th className="px-6 py-3 text-left font-medium">Client</th>
                <th className="px-6 py-3 text-left font-medium">Closer</th>
                <th className="px-6 py-3 text-right font-medium">Appels</th>
                <th className="px-6 py-3 text-right font-medium">Qualifi\u00e9s</th>
                <th className="px-6 py-3 text-right font-medium">Devis</th>
                <th className="px-6 py-3 text-right font-medium">CA</th>
                <th className="px-6 py-3 text-right font-medium">Commission</th>
                <th className="px-6 py-3 text-center font-medium">Statut</th>
              </tr>
            </thead>
            <tbody>
              {performanceRows.map((r) => (
                <tr
                  key={r.client}
                  className="border-b border-[#434655]/10 hover:bg-[#152032]/40 transition-colors"
                >
                  <td className="px-6 py-4 font-medium text-white">
                    {r.client}
                  </td>
                  <td className="px-6 py-4 text-[#c3c6d7]">{r.closer}</td>
                  <td className="px-6 py-4 text-right text-[#c3c6d7]">
                    {r.appels}
                  </td>
                  <td className="px-6 py-4 text-right text-[#c3c6d7]">
                    {r.qualifies}
                  </td>
                  <td className="px-6 py-4 text-right text-[#c3c6d7]">
                    {r.devis}
                  </td>
                  <td className="px-6 py-4 text-right font-medium text-white">
                    {formatCurrency(r.ca)}
                  </td>
                  <td className="px-6 py-4 text-right font-medium text-gradient">
                    {formatCurrency(r.commission)}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusColor(r.statut)}`}
                    >
                      {r.statut}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Bottom Row: Recent Deals + Objectif ─────────────────────────── */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Recent Deals */}
        <div className="lg:col-span-2 rounded-xl bg-[#202a3d]/60 backdrop-blur-xl border border-[#434655]/10 p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white font-[family-name:var(--font-plus-jakarta-sans)]">
              Deals r\u00e9cents
            </h2>
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </span>
          </div>
          <div className="space-y-3">
            {recentDeals.map((d, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-lg bg-[#152032]/40 px-4 py-3 border border-[#434655]/10"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#2563eb]/20 text-[#2563eb]">
                    <span className="material-symbols-outlined text-lg">
                      handshake
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">
                      {d.prospect}
                    </p>
                    <p className="text-xs text-[#c3c6d7]">{d.client}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-white">
                    {formatCurrency(d.montant)}
                  </p>
                  <p className={`text-xs ${dealStatusColor(d.statut)}`}>
                    {d.statut} &middot; {d.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Objectif trimestriel */}
        <div className="rounded-xl bg-[#202a3d]/60 backdrop-blur-xl border border-[#434655]/10 p-6 shadow-lg flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-semibold text-white font-[family-name:var(--font-plus-jakarta-sans)] mb-1">
              Objectif trimestriel
            </h2>
            <p className="text-sm text-[#c3c6d7] mb-6">
              Q1 2026 &mdash; Chiffre d&apos;affaires
            </p>
            <div className="relative pt-1">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-[#c3c6d7]">
                  Progression
                </span>
                <span className="text-sm font-bold text-white">68%</span>
              </div>
              <div className="h-3 w-full rounded-full bg-[#152032]">
                <div
                  className="h-3 rounded-full bg-gradient-brand transition-all duration-700"
                  style={{ width: "68%" }}
                />
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between text-sm">
              <div>
                <p className="text-[#c3c6d7]">R\u00e9alis\u00e9</p>
                <p className="font-semibold text-white">
                  {formatCurrency(34000)}
                </p>
              </div>
              <div className="text-right">
                <p className="text-[#c3c6d7]">Objectif</p>
                <p className="font-semibold text-white">
                  {formatCurrency(50000)}
                </p>
              </div>
            </div>
          </div>
          <div className="mt-6 flex items-center gap-2 rounded-lg bg-[#152032]/60 px-4 py-3 text-sm">
            <span className="material-symbols-outlined text-base text-[#03b5d3]">
              info
            </span>
            <span className="text-[#c3c6d7]">
              Il reste <span className="font-medium text-white">32%</span> pour
              atteindre votre objectif
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
