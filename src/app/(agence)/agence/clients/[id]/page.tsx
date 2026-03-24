"use client";

import { formatCurrency, formatDate } from "@/lib/format";
import { useState } from "react";

/* ──────────────────────────────────────────────────────────────────────────── */
/*  Mock data                                                                  */
/* ──────────────────────────────────────────────────────────────────────────── */

const client = {
  id: "CLI-001",
  name: "TechVision SAS",
  owner: "Alexandre Morel",
  email: "contact@techvision.fr",
  phone: "01 42 68 99 12",
  location: "Paris, France",
  active: true,
  createdAt: "2025-09-15",
  closer: {
    name: "Julien M.",
    email: "julien@celexia.fr",
    commissionRate: 10,
    prospects: 48,
    avatar: "JM",
  },
};

const tabs = [
  { label: "Vue générale", icon: "dashboard" },
  { label: "Prospects", icon: "people" },
  { label: "Facturation", icon: "receipt_long" },
  { label: "Paramètres", icon: "settings" },
];

const kpis = [
  { label: "Appels totaux", value: "482", icon: "call", trend: "+24" },
  {
    label: "CA généré",
    value: formatCurrency(142500),
    icon: "payments",
    trend: "+12%",
  },
  {
    label: "Commissions dues",
    value: formatCurrency(14250),
    icon: "account_balance_wallet",
    trend: "+8%",
  },
];

const activityMonths = [
  { month: "OCT", appels: 62, qualifies: 28 },
  { month: "NOV", appels: 78, qualifies: 35 },
  { month: "DÉC", appels: 85, qualifies: 40 },
  { month: "JAN", appels: 92, qualifies: 44 },
  { month: "FÉV", appels: 80, qualifies: 38 },
  { month: "MAR", appels: 85, qualifies: 42 },
];

const notes = [
  {
    author: "Admin",
    date: "2026-03-20",
    text: "Client très satisfait du nouveau closer assigné. Augmentation notable du taux de conversion.",
  },
  {
    author: "Julien M.",
    date: "2026-03-15",
    text: "Prospects de bonne qualité ce mois-ci. Prévoir un upsell sur la gamme premium.",
  },
  {
    author: "Admin",
    date: "2026-02-28",
    text: "Facture de février envoyée. En attente de paiement.",
  },
];

const maxActivity = Math.max(...activityMonths.map((m) => m.appels));

/* ──────────────────────────────────────────────────────────────────────────── */
/*  Page                                                                       */
/* ──────────────────────────────────────────────────────────────────────────── */

export default function ClientDetailPage() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="space-y-8">
      {/* ── Breadcrumb ──────────────────────────────────────────────────── */}
      <div className="flex items-center gap-2 text-sm text-[#c3c6d7]">
        <a
          href="/agence/clients"
          className="hover:text-white transition-colors"
        >
          Clients
        </a>
        <span className="material-symbols-outlined text-xs">
          chevron_right
        </span>
        <span className="text-white font-medium">{client.name}</span>
      </div>

      {/* ── Header ──────────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-brand text-white text-lg font-bold shrink-0">
            TV
          </div>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-2xl font-bold text-white font-[family-name:var(--font-plus-jakarta-sans)]">
                {client.name}
              </h1>
              <span className="inline-flex items-center rounded-full bg-[#152032] px-2.5 py-0.5 text-xs font-medium text-[#c3c6d7] border border-[#434655]/20">
                {client.id}
              </span>
              <span className="inline-flex items-center rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-xs font-semibold text-emerald-400">
                Actif
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-sm text-[#c3c6d7]">
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-base">
                  person
                </span>
                {client.owner}
              </span>
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-base">
                  location_on
                </span>
                {client.location}
              </span>
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-base">
                  calendar_today
                </span>
                Depuis le {formatDate(client.createdAt)}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-2 rounded-lg bg-[#202a3d] border border-[#434655]/20 px-4 py-2 text-sm font-medium text-[#c3c6d7] hover:text-white transition">
            <span className="material-symbols-outlined text-base">edit</span>
            Modifier
          </button>
          <button className="inline-flex items-center gap-2 rounded-lg bg-gradient-brand px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-[#2563eb]/25">
            <span className="material-symbols-outlined text-base">
              receipt_long
            </span>
            Facturer
          </button>
        </div>
      </div>

      {/* ── Tabs ────────────────────────────────────────────────────────── */}
      <div className="flex items-center gap-1 rounded-xl bg-[#202a3d]/60 backdrop-blur-xl border border-[#434655]/10 p-1.5 w-fit">
        {tabs.map((tab, i) => (
          <button
            key={tab.label}
            onClick={() => setActiveTab(i)}
            className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition ${
              activeTab === i
                ? "bg-[#2563eb] text-white shadow-lg shadow-[#2563eb]/25"
                : "text-[#c3c6d7] hover:text-white hover:bg-[#152032]/60"
            }`}
          >
            <span className="material-symbols-outlined text-base">
              {tab.icon}
            </span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── KPI Cards ───────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        {kpis.map((k) => (
          <div
            key={k.label}
            className="rounded-xl bg-[#202a3d]/60 backdrop-blur-xl border border-[#434655]/10 p-6 shadow-lg"
          >
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-medium text-[#c3c6d7]">{k.label}</p>
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#152032] text-[#2563eb]">
                <span className="material-symbols-outlined text-lg">
                  {k.icon}
                </span>
              </div>
            </div>
            <p className="text-2xl font-bold text-white">{k.value}</p>
            <div className="mt-2 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-base text-emerald-400">
                trending_up
              </span>
              <span className="text-sm font-medium bg-gradient-to-r from-emerald-400 to-[#03b5d3] bg-clip-text text-transparent">
                {k.trend}
              </span>
              <span className="text-xs text-[#c3c6d7]">ce mois</span>
            </div>
          </div>
        ))}
      </div>

      {/* ── Main Content Area ───────────────────────────────────────────── */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Activity Chart */}
        <div className="lg:col-span-2 rounded-xl bg-[#202a3d]/60 backdrop-blur-xl border border-[#434655]/10 p-6 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-white font-[family-name:var(--font-plus-jakarta-sans)]">
                Activité
              </h2>
              <p className="text-sm text-[#c3c6d7]">
                Appels et qualifications mensuels
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#2563eb]" />
                Appels
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#03b5d3]" />
                Qualifiés
              </span>
            </div>
          </div>
          <div className="flex items-end gap-4 h-48">
            {activityMonths.map((m) => (
              <div
                key={m.month}
                className="flex-1 flex flex-col items-center gap-1"
              >
                <div className="w-full flex gap-1 items-end justify-center h-40">
                  <div
                    className="w-5 rounded-t-sm bg-[#2563eb] transition-all duration-500"
                    style={{
                      height: `${(m.appels / maxActivity) * 100}%`,
                    }}
                  />
                  <div
                    className="w-5 rounded-t-sm bg-[#03b5d3] transition-all duration-500"
                    style={{
                      height: `${(m.qualifies / maxActivity) * 100}%`,
                    }}
                  />
                </div>
                <span className="text-xs font-semibold text-[#c3c6d7] mt-1">
                  {m.month}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Closer Sidebar */}
        <div className="rounded-xl bg-[#202a3d]/60 backdrop-blur-xl border border-[#434655]/10 p-6 shadow-lg">
          <h2 className="text-lg font-semibold text-white font-[family-name:var(--font-plus-jakarta-sans)] mb-4">
            Closer assigné
          </h2>
          <div className="flex items-center gap-3 mb-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-brand text-white font-bold">
              {client.closer.avatar}
            </div>
            <div>
              <p className="font-semibold text-white">
                {client.closer.name}
              </p>
              <p className="text-xs text-[#c3c6d7]">
                {client.closer.email}
              </p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-lg bg-[#152032]/60 px-4 py-3">
              <span className="text-sm text-[#c3c6d7]">
                Taux commission
              </span>
              <span className="text-sm font-semibold text-white">
                {client.closer.commissionRate}%
              </span>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-[#152032]/60 px-4 py-3">
              <span className="text-sm text-[#c3c6d7]">
                Prospects gérés
              </span>
              <span className="text-sm font-semibold text-white">
                {client.closer.prospects}
              </span>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-[#152032]/60 px-4 py-3">
              <span className="text-sm text-[#c3c6d7]">Taux conversion</span>
              <span className="text-sm font-semibold text-emerald-400">
                45.8%
              </span>
            </div>
          </div>
          <button className="mt-4 w-full inline-flex items-center justify-center gap-2 rounded-lg bg-[#2563eb]/20 px-4 py-2.5 text-sm font-medium text-[#2563eb] hover:bg-[#2563eb]/30 transition">
            <span className="material-symbols-outlined text-base">
              swap_horiz
            </span>
            Changer de closer
          </button>
        </div>
      </div>

      {/* ── Internal Notes ──────────────────────────────────────────────── */}
      <div className="rounded-xl bg-[#202a3d]/60 backdrop-blur-xl border border-[#434655]/10 p-6 shadow-lg">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-lg font-semibold text-white font-[family-name:var(--font-plus-jakarta-sans)]">
              Notes internes
            </h2>
            <p className="text-sm text-[#c3c6d7]">
              Historique des observations sur ce client
            </p>
          </div>
          <button className="inline-flex items-center gap-2 rounded-lg bg-[#152032] border border-[#434655]/20 px-3 py-2 text-sm font-medium text-[#c3c6d7] hover:text-white transition">
            <span className="material-symbols-outlined text-base">
              add_comment
            </span>
            Ajouter une note
          </button>
        </div>
        <div className="space-y-4">
          {notes.map((note, i) => (
            <div
              key={i}
              className="rounded-lg bg-[#152032]/40 border border-[#434655]/10 p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#2563eb]/20 text-[#2563eb] text-xs font-bold">
                    {note.author[0]}
                  </div>
                  <span className="text-sm font-medium text-white">
                    {note.author}
                  </span>
                </div>
                <span className="text-xs text-[#c3c6d7]">
                  {formatDate(note.date)}
                </span>
              </div>
              <p className="text-sm text-[#c3c6d7] leading-relaxed">
                {note.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
