"use client";


/* ------------------------------------------------------------------ */
/*  Mock data                                                         */
/* ------------------------------------------------------------------ */
const recentCalls = [
  { id: 1, name: "Marie Dupont", date: "22 mars 2026 - 14:30", score: 5, value: "4,200 €", status: "QUALIFIÉ" },
  { id: 2, name: "Pierre Martin", date: "22 mars 2026 - 11:15", score: 4, value: "2,800 €", status: "EN COURS" },
  { id: 3, name: "Sophie Leclerc", date: "21 mars 2026 - 16:45", score: 5, value: "6,100 €", status: "GAGNÉ" },
  { id: 4, name: "Jean Moreau", date: "21 mars 2026 - 10:00", score: 3, value: "1,500 €", status: "À TRAITER" },
  { id: 5, name: "Camille Bernard", date: "20 mars 2026 - 09:30", score: 4, value: "3,400 €", status: "QUALIFIÉ" },
];

const funnelSteps = [
  { label: "TRAFFIC", value: "1.2k", width: "100%" },
  { label: "PROSPECTS", value: "340", width: "70%" },
  { label: "APPELS", value: "124", width: "40%" },
  { label: "VENTES", value: "24", width: "18%" },
];

const barData = [
  { label: "REÇUS", value: 124, pct: "100%", barPct: "100%" },
  { label: "QUALIFIÉS", value: 86, pct: "69%", barPct: "69%" },
  { label: "CLOSÉS", value: 24, pct: "19%", barPct: "19%" },
];

const statusColors: Record<string, string> = {
  "QUALIFIÉ": "bg-cyan-500/20 text-cyan-400",
  "EN COURS": "bg-yellow-500/20 text-yellow-400",
  "GAGNÉ": "bg-purple-500/20 text-purple-400",
  "À TRAITER": "bg-red-500/20 text-red-400",
};

/* ------------------------------------------------------------------ */
/*  Stars component                                                   */
/* ------------------------------------------------------------------ */
function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={`material-symbols-outlined text-base ${
            i < count ? "text-yellow-400" : "text-[#434655]"
          }`}
          style={{ fontVariationSettings: i < count ? "'FILL' 1" : "'FILL' 0" }}
        >
          star
        </span>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                              */
/* ------------------------------------------------------------------ */
export default function ClientDashboardPage() {
  return (
    <div className="space-y-8">
      {/* Greeting */}
      <div>
        <h1 className="text-3xl font-bold text-white">
          Bonjour Zachari{" "}
          <span className="inline-block animate-[wave_1.8s_ease-in-out_infinite] origin-[70%_70%]">
            👋
          </span>
        </h1>
        <p className="mt-1 text-[#c3c6d7]">
          Voici le résumé de votre activité commerciale
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Ad Spend */}
        <div className="glass-card rounded-xl border border-[#434655]/10 p-6">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-[#c3c6d7]">Vous avez investi</p>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#152032] text-[#2563eb]">
              <span className="material-symbols-outlined">payments</span>
            </div>
          </div>
          <p className="mt-3 text-2xl font-bold text-white">1,250 €</p>
          <p className="mt-1 text-xs text-[#c3c6d7] uppercase tracking-wider">AD SPEND</p>
        </div>

        {/* Revenue */}
        <div className="glass-card rounded-xl border border-[#434655]/10 p-6">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-[#c3c6d7]">Vous avez gagné</p>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#152032] text-emerald-400">
              <span className="material-symbols-outlined">trending_up</span>
            </div>
          </div>
          <p className="mt-3 text-2xl font-bold text-white">8,420 €</p>
          <div className="mt-1 flex items-center gap-2">
            <span className="text-sm font-medium text-emerald-400">+12.4%</span>
            <span className="text-xs text-[#c3c6d7]">vs mois dernier</span>
          </div>
        </div>

        {/* Commission */}
        <div className="glass-card rounded-xl border border-[#434655]/10 p-6">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-[#c3c6d7]">Vous reversez à Celexia</p>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#152032] text-[#03b5d3]">
              <span className="material-symbols-outlined">handshake</span>
            </div>
          </div>
          <p className="mt-3 text-2xl font-bold text-white">842 €</p>
          <p className="mt-1 text-xs text-[#c3c6d7]">
            <span className="inline-block rounded bg-[#03b5d3]/20 px-1.5 py-0.5 text-[#03b5d3] text-[10px] font-semibold uppercase">
              10% COM
            </span>
          </p>
        </div>
      </div>

      {/* ROI Hero Card */}
      <div className="bg-gradient-brand rounded-2xl p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2240%22%20height%3D%2240%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Ccircle%20cx%3D%222%22%20cy%3D%222%22%20r%3D%221%22%20fill%3D%22rgba(255%2C255%2C255%2C0.08)%22%2F%3E%3C%2Fsvg%3E')] bg-[length:40px_40px]" />
        <div className="relative flex items-center justify-between">
          <div>
            <p className="text-white/80 text-sm font-medium uppercase tracking-wider">
              Retour sur investissement
            </p>
            <p className="mt-2 text-6xl font-extrabold text-white">6.7x</p>
            <p className="mt-2 text-white/90 text-lg">
              Pour 1 € investi, vous gagnez <span className="font-bold text-white">6.70 €</span>
            </p>
          </div>
          <div className="hidden md:flex h-24 w-24 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
            <span className="material-symbols-outlined text-5xl text-white">rocket_launch</span>
          </div>
        </div>
      </div>

      {/* Bar Chart + Funnel Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart - Appels */}
        <div className="glass-panel rounded-xl border border-[#434655]/10 p-6">
          <h2 className="text-lg font-semibold text-white mb-6">
            <span className="material-symbols-outlined text-[#2563eb] mr-2 align-middle">bar_chart</span>
            Appels reçus vs qualifiés
          </h2>
          <div className="space-y-5">
            {barData.map((bar) => (
              <div key={bar.label}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-[#c3c6d7]">{bar.label}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-white">{bar.value}</span>
                    <span className="text-xs text-[#c3c6d7]">{bar.pct}</span>
                  </div>
                </div>
                <div className="h-3 rounded-full bg-[#152032] overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#2563eb] to-[#03b5d3] transition-all duration-700"
                    style={{ width: bar.barPct }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Funnel */}
        <div className="glass-panel rounded-xl border border-[#434655]/10 p-6">
          <h2 className="text-lg font-semibold text-white mb-6">
            <span className="material-symbols-outlined text-[#03b5d3] mr-2 align-middle">filter_alt</span>
            Entonnoir de conversion
          </h2>
          <div className="space-y-3">
            {funnelSteps.map((step, i) => (
              <div key={step.label} className="flex items-center gap-4">
                <div
                  className="h-12 rounded-lg bg-gradient-to-r from-[#2563eb]/80 to-[#03b5d3]/80 flex items-center justify-between px-4 transition-all duration-500"
                  style={{ width: step.width }}
                >
                  <span className="text-xs font-semibold text-white uppercase tracking-wider">
                    {step.label}
                  </span>
                  <span className="text-sm font-bold text-white">{step.value}</span>
                </div>
                {i < funnelSteps.length - 1 && (
                  <span className="material-symbols-outlined text-[#434655] text-sm shrink-0 -ml-2">
                    arrow_downward
                  </span>
                )}
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-2 text-sm text-[#c3c6d7]">
            <span className="material-symbols-outlined text-base text-emerald-400">check_circle</span>
            Taux de conversion global : <span className="font-bold text-white">2%</span>
          </div>
        </div>
      </div>

      {/* Recent Qualified Calls Table */}
      <div className="glass-panel rounded-xl border border-[#434655]/10 overflow-hidden">
        <div className="p-6 border-b border-[#434655]/10">
          <h2 className="text-lg font-semibold text-white">
            <span className="material-symbols-outlined text-[#2563eb] mr-2 align-middle">call</span>
            Derniers appels qualifiés
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#434655]/10">
                <th className="text-left px-6 py-3 text-xs font-medium text-[#c3c6d7] uppercase tracking-wider">
                  Prospect
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-[#c3c6d7] uppercase tracking-wider">
                  Date & Heure
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-[#c3c6d7] uppercase tracking-wider">
                  Score Lead
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-[#c3c6d7] uppercase tracking-wider">
                  Valeur Est.
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-[#c3c6d7] uppercase tracking-wider">
                  Statut
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#434655]/10">
              {recentCalls.map((call) => (
                <tr key={call.id} className="hover:bg-[#202a3d]/40 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#2563eb]/20 text-[#2563eb] text-sm font-bold">
                        {call.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <span className="text-sm font-medium text-white">{call.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-[#c3c6d7]">{call.date}</td>
                  <td className="px-6 py-4">
                    <Stars count={call.score} />
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-white">{call.value}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        statusColors[call.status] ?? "bg-gray-500/20 text-gray-400"
                      }`}
                    >
                      {call.status}
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
