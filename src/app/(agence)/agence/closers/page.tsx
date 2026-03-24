"use client";

import { formatCurrency } from "@/lib/format";
import { useState } from "react";

/* ──────────────────────────────────────────────────────────────────────────── */
/*  Mock data                                                                  */
/* ──────────────────────────────────────────────────────────────────────────── */

const closers = [
  {
    id: "CLO-001",
    name: "Julien Marchand",
    avatar: "JM",
    email: "julien@celexia.fr",
    phone: "06 12 34 56 78",
    clients: 8,
    prospects: 142,
    ca: 285000,
    commissions: 28500,
    taux: 45.8,
    status: "actif",
  },
  {
    id: "CLO-002",
    name: "Sophie Durand",
    avatar: "SD",
    email: "sophie@celexia.fr",
    phone: "06 98 76 54 32",
    clients: 6,
    prospects: 98,
    ca: 195000,
    commissions: 19500,
    taux: 52.3,
    status: "actif",
  },
  {
    id: "CLO-003",
    name: "Marc Lefebvre",
    avatar: "ML",
    email: "marc@celexia.fr",
    phone: "06 55 44 33 22",
    clients: 5,
    prospects: 76,
    ca: 148000,
    commissions: 14800,
    taux: 38.2,
    status: "actif",
  },
  {
    id: "CLO-004",
    name: "Emma Petit",
    avatar: "EP",
    email: "emma@celexia.fr",
    phone: "06 11 22 33 44",
    clients: 4,
    prospects: 61,
    ca: 112000,
    commissions: 11200,
    taux: 41.5,
    status: "pause",
  },
  {
    id: "CLO-005",
    name: "Lucas Bernard",
    avatar: "LB",
    email: "lucas@celexia.fr",
    phone: "06 77 88 99 00",
    clients: 7,
    prospects: 115,
    ca: 230000,
    commissions: 23000,
    taux: 49.1,
    status: "actif",
  },
  {
    id: "CLO-006",
    name: "Camille Roux",
    avatar: "CR",
    email: "camille@celexia.fr",
    phone: "06 33 22 11 00",
    clients: 3,
    prospects: 42,
    ca: 78000,
    commissions: 7800,
    taux: 35.7,
    status: "inactif",
  },
];

const kpis = [
  { label: "Total closers", value: "6", icon: "groups", trend: "+1" },
  { label: "Closers actifs", value: "4", icon: "verified", trend: "+0" },
  {
    label: "CA total généré",
    value: formatCurrency(1048000),
    icon: "payments",
    trend: "+18%",
  },
  {
    label: "Commissions totales",
    value: formatCurrency(104800),
    icon: "account_balance_wallet",
    trend: "+15%",
  },
];

const filters = ["Tous", "Actifs", "En pause", "Inactifs"];

/* ──────────────────────────────────────────────────────────────────────────── */
/*  Page                                                                       */
/* ──────────────────────────────────────────────────────────────────────────── */

export default function ClosersPage() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("Tous");

  const filtered = closers.filter((c) => {
    const matchSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.id.toLowerCase().includes(search.toLowerCase());
    const matchFilter =
      activeFilter === "Tous" ||
      (activeFilter === "Actifs" && c.status === "actif") ||
      (activeFilter === "En pause" && c.status === "pause") ||
      (activeFilter === "Inactifs" && c.status === "inactif");
    return matchSearch && matchFilter;
  });

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

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white font-[family-name:var(--font-plus-jakarta-sans)]">
            Closers
          </h1>
          <p className="text-sm text-[#c3c6d7] mt-1">
            Gérez votre équipe de closers et suivez leurs performances
          </p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-lg bg-gradient-brand px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-[#2563eb]/25">
          <span className="material-symbols-outlined text-base">person_add</span>
          Ajouter un closer
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((k) => (
          <div
            key={k.label}
            className="rounded-xl bg-[#202a3d]/60 backdrop-blur-xl border border-[#434655]/10 p-6 shadow-lg"
          >
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
            placeholder="Rechercher un closer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-72 rounded-lg bg-[#202a3d]/60 backdrop-blur-xl border border-[#434655]/10 pl-10 pr-4 py-2.5 text-sm text-white placeholder-[#c3c6d7]/50 focus:outline-none focus:ring-2 focus:ring-[#2563eb]/50"
          />
        </div>
      </div>

      {/* Closer Cards Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((closer) => (
          <a
            key={closer.id}
            href={`/agence/closers/${closer.id}`}
            className="group rounded-xl bg-[#202a3d]/60 backdrop-blur-xl border border-[#434655]/10 p-6 shadow-lg hover:border-[#2563eb]/30 transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-brand text-white font-bold">
                  {closer.avatar}
                </div>
                <div>
                  <p className="font-semibold text-white group-hover:text-[#2563eb] transition-colors">{closer.name}</p>
                  <p className="text-xs text-[#c3c6d7]">{closer.email}</p>
                </div>
              </div>
              <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusColor[closer.status]}`}>
                {statusLabel[closer.status]}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="rounded-lg bg-[#152032]/60 px-3 py-2.5">
                <p className="text-xs text-[#c3c6d7]">Clients</p>
                <p className="text-lg font-bold text-white">{closer.clients}</p>
              </div>
              <div className="rounded-lg bg-[#152032]/60 px-3 py-2.5">
                <p className="text-xs text-[#c3c6d7]">Prospects</p>
                <p className="text-lg font-bold text-white">{closer.prospects}</p>
              </div>
              <div className="rounded-lg bg-[#152032]/60 px-3 py-2.5">
                <p className="text-xs text-[#c3c6d7]">CA généré</p>
                <p className="text-sm font-bold text-white">{formatCurrency(closer.ca)}</p>
              </div>
              <div className="rounded-lg bg-[#152032]/60 px-3 py-2.5">
                <p className="text-xs text-[#c3c6d7]">Taux conv.</p>
                <p className="text-lg font-bold text-emerald-400">{closer.taux}%</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-[#434655]/10">
              <p className="text-sm text-[#c3c6d7]">
                Commissions : <span className="font-semibold text-white">{formatCurrency(closer.commissions)}</span>
              </p>
              <span className="material-symbols-outlined text-[#c3c6d7] group-hover:text-[#2563eb] transition-colors">arrow_forward</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
