"use client";

/* ------------------------------------------------------------------ */
/*  Mock data                                                         */
/* ------------------------------------------------------------------ */
const commissionChart = [
  { month: "Déc", value: 820, height: "32%" },
  { month: "Jan", value: 1050, height: "42%" },
  { month: "Fév", value: 1180, height: "47%" },
  { month: "Mar", value: 1425, height: "57%" },
  { month: "Avr", value: 980, height: "39%" },
  { month: "Mai", value: 1320, height: "53%" },
];

type ClientStatus = "ACTIF" | "EN PAUSE" | "NOUVEAU";

const clients = [
  { id: 1, name: "Réno Express", appels: 42, ca: "38,500 €", commCelexia: "3,850 €", taPart: "385 €", status: "ACTIF" as ClientStatus },
  { id: 2, name: "Solaire Plus", appels: 35, ca: "31,200 €", commCelexia: "3,120 €", taPart: "312 €", status: "ACTIF" as ClientStatus },
  { id: 3, name: "Habitat Vert", appels: 28, ca: "24,800 €", commCelexia: "2,480 €", taPart: "248 €", status: "ACTIF" as ClientStatus },
  { id: 4, name: "Isol&apos;Pro", appels: 22, ca: "19,500 €", commCelexia: "1,950 €", taPart: "195 €", status: "NOUVEAU" as ClientStatus },
  { id: 5, name: "Thermo Confort", appels: 18, ca: "16,200 €", commCelexia: "1,620 €", taPart: "162 €", status: "EN PAUSE" as ClientStatus },
  { id: 6, name: "Clim&apos;Sud", appels: 15, ca: "12,300 €", commCelexia: "1,230 €", taPart: "123 €", status: "ACTIF" as ClientStatus },
];

const statusColors: Record<ClientStatus, string> = {
  ACTIF: "bg-emerald-500/20 text-emerald-400",
  "EN PAUSE": "bg-yellow-500/20 text-yellow-400",
  NOUVEAU: "bg-[#2563eb]/20 text-[#2563eb]",
};

/* ------------------------------------------------------------------ */
/*  Page                                                              */
/* ------------------------------------------------------------------ */
export default function CloserDashboardPage() {
  const currentMonthIndex = 3; // March

  return (
    <div className="space-y-8">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-bold">
          <span className="text-gradient">Mon espace Closer</span>
        </h1>
        <p className="mt-1 text-[#c3c6d7]">Vue d&apos;ensemble de vos performances commerciales</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Clients apportés */}
        <div className="glass-card rounded-xl border border-[#434655]/10 p-6">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-[#c3c6d7]">Clients apportés</p>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#152032] text-[#2563eb]">
              <span className="material-symbols-outlined">group_add</span>
            </div>
          </div>
          <p className="mt-3 text-3xl font-bold text-white">24</p>
          <div className="mt-1 flex items-center gap-2">
            <span className="text-sm font-medium text-emerald-400">+12%</span>
            <span className="text-xs text-[#c3c6d7]">vs mois dernier</span>
          </div>
        </div>

        {/* CA généré */}
        <div className="glass-card rounded-xl border border-[#434655]/10 p-6">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-[#c3c6d7]">CA généré ce mois</p>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#152032] text-emerald-400">
              <span className="material-symbols-outlined">trending_up</span>
            </div>
          </div>
          <p className="mt-3 text-3xl font-bold text-white">142,500 €</p>
        </div>

        {/* Commission - gradient card */}
        <div className="bg-gradient-brand rounded-xl p-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2240%22%20height%3D%2240%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Ccircle%20cx%3D%222%22%20cy%3D%222%22%20r%3D%221%22%20fill%3D%22rgba(255%2C255%2C255%2C0.06)%22%2F%3E%3C%2Fsvg%3E')] bg-[length:40px_40px]" />
          <div className="relative">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-white/80">Ma commission</p>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-white">
                <span className="material-symbols-outlined">euro</span>
              </div>
            </div>
            <p className="mt-3 text-3xl font-bold text-white">1,425 €</p>
            <p className="mt-1 text-xs text-white/70">
              <span className="inline-block rounded bg-white/15 px-1.5 py-0.5 text-white text-[10px] font-semibold uppercase">
                10% Celexia
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Chart + Objectives Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Commission Evolution Chart */}
        <div className="lg:col-span-2 glass-panel rounded-xl border border-[#434655]/10 p-6">
          <h2 className="text-lg font-semibold text-white mb-6">
            <span className="material-symbols-outlined text-[#2563eb] mr-2 align-middle">bar_chart</span>
            Évolution des commissions
          </h2>
          <div className="flex items-end justify-between gap-4 h-52">
            {commissionChart.map((bar, i) => (
              <div key={bar.month} className="flex-1 flex flex-col items-center gap-2">
                <span className="text-xs font-bold text-white">{bar.value} €</span>
                <div className="w-full relative" style={{ height: "180px" }}>
                  <div
                    className={`absolute bottom-0 w-full rounded-t-lg transition-all duration-500 ${
                      i === currentMonthIndex
                        ? "bg-gradient-to-t from-[#2563eb] to-[#03b5d3] shadow-lg shadow-[#2563eb]/30"
                        : "bg-[#2563eb]/30 hover:bg-[#2563eb]/50"
                    }`}
                    style={{ height: bar.height }}
                  />
                </div>
                <span
                  className={`text-xs font-medium ${
                    i === currentMonthIndex ? "text-[#03b5d3] font-bold" : "text-[#c3c6d7]"
                  }`}
                >
                  {bar.month}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Objectives Sidebar */}
        <div className="space-y-6">
          {/* Quota Clients */}
          <div className="glass-panel rounded-xl border border-[#434655]/10 p-6">
            <h3 className="text-sm font-semibold text-white mb-4">Objectifs</h3>

            <div className="space-y-5">
              {/* Quota */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs text-[#c3c6d7]">Quota Clients</span>
                  <span className="text-xs font-bold text-white">24 / 30</span>
                </div>
                <div className="h-2.5 rounded-full bg-[#152032] overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[#2563eb] transition-all duration-700"
                    style={{ width: "80%" }}
                  />
                </div>
                <p className="mt-1 text-[10px] text-[#c3c6d7]">80%</p>
              </div>

              {/* CA Cible */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs text-[#c3c6d7]">CA Cible</span>
                  <span className="text-xs font-bold text-white">142k / 150k</span>
                </div>
                <div className="h-2.5 rounded-full bg-[#152032] overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#2563eb] to-[#03b5d3] transition-all duration-700"
                    style={{ width: "94%" }}
                  />
                </div>
                <p className="mt-1 text-[10px] text-[#c3c6d7]">94%</p>
              </div>
            </div>
          </div>

          {/* Bonus Level Card */}
          <div className="glass-panel rounded-xl border border-[#434655]/10 p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-[#2563eb]/20 to-transparent rounded-bl-full" />
            <div className="relative">
              <div className="flex items-center gap-2 mb-3">
                <span className="material-symbols-outlined text-yellow-400">workspace_premium</span>
                <span className="text-sm font-semibold text-white">Prochain palier</span>
              </div>
              <p className="text-sm text-[#c3c6d7] leading-relaxed">
                Atteignez{" "}
                <span className="font-bold text-white">160,000 €</span>{" "}
                pour passer à{" "}
                <span className="font-bold text-[#03b5d3]">12%</span> de commission
              </p>
              <div className="mt-3 h-2 rounded-full bg-[#152032] overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-yellow-500 to-yellow-400 transition-all duration-700"
                  style={{ width: "89%" }}
                />
              </div>
              <p className="mt-1.5 text-xs text-[#c3c6d7]">
                142,500 € / 160,000 € <span className="text-yellow-400 font-semibold">(89%)</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Clients Table */}
      <div className="glass-panel rounded-xl border border-[#434655]/10 overflow-hidden">
        <div className="p-6 border-b border-[#434655]/10">
          <h2 className="text-lg font-semibold text-white">
            <span className="material-symbols-outlined text-[#03b5d3] mr-2 align-middle">people</span>
            Mes clients
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#434655]/10">
                <th className="text-left px-6 py-3 text-xs font-medium text-[#c3c6d7] uppercase tracking-wider">
                  Nom client
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-[#c3c6d7] uppercase tracking-wider">
                  Appels
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-[#c3c6d7] uppercase tracking-wider">
                  CA Généré
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-[#c3c6d7] uppercase tracking-wider">
                  Comm. Celexia
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-[#c3c6d7] uppercase tracking-wider">
                  Ta part (10%)
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-[#c3c6d7] uppercase tracking-wider">
                  Statut
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#434655]/10">
              {clients.map((client) => (
                <tr key={client.id} className="hover:bg-[#202a3d]/40 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#2563eb]/20 text-[#2563eb] text-xs font-bold">
                        {client.name.substring(0, 2).toUpperCase()}
                      </div>
                      <span className="text-sm font-medium text-white">{client.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-[#c3c6d7]">{client.appels}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-white">{client.ca}</td>
                  <td className="px-6 py-4 text-sm text-[#c3c6d7]">{client.commCelexia}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-[#03b5d3]">{client.taPart}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusColors[client.status]}`}
                    >
                      {client.status}
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
