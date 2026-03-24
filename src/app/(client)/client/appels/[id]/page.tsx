"use client";

import { useState } from "react";

/* ------------------------------------------------------------------ */
/*  Mock data                                                         */
/* ------------------------------------------------------------------ */
const prospect = {
  name: "Marie Dupont",
  phone: "+33 6 12 34 56 78",
  email: "marie.dupont@email.com",
  date: "24 mars 2026 - 09:15",
  source: "Facebook Ads",
  campaign: "Reno Printemps 2026",
};

const pipelineSteps = [
  { label: "Qualification du besoin", icon: "fact_check", done: true },
  { label: "Devis & Financement", icon: "request_quote", done: false },
  { label: "Documents", icon: "folder_open", done: false },
];

const existingFiles = [
  { name: "piece_identite.pdf", size: "1.2 Mo", date: "22 mars 2026" },
  { name: "justificatif_domicile.pdf", size: "856 Ko", date: "22 mars 2026" },
];

const notes = [
  {
    id: 1,
    author: "Zachari",
    date: "22 mars 2026 - 14:30",
    content: "Client très intéressé par une rénovation complète de la salle de bain. Budget estimé autour de 4,000 €.",
  },
  {
    id: 2,
    author: "Zachari",
    date: "21 mars 2026 - 10:00",
    content: "Premier contact. Demande de rappel pour le 22 mars.",
  },
];

/* ------------------------------------------------------------------ */
/*  Page                                                              */
/* ------------------------------------------------------------------ */
export default function ProspectDetailPage() {
  const [intention, setIntention] = useState("achat_immediat");
  const [raison, setRaison] = useState("renovation");
  const [details, setDetails] = useState(
    "La cliente souhaite rénover entièrement sa salle de bain et potentiellement la cuisine. Maison de 120m² construite en 1985."
  );
  const [devis, setDevis] = useState("4200");
  const [paymentMode, setPaymentMode] = useState("comptant");
  const [newNote, setNewNote] = useState("");

  return (
    <div className="space-y-8">
      {/* Back button + Header */}
      <div>
        <button className="flex items-center gap-1 text-sm text-[#c3c6d7] hover:text-white transition-colors mb-4">
          <span className="material-symbols-outlined text-lg">arrow_back</span>
          Retour aux appels
        </button>

        <div className="glass-panel rounded-xl border border-[#434655]/10 p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#2563eb] to-[#03b5d3] text-white text-xl font-bold">
                MD
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">{prospect.name}</h1>
                <div className="flex flex-wrap items-center gap-3 mt-1">
                  <span className="text-sm text-[#c3c6d7] flex items-center gap-1">
                    <span className="material-symbols-outlined text-base">phone</span>
                    {prospect.phone}
                  </span>
                  <span className="text-sm text-[#c3c6d7] flex items-center gap-1">
                    <span className="material-symbols-outlined text-base">schedule</span>
                    {prospect.date}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center rounded-full bg-[#2563eb]/20 px-3 py-1 text-xs font-semibold text-[#2563eb]">
                <span className="material-symbols-outlined text-sm mr-1">campaign</span>
                {prospect.source}
              </span>
              <span className="inline-flex items-center rounded-full bg-[#03b5d3]/20 px-3 py-1 text-xs font-semibold text-[#03b5d3]">
                <span className="material-symbols-outlined text-sm mr-1">ads_click</span>
                {prospect.campaign}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Pipeline + Forms */}
        <div className="lg:col-span-2 space-y-6">
          {/* Pipeline Stepper */}
          <div className="glass-panel rounded-xl border border-[#434655]/10 p-6">
            <h2 className="text-lg font-semibold text-white mb-6">Pipeline</h2>
            <div className="space-y-0">
              {pipelineSteps.map((step, i) => (
                <div key={step.label} className="flex gap-4">
                  {/* Vertical line + circle */}
                  <div className="flex flex-col items-center">
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                        step.done
                          ? "border-[#03b5d3] bg-[#03b5d3]/20 text-[#03b5d3]"
                          : "border-[#434655]/30 bg-[#152032] text-[#c3c6d7]"
                      }`}
                    >
                      <span className="material-symbols-outlined text-xl">
                        {step.done ? "check_circle" : step.icon}
                      </span>
                    </div>
                    {i < pipelineSteps.length - 1 && (
                      <div
                        className={`w-0.5 h-10 ${
                          step.done ? "bg-[#03b5d3]/40" : "bg-[#434655]/20"
                        }`}
                      />
                    )}
                  </div>
                  {/* Content */}
                  <div className="pb-6">
                    <p
                      className={`text-sm font-semibold ${
                        step.done ? "text-[#03b5d3]" : "text-[#c3c6d7]"
                      }`}
                    >
                      {step.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Qualification Form */}
          <div className="glass-panel rounded-xl border border-[#434655]/10 p-6 space-y-5">
            <h2 className="text-lg font-semibold text-white">Qualification du besoin</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-[#c3c6d7] mb-1.5">
                  Intention d&apos;achat
                </label>
                <select
                  value={intention}
                  onChange={(e) => setIntention(e.target.value)}
                  className="w-full rounded-lg border border-[#434655]/20 bg-[#152032] px-4 py-2.5 text-sm text-white outline-none focus:border-[#2563eb] transition-colors"
                >
                  <option value="achat_immediat">Achat immédiat</option>
                  <option value="reflexion">En réflexion</option>
                  <option value="comparaison">Comparaison de prix</option>
                  <option value="information">Demande d&apos;information</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#c3c6d7] mb-1.5">
                  Raison du projet
                </label>
                <select
                  value={raison}
                  onChange={(e) => setRaison(e.target.value)}
                  className="w-full rounded-lg border border-[#434655]/20 bg-[#152032] px-4 py-2.5 text-sm text-white outline-none focus:border-[#2563eb] transition-colors"
                >
                  <option value="renovation">Rénovation</option>
                  <option value="construction">Construction neuve</option>
                  <option value="agrandissement">Agrandissement</option>
                  <option value="remplacement">Remplacement équipement</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#c3c6d7] mb-1.5">Détails</label>
              <textarea
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                rows={4}
                className="w-full rounded-lg border border-[#434655]/20 bg-[#152032] px-4 py-2.5 text-sm text-white outline-none focus:border-[#2563eb] transition-colors resize-none"
              />
            </div>
          </div>

          {/* Devis & Financement */}
          <div className="glass-panel rounded-xl border border-[#434655]/10 p-6 space-y-5">
            <h2 className="text-lg font-semibold text-white">Devis & Financement</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-[#c3c6d7] mb-1.5">
                  Montant du devis (€)
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={devis}
                    onChange={(e) => setDevis(e.target.value)}
                    className="w-full rounded-lg border border-[#434655]/20 bg-[#152032] px-4 py-2.5 text-sm text-white outline-none focus:border-[#2563eb] transition-colors pr-10"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#c3c6d7] text-sm">
                    €
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#c3c6d7] mb-1.5">
                  Mode de paiement
                </label>
                <select
                  value={paymentMode}
                  onChange={(e) => setPaymentMode(e.target.value)}
                  className="w-full rounded-lg border border-[#434655]/20 bg-[#152032] px-4 py-2.5 text-sm text-white outline-none focus:border-[#2563eb] transition-colors"
                >
                  <option value="comptant">Comptant</option>
                  <option value="financement">Financement</option>
                  <option value="echeances">Paiement en échéances</option>
                </select>
              </div>
            </div>
          </div>

          {/* Documents */}
          <div className="glass-panel rounded-xl border border-[#434655]/10 p-6 space-y-5">
            <h2 className="text-lg font-semibold text-white">Documents</h2>

            {/* Upload area */}
            <div className="border-2 border-dashed border-[#434655]/30 rounded-xl p-8 text-center hover:border-[#2563eb]/40 transition-colors cursor-pointer">
              <span className="material-symbols-outlined text-4xl text-[#434655]">cloud_upload</span>
              <p className="mt-2 text-sm text-[#c3c6d7]">
                Glissez vos fichiers ici ou{" "}
                <span className="text-[#2563eb] font-medium">parcourir</span>
              </p>
              <p className="mt-1 text-xs text-[#434655]">PDF, JPG, PNG - Max 10 Mo</p>
            </div>

            {/* Existing files */}
            <div className="space-y-3">
              {existingFiles.map((file) => (
                <div
                  key={file.name}
                  className="flex items-center justify-between rounded-lg bg-[#152032] px-4 py-3"
                >
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[#2563eb]">description</span>
                    <div>
                      <p className="text-sm font-medium text-white">{file.name}</p>
                      <p className="text-xs text-[#c3c6d7]">
                        {file.size} - {file.date}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-[#202a3d] text-[#c3c6d7] hover:text-white transition-colors">
                      <span className="material-symbols-outlined text-lg">download</span>
                    </button>
                    <button className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-red-500/10 text-[#c3c6d7] hover:text-red-400 transition-colors">
                      <span className="material-symbols-outlined text-lg">delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Notes */}
        <div className="space-y-6">
          <div className="glass-panel rounded-xl border border-[#434655]/10 p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Notes</h2>

            {/* Add note */}
            <div className="mb-5">
              <textarea
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Ajouter une note..."
                rows={3}
                className="w-full rounded-lg border border-[#434655]/20 bg-[#152032] px-4 py-2.5 text-sm text-white outline-none focus:border-[#2563eb] transition-colors resize-none placeholder:text-[#434655]"
              />
              <button className="mt-2 w-full rounded-lg bg-[#2563eb] px-4 py-2 text-sm font-medium text-white hover:bg-[#2563eb]/80 transition-colors">
                Ajouter
              </button>
            </div>

            {/* Existing notes */}
            <div className="space-y-4">
              {notes.map((note) => (
                <div
                  key={note.id}
                  className="rounded-lg bg-[#152032] p-4 border-l-2 border-[#2563eb]"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-[#2563eb]">{note.author}</span>
                    <span className="text-xs text-[#434655]">{note.date}</span>
                  </div>
                  <p className="text-sm text-[#c3c6d7] leading-relaxed">{note.content}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="space-y-3">
            <button className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#2563eb] to-[#03b5d3] px-4 py-3 text-sm font-semibold text-white hover:shadow-lg hover:shadow-[#2563eb]/20 transition-all">
              <span className="material-symbols-outlined text-lg">save</span>
              Enregistrer
            </button>
            <button className="w-full flex items-center justify-center gap-2 rounded-xl glass-card border border-[#434655]/10 px-4 py-3 text-sm font-medium text-[#c3c6d7] hover:text-white hover:border-[#434655]/30 transition-all">
              <span className="material-symbols-outlined text-lg">cancel</span>
              Annuler
            </button>
            <button className="w-full flex items-center justify-center gap-2 rounded-xl glass-card border border-red-500/20 px-4 py-3 text-sm font-medium text-red-400 hover:bg-red-500/10 transition-all">
              <span className="material-symbols-outlined text-lg">archive</span>
              Archiver
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
