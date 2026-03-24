"use client";

import { formatCurrency } from "@/lib/format";
import { useState } from "react";

/* ──────────────────────────────────────────────────────────────────────────── */
/*  Mock data                                                                  */
/* ──────────────────────────────────────────────────────────────────────────── */

const months = [
  { label: "Jan", key: "jan" },
  { label: "F\u00e9v", key: "fev" },
  { label: "Mar", key: "mar" },
  { label: "Avr", key: "avr" },
  { label: "Mai", key: "mai" },
  { label: "Jun", key: "jun" },
];

const invoices = [
  {
    id: "FAC-2026-031",
    client: "TechVision SAS",
    caGenere: 18500,
    commissionRate: 10,
    commission: 1850,
    statut: "PAID" as const,
    date: "01/03/2026",
  },
  {
    id: "FAC-2026-032",
    client: "DigiMarketing",
    caGenere: 12400,
    commissionRate: 10,
    commission: 1240,
    statut: "PAID" as const,
    date: "01/03/2026",
  },
  {
    id: "FAC-2026-033",
    client: "SolairePro",
    caGenere: 9200,
    commissionRate: 10,
    commission: 920,
    statut: "PENDING" as const,
    date: "01/03/2026",
  },
  {
    id: "FAC-2026-034",
    client: "FormaPilot",
    caGenere: 6800,
    commissionRate: 10,
    commission: 680,
    statut: "PENDING" as const,
    date: "01/03/2026",
  },
  {
    id: "FAC-2026-035",
    client: "CleanOffice",
    caGenere: 3600,
    commissionRate: 10,
    commission: 360,
    statut: "PAID" as const,
    date: "01/03/2026",
  },
  {
    id: "FAC-2026-036",
    client: "GreenTech Solutions",
    caGenere: 7800,
    commissionRate: 10,
    commission: 780,
    statut: "OVERDUE" as const,
    date: "01/03/2026",
  },
  {
    id: "FAC-2026-037",
    client: "InfoServices",
    caGenere: 5200,
    commissionRate: 10,
    commission: 520,
    statut: "PAID" as const,
    date: "01/03/2026",
  },
];

type InvoiceStatut = "PAID" | "PENDING" | "OVERDUE" | "SENT";

function invoiceStatusBadge(statut: InvoiceStatut) {
  const map: Record<
    InvoiceStatut,
    { bg: string; text: string; label: string }
  > = {
    PAID: {
      bg: "bg-emerald-500/20",
      text: "text-emerald-400",
      label: "Pay\u00e9e",
    },
    PENDING: {
      bg: "bg-yellow-500/20",
      text: "text-yellow-400",
      label: "En attente",
    },
    OVERDUE: {
      bg: "bg-red-500/20",
      text: "text-red-400",
      label: "En retard",
    },
    SENT: {
      bg: "bg-blue-500/20",
      text: "text-blue-400",
      label: "Envoy\u00e9e",
    },
  };
  const s = map[statut];
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${s.bg} ${s.text}`}
    >
      {s.label}
    </span>
  );
}

const totalCA = invoices.reduce((s, inv) => s + inv.caGenere, 0);
const totalCommissions = invoices.reduce((s, inv) => s + inv.commission, 0);
const totalPaid = invoices
  .filter((inv) => inv.statut === "PAID")
  .reduce((s, inv) => s + inv.commission, 0);
const totalPending = invoices
  .filter((inv) => inv.statut === "PENDING" || inv.statut === "OVERDUE")
  .reduce((s, inv) => s + inv.commission, 0);

/* ──────────────────────────────────────────────────────────────────────────── */
/*  Page                                                                       */
/* ──────────────────────────────────────────────────────────────────────────── */

export default function FacturationPage() {
  const [activeMonth, setActiveMonth] = useState("mar");

  return (
    <div className="space-y-8">
      {/* ── Header ──────────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white font-[family-name:var(--font-plus-jakarta-sans)]">
            Facturation
          </h1>
          <p className="mt-1 text-[#c3c6d7]">
            G\u00e9rez les factures et commissions de vos clients
          </p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-lg bg-gradient-brand px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#2563eb]/25 transition hover:shadow-[#2563eb]/40 hover:brightness-110">
          <span className="material-symbols-outlined text-lg">
            receipt_long
          </span>
          G\u00e9n\u00e9rer toutes les factures
        </button>
      </div>

      {/* ── Month Tabs ──────────────────────────────────────────────────── */}
      <div className="flex items-center gap-1 rounded-xl bg-[#202a3d]/60 backdrop-blur-xl border border-[#434655]/10 p-1.5 w-fit">
        {months.map((m) => (
          <button
            key={m.key}
            onClick={() => setActiveMonth(m.key)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
              activeMonth === m.key
                ? "bg-[#2563eb] text-white shadow-lg shadow-[#2563eb]/25"
                : "text-[#c3c6d7] hover:text-white hover:bg-[#152032]/60"
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* ── Stats Row ───────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {/* CA Global */}
        <div className="rounded-xl bg-[#202a3d]/60 backdrop-blur-xl border border-[#434655]/10 p-6 shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-medium text-[#c3c6d7]">CA Global</p>
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#152032] text-[#2563eb]">
              <span className="material-symbols-outlined text-lg">
                payments
              </span>
            </div>
          </div>
          <p className="text-2xl font-bold text-white">
            {formatCurrency(totalCA)}
          </p>
          <p className="mt-1 text-xs text-[#c3c6d7]">Mars 2026</p>
        </div>

        {/* Total Commissions */}
        <div className="rounded-xl bg-[#202a3d]/60 backdrop-blur-xl border border-[#434655]/10 p-6 shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-medium text-[#c3c6d7]">
              Total Commissions
            </p>
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#152032] text-[#03b5d3]">
              <span className="material-symbols-outlined text-lg">
                account_balance_wallet
              </span>
            </div>
          </div>
          <p className="text-2xl font-bold text-white">
            {formatCurrency(totalCommissions)}
          </p>
          <p className="mt-1 text-xs text-[#c3c6d7]">10% du CA</p>
        </div>

        {/* Payé */}
        <div className="rounded-xl bg-[#202a3d]/60 backdrop-blur-xl border border-[#434655]/10 p-6 shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-medium text-[#c3c6d7]">Pay\u00e9</p>
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#152032] text-emerald-400">
              <span className="material-symbols-outlined text-lg">
                check_circle
              </span>
            </div>
          </div>
          <p className="text-2xl font-bold text-emerald-400">
            {formatCurrency(totalPaid)}
          </p>
          <p className="mt-1 text-xs text-[#c3c6d7]">
            {invoices.filter((i) => i.statut === "PAID").length} factures
          </p>
        </div>

        {/* En attente */}
        <div className="rounded-xl bg-[#202a3d]/60 backdrop-blur-xl border border-[#434655]/10 p-6 shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-medium text-[#c3c6d7]">En attente</p>
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#152032] text-yellow-400">
              <span className="material-symbols-outlined text-lg">
                schedule
              </span>
            </div>
          </div>
          <p className="text-2xl font-bold text-yellow-400">
            {formatCurrency(totalPending)}
          </p>
          <p className="mt-1 text-xs text-[#c3c6d7]">
            {
              invoices.filter(
                (i) => i.statut === "PENDING" || i.statut === "OVERDUE"
              ).length
            }{" "}
            factures
          </p>
        </div>
      </div>

      {/* ── Invoice Table ───────────────────────────────────────────────── */}
      <div className="rounded-xl bg-[#202a3d]/60 backdrop-blur-xl border border-[#434655]/10 shadow-lg overflow-hidden">
        <div className="p-6 border-b border-[#434655]/10 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-white font-[family-name:var(--font-plus-jakarta-sans)]">
              Factures &mdash; Mars 2026
            </h2>
            <p className="text-sm text-[#c3c6d7]">
              {invoices.length} factures g\u00e9n\u00e9r\u00e9es ce mois
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button className="inline-flex items-center gap-1.5 rounded-lg bg-[#152032] border border-[#434655]/20 px-3 py-2 text-sm text-[#c3c6d7] hover:text-white transition">
              <span className="material-symbols-outlined text-base">
                download
              </span>
              Exporter
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#434655]/10 text-[#c3c6d7]">
                <th className="px-6 py-3 text-left font-medium">N\u00b0</th>
                <th className="px-6 py-3 text-left font-medium">Client</th>
                <th className="px-6 py-3 text-right font-medium">
                  CA g\u00e9n\u00e9r\u00e9
                </th>
                <th className="px-6 py-3 text-center font-medium">Taux</th>
                <th className="px-6 py-3 text-right font-medium">
                  Commission
                </th>
                <th className="px-6 py-3 text-center font-medium">Statut</th>
                <th className="px-6 py-3 text-center font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv) => (
                <tr
                  key={inv.id}
                  className="border-b border-[#434655]/10 hover:bg-[#152032]/40 transition-colors"
                >
                  <td className="px-6 py-4">
                    <span className="font-mono text-xs text-[#c3c6d7]">
                      {inv.id}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#2563eb]/20 text-[#2563eb] text-xs font-bold">
                        {inv.client
                          .split(" ")
                          .map((w) => w[0])
                          .join("")
                          .slice(0, 2)}
                      </div>
                      <span className="font-medium text-white">
                        {inv.client}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right font-medium text-white">
                    {formatCurrency(inv.caGenere)}
                  </td>
                  <td className="px-6 py-4 text-center text-[#c3c6d7]">
                    {inv.commissionRate}%
                  </td>
                  <td className="px-6 py-4 text-right font-semibold text-gradient">
                    {formatCurrency(inv.commission)}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {invoiceStatusBadge(inv.statut)}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <button
                        className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-[#2563eb]/20 text-[#2563eb] hover:bg-[#2563eb]/30 transition"
                        title="T\u00e9l\u00e9charger PDF"
                      >
                        <span className="material-symbols-outlined text-base">
                          picture_as_pdf
                        </span>
                      </button>
                      {inv.statut !== "PAID" && (
                        <button
                          className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30 transition"
                          title="Relancer"
                        >
                          <span className="material-symbols-outlined text-base">
                            send
                          </span>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-[#152032]/40">
                <td className="px-6 py-3" />
                <td className="px-6 py-3 font-semibold text-white">Total</td>
                <td className="px-6 py-3 text-right font-semibold text-white">
                  {formatCurrency(totalCA)}
                </td>
                <td className="px-6 py-3 text-center text-[#c3c6d7]">10%</td>
                <td className="px-6 py-3 text-right font-bold text-gradient">
                  {formatCurrency(totalCommissions)}
                </td>
                <td className="px-6 py-3" />
                <td className="px-6 py-3" />
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}
