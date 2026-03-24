"use client";

import { formatCurrency, formatDate } from "@/lib/format";
import { useState } from "react";

/* ──────────────────────────────────────────────────────────────────────────── */
/*  Mock data                                                                  */
/* ──────────────────────────────────────────────────────────────────────────── */

const stats = [
  {
    label: "Total appels",
    value: "1 248",
    icon: "call",
    trend: "+142 ce mois",
  },
  {
    label: "Qualifi\u00e9s (SET)",
    value: "486",
    icon: "verified",
    trend: "38.9% taux",
  },
  {
    label: "CA Pr\u00e9visionnel",
    value: formatCurrency(284500),
    icon: "trending_up",
    trend: "+18.4%",
  },
];

const statusOptions = [
  { value: "all", label: "Tous les statuts" },
  { value: "A_TRAITER", label: "\u00c0 traiter" },
  { value: "QUALIFIE", label: "Qualifi\u00e9" },
  { value: "DEVIS_ENVOYE", label: "Devis envoy\u00e9" },
  { value: "DEVIS_ACCEPTE", label: "Devis accept\u00e9" },
  { value: "ACOMPTE_RECU", label: "Acompte re\u00e7u" },
  { value: "NON_QUALIFIE", label: "Non qualifi\u00e9" },
  { value: "TERMINE", label: "Termin\u00e9" },
];

const clientOptions = [
  "Tous les clients",
  "TechVision SAS",
  "DigiMarketing",
  "SolairePro",
  "FormaPilot",
  "CleanOffice",
];

const closerOptions = [
  "Tous les closers",
  "Julien M.",
  "Sophie L.",
  "Marc D.",
  "Emma R.",
];

type StatusKey =
  | "A_TRAITER"
  | "QUALIFIE"
  | "DEVIS_ENVOYE"
  | "DEVIS_ACCEPTE"
  | "ACOMPTE_RECU"
  | "NON_QUALIFIE"
  | "TERMINE";

function statusBadge(status: StatusKey) {
  const map: Record<StatusKey, { bg: string; text: string; label: string }> = {
    A_TRAITER: {
      bg: "bg-gray-500/20",
      text: "text-gray-400",
      label: "\u00c0 traiter",
    },
    QUALIFIE: {
      bg: "bg-blue-500/20",
      text: "text-blue-400",
      label: "Qualifi\u00e9",
    },
    DEVIS_ENVOYE: {
      bg: "bg-yellow-500/20",
      text: "text-yellow-400",
      label: "Devis envoy\u00e9",
    },
    DEVIS_ACCEPTE: {
      bg: "bg-emerald-500/20",
      text: "text-emerald-400",
      label: "Devis accept\u00e9",
    },
    ACOMPTE_RECU: {
      bg: "bg-teal-500/20",
      text: "text-teal-400",
      label: "Acompte re\u00e7u",
    },
    NON_QUALIFIE: {
      bg: "bg-red-500/20",
      text: "text-red-400",
      label: "Non qualifi\u00e9",
    },
    TERMINE: {
      bg: "bg-purple-500/20",
      text: "text-purple-400",
      label: "Termin\u00e9",
    },
  };
  const s = map[status];
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${s.bg} ${s.text}`}
    >
      {s.label}
    </span>
  );
}

const prospects = [
  {
    client: "TechVision SAS",
    nom: "Laurent Dupuis",
    tel: "06 12 34 56 78",
    statut: "DEVIS_ACCEPTE" as StatusKey,
    date: "2026-03-22",
    montant: 4500,
    closer: "Julien M.",
  },
  {
    client: "DigiMarketing",
    nom: "Marie Lefebvre",
    tel: "06 98 76 54 32",
    statut: "ACOMPTE_RECU" as StatusKey,
    date: "2026-03-21",
    montant: 2800,
    closer: "Sophie L.",
  },
  {
    client: "SolairePro",
    nom: "Pierre Martin",
    tel: "06 45 67 89 01",
    statut: "QUALIFIE" as StatusKey,
    date: "2026-03-20",
    montant: 3200,
    closer: "Marc D.",
  },
  {
    client: "TechVision SAS",
    nom: "Camille Bernard",
    tel: "06 23 45 67 89",
    statut: "DEVIS_ENVOYE" as StatusKey,
    date: "2026-03-19",
    montant: 1900,
    closer: "Julien M.",
  },
  {
    client: "FormaPilot",
    nom: "Nicolas Petit",
    tel: "06 78 90 12 34",
    statut: "A_TRAITER" as StatusKey,
    date: "2026-03-18",
    montant: 0,
    closer: "Emma R.",
  },
  {
    client: "CleanOffice",
    nom: "Sophie Moreau",
    tel: "06 34 56 78 90",
    statut: "NON_QUALIFIE" as StatusKey,
    date: "2026-03-17",
    montant: 0,
    closer: "Julien M.",
  },
  {
    client: "DigiMarketing",
    nom: "Thomas Garcia",
    tel: "06 56 78 90 12",
    statut: "TERMINE" as StatusKey,
    date: "2026-03-16",
    montant: 5200,
    closer: "Sophie L.",
  },
  {
    client: "SolairePro",
    nom: "Julie Robert",
    tel: "06 67 89 01 23",
    statut: "QUALIFIE" as StatusKey,
    date: "2026-03-15",
    montant: 2400,
    closer: "Marc D.",
  },
  {
    client: "TechVision SAS",
    nom: "Antoine Durand",
    tel: "06 89 01 23 45",
    statut: "DEVIS_ACCEPTE" as StatusKey,
    date: "2026-03-14",
    montant: 3800,
    closer: "Julien M.",
  },
  {
    client: "FormaPilot",
    nom: "Isabelle Fournier",
    tel: "06 01 23 45 67",
    statut: "A_TRAITER" as StatusKey,
    date: "2026-03-13",
    montant: 0,
    closer: "Emma R.",
  },
];

/* ──────────────────────────────────────────────────────────────────────────── */
/*  Page                                                                       */
/* ──────────────────────────────────────────────────────────────────────────── */

export default function ProspectsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5;

  return (
    <div className="space-y-8">
      {/* ── Header ──────────────────────────────────────────────────────── */}
      <div>
        <h1 className="text-3xl font-bold text-white font-[family-name:var(--font-plus-jakarta-sans)]">
          Tous les Prospects
        </h1>
        <p className="mt-1 text-[#c3c6d7]">
          Vue globale de tous les prospects de vos clients
        </p>
      </div>

      {/* ── Stat Cards ──────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-xl bg-[#202a3d]/60 backdrop-blur-xl border border-[#434655]/10 p-5 shadow-lg flex items-center gap-4"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#152032] text-[#2563eb] shrink-0">
              <span className="material-symbols-outlined text-2xl">
                {s.icon}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-[#c3c6d7]">{s.label}</p>
              <p className="text-xl font-bold text-white">{s.value}</p>
              <p className="text-xs text-emerald-400">{s.trend}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Advanced Filters ────────────────────────────────────────────── */}
      <div className="rounded-xl bg-[#202a3d]/60 backdrop-blur-xl border border-[#434655]/10 p-5 shadow-lg">
        <div className="flex items-center gap-2 mb-4 text-sm font-medium text-[#c3c6d7]">
          <span className="material-symbols-outlined text-base">
            filter_list
          </span>
          Filtres avanc\u00e9s
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
          <select className="rounded-lg bg-[#152032] border border-[#434655]/20 px-3 py-2 text-sm text-[#d8e3fc] focus:outline-none focus:ring-2 focus:ring-[#2563eb]/50">
            {clientOptions.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
          <select className="rounded-lg bg-[#152032] border border-[#434655]/20 px-3 py-2 text-sm text-[#d8e3fc] focus:outline-none focus:ring-2 focus:ring-[#2563eb]/50">
            {closerOptions.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
          <select className="rounded-lg bg-[#152032] border border-[#434655]/20 px-3 py-2 text-sm text-[#d8e3fc] focus:outline-none focus:ring-2 focus:ring-[#2563eb]/50">
            {statusOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          <input
            type="date"
            className="rounded-lg bg-[#152032] border border-[#434655]/20 px-3 py-2 text-sm text-[#d8e3fc] focus:outline-none focus:ring-2 focus:ring-[#2563eb]/50"
          />
          <input
            type="number"
            placeholder="Montant min (\u20ac)"
            className="rounded-lg bg-[#152032] border border-[#434655]/20 px-3 py-2 text-sm text-[#d8e3fc] placeholder:text-[#c3c6d7]/50 focus:outline-none focus:ring-2 focus:ring-[#2563eb]/50"
          />
        </div>
      </div>

      {/* ── Prospects Table ─────────────────────────────────────────────── */}
      <div className="rounded-xl bg-[#202a3d]/60 backdrop-blur-xl border border-[#434655]/10 shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#434655]/10 text-[#c3c6d7]">
                <th className="px-5 py-3 text-left font-medium">Client</th>
                <th className="px-5 py-3 text-left font-medium">
                  Nom Prospect
                </th>
                <th className="px-5 py-3 text-left font-medium">
                  T\u00e9l\u00e9phone
                </th>
                <th className="px-5 py-3 text-center font-medium">Statut</th>
                <th className="px-5 py-3 text-left font-medium">Date</th>
                <th className="px-5 py-3 text-right font-medium">Montant</th>
                <th className="px-5 py-3 text-left font-medium">Closer</th>
                <th className="px-5 py-3 text-center font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {prospects.map((p, i) => (
                <tr
                  key={i}
                  className="border-b border-[#434655]/10 hover:bg-[#152032]/40 transition-colors"
                >
                  <td className="px-5 py-3.5">
                    <span className="text-[#c3c6d7]">{p.client}</span>
                  </td>
                  <td className="px-5 py-3.5 font-medium text-white">
                    {p.nom}
                  </td>
                  <td className="px-5 py-3.5 text-[#c3c6d7] font-mono text-xs">
                    {p.tel}
                  </td>
                  <td className="px-5 py-3.5 text-center">
                    {statusBadge(p.statut)}
                  </td>
                  <td className="px-5 py-3.5 text-[#c3c6d7]">
                    {formatDate(p.date)}
                  </td>
                  <td className="px-5 py-3.5 text-right font-medium text-white">
                    {p.montant > 0 ? formatCurrency(p.montant) : "\u2014"}
                  </td>
                  <td className="px-5 py-3.5 text-[#c3c6d7]">{p.closer}</td>
                  <td className="px-5 py-3.5 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <button
                        className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-[#2563eb]/20 text-[#2563eb] hover:bg-[#2563eb]/30 transition"
                        title="Voir"
                      >
                        <span className="material-symbols-outlined text-sm">
                          visibility
                        </span>
                      </button>
                      <button
                        className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-[#03b5d3]/20 text-[#03b5d3] hover:bg-[#03b5d3]/30 transition"
                        title="Appeler"
                      >
                        <span className="material-symbols-outlined text-sm">
                          call
                        </span>
                      </button>
                      <button
                        className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-[#152032] text-[#c3c6d7] hover:text-white transition"
                        title="Plus"
                      >
                        <span className="material-symbols-outlined text-sm">
                          more_vert
                        </span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-5 py-4 border-t border-[#434655]/10">
          <p className="text-sm text-[#c3c6d7]">
            Affichage de{" "}
            <span className="font-medium text-white">1-10</span> sur{" "}
            <span className="font-medium text-white">48</span> prospects
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[#152032] text-[#c3c6d7] hover:text-white disabled:opacity-40 transition"
            >
              <span className="material-symbols-outlined text-sm">
                chevron_left
              </span>
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`inline-flex h-8 w-8 items-center justify-center rounded-lg text-sm font-medium transition ${
                    currentPage === page
                      ? "bg-[#2563eb] text-white"
                      : "bg-[#152032] text-[#c3c6d7] hover:text-white"
                  }`}
                >
                  {page}
                </button>
              )
            )}
            <button
              onClick={() =>
                setCurrentPage(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages}
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[#152032] text-[#c3c6d7] hover:text-white disabled:opacity-40 transition"
            >
              <span className="material-symbols-outlined text-sm">
                chevron_right
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
