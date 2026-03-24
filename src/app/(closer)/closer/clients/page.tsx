"use client";

import { useState } from "react";

/* ------------------------------------------------------------------ */
/*  Mock data                                                         */
/* ------------------------------------------------------------------ */
type ClientStatus = "ACTIF" | "EN PAUSE" | "NOUVEAU";

interface CloserClient {
  id: number;
  name: string;
  sector: string;
  ca: string;
  appels: number;
  commission: string;
  status: ClientStatus;
  initials: string;
  color: string;
}

const clientsList: CloserClient[] = [
  { id: 1, name: "Réno Express", sector: "Rénovation", ca: "38,500 €", appels: 42, commission: "385 €", status: "ACTIF", initials: "RE", color: "from-[#2563eb] to-[#03b5d3]" },
  { id: 2, name: "Solaire Plus", sector: "Énergie solaire", ca: "31,200 €", appels: 35, commission: "312 €", status: "ACTIF", initials: "SP", color: "from-emerald-500 to-teal-400" },
  { id: 3, name: "Habitat Vert", sector: "Isolation", ca: "24,800 €", appels: 28, commission: "248 €", status: "ACTIF", initials: "HV", color: "from-violet-500 to-purple-400" },
  { id: 4, name: "Isol'Pro", sector: "Isolation", ca: "19,500 €", appels: 22, commission: "195 €", status: "NOUVEAU", initials: "IP", color: "from-orange-500 to-amber-400" },
  { id: 5, name: "Thermo Confort", sector: "Chauffage", ca: "16,200 €", appels: 18, commission: "162 €", status: "EN PAUSE", initials: "TC", color: "from-rose-500 to-pink-400" },
  { id: 6, name: "Clim'Sud", sector: "Climatisation", ca: "12,300 €", appels: 15, commission: "123 €", status: "ACTIF", initials: "CS", color: "from-cyan-500 to-blue-400" },
  { id: 7, name: "BatiNova", sector: "Construction", ca: "28,700 €", appels: 32, commission: "287 €", status: "ACTIF", initials: "BN", color: "from-indigo-500 to-blue-400" },
  { id: 8, name: "ÉcoRénov", sector: "Rénovation", ca: "14,600 €", appels: 20, commission: "146 €", status: "NOUVEAU", initials: "ÉR", color: "from-green-500 to-emerald-400" },
  { id: 9, name: "Fenêtres Pro", sector: "Menuiserie", ca: "9,800 €", appels: 12, commission: "98 €", status: "ACTIF", initials: "FP", color: "from-sky-500 to-cyan-400" },
];

const statusColors: Record<ClientStatus, string> = {
  ACTIF: "bg-emerald-500/20 text-emerald-400",
  "EN PAUSE": "bg-yellow-500/20 text-yellow-400",
  NOUVEAU: "bg-[#2563eb]/20 text-[#2563eb]",
};

const statusIcon: Record<ClientStatus, string> = {
  ACTIF: "check_circle",
  "EN PAUSE": "pause_circle",
  NOUVEAU: "fiber_new",
};

/* ------------------------------------------------------------------ */
/*  Page                                                              */
/* ------------------------------------------------------------------ */
export default function CloserClientsPage() {
  const [search, setSearch] = useState("");

  const filtered = clientsList.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <span className="material-symbols-outlined text-[#03b5d3] text-3xl">people</span>
            Mes Clients
          </h1>
          <p className="mt-1 text-[#c3c6d7]">
            {clientsList.length} client{clientsList.length > 1 ? "s" : ""} dans votre portefeuille
          </p>
        </div>

        {/* Search */}
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#434655] text-lg">
            search
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher un client..."
            className="w-full sm:w-72 rounded-lg border border-[#434655]/20 bg-[#152032] pl-10 pr-4 py-2.5 text-sm text-white outline-none focus:border-[#2563eb] transition-colors placeholder:text-[#434655]"
          />
        </div>
      </div>

      {/* Client Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((client) => (
          <div
            key={client.id}
            className="glass-card rounded-xl border border-[#434655]/10 p-6 hover:border-[#2563eb]/30 hover:shadow-lg hover:shadow-[#2563eb]/5 transition-all group cursor-pointer"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${client.color} text-white text-sm font-bold shadow-lg`}
                >
                  {client.initials}
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white group-hover:text-[#03b5d3] transition-colors">
                    {client.name}
                  </h3>
                  <p className="text-xs text-[#c3c6d7]">{client.sector}</p>
                </div>
              </div>
              <span
                className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ${statusColors[client.status]}`}
              >
                <span className="material-symbols-outlined text-xs">{statusIcon[client.status]}</span>
                {client.status}
              </span>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-lg bg-[#152032] p-3 text-center">
                <p className="text-lg font-bold text-white">{client.ca}</p>
                <p className="text-[10px] text-[#c3c6d7] uppercase tracking-wider mt-0.5">CA généré</p>
              </div>
              <div className="rounded-lg bg-[#152032] p-3 text-center">
                <p className="text-lg font-bold text-white">{client.appels}</p>
                <p className="text-[10px] text-[#c3c6d7] uppercase tracking-wider mt-0.5">Appels</p>
              </div>
              <div className="rounded-lg bg-[#152032] p-3 text-center">
                <p className="text-lg font-bold text-[#03b5d3]">{client.commission}</p>
                <p className="text-[10px] text-[#c3c6d7] uppercase tracking-wider mt-0.5">Commission</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="glass-panel rounded-xl border border-[#434655]/10 p-12 text-center">
          <span className="material-symbols-outlined text-5xl text-[#434655]">search_off</span>
          <p className="mt-4 text-lg font-medium text-white">Aucun client trouvé</p>
          <p className="mt-1 text-sm text-[#c3c6d7]">
            Essayez de modifier votre recherche
          </p>
        </div>
      )}
    </div>
  );
}
