"use client";


/* ------------------------------------------------------------------ */
/*  Mock data                                                         */
/* ------------------------------------------------------------------ */
type CommissionStatus = "PAYÉE" | "EN ATTENTE" | "EN COURS";

interface MonthlyCommission {
  id: number;
  mois: string;
  clients: number;
  caGenere: string;
  commCelexia: string;
  taPart: string;
  status: CommissionStatus;
}

const commissions: MonthlyCommission[] = [
  { id: 1, mois: "Mars 2026", clients: 24, caGenere: "142,500 €", commCelexia: "14,250 €", taPart: "1,425 €", status: "EN ATTENTE" },
  { id: 2, mois: "Février 2026", clients: 22, caGenere: "128,300 €", commCelexia: "12,830 €", taPart: "1,283 €", status: "EN COURS" },
  { id: 3, mois: "Janvier 2026", clients: 20, caGenere: "115,000 €", commCelexia: "11,500 €", taPart: "1,150 €", status: "PAYÉE" },
  { id: 4, mois: "Décembre 2025", clients: 18, caGenere: "98,600 €", commCelexia: "9,860 €", taPart: "986 €", status: "PAYÉE" },
  { id: 5, mois: "Novembre 2025", clients: 16, caGenere: "87,200 €", commCelexia: "8,720 €", taPart: "872 €", status: "PAYÉE" },
  { id: 6, mois: "Octobre 2025", clients: 15, caGenere: "79,400 €", commCelexia: "7,940 €", taPart: "794 €", status: "PAYÉE" },
  { id: 7, mois: "Septembre 2025", clients: 14, caGenere: "72,100 €", commCelexia: "7,210 €", taPart: "721 €", status: "PAYÉE" },
  { id: 8, mois: "Août 2025", clients: 10, caGenere: "54,800 €", commCelexia: "5,480 €", taPart: "548 €", status: "PAYÉE" },
  { id: 9, mois: "Juillet 2025", clients: 12, caGenere: "63,500 €", commCelexia: "6,350 €", taPart: "635 €", status: "PAYÉE" },
  { id: 10, mois: "Juin 2025", clients: 11, caGenere: "58,200 €", commCelexia: "5,820 €", taPart: "582 €", status: "PAYÉE" },
];

const statusColors: Record<CommissionStatus, string> = {
  "PAYÉE": "bg-emerald-500/20 text-emerald-400",
  "EN ATTENTE": "bg-yellow-500/20 text-yellow-400",
  "EN COURS": "bg-[#2563eb]/20 text-[#2563eb]",
};

const statusIcons: Record<CommissionStatus, string> = {
  "PAYÉE": "check_circle",
  "EN ATTENTE": "hourglass_top",
  "EN COURS": "sync",
};

/* ------------------------------------------------------------------ */
/*  Page                                                              */
/* ------------------------------------------------------------------ */
export default function CloserCommissionsPage() {
  const totalCommissions = "8,996 €";
  const enAttente = "1,425 €";
  const payees = "6,288 €";

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <span className="material-symbols-outlined text-[#03b5d3] text-3xl">euro</span>
            Mes Commissions
          </h1>
          <p className="mt-1 text-[#c3c6d7]">Suivi détaillé de vos revenus</p>
        </div>

        {/* Export button */}
        <button className="inline-flex items-center gap-2 rounded-xl glass-card border border-[#434655]/10 px-5 py-2.5 text-sm font-medium text-[#c3c6d7] hover:text-white hover:border-[#2563eb]/30 transition-all">
          <span className="material-symbols-outlined text-lg">download</span>
          Exporter CSV
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total */}
        <div className="bg-gradient-brand rounded-xl p-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2240%22%20height%3D%2240%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Ccircle%20cx%3D%222%22%20cy%3D%222%22%20r%3D%221%22%20fill%3D%22rgba(255%2C255%2C255%2C0.06)%22%2F%3E%3C%2Fsvg%3E')] bg-[length:40px_40px]" />
          <div className="relative">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-white/80">Total commissions</p>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-white">
                <span className="material-symbols-outlined">account_balance_wallet</span>
              </div>
            </div>
            <p className="mt-3 text-3xl font-bold text-white">{totalCommissions}</p>
            <p className="mt-1 text-xs text-white/60">Cumul depuis le début</p>
          </div>
        </div>

        {/* En attente */}
        <div className="glass-card rounded-xl border border-[#434655]/10 p-6">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-[#c3c6d7]">En attente</p>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#152032] text-yellow-400">
              <span className="material-symbols-outlined">hourglass_top</span>
            </div>
          </div>
          <p className="mt-3 text-3xl font-bold text-white">{enAttente}</p>
          <p className="mt-1 text-xs text-[#c3c6d7]">En cours de traitement</p>
        </div>

        {/* Payées */}
        <div className="glass-card rounded-xl border border-[#434655]/10 p-6">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-[#c3c6d7]">Payées</p>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#152032] text-emerald-400">
              <span className="material-symbols-outlined">check_circle</span>
            </div>
          </div>
          <p className="mt-3 text-3xl font-bold text-white">{payees}</p>
          <p className="mt-1 text-xs text-[#c3c6d7]">Virées sur votre compte</p>
        </div>
      </div>

      {/* Commission History Table */}
      <div className="glass-panel rounded-xl border border-[#434655]/10 overflow-hidden">
        <div className="p-6 border-b border-[#434655]/10">
          <h2 className="text-lg font-semibold text-white">
            <span className="material-symbols-outlined text-[#2563eb] mr-2 align-middle">history</span>
            Historique des commissions
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#434655]/10">
                <th className="text-left px-6 py-3 text-xs font-medium text-[#c3c6d7] uppercase tracking-wider">
                  Mois
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-[#c3c6d7] uppercase tracking-wider">
                  Clients
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-[#c3c6d7] uppercase tracking-wider">
                  CA Généré
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-[#c3c6d7] uppercase tracking-wider">
                  Comm. Celexia
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-[#c3c6d7] uppercase tracking-wider">
                  Ta part (10%)
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-[#c3c6d7] uppercase tracking-wider">
                  Statut
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#434655]/10">
              {commissions.map((comm) => (
                <tr key={comm.id} className="hover:bg-[#202a3d]/40 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-white">{comm.mois}</td>
                  <td className="px-6 py-4 text-sm text-[#c3c6d7]">{comm.clients}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-white">{comm.caGenere}</td>
                  <td className="px-6 py-4 text-sm text-[#c3c6d7]">{comm.commCelexia}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-[#03b5d3]">{comm.taPart}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusColors[comm.status]}`}
                    >
                      <span className="material-symbols-outlined text-xs">{statusIcons[comm.status]}</span>
                      {comm.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-[#434655]/10 bg-[#152032]/30">
          <p className="text-sm text-[#c3c6d7]">
            {commissions.length} mois affichés
          </p>
          <div className="flex items-center gap-3 text-sm">
            <span className="text-[#c3c6d7]">Total :</span>
            <span className="font-bold text-white">{totalCommissions}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
