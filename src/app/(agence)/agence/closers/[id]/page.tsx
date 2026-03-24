"use client";

import { formatCurrency } from "@/lib/format";

/* ──────────────────────────────────────────────────────────────────────────── */
/*  Mock data                                                                  */
/* ──────────────────────────────────────────────────────────────────────────── */

const closer = {
  id: "CLO-001",
  name: "Julien Mercier",
  email: "julien@celexia.fr",
  phone: "06 12 34 56 78",
  avatar: "JM",
  active: true,
  specialite: "SaaS / Tech",
  dateDebut: "Depuis septembre 2024",
  badges: ["Top Performer", "5+ Clients"],
};

const kpis = [
  {
    label: "Clients Apport\u00e9s",
    value: "142",
    icon: "groups",
    trend: "+12",
    trendLabel: "ce mois",
  },
  {
    label: "CA Total",
    value: formatCurrency(845200),
    icon: "payments",
    trend: "+8.4%",
    trendLabel: "vs mois dernier",
  },
  {
    label: "Revenu Celexia",
    value: formatCurrency(126780),
    icon: "savings",
    trend: "+6.2%",
    trendLabel: "vs mois dernier",
  },
  {
    label: "Commission due",
    value: formatCurrency(4250),
    icon: "account_balance_wallet",
    trend: "Ce mois",
    trendLabel: "",
  },
];

const clientsTable = [
  {
    nom: "TechVision SAS",
    appels: 48,
    caSigne: 18500,
    commissionCloser: 1850,
  },
  {
    nom: "DigiMarketing",
    appels: 36,
    caSigne: 12400,
    commissionCloser: 1240,
  },
  { nom: "CleanOffice", appels: 12, caSigne: 3600, commissionCloser: 360 },
  {
    nom: "GreenTech Solutions",
    appels: 24,
    caSigne: 7800,
    commissionCloser: 780,
  },
  { nom: "InfoServices", appels: 18, caSigne: 5200, commissionCloser: 520 },
  { nom: "MediSoft", appels: 31, caSigne: 14200, commissionCloser: 1420 },
  { nom: "DataPilot", appels: 22, caSigne: 9800, commissionCloser: 980 },
  { nom: "CloudNine SAS", appels: 15, caSigne: 6400, commissionCloser: 640 },
];

const commissionHistory = [
  { month: "Mars 2026", amount: 4250, status: "En attente" },
  { month: "F\u00e9vrier 2026", amount: 3890, status: "Pay\u00e9" },
  { month: "Janvier 2026", amount: 4120, status: "Pay\u00e9" },
  { month: "D\u00e9cembre 2025", amount: 3650, status: "Pay\u00e9" },
  { month: "Novembre 2025", amount: 3980, status: "Pay\u00e9" },
  { month: "Octobre 2025", amount: 3420, status: "Pay\u00e9" },
];

/* ──────────────────────────────────────────────────────────────────────────── */
/*  Page                                                                       */
/* ──────────────────────────────────────────────────────────────────────────── */

export default function CloserDetailPage() {
  return (
    <div className="space-y-8">
      {/* ── Breadcrumb ──────────────────────────────────────────────────── */}
      <div className="flex items-center gap-2 text-sm text-[#c3c6d7]">
        <a
          href="/agence/closers"
          className="hover:text-white transition-colors"
        >
          Closers
        </a>
        <span className="material-symbols-outlined text-xs">
          chevron_right
        </span>
        <span className="text-white font-medium">{closer.name}</span>
      </div>

      {/* ── Profile Hero ────────────────────────────────────────────────── */}
      <div className="rounded-xl bg-[#202a3d]/60 backdrop-blur-xl border border-[#434655]/10 p-8 shadow-lg">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-5">
            <div className="relative">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-brand text-white text-2xl font-bold">
                {closer.avatar}
              </div>
              <span className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full border-[3px] border-[#202a3d] bg-emerald-500" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white font-[family-name:var(--font-plus-jakarta-sans)]">
                {closer.name}
              </h1>
              <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-[#c3c6d7]">
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-base">
                    mail
                  </span>
                  {closer.email}
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-base">
                    phone
                  </span>
                  {closer.phone}
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-base">
                    work
                  </span>
                  {closer.specialite}
                </span>
              </div>
              <div className="mt-3 flex items-center gap-2">
                {closer.badges.map((badge) => (
                  <span
                    key={badge}
                    className="inline-flex items-center rounded-full bg-[#2563eb]/20 px-2.5 py-0.5 text-xs font-semibold text-[#2563eb]"
                  >
                    {badge}
                  </span>
                ))}
                <span className="inline-flex items-center rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-xs font-semibold text-emerald-400">
                  Actif
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="inline-flex items-center gap-2 rounded-lg bg-[#152032] border border-[#434655]/20 px-4 py-2 text-sm font-medium text-[#c3c6d7] hover:text-white transition">
              <span className="material-symbols-outlined text-base">edit</span>
              Modifier
            </button>
            <button className="inline-flex items-center gap-2 rounded-lg bg-gradient-brand px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-[#2563eb]/25">
              <span className="material-symbols-outlined text-base">
                mail
              </span>
              Contacter
            </button>
          </div>
        </div>
      </div>

      {/* ── KPI Cards ───────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((k) => (
          <div
            key={k.label}
            className="rounded-xl bg-[#202a3d]/60 backdrop-blur-xl border border-[#434655]/10 p-6 shadow-lg"
          >
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-medium text-[#c3c6d7]">{k.label}</p>
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#152032] text-[#2563eb]">
                <span className="material-symbols-outlined text-lg">
                  {k.icon}
                </span>
              </div>
            </div>
            <p className="text-2xl font-bold text-white">{k.value}</p>
            <div className="mt-2 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-base text-emerald-400">
                trending_up
              </span>
              <span className="text-sm font-medium bg-gradient-to-r from-emerald-400 to-[#03b5d3] bg-clip-text text-transparent">
                {k.trend}
              </span>
              {k.trendLabel && (
                <span className="text-xs text-[#c3c6d7]">
                  {k.trendLabel}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* ── Clients Table + Commission History ──────────────────────────── */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Clients Table */}
        <div className="lg:col-span-2 rounded-xl bg-[#202a3d]/60 backdrop-blur-xl border border-[#434655]/10 shadow-lg overflow-hidden">
          <div className="p-6 border-b border-[#434655]/10">
            <h2 className="text-lg font-semibold text-white font-[family-name:var(--font-plus-jakarta-sans)]">
              Clients g\u00e9r\u00e9s
            </h2>
            <p className="text-sm text-[#c3c6d7]">
              D\u00e9tail des performances par client
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#434655]/10 text-[#c3c6d7]">
                  <th className="px-6 py-3 text-left font-medium">Nom</th>
                  <th className="px-6 py-3 text-right font-medium">Appels</th>
                  <th className="px-6 py-3 text-right font-medium">
                    CA sign\u00e9
                  </th>
                  <th className="px-6 py-3 text-right font-medium">
                    Commission
                  </th>
                </tr>
              </thead>
              <tbody>
                {clientsTable.map((row) => (
                  <tr
                    key={row.nom}
                    className="border-b border-[#434655]/10 hover:bg-[#152032]/40 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#2563eb]/20 text-[#2563eb] text-xs font-bold">
                          {row.nom
                            .split(" ")
                            .map((w) => w[0])
                            .join("")
                            .slice(0, 2)}
                        </div>
                        <span className="font-medium text-white">
                          {row.nom}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right text-[#c3c6d7]">
                      {row.appels}
                    </td>
                    <td className="px-6 py-4 text-right font-medium text-white">
                      {formatCurrency(row.caSigne)}
                    </td>
                    <td className="px-6 py-4 text-right font-medium text-gradient">
                      {formatCurrency(row.commissionCloser)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-[#152032]/40">
                  <td className="px-6 py-3 font-semibold text-white">Total</td>
                  <td className="px-6 py-3 text-right font-semibold text-white">
                    {clientsTable.reduce((s, r) => s + r.appels, 0)}
                  </td>
                  <td className="px-6 py-3 text-right font-semibold text-white">
                    {formatCurrency(
                      clientsTable.reduce((s, r) => s + r.caSigne, 0)
                    )}
                  </td>
                  <td className="px-6 py-3 text-right font-semibold text-gradient">
                    {formatCurrency(
                      clientsTable.reduce(
                        (s, r) => s + r.commissionCloser,
                        0
                      )
                    )}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Commission History */}
        <div className="rounded-xl bg-[#202a3d]/60 backdrop-blur-xl border border-[#434655]/10 p-6 shadow-lg">
          <h2 className="text-lg font-semibold text-white font-[family-name:var(--font-plus-jakarta-sans)] mb-5">
            Historique commissions
          </h2>
          <div className="space-y-3">
            {commissionHistory.map((entry) => (
              <div
                key={entry.month}
                className="flex items-center justify-between rounded-lg bg-[#152032]/40 border border-[#434655]/10 px-4 py-3"
              >
                <div>
                  <p className="text-sm font-medium text-white">
                    {entry.month}
                  </p>
                  <p className="text-lg font-bold text-white mt-0.5">
                    {formatCurrency(entry.amount)}
                  </p>
                </div>
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                    entry.status === "Pay\u00e9"
                      ? "bg-emerald-500/20 text-emerald-400"
                      : "bg-yellow-500/20 text-yellow-400"
                  }`}
                >
                  {entry.status}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-5 rounded-lg bg-[#152032]/60 px-4 py-3 flex items-center justify-between">
            <span className="text-sm text-[#c3c6d7]">Total cumul\u00e9</span>
            <span className="text-base font-bold text-gradient">
              {formatCurrency(
                commissionHistory.reduce((s, e) => s + e.amount, 0)
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
