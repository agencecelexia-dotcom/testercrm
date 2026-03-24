"use client";

import { formatCurrency, formatDate } from "@/lib/format";
import { useState } from "react";

/* ──────────────────────────────────────────────────────────────────────────── */
/*  Mock data                                                                  */
/* ──────────────────────────────────────────────────────────────────────────── */

const kpis = [
  { label: "Total prospects", value: "1 247", icon: "people", trend: "+86" },
  { label: "Qualifiés", value: "438", icon: "verified", trend: "+32" },
  { label: "En cours", value: "312", icon: "pending", trend: "+18" },
  { label: "Valeur estimée", value: formatCurrency(892000), icon: "payments", trend: "+14%" },
];

const statusOptions = ["Tous", "Nouveau", "Contacté", "Qualifié", "Proposition", "Gagné", "Perdu"];

const prospects = [
  { id: "PRO-1001", nom: "Pierre Dupont", entreprise: "Nexus Digital", email: "p.dupont@nexus.fr", telephone: "06 12 45 78 90", source: "LinkedIn", closer: "Julien M.", client: "TechVision SAS", status: "Qualifié", valeur: 15000, createdAt: "2026-03-18" },
  { id: "PRO-1002", nom: "Marie Laurent", entreprise: "Eco Solutions", email: "m.laurent@ecosol.fr", telephone: "06 98 76 54 32", source: "Site web", closer: "Sophie D.", client: "GreenTech Innovations", status: "Proposition", valeur: 22000, createdAt: "2026-03-17" },
  { id: "PRO-1003", nom: "Thomas Martin", entreprise: "FinTech Pro", email: "t.martin@fintechpro.fr", telephone: "06 45 67 89 01", source: "Recommandation", closer: "Lucas B.", client: "NeoBank Finance", status: "Nouveau", valeur: 8500, createdAt: "2026-03-20" },
  { id: "PRO-1004", nom: "Claire Beaumont", entreprise: "Média Plus", email: "c.beaumont@mediaplus.fr", telephone: "06 33 22 11 00", source: "Salon", closer: "Julien M.", client: "PixelForge Studio", status: "Contacté", valeur: 12000, createdAt: "2026-03-15" },
  { id: "PRO-1005", nom: "Antoine Moreau", entreprise: "SantéConnect", email: "a.moreau@santeconnect.fr", telephone: "06 77 88 99 00", source: "Google Ads", closer: "Marc L.", client: "MediSoft Santé", status: "Gagné", valeur: 28000, createdAt: "2026-03-10" },
  { id: "PRO-1006", nom: "Julie Rousseau", entreprise: "FormaPro", email: "j.rousseau@formapro.fr", telephone: "06 55 44 33 22", source: "LinkedIn", closer: "Emma P.", client: "EduPrime Formation", status: "Perdu", valeur: 9500, createdAt: "2026-03-08" },
  { id: "PRO-1007", nom: "Nicolas Blanc", entreprise: "LogiTrans SARL", email: "n.blanc@logitrans.fr", telephone: "06 11 22 33 44", source: "Site web", closer: "Sophie D.", client: "DataFlow Corp", status: "Qualifié", valeur: 18500, createdAt: "2026-03-19" },
  { id: "PRO-1008", nom: "Isabelle Chevalier", entreprise: "Design Factory", email: "i.chevalier@designfactory.fr", telephone: "06 66 55 44 33", source: "Recommandation", closer: "Lucas B.", client: "CloudNine Solutions", status: "Proposition", valeur: 31000, createdAt: "2026-03-16" },
  { id: "PRO-1009", nom: "François Girard", entreprise: "AutoTech Services", email: "f.girard@autotech.fr", telephone: "06 22 33 44 55", source: "Salon", closer: "Julien M.", client: "TechVision SAS", status: "Contacté", valeur: 14000, createdAt: "2026-03-21" },
  { id: "PRO-1010", nom: "Camille Fabre", entreprise: "BioNature Lab", email: "c.fabre@bionature.fr", telephone: "06 44 55 66 77", source: "Google Ads", closer: "Marc L.", client: "GreenTech Innovations", status: "Nouveau", valeur: 7200, createdAt: "2026-03-22" },
];

const statusColor: Record<string, string> = {
  Nouveau: "bg-blue-500/20 text-blue-400",
  "Contacté": "bg-purple-500/20 text-purple-400",
  "Qualifié": "bg-cyan-500/20 text-cyan-400",
  Proposition: "bg-amber-500/20 text-amber-400",
  "Gagné": "bg-emerald-500/20 text-emerald-400",
  Perdu: "bg-red-500/20 text-red-400",
};

/* ──────────────────────────────────────────────────────────────────────────── */
/*  Page                                                                       */
/* ──────────────────────────────────────────────────────────────────────────── */

export default function ProspectsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Tous");

  const filtered = prospects.filter((p) => {
    const matchSearch =
      p.nom.toLowerCase().includes(search.toLowerCase()) ||
      p.entreprise.toLowerCase().includes(search.toLowerCase()) ||
      p.id.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "Tous" || p.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white font-[family-name:var(--font-plus-jakarta-sans)]">Prospects</h1>
          <p className="text-sm text-[#c3c6d7] mt-1">Vue globale de tous les prospects de l&apos;agence</p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-lg bg-gradient-brand px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-[#2563eb]/25">
          <span className="material-symbols-outlined text-base">person_add</span>
          Nouveau prospect
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
              <span className="material-symbols-outlined text-base text-emerald-400">trending_up</span>
              <span className="text-sm font-medium bg-gradient-to-r from-emerald-400 to-[#03b5d3] bg-clip-text text-transparent">{k.trend}</span>
              <span className="text-xs text-[#c3c6d7]">ce mois</span>
            </div>
          </div>
        ))}
      </div>

      {/* Filters + Search */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-1 rounded-xl bg-[#202a3d]/60 backdrop-blur-xl border border-[#434655]/10 p-1.5 overflow-x-auto">
          {statusOptions.map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium transition ${
                statusFilter === s
                  ? "bg-[#2563eb] text-white shadow-lg shadow-[#2563eb]/25"
                  : "text-[#c3c6d7] hover:text-white hover:bg-[#152032]/60"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#c3c6d7] text-lg">search</span>
          <input
            type="text"
            placeholder="Rechercher un prospect..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full lg:w-80 rounded-lg bg-[#202a3d]/60 backdrop-blur-xl border border-[#434655]/10 pl-10 pr-4 py-2.5 text-sm text-white placeholder-[#c3c6d7]/50 focus:outline-none focus:ring-2 focus:ring-[#2563eb]/50"
          />
        </div>
      </div>

      {/* Prospects Table */}
      <div className="rounded-xl bg-[#202a3d]/60 backdrop-blur-xl border border-[#434655]/10 shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#434655]/15">
                <th className="text-left py-3 px-4 text-xs font-semibold text-[#c3c6d7] uppercase tracking-wider">Prospect</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-[#c3c6d7] uppercase tracking-wider">Source</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-[#c3c6d7] uppercase tracking-wider">Closer</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-[#c3c6d7] uppercase tracking-wider">Client</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-[#c3c6d7] uppercase tracking-wider">Valeur</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-[#c3c6d7] uppercase tracking-wider">Date</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-[#c3c6d7] uppercase tracking-wider">Statut</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id} className="border-b border-[#434655]/10 hover:bg-[#152032]/30 transition cursor-pointer">
                  <td className="py-3 px-4">
                    <div>
                      <p className="text-sm font-medium text-white">{p.nom}</p>
                      <p className="text-xs text-[#c3c6d7]">{p.entreprise} &middot; {p.id}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center rounded-full bg-[#152032] px-2.5 py-0.5 text-xs font-medium text-[#c3c6d7] border border-[#434655]/20">{p.source}</span>
                  </td>
                  <td className="py-3 px-4 text-sm text-[#c3c6d7]">{p.closer}</td>
                  <td className="py-3 px-4 text-sm text-[#c3c6d7]">{p.client}</td>
                  <td className="py-3 px-4 text-sm font-semibold text-white">{formatCurrency(p.valeur)}</td>
                  <td className="py-3 px-4 text-sm text-[#c3c6d7]">{formatDate(p.createdAt)}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusColor[p.status]}`}>{p.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between px-4 py-3 border-t border-[#434655]/10">
          <p className="text-sm text-[#c3c6d7]">Affichage de {filtered.length} sur {prospects.length} prospects</p>
          <div className="flex items-center gap-1">
            <button className="rounded-lg px-3 py-1.5 text-sm font-medium text-[#c3c6d7] hover:bg-[#152032]/60 transition">Précédent</button>
            <button className="rounded-lg bg-[#2563eb] px-3 py-1.5 text-sm font-medium text-white">1</button>
            <button className="rounded-lg px-3 py-1.5 text-sm font-medium text-[#c3c6d7] hover:bg-[#152032]/60 transition">2</button>
            <button className="rounded-lg px-3 py-1.5 text-sm font-medium text-[#c3c6d7] hover:bg-[#152032]/60 transition">3</button>
            <button className="rounded-lg px-3 py-1.5 text-sm font-medium text-[#c3c6d7] hover:bg-[#152032]/60 transition">Suivant</button>
          </div>
        </div>
      </div>
    </div>
  );
}
