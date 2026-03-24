"use client";

import { formatDate } from "@/lib/format";
import { useState } from "react";

/* ──────────────────────────────────────────────────────────────────────────── */
/*  Mock data                                                                  */
/* ──────────────────────────────────────────────────────────────────────────── */

const prospect = {
  id: "PRO-1001",
  nom: "Pierre Dupont",
  entreprise: "Nexus Digital",
  email: "p.dupont@nexus.fr",
  telephone: "06 12 45 78 90",
  source: "LinkedIn",
  createdAt: "2026-03-18",
  status: "Qualifié",
  notes: "Intéressé par notre offre premium. Budget prévu Q2 2026.",
};

const steps = [
  { label: "Informations", icon: "person", description: "Données du prospect" },
  { label: "Qualification", icon: "checklist", description: "Critères de qualification" },
  { label: "Rendez-vous", icon: "event", description: "Planifier un appel" },
  { label: "Résultat", icon: "flag", description: "Issue de l'appel" },
];

const qualificationQuestions = [
  { question: "Budget défini ?", options: ["Oui", "En cours", "Non"], selected: 0 },
  { question: "Décisionnaire identifié ?", options: ["Oui", "Partiellement", "Non"], selected: 0 },
  { question: "Besoin confirmé ?", options: ["Oui", "En partie", "Non"], selected: 1 },
  { question: "Calendrier défini ?", options: ["< 1 mois", "1-3 mois", "> 3 mois"], selected: 1 },
];

const callHistory = [
  { date: "2026-03-20", duree: "12 min", type: "Appel sortant", resultat: "Qualifié", notes: "Prospect très intéressé. Demande un devis détaillé." },
  { date: "2026-03-18", duree: "5 min", type: "Appel sortant", resultat: "Rappeler", notes: "Premier contact. En réunion, demande un rappel vendredi." },
];

const resultOptions = ["Qualifié - RDV pris", "Qualifié - À rappeler", "Non qualifié", "Pas de réponse", "Numéro invalide"];

/* ──────────────────────────────────────────────────────────────────────────── */
/*  Page                                                                       */
/* ──────────────────────────────────────────────────────────────────────────── */

export default function ProspectDetailPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedResult, setSelectedResult] = useState("");
  const [callNotes, setCallNotes] = useState("");

  return (
    <div className="space-y-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[#c3c6d7]">
        <a href="/client/appels" className="hover:text-white transition-colors">Appels</a>
        <span className="material-symbols-outlined text-xs">chevron_right</span>
        <span className="text-white font-medium">{prospect.nom}</span>
      </div>

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-brand text-white text-lg font-bold shrink-0">PD</div>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-2xl font-bold text-white font-[family-name:var(--font-plus-jakarta-sans)]">{prospect.nom}</h1>
              <span className="inline-flex items-center rounded-full bg-[#152032] px-2.5 py-0.5 text-xs font-medium text-[#c3c6d7] border border-[#434655]/20">{prospect.id}</span>
              <span className="inline-flex items-center rounded-full bg-cyan-500/20 px-2.5 py-0.5 text-xs font-semibold text-cyan-400">{prospect.status}</span>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-sm text-[#c3c6d7]">
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-base">business</span>
                {prospect.entreprise}
              </span>
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-base">mail</span>
                {prospect.email}
              </span>
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-base">phone</span>
                {prospect.telephone}
              </span>
            </div>
          </div>
        </div>
        <button className="inline-flex items-center gap-2 rounded-lg bg-gradient-brand px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-[#2563eb]/25">
          <span className="material-symbols-outlined text-base">call</span>
          Appeler maintenant
        </button>
      </div>

      {/* Stepper */}
      <div className="rounded-xl bg-[#202a3d]/60 backdrop-blur-xl border border-[#434655]/10 p-6 shadow-lg">
        <div className="flex items-center justify-between mb-8">
          {steps.map((step, i) => (
            <div key={step.label} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <button
                  onClick={() => setCurrentStep(i)}
                  className={`flex h-12 w-12 items-center justify-center rounded-full border-2 transition ${
                    i <= currentStep
                      ? "bg-[#2563eb] border-[#2563eb] text-white shadow-lg shadow-[#2563eb]/25"
                      : "border-[#434655]/30 text-[#c3c6d7] hover:border-[#2563eb]/50"
                  }`}
                >
                  {i < currentStep ? (
                    <span className="material-symbols-outlined text-lg">check</span>
                  ) : (
                    <span className="material-symbols-outlined text-lg">{step.icon}</span>
                  )}
                </button>
                <p className={`mt-2 text-xs font-medium ${i <= currentStep ? "text-white" : "text-[#c3c6d7]"}`}>{step.label}</p>
                <p className="text-[10px] text-[#c3c6d7]">{step.description}</p>
              </div>
              {i < steps.length - 1 && (
                <div className={`flex-1 h-0.5 mx-4 mt-[-24px] ${i < currentStep ? "bg-[#2563eb]" : "bg-[#434655]/30"}`} />
              )}
            </div>
          ))}
        </div>

        {/* Step 0: Informations */}
        {currentStep === 0 && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {[
              { label: "Nom complet", value: prospect.nom, icon: "person" },
              { label: "Entreprise", value: prospect.entreprise, icon: "business" },
              { label: "Email", value: prospect.email, icon: "mail" },
              { label: "Téléphone", value: prospect.telephone, icon: "phone" },
              { label: "Source", value: prospect.source, icon: "campaign" },
              { label: "Date de création", value: formatDate(prospect.createdAt), icon: "calendar_today" },
            ].map((field) => (
              <div key={field.label} className="rounded-lg bg-[#152032]/40 border border-[#434655]/10 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="material-symbols-outlined text-base text-[#2563eb]">{field.icon}</span>
                  <span className="text-xs font-medium text-[#c3c6d7]">{field.label}</span>
                </div>
                <p className="text-sm font-semibold text-white">{field.value}</p>
              </div>
            ))}
            <div className="sm:col-span-2 rounded-lg bg-[#152032]/40 border border-[#434655]/10 p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="material-symbols-outlined text-base text-[#2563eb]">notes</span>
                <span className="text-xs font-medium text-[#c3c6d7]">Notes</span>
              </div>
              <p className="text-sm text-white">{prospect.notes}</p>
            </div>
          </div>
        )}

        {/* Step 1: Qualification */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white mb-4">Grille de qualification BANT</h3>
            {qualificationQuestions.map((q) => (
              <div key={q.question} className="rounded-lg bg-[#152032]/40 border border-[#434655]/10 p-4">
                <p className="text-sm font-medium text-white mb-3">{q.question}</p>
                <div className="flex items-center gap-2">
                  {q.options.map((opt, oi) => (
                    <button
                      key={opt}
                      className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                        q.selected === oi
                          ? "bg-[#2563eb] text-white shadow-lg shadow-[#2563eb]/25"
                          : "bg-[#202a3d] text-[#c3c6d7] border border-[#434655]/20 hover:text-white"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Step 2: Rendez-vous */}
        {currentStep === 2 && (
          <div className="space-y-5">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-medium text-[#c3c6d7] mb-2">Date du rendez-vous</label>
                <input type="date" defaultValue="2026-03-25" className="w-full rounded-lg bg-[#152032]/60 border border-[#434655]/20 px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#2563eb]/50" />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#c3c6d7] mb-2">Heure</label>
                <input type="time" defaultValue="14:30" className="w-full rounded-lg bg-[#152032]/60 border border-[#434655]/20 px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#2563eb]/50" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-[#c3c6d7] mb-2">Notes pour l&apos;appel</label>
              <textarea
                rows={4}
                placeholder="Points à aborder lors de l'appel..."
                className="w-full rounded-lg bg-[#152032]/60 border border-[#434655]/20 px-4 py-2.5 text-sm text-white placeholder-[#c3c6d7]/50 focus:outline-none focus:ring-2 focus:ring-[#2563eb]/50 resize-none"
                defaultValue="Présenter l'offre premium. Vérifier le budget Q2. Proposer une démo."
              />
            </div>
          </div>
        )}

        {/* Step 3: Résultat */}
        {currentStep === 3 && (
          <div className="space-y-5">
            <div>
              <label className="block text-xs font-medium text-[#c3c6d7] mb-3">Résultat de l&apos;appel</label>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                {resultOptions.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setSelectedResult(opt)}
                    className={`rounded-lg px-4 py-3 text-sm font-medium text-left transition ${
                      selectedResult === opt
                        ? "bg-[#2563eb] text-white shadow-lg shadow-[#2563eb]/25"
                        : "bg-[#152032]/60 text-[#c3c6d7] border border-[#434655]/20 hover:text-white"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-[#c3c6d7] mb-2">Notes de l&apos;appel</label>
              <textarea
                rows={4}
                placeholder="Résumé de l'échange..."
                value={callNotes}
                onChange={(e) => setCallNotes(e.target.value)}
                className="w-full rounded-lg bg-[#152032]/60 border border-[#434655]/20 px-4 py-2.5 text-sm text-white placeholder-[#c3c6d7]/50 focus:outline-none focus:ring-2 focus:ring-[#2563eb]/50 resize-none"
              />
            </div>
            <button className="inline-flex items-center gap-2 rounded-lg bg-gradient-brand px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#2563eb]/25">
              <span className="material-symbols-outlined text-base">save</span>
              Enregistrer le résultat
            </button>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8 pt-5 border-t border-[#434655]/10">
          <button
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
            className="inline-flex items-center gap-2 rounded-lg bg-[#202a3d] border border-[#434655]/20 px-4 py-2 text-sm font-medium text-[#c3c6d7] hover:text-white transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <span className="material-symbols-outlined text-base">arrow_back</span>
            Précédent
          </button>
          <button
            onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
            disabled={currentStep === steps.length - 1}
            className="inline-flex items-center gap-2 rounded-lg bg-[#2563eb] px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-[#2563eb]/25 transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Suivant
            <span className="material-symbols-outlined text-base">arrow_forward</span>
          </button>
        </div>
      </div>

      {/* Call History */}
      <div className="rounded-xl bg-[#202a3d]/60 backdrop-blur-xl border border-[#434655]/10 p-6 shadow-lg">
        <h2 className="text-lg font-semibold text-white font-[family-name:var(--font-plus-jakarta-sans)] mb-5">Historique des appels</h2>
        <div className="space-y-3">
          {callHistory.map((call, i) => (
            <div key={i} className="rounded-lg bg-[#152032]/40 border border-[#434655]/10 p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#2563eb]/20 text-[#2563eb]">
                    <span className="material-symbols-outlined text-base">call</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{call.type}</p>
                    <p className="text-xs text-[#c3c6d7]">{formatDate(call.date)} &middot; {call.duree}</p>
                  </div>
                </div>
                <span className="inline-flex items-center rounded-full bg-cyan-500/20 px-2.5 py-0.5 text-xs font-semibold text-cyan-400">{call.resultat}</span>
              </div>
              <p className="text-sm text-[#c3c6d7] ml-12">{call.notes}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
