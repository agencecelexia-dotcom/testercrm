"use client";

import { useState } from "react";

/* ------------------------------------------------------------------ */
/*  Mock data                                                         */
/* ------------------------------------------------------------------ */
type CallStatus = "À TRAITER" | "QUALIFIÉ" | "NON QUALIFIÉ" | "GAGNÉ" | "EN COURS";

interface Call {
  id: number;
  date: string;
  prospect: string;
  phone: string;
  status: CallStatus;
  montant: string;
}

const allCalls: Call[] = [
  { id: 1, date: "24 mars 2026 - 09:15", prospect: "Marie Dupont", phone: "+33 6 12 34 56 78", status: "À TRAITER", montant: "4,200 €" },
  { id: 2, date: "24 mars 2026 - 08:45", prospect: "Pierre Martin", phone: "+33 6 23 45 67 89", status: "QUALIFIÉ", montant: "2,800 €" },
  { id: 3, date: "23 mars 2026 - 17:30", prospect: "Sophie Leclerc", phone: "+33 6 34 56 78 90", status: "GAGNÉ", montant: "6,100 €" },
  { id: 4, date: "23 mars 2026 - 15:00", prospect: "Jean Moreau", phone: "+33 6 45 67 89 01", status: "NON QUALIFIÉ", montant: "0 €" },
  { id: 5, date: "23 mars 2026 - 11:20", prospect: "Camille Bernard", phone: "+33 6 56 78 90 12", status: "QUALIFIÉ", montant: "3,400 €" },
  { id: 6, date: "22 mars 2026 - 16:45", prospect: "Lucas Petit", phone: "+33 6 67 89 01 23", status: "À TRAITER", montant: "1,900 €" },
  { id: 7, date: "22 mars 2026 - 14:10", prospect: "Emma Robert", phone: "+33 6 78 90 12 34", status: "EN COURS", montant: "5,300 €" },
  { id: 8, date: "22 mars 2026 - 10:00", prospect: "Hugo Durand", phone: "+33 6 89 01 23 45", status: "GAGNÉ", montant: "7,800 €" },
  { id: 9, date: "21 mars 2026 - 15:30", prospect: "Léa Bonnet", phone: "+33 6 90 12 34 56", status: "NON QUALIFIÉ", montant: "0 €" },
  { id: 10, date: "21 mars 2026 - 09:45", prospect: "Nathan Fontaine", phone: "+33 6 01 23 45 67", status: "QUALIFIÉ", montant: "4,600 €" },
  { id: 11, date: "20 mars 2026 - 14:00", prospect: "Chloé Girard", phone: "+33 6 11 22 33 44", status: "À TRAITER", montant: "2,100 €" },
  { id: 12, date: "20 mars 2026 - 11:30", prospect: "Théo Lambert", phone: "+33 6 22 33 44 55", status: "GAGNÉ", montant: "8,500 €" },
];

const tabs = [
  { label: "Tous", filter: null },
  { label: "À traiter", filter: "À TRAITER" as CallStatus },
  { label: "Non qualifié", filter: "NON QUALIFIÉ" as CallStatus },
  { label: "En cours", filter: "EN COURS" as CallStatus },
  { label: "Gagné", filter: "GAGNÉ" as CallStatus },
];

const statusColors: Record<CallStatus, string> = {
  "À TRAITER": "bg-red-500/20 text-red-400",
  "QUALIFIÉ": "bg-cyan-500/20 text-cyan-400",
  "NON QUALIFIÉ": "bg-gray-500/20 text-gray-400",
  "GAGNÉ": "bg-purple-500/20 text-purple-400",
  "EN COURS": "bg-yellow-500/20 text-yellow-400",
};

const ITEMS_PER_PAGE = 6;

/* ------------------------------------------------------------------ */
/*  Page                                                              */
/* ------------------------------------------------------------------ */
export default function ClientAppelsPage() {
  const [activeTab, setActiveTab] = useState<CallStatus | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredCalls = activeTab
    ? allCalls.filter((c) => c.status === activeTab)
    : allCalls;

  const totalPages = Math.ceil(filteredCalls.length / ITEMS_PER_PAGE);
  const paginatedCalls = filteredCalls.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="space-y-8">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
          <span className="material-symbols-outlined text-[#2563eb] text-3xl">call</span>
          Mes appels
        </h1>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.label}
            onClick={() => {
              setActiveTab(tab.filter);
              setCurrentPage(1);
            }}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
              activeTab === tab.filter
                ? "bg-gradient-to-r from-[#2563eb] to-[#03b5d3] text-white shadow-lg shadow-[#2563eb]/20"
                : "glass-card border border-[#434655]/10 text-[#c3c6d7] hover:text-white hover:border-[#2563eb]/30"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-card rounded-xl border border-[#434655]/10 p-6">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-[#c3c6d7]">Appels Aujourd&apos;hui</p>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#152032] text-[#2563eb]">
              <span className="material-symbols-outlined">phone_in_talk</span>
            </div>
          </div>
          <p className="mt-3 text-3xl font-bold text-white">12</p>
        </div>

        <div className="glass-card rounded-xl border border-[#434655]/10 p-6">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-[#c3c6d7]">À Traiter</p>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#152032] text-red-400">
              <span className="material-symbols-outlined">pending_actions</span>
            </div>
          </div>
          <p className="mt-3 text-3xl font-bold text-white">04</p>
        </div>

        <div className="glass-card rounded-xl border border-[#434655]/10 p-6">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-[#c3c6d7]">Taux de Qualif.</p>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#152032] text-emerald-400">
              <span className="material-symbols-outlined">verified</span>
            </div>
          </div>
          <p className="mt-3 text-3xl font-bold text-white">68%</p>
        </div>

        <div className="glass-card rounded-xl border border-[#434655]/10 p-6">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-[#c3c6d7]">Volume Estimé</p>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#152032] text-[#03b5d3]">
              <span className="material-symbols-outlined">euro</span>
            </div>
          </div>
          <p className="mt-3 text-3xl font-bold text-white">42.5k</p>
        </div>
      </div>

      {/* Table */}
      <div className="glass-panel rounded-xl border border-[#434655]/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#434655]/10">
                <th className="text-left px-6 py-3 text-xs font-medium text-[#c3c6d7] uppercase tracking-wider">
                  Date & Heure
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-[#c3c6d7] uppercase tracking-wider">
                  Prospect
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-[#c3c6d7] uppercase tracking-wider">
                  Téléphone
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-[#c3c6d7] uppercase tracking-wider">
                  Statut
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-[#c3c6d7] uppercase tracking-wider">
                  Montant
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-[#c3c6d7] uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#434655]/10">
              {paginatedCalls.map((call) => (
                <tr key={call.id} className="hover:bg-[#202a3d]/40 transition-colors">
                  <td className="px-6 py-4 text-sm text-[#c3c6d7]">{call.date}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#2563eb]/20 text-[#2563eb] text-xs font-bold">
                        {call.prospect.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <span className="text-sm font-medium text-white">{call.prospect}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-[#c3c6d7] font-mono">{call.phone}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusColors[call.status]}`}
                    >
                      {call.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-white">{call.montant}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#152032] text-[#2563eb] hover:bg-[#2563eb]/20 transition-colors">
                        <span className="material-symbols-outlined text-lg">visibility</span>
                      </button>
                      <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#152032] text-emerald-400 hover:bg-emerald-500/20 transition-colors">
                        <span className="material-symbols-outlined text-lg">call</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-[#434655]/10">
          <p className="text-sm text-[#c3c6d7]">
            {filteredCalls.length} résultat{filteredCalls.length > 1 ? "s" : ""}
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#152032] text-[#c3c6d7] hover:text-white disabled:opacity-40 transition-colors"
            >
              <span className="material-symbols-outlined text-lg">chevron_left</span>
            </button>
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`flex h-8 w-8 items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                  currentPage === i + 1
                    ? "bg-[#2563eb] text-white"
                    : "bg-[#152032] text-[#c3c6d7] hover:text-white"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#152032] text-[#c3c6d7] hover:text-white disabled:opacity-40 transition-colors"
            >
              <span className="material-symbols-outlined text-lg">chevron_right</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
