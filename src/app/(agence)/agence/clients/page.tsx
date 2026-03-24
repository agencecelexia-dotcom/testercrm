"use client";

import { formatCurrency } from "@/lib/format";
import { useState } from "react";

/* ──────────────────────────────────────────────────────────────────────────── */
/*  Mock data                                                                  */
/* ──────────────────────────────────────────────────────────────────────────── */

const closers = ["Tous", "Julien M.", "Sophie L.", "Marc D.", "Emma R."];

const clients = [
  {
    id: "CLI-001",
    name: "TechVision SAS",
    owner: "Alexandre Morel",
    closer: "Julien M.",
    ca: 18500,
    appels: 48,
    qualifies: 22,
    commission: 1850,
    active: true,
  },
  {
    id: "CLI-002",
    name: "DigiMarketing",
    owner: "Claire Fontaine",
    closer: "Sophie L.",
    ca: 12400,
    appels: 36,
    qualifies: 18,
    commission: 1240,
    active: true,
  },
  {
    id: "CLI-003",
    name: "SolairePro",
    owner: "Thomas Girard",
    closer: "Marc D.",
    ca: 9200,
    appels: 28,
    qualifies: 12,
    commission: 920,
    active: true,
  },
  {
    id: "CLI-004",
    name: "FormaPilot",
    owner: "Isabelle Roux",
    closer: "Emma R.",
    ca: 6800,
    appels: 18,
    qualifies: 9,
    commission: 680,
    active: false,
  },
  {
    id: "CLI-005",
    name: "CleanOffice",
    owner: "Nicolas Blanc",
    closer: "Julien M.",
    ca: 3600,
    appels: 12,
    qualifies: 5,
    commission: 360,
    active: true,
  },
  {
    id: "CLI-006",
    name: "GreenTech Solutions",
    owner: "Marie Dupont",
    closer: "Sophie L.",
    ca: 7800,
    appels: 24,
    qualifies: 14,
    commission: 780,
    active: true,
  },
];

/* ──────────────────────────────────────────────────────────────────────────── */
/*  Page                                                                       */
/* ──────────────────────────────────────────────────────────────────────────── */

export default function ClientsPage() {
  const [selectedCloser, setSelectedCloser] = useState("Tous");
  const [showActive, setShowActive] = useState(true);

  const filtered = clients.filter((c) => {
    if (selectedCloser !== "Tous" && c.closer !== selectedCloser) return false;
    if (showActive && !c.active) return false;
    return true;
  });

  return (
    <div className="space-y-8">
      {/* ── Header ──────────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white font-[family-name:var(--font-plus-jakarta-sans)]">
            Clients
          </h1>
          <p className="mt-1 text-[#c3c6d7]">
            Gérez l&apos;ensemble de vos clients et leur activité
          </p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-lg bg-gradient-brand px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#2563eb]/25 transition hover:shadow-[#2563eb]/40 hover:brightness-110">
          <span className="material-symbols-outlined text-lg">add</span>
          Ajouter un client
        </button>
      </div>

      {/* ── Filter bar ──────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-xl bg-[#202a3d]/60 backdrop-blur-xl border border-[#434655]/10 p-4 shadow-lg">
        <div className="flex items-center gap-3 flex-wrap">
          {/* Closer filter */}
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-lg text-[#c3c6d7]">
              filter_list
            </span>
            <select
              value={selectedCloser}
              onChange={(e) => setSelectedCloser(e.target.value)}
              className="rounded-lg bg-[#152032] border border-[#434655]/20 px-3 py-1.5 text-sm text-[#d8e3fc] focus:outline-none focus:ring-2 focus:ring-[#2563eb]/50"
            >
              {closers.map((c) => (
                <option key={c} value={c}>
                  {c === "Tous" ? "Tous les closers" : c}
                </option>
              ))}
            </select>
          </div>

          {/* Active toggle */}
          <button
            onClick={() => setShowActive(!showActive)}
            className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition ${
              showActive
                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                : "bg-[#152032] text-[#c3c6d7] border border-[#434655]/20"
            }`}
          >
            <span className="material-symbols-outlined text-base">
              {showActive ? "toggle_on" : "toggle_off"}
            </span>
            {showActive ? "Actifs uniquement" : "Tous les statuts"}
          </button>
        </div>

        <div className="flex items-center gap-2 text-sm text-[#c3c6d7]">
          <span className="material-symbols-outlined text-base">
            inventory_2
          </span>
          <span>
            <span className="font-semibold text-white">{filtered.length}</span>{" "}
            client{filtered.length > 1 ? "s" : ""} trouvé
            {filtered.length > 1 ? "s" : ""}
          </span>
        </div>
      </div>

      {/* ── Client Cards Grid ───────────────────────────────────────────── */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((client) => (
          <div
            key={client.id}
            className="group rounded-xl bg-[#202a3d]/60 backdrop-blur-xl border border-[#434655]/10 p-6 shadow-lg transition-all duration-200 hover:scale-[1.01] hover:border-[#2563eb]/30"
          >
            {/* Top */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-brand text-white text-sm font-bold">
                  {client.name
                    .split(" ")
                    .map((w) => w[0])
                    .join("")
                    .slice(0, 2)}
                </div>
                <div>
                  <h3 className="font-semibold text-white">{client.name}</h3>
                  <p className="text-xs text-[#c3c6d7]">{client.id}</p>
                </div>
              </div>
              <span
                className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                  client.active
                    ? "bg-emerald-500/20 text-emerald-400"
                    : "bg-gray-500/20 text-gray-400"
                }`}
              >
                {client.active ? "Actif" : "Inactif"}
              </span>
            </div>

            {/* Info */}
            <div className="space-y-2 mb-4 text-sm">
              <div className="flex items-center gap-2 text-[#c3c6d7]">
                <span className="material-symbols-outlined text-base">
                  person
                </span>
                {client.owner}
              </div>
              <div className="flex items-center gap-2 text-[#c3c6d7]">
                <span className="material-symbols-outlined text-base">
                  support_agent
                </span>
                {client.closer}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              <div className="rounded-lg bg-[#152032]/60 px-3 py-2">
                <p className="text-[10px] text-[#c3c6d7] uppercase tracking-wider">
                  CA
                </p>
                <p className="text-sm font-semibold text-white">
                  {formatCurrency(client.ca)}
                </p>
              </div>
              <div className="rounded-lg bg-[#152032]/60 px-3 py-2">
                <p className="text-[10px] text-[#c3c6d7] uppercase tracking-wider">
                  Appels
                </p>
                <p className="text-sm font-semibold text-white">
                  {client.appels}
                </p>
              </div>
              <div className="rounded-lg bg-[#152032]/60 px-3 py-2">
                <p className="text-[10px] text-[#c3c6d7] uppercase tracking-wider">
                  Qualifiés
                </p>
                <p className="text-sm font-semibold text-white">
                  {client.qualifies}
                </p>
              </div>
              <div className="rounded-lg bg-[#152032]/60 px-3 py-2">
                <p className="text-[10px] text-[#c3c6d7] uppercase tracking-wider">
                  Commission
                </p>
                <p className="text-sm font-semibold text-gradient">
                  {formatCurrency(client.commission)}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <a
                href={`/agence/clients/${client.id}`}
                className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg bg-[#2563eb]/20 px-3 py-2 text-xs font-medium text-[#2563eb] hover:bg-[#2563eb]/30 transition"
              >
                <span className="material-symbols-outlined text-sm">
                  visibility
                </span>
                Voir
              </a>
              <button className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg bg-[#03b5d3]/20 px-3 py-2 text-xs font-medium text-[#03b5d3] hover:bg-[#03b5d3]/30 transition">
                <span className="material-symbols-outlined text-sm">call</span>
                Appel
              </button>
              <button className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg bg-emerald-500/20 px-3 py-2 text-xs font-medium text-emerald-400 hover:bg-emerald-500/30 transition">
                <span className="material-symbols-outlined text-sm">
                  receipt_long
                </span>
                Facturer
              </button>
            </div>
          </div>
        ))}

        {/* ── Empty / Add new card ──────────────────────────────────────── */}
        <div className="group rounded-xl border-2 border-dashed border-[#434655]/30 p-6 flex flex-col items-center justify-center text-center min-h-[320px] hover:border-[#2563eb]/40 transition-colors cursor-pointer">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#202a3d]/60 text-[#c3c6d7] mb-4 group-hover:text-[#2563eb] transition-colors">
            <span className="material-symbols-outlined text-3xl">
              add_business
            </span>
          </div>
          <h3 className="text-base font-semibold text-white font-[family-name:var(--font-plus-jakarta-sans)]">
            Ajouter un nouveau client
          </h3>
          <p className="mt-1.5 text-sm text-[#c3c6d7] max-w-[200px]">
            Configurez un nouveau client et assignez un closer
          </p>
        </div>
      </div>
    </div>
  );
}
