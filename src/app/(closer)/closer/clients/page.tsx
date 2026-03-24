"use client";

import { formatCurrency } from "@/lib/format";
import { useState } from "react";

/* ──────────────────────────────────────────────────────────────────────────── */
/*  Mock data                                                                  */
/* ──────────────────────────────────────────────────────────────────────────── */

const clients = [
  { id: "CLI-001", name: "TechVision SAS", owner: "Alexandre Morel", email: "contact@techvision.fr", prospectsActifs: 8, prospectsTotal: 32, ca: 68000, taux: 48.2, status: "actif", dernierAppel: "Aujourd'hui" },
  { id: "CLI-003", name: "DataFlow Corp", owner: "Nathalie Bertrand", email: "contact@dataflow.fr", prospectsActifs: 6, prospectsTotal: 28, ca: 54000, taux: 52.1, status: "actif", dernierAppel: "Hier" },
  { id: "CLI-005", name: "CloudNine Solutions", owner: "Marc Duval", email: "contact@cloudnine.fr", prospectsActifs: 5, prospectsTotal: 22, ca: 42000, taux: 44.8, status: "actif", dernierAppel: "Aujourd'hui" },
  { id: "CLI-007", name: "PixelForge Studio", owner: "Clément Richard", email: "contact@pixelforge.fr", prospectsActifs: 4, prospectsTotal: 18, ca: 38000, taux: 39.5, status: "actif", dernierAppel: "Il y a 2 jours" },
  { id: "CLI-009", name: "NeoBank Finance", owner: "Sophie Martinez", email: "contact@neobank.fr", prospectsActifs: 3, prospectsTotal: 15, ca: 31000, taux: 46.3, status: "pause", dernierAppel: "Il y a 5 jours" },
  { id: "CLI-012", name: "GreenTech Innovations", owner: "Paul Lemoine", email: "contact@greentech.fr", prospectsActifs: 4, prospectsTotal: 14, ca: 28000, taux: 41.7, status: "actif", dernierAppel: "Hier" },
  { id: "CLI-015", name: "MediSoft Santé", owner: "Dr. Anne Faure", email: "contact@medisoft.fr", prospectsActifs: 2, prospectsTotal: 8, ca: 15000, taux: 37.2, status: "actif", dernierAppel: "Il y a 3 jours" },
  { id: "CLI-018", name: "EduPrime Formation", owner: "Thierry Blanc", email: "contact@eduprime.fr", prospectsActifs: 2, prospectsTotal: 5, ca: 9000, taux: 33.8, status: "inactif", dernierAppel: "Il y a 12 jours" },
];

const filters = ["Tous", "Actifs", "En pause", "Inactifs"];

const statusColor: Record<string, string> = {
  actif: "bg-emerald-500/20 text-emerald-400",
  pause: "bg-amber-500/20 text-amber-400",
  inactif: "bg-red-500/20 text-red-400",
};

const statusLabel: Record<string, string> = {
  actif: "Actif",
  pause: "En pause",
  inactif: "Inactif",
};

/* ──────────────────────────────────────────────────────────────────────────── */
/*  Page                                                                       */
/* ──────────────────────────────────────────────────────────────────────────── */

export default function CloserClientsPage() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("Tous");

  const filtered = clients.filter((c) => {
    const matchSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.owner.toLowerCase().includes(search.toLowerCase());
    const matchFilter =
      activeFilter === "Tous" ||
      (activeFilter === "Actifs" && c.status === "actif") ||
      (activeFilter === "En pause" && c.status === "pause") ||
      (activeFilter === "Inactifs" && c.status === "inactif");
    return matchSearch && matchFilter;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white font-[family-name:var(--font-plus-jakarta-sans)]">Mes clients</h1>
        <p className="text-sm text-[#c3c6d7] mt-1">Gérez vos clients assignés et suivez leur activité</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div className="rounded-xl bg-[#202a3d]/60 backdrop-blur-xl border border-[#434655]/10 p-6 shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-medium text-[#c3c6d7]">Clients actifs</p>
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#152032] text-emerald-400">
              <span className="material-symbols-outlined text-lg">check_circle</span>
            </div>
          </div>
          <p className="text-2xl font-bold text-white">{clients.filter((c) => c.status === "actif").length}</p>
        </div>
        <div className="rounded-xl bg-[#202a3d]/60 backdrop-blur-xl border border-[#434655]/10 p-6 shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-medium text-[#c3c6d7]">Prospects actifs total</p>
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#152032] text-[#2563eb]">
              <span className="material-symbols-outlined text-lg">people</span>
            </div>
          </div>
          <p className="text-2xl font-bold text-white">{clients.reduce((sum, c) => sum + c.prospectsActifs, 0)}</p>
        </div>
        <div className="rounded-xl bg-[#202a3d]/60 backdrop-blur-xl border border-[#434655]/10 p-6 shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-medium text-[#c3c6d7]">CA total</p>
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#152032] text-[#03b5d3]">
              <span className="material-symbols-outlined text-lg">payments</span>
            </div>
          </div>
          <p className="text-2xl font-bold text-white">{formatCurrency(clients.reduce((sum, c) => sum + c.ca, 0))}</p>
        </div>
      </div>

      {/* Filters + Search */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-1 rounded-xl bg-[#202a3d]/60 backdrop-blur-xl border border-[#434655]/10 p-1.5">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                activeFilter === f
                  ? "bg-[#2563eb] text-white shadow-lg shadow-[#2563eb]/25"
                  : "text-[#c3c6d7] hover:text-white hover:bg-[#152032]/60"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#c3c6d7] text-lg">search</span>
          <input
            type="text"
            placeholder="Rechercher un client..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-72 rounded-lg bg-[#202a3d]/60 backdrop-blur-xl border border-[#434655]/10 pl-10 pr-4 py-2.5 text-sm text-white placeholder-[#c3c6d7]/50 focus:outline-none focus:ring-2 focus:ring-[#2563eb]/50"
          />
        </div>
      </div>

      {/* Client Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {filtered.map((client) => (
          <div key={client.id} className="rounded-xl bg-[#202a3d]/60 backdrop-blur-xl border border-[#434655]/10 p-6 shadow-lg hover:border-[#2563eb]/30 transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-brand text-white text-sm font-bold">
                  {client.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                </div>
                <div>
                  <p className="font-semibold text-white">{client.name}</p>
                  <p className="text-xs text-[#c3c6d7]">{client.owner} &middot; {client.id}</p>
                </div>
              </div>
              <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusColor[client.status]}`}>
                {statusLabel[client.status]}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="rounded-lg bg-[#152032]/60 px-3 py-2.5 text-center">
                <p className="text-xs text-[#c3c6d7]">Prospects</p>
                <p className="text-lg font-bold text-white">{client.prospectsActifs}<span className="text-xs font-normal text-[#c3c6d7]">/{client.prospectsTotal}</span></p>
              </div>
              <div className="rounded-lg bg-[#152032]/60 px-3 py-2.5 text-center">
                <p className="text-xs text-[#c3c6d7]">CA</p>
                <p className="text-sm font-bold text-white">{formatCurrency(client.ca)}</p>
              </div>
              <div className="rounded-lg bg-[#152032]/60 px-3 py-2.5 text-center">
                <p className="text-xs text-[#c3c6d7]">Conv.</p>
                <p className={`text-lg font-bold ${client.taux >= 45 ? "text-emerald-400" : client.taux >= 38 ? "text-amber-400" : "text-red-400"}`}>{client.taux}%</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-[#434655]/10">
              <div className="flex items-center gap-1.5 text-xs text-[#c3c6d7]">
                <span className="material-symbols-outlined text-sm">schedule</span>
                Dernier appel : {client.dernierAppel}
              </div>
              <a href={`/closer/clients/${client.id}`} className="inline-flex items-center gap-1 text-xs font-medium text-[#2563eb] hover:text-[#03b5d3] transition">
                Détails
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
