"use client";

/* ------------------------------------------------------------------ */
/*  Mock data                                                         */
/* ------------------------------------------------------------------ */
type InvoiceStatus = "PAYÉ" | "EN ATTENTE";

const monthlyInvoices = [
  { mois: "Mars 2026", deals: 14, ca: "12,400 €", commission: "1,240 €", status: "EN ATTENTE" as InvoiceStatus },
  { mois: "Février 2026", deals: 16, ca: "14,200 €", commission: "1,420 €", status: "PAYÉ" as InvoiceStatus },
  { mois: "Janvier 2026", deals: 12, ca: "10,800 €", commission: "1,080 €", status: "PAYÉ" as InvoiceStatus },
  { mois: "Décembre 2025", deals: 18, ca: "16,500 €", commission: "1,650 €", status: "PAYÉ" as InvoiceStatus },
  { mois: "Novembre 2025", deals: 15, ca: "13,100 €", commission: "1,310 €", status: "PAYÉ" as InvoiceStatus },
  { mois: "Octobre 2025", deals: 13, ca: "11,200 €", commission: "1,120 €", status: "PAYÉ" as InvoiceStatus },
  { mois: "Septembre 2025", deals: 11, ca: "9,800 €", commission: "980 €", status: "PAYÉ" as InvoiceStatus },
  { mois: "Août 2025", deals: 8, ca: "7,400 €", commission: "740 €", status: "PAYÉ" as InvoiceStatus },
  { mois: "Juillet 2025", deals: 14, ca: "12,600 €", commission: "1,260 €", status: "PAYÉ" as InvoiceStatus },
  { mois: "Juin 2025", deals: 10, ca: "8,900 €", commission: "890 €", status: "PAYÉ" as InvoiceStatus },
  { mois: "Mai 2025", deals: 9, ca: "7,800 €", commission: "780 €", status: "PAYÉ" as InvoiceStatus },
  { mois: "Avril 2025", deals: 2, ca: "2,100 €", commission: "210 €", status: "PAYÉ" as InvoiceStatus },
];

const statusColors: Record<InvoiceStatus, string> = {
  "PAYÉ": "bg-emerald-500/20 text-emerald-400",
  "EN ATTENTE": "bg-yellow-500/20 text-yellow-400",
};

/* ------------------------------------------------------------------ */
/*  Page                                                              */
/* ------------------------------------------------------------------ */
export default function ClientFacturesPage() {
  return (
    <div className="space-y-8">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
          <span className="material-symbols-outlined text-[#2563eb] text-3xl">receipt_long</span>
          Mes factures
        </h1>
        <p className="mt-1 text-[#c3c6d7]">Suivi de vos commissions et facturations</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total commission */}
        <div className="glass-card rounded-xl border border-[#434655]/10 p-6">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-[#c3c6d7]">Commission totale 2024</p>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#152032] text-[#2563eb]">
              <span className="material-symbols-outlined">account_balance</span>
            </div>
          </div>
          <p className="mt-3 text-3xl font-bold text-white">14,280 €</p>
        </div>

        {/* Deals won YTD */}
        <div className="glass-card rounded-xl border border-[#434655]/10 p-6">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-[#c3c6d7]">Deals gagnés YTD</p>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#152032] text-emerald-400">
              <span className="material-symbols-outlined">emoji_events</span>
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <p className="text-3xl font-bold text-white">142</p>
            <p className="text-sm text-[#c3c6d7]">/ 150</p>
          </div>
          {/* Progress bar */}
          <div className="mt-3 h-2 rounded-full bg-[#152032] overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-[#03b5d3] transition-all duration-700"
              style={{ width: "94.6%" }}
            />
          </div>
          <p className="mt-1.5 text-xs text-[#c3c6d7]">94.6% de l&apos;objectif</p>
        </div>

        {/* Pending billing */}
        <div className="glass-card rounded-xl border border-[#434655]/10 p-6">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-[#c3c6d7]">Facturation en attente</p>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#152032] text-yellow-400">
              <span className="material-symbols-outlined">hourglass_top</span>
            </div>
          </div>
          <p className="mt-3 text-3xl font-bold text-white">1,420 €</p>
        </div>
      </div>

      {/* Monthly Table */}
      <div className="glass-panel rounded-xl border border-[#434655]/10 overflow-hidden">
        <div className="p-6 border-b border-[#434655]/10">
          <h2 className="text-lg font-semibold text-white">Historique mensuel</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#434655]/10">
                <th className="text-left px-6 py-3 text-xs font-medium text-[#c3c6d7] uppercase tracking-wider">
                  Mois
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-[#c3c6d7] uppercase tracking-wider">
                  Nbre deals gagnés
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-[#c3c6d7] uppercase tracking-wider">
                  CA total
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-[#c3c6d7] uppercase tracking-wider">
                  Commission due (10%)
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-[#c3c6d7] uppercase tracking-wider">
                  Statut
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-[#c3c6d7] uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#434655]/10">
              {monthlyInvoices.map((inv) => (
                <tr key={inv.mois} className="hover:bg-[#202a3d]/40 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-white">{inv.mois}</td>
                  <td className="px-6 py-4 text-sm text-[#c3c6d7]">{inv.deals}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-white">{inv.ca}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-[#03b5d3]">{inv.commission}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusColors[inv.status]}`}
                    >
                      {inv.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#152032] text-[#c3c6d7] hover:text-white hover:bg-[#2563eb]/20 transition-colors">
                      <span className="material-symbols-outlined text-lg">download</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Transparency Card */}
      <div className="glass-panel rounded-xl border border-[#434655]/10 p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#2563eb] to-[#03b5d3] text-white">
            <span className="material-symbols-outlined text-2xl">shield</span>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Transparence des commissions</h3>
            <p className="mt-2 text-sm text-[#c3c6d7] leading-relaxed">
              Celexia applique une commission fixe de <span className="text-white font-semibold">10%</span> sur
              le chiffre d&apos;affaires généré par les leads qualifiés que nous vous apportons. Cette commission
              couvre l&apos;acquisition publicitaire, la qualification des prospects, le suivi CRM et
              l&apos;accompagnement commercial. Vous ne payez que sur les résultats réels.
            </p>
            <div className="mt-4 flex flex-wrap gap-4 text-xs text-[#c3c6d7]">
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-emerald-400 text-sm">check_circle</span>
                Aucun frais caché
              </span>
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-emerald-400 text-sm">check_circle</span>
                Paiement après résultats
              </span>
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-emerald-400 text-sm">check_circle</span>
                Facturation mensuelle transparente
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
