"use client";

import { formatCurrency } from "@/lib/format";
import { useState } from "react";

/* ──────────────────────────────────────────────────────────────────────────── */
/*  Mock data                                                                  */
/* ──────────────────────────────────────────────────────────────────────────── */

const filterTabs = ["Tous", "Actifs", "Inactifs"];

const sortOptions = [
  "CA d\u00e9croissant",
  "CA croissant",
  "Clients d\u00e9croissant",
  "Nom A-Z",
];

const closersList = [
  {
    id: "CLO-001",
    name: "Julien Mercier",
    email: "julien@celexia.fr",
    phone: "06 12 34 56 78",
    avatar: "JM",
    active: true,
    clients: 8,
    ca: 245000,
    commission: 24500,
    specialite: "SaaS / Tech",
  },
  {
    id: "CLO-002",
    name: "Sophie Laurent",
    email: "sophie@celexia.fr",
    phone: "06 98 76 54 32",
    avatar: "SL",
    active: true,
    clients: 6,
    ca: 198000,
    commission: 19800,
    specialite: "Marketing Digital",
  },
  {
    id: "CLO-003",
    name: "Marc Dupont",
    email: "marc@celexia.fr",
    phone: "06 45 67 89 01",
    avatar: "MD",
    active: true,
    clients: 5,
    ca: 167000,
    commission: 16700,
    specialite: "\u00c9nergie",
  },
  {
    id: "CLO-004",
    name: "Emma Richard",
    email: "emma@celexia.fr",
    phone: "06 23 45 67 89",
    avatar: "ER",
    active: false,
    clients: 3,
    ca: 124000,
    commission: 12400,
    specialite: "Formation",
  },
  {
    id: "CLO-005",
    name: "Lucas Bernard",
    email: "lucas@celexia.fr",
    phone: "06 78 90 12 34",
    avatar: "LB",
    active: true,
    clients: 4,
    ca: 111200,
    commission: 11120,
    specialite: "E-commerce",
  },
];

const globalKpis = [
  {
    label: "Performance Global",
    value: "87%",
    sublabel: "Taux de conversion moyen",
    icon: "speed",
    color: "text-[#2563eb]",
  },
  {
    label: "Total Commissions",
    value: formatCurrency(84520),
    sublabel: "Cumul\u00e9 ce trimestre",
    icon: "account_balance_wallet",
    color: "text-[#03b5d3]",
  },
  {
    label: "Effectif Actif",
    value: "4 / 5",
    sublabel: "Closers en activit\u00e9",
    icon: "groups",
    color: "text-emerald-400",
  },
];

/* ──────────────────────────────────────────────────────────────────────────── */
/*  Page                                                                       */
/* ──────────────────────────────────────────────────────────────────────────── */

export default function ClosersPage() {
  const [activeFilter, setActiveFilter] = useState("Tous");
  const [sortBy, setSortBy] = useState(sortOptions[0]);

  const filtered = closersList.filter((c) => {
    if (activeFilter === "Actifs") return c.active;
    if (activeFilter === "Inactifs") return !c.active;
    return true;
  });

  return (
    <div className="space-y-8">
      {/* ── Header ──────────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white font-[family-name:var(--font-plus-jakarta-sans)]">
            Closers
          </h1>
          <p className="mt-1 text-[#c3c6d7]">
            G\u00e9rez votre \u00e9quipe de closers et suivez leurs performances
          </p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-lg bg-gradient-brand px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#2563eb]/25 transition hover:shadow-[#2563eb]/40 hover:brightness-110">
          <span className="material-symbols-outlined text-lg">
            person_add
          </span>
          Ajouter un closer
        </button>
      </div>

      {/* ── Filters ─────────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-1 rounded-xl bg-[#202a3d]/60 backdrop-blur-xl border border-[#434655]/10 p-1.5">
          {filterTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                activeFilter === tab
                  ? "bg-[#2563eb] text-white shadow-lg shadow-[#2563eb]/25"
                  : "text-[#c3c6d7] hover:text-white hover:bg-[#152032]/60"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="rounded-lg bg-[#202a3d]/60 border border-[#434655]/20 px-3 py-2 text-sm text-[#d8e3fc] focus:outline-none focus:ring-2 focus:ring-[#2563eb]/50"
        >
          {sortOptions.map((o) => (
            <option key={o} value={o}>
              Trier: {o}
            </option>
          ))}
        </select>
      </div>

      {/* ── Closer Cards Grid ───────────────────────────────────────────── */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((closer) => (
          <a
            key={closer.id}
            href={`/agence/closers/${closer.id}`}
            className="group rounded-xl bg-[#202a3d]/60 backdrop-blur-xl border border-[#434655]/10 p-6 shadow-lg transition-all duration-200 hover:scale-[1.01] hover:border-[#2563eb]/30"
          >
            {/* Top */}
            <div className="flex items-start justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-brand text-white font-bold text-sm">
                    {closer.avatar}
                  </div>
                  <span
                    className={`absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-[#202a3d] ${
                      closer.active ? "bg-emerald-500" : "bg-gray-500"
                    }`}
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-white group-hover:text-gradient transition">
                    {closer.name}
                  </h3>
                  <p className="text-xs text-[#c3c6d7]">{closer.id}</p>
                </div>
              </div>
              <span
                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${
                  closer.active
                    ? "bg-emerald-500/20 text-emerald-400"
                    : "bg-gray-500/20 text-gray-400"
                }`}
              >
                {closer.active ? "Actif" : "Inactif"}
              </span>
            </div>

            {/* Speciality */}
            <div className="flex items-center gap-2 mb-4 text-sm text-[#c3c6d7]">
              <span className="material-symbols-outlined text-base">
                work
              </span>
              {closer.specialite}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-lg bg-[#152032]/60 px-3 py-2.5 text-center">
                <p className="text-[10px] text-[#c3c6d7] uppercase tracking-wider mb-1">
                  Clients
                </p>
                <p className="text-base font-bold text-white">
                  {closer.clients}
                </p>
              </div>
              <div className="rounded-lg bg-[#152032]/60 px-3 py-2.5 text-center">
                <p className="text-[10px] text-[#c3c6d7] uppercase tracking-wider mb-1">
                  CA
                </p>
                <p className="text-base font-bold text-white">
                  {(closer.ca / 1000).toFixed(0)}k\u20ac
                </p>
              </div>
              <div className="rounded-lg bg-[#152032]/60 px-3 py-2.5 text-center">
                <p className="text-[10px] text-[#c3c6d7] uppercase tracking-wider mb-1">
                  Commission
                </p>
                <p className="text-base font-bold text-gradient">
                  {(closer.commission / 1000).toFixed(1)}k\u20ac
                </p>
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* ── Bottom KPI Row ──────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        {globalKpis.map((k) => (
          <div
            key={k.label}
            className="rounded-xl bg-[#202a3d]/60 backdrop-blur-xl border border-[#434655]/10 p-5 shadow-lg flex items-center gap-4"
          >
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-xl bg-[#152032] ${k.color} shrink-0`}
            >
              <span className="material-symbols-outlined text-2xl">
                {k.icon}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-[#c3c6d7]">{k.label}</p>
              <p className="text-xl font-bold text-white">{k.value}</p>
              <p className="text-xs text-[#c3c6d7]">{k.sublabel}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
