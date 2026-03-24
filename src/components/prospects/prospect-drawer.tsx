"use client";

import { useState } from "react";
type ProspectStatus = 'A_TRAITER' | 'NON_QUALIFIE' | 'QUALIFIE' | 'DEVIS_ENVOYE' | 'DEVIS_ACCEPTE' | 'ACOMPTE_RECU' | 'SOLDE_RECU' | 'TERMINE';

interface Prospect {
  id: string;
  callerName: string | null;
  callerPhone: string;
  callDate: string;
  callDuration: number | null;
  status: ProspectStatus;
  isQualified: boolean | null;
  unqualifiedReason: string | null;
  devisSent: boolean;
  devisSentDate: string | null;
  devisAmount: number | null;
  devisAccepted: boolean | null;
  devisAcceptedDate: string | null;
  acompteReceived: number | null;
  acompteDate: string | null;
  soldeReceived: number | null;
  soldeDate: string | null;
  totalChantier: number | null;
  chantierDone: boolean;
  commissionAmount: number | null;
  commissionPaid: boolean;
  notes: string | null;
}

interface ProspectDrawerProps {
  prospect: Prospect | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate?: (id: string, data: Partial<Prospect>) => void;
  showCommission?: boolean;
}

const pipelineSteps = [
  { key: "appel", label: "Appel reçu", icon: "call" },
  { key: "qualification", label: "Qualification", icon: "checklist" },
  { key: "devis_envoye", label: "Devis envoyé", icon: "description" },
  { key: "devis_accepte", label: "Devis accepté", icon: "thumb_up" },
  { key: "acompte", label: "Acompte reçu", icon: "savings" },
  { key: "solde", label: "Solde reçu", icon: "account_balance" },
  { key: "termine", label: "Chantier terminé", icon: "check_circle" },
];

const unqualifiedReasons = [
  "Hors zone",
  "Mauvais service",
  "Budget insuffisant",
  "Déjà équipé",
  "Pas de réponse",
  "Autre",
];

function getStepIndex(status: ProspectStatus): number {
  switch (status) {
    case "A_TRAITER": return 0;
    case "NON_QUALIFIE": return 1;
    case "QUALIFIE": return 1;
    case "DEVIS_ENVOYE": return 2;
    case "DEVIS_ACCEPTE": return 3;
    case "ACOMPTE_RECU": return 4;
    case "SOLDE_RECU": return 5;
    case "TERMINE": return 6;
    default: return 0;
  }
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(amount);
}

export function ProspectDrawer({
  prospect,
  isOpen,
  onClose,
  showCommission = false,
}: ProspectDrawerProps) {
  const [qualificationChoice, setQualificationChoice] = useState<string>("");
  const [unqualifiedReason, setUnqualifiedReason] = useState<string>("");
  const [notes, setNotes] = useState(prospect?.notes || "");

  if (!isOpen || !prospect) return null;

  const currentStep = getStepIndex(prospect.status);
  const isNonQualifie = prospect.status === "NON_QUALIFIE";

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      {/* Drawer */}
      <aside className="fixed right-0 top-0 h-screen w-[480px] bg-surface-low z-50 shadow-[0px_0px_64px_rgba(0,0,0,0.5)] flex flex-col border-l border-outline-variant/15">
        {/* Header */}
        <div className="p-8 pb-6 border-b border-outline-variant/10">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-headline font-bold text-white mb-1">
                {prospect.callerName || "Prospect inconnu"}
              </h2>
              <p className="text-on-surface-variant flex items-center gap-2 text-sm">
                <span className="material-symbols-outlined text-sm">call</span>
                {prospect.callerPhone}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-surface-high rounded-full transition-colors"
            >
              <span className="material-symbols-outlined text-on-surface-variant">
                close
              </span>
            </button>
          </div>
          <div className="flex gap-3">
            <div className="px-3 py-1 bg-surface-highest rounded-full flex items-center gap-2">
              <span
                className="material-symbols-outlined text-secondary text-sm"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                calendar_today
              </span>
              <span className="text-xs font-medium text-on-surface">
                {new Date(prospect.callDate).toLocaleDateString("fr-FR", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </div>
            <div className="px-3 py-1 bg-surface-highest rounded-full flex items-center gap-2">
              <span
                className="material-symbols-outlined text-primary text-sm"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                phone_callback
              </span>
              <span className="text-xs font-medium text-on-surface">
                Source: Appel
              </span>
            </div>
          </div>
        </div>

        {/* Scrollable Content: Pipeline Stepper */}
        <div className="flex-grow overflow-y-auto p-8">
          <h3 className="text-xs font-headline font-bold tracking-widest uppercase text-on-surface-variant mb-8">
            Pipeline Commercial
          </h3>

          <div className="space-y-0">
            {pipelineSteps.map((step, index) => {
              const isCompleted = index < currentStep;
              const isCurrent = index === currentStep;
              const isFuture = index > currentStep;
              const isLast = index === pipelineSteps.length - 1;

              // Hide steps after qualification if non-qualified
              if (isNonQualifie && index > 1) return null;

              return (
                <div key={step.key} className="relative pb-8 group">
                  {/* Connecting line */}
                  {!isLast && (
                    <div
                      className={`absolute left-[11px] top-[24px] bottom-[-8px] w-0.5 ${
                        isCompleted || isCurrent
                          ? "bg-primary"
                          : "bg-outline-variant"
                      }`}
                    />
                  )}

                  <div className="flex gap-4 relative">
                    {/* Step indicator */}
                    <div
                      className={`z-10 w-6 h-6 rounded-full flex items-center justify-center ${
                        isCompleted
                          ? "bg-primary"
                          : isCurrent
                          ? "bg-primary ring-4 ring-primary/20"
                          : "bg-surface-highest border border-outline-variant"
                      }`}
                    >
                      {isCompleted ? (
                        <span className="material-symbols-outlined text-sm text-white font-bold">
                          check
                        </span>
                      ) : isCurrent ? (
                        <span className="w-2.5 h-2.5 rounded-full bg-white" />
                      ) : null}
                    </div>

                    {/* Step content */}
                    <div className="flex-grow pt-0.5">
                      {/* Step 2: Qualification - special handling */}
                      {step.key === "qualification" && isCurrent ? (
                        <div>
                          <div className="flex justify-between items-center mb-3">
                            <span className="text-sm font-bold text-primary">
                              {step.label}
                            </span>
                            <span className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-bold rounded uppercase tracking-wider">
                              En cours
                            </span>
                          </div>
                          <div className="space-y-3">
                            <select
                              value={qualificationChoice}
                              onChange={(e) =>
                                setQualificationChoice(e.target.value)
                              }
                              className="w-full bg-surface-lowest border-b border-outline-variant text-sm py-2.5 px-0 focus:border-primary focus:ring-0 transition-all rounded-none"
                            >
                              <option value="">
                                Sélectionner le statut...
                              </option>
                              <option value="qualifie">Qualifié</option>
                              <option value="non_qualifie">
                                Non qualifié
                              </option>
                            </select>

                            {qualificationChoice === "non_qualifie" && (
                              <div className="space-y-2">
                                <select
                                  value={unqualifiedReason}
                                  onChange={(e) =>
                                    setUnqualifiedReason(e.target.value)
                                  }
                                  className="w-full bg-surface-lowest border-b border-outline-variant text-sm py-2.5 px-0 focus:border-primary focus:ring-0 transition-all rounded-none"
                                >
                                  <option value="">Raison...</option>
                                  {unqualifiedReasons.map((reason) => (
                                    <option key={reason} value={reason}>
                                      {reason}
                                    </option>
                                  ))}
                                </select>
                                <textarea
                                  placeholder="Précision..."
                                  className="w-full bg-surface-lowest border border-outline-variant/30 rounded-lg text-sm p-3 focus:border-primary focus:ring-0 min-h-[60px] resize-none"
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      ) : step.key === "acompte" && (isCurrent || isFuture) ? (
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span
                              className={`text-sm font-medium ${
                                isCurrent ? "text-primary font-bold" : "text-on-surface-variant"
                              }`}
                            >
                              {step.label}
                            </span>
                            <span className="text-xs font-mono text-on-surface-variant">
                              30%
                            </span>
                          </div>
                          {isCurrent && (
                            <div className="h-10 px-3 bg-surface-lowest/50 border border-outline-variant/30 rounded flex items-center">
                              <span className="text-xs text-on-surface-variant/50">
                                Montant attendu...
                              </span>
                            </div>
                          )}
                        </div>
                      ) : (
                        <span
                          className={`text-sm ${
                            isCompleted
                              ? "font-bold text-white"
                              : isCurrent
                              ? "font-bold text-primary"
                              : "font-medium text-on-surface-variant"
                          }`}
                        >
                          {step.label}
                        </span>
                      )}

                      {/* Timestamp for completed steps */}
                      {isCompleted && index === 0 && (
                        <span className="text-xs text-on-surface-variant font-mono block mt-1">
                          {new Date(prospect.callDate).toLocaleDateString(
                            "fr-FR"
                          )}{" "}
                          {new Date(prospect.callDate).toLocaleTimeString(
                            "fr-FR",
                            { hour: "2-digit", minute: "2-digit" }
                          )}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Notes */}
          <div className="mt-12">
            <label className="text-xs font-headline font-bold tracking-widest uppercase text-on-surface-variant block mb-4">
              Notes de suivi
            </label>
            <div className="bg-surface-lowest p-4 rounded-xl border border-outline-variant/10 focus-within:border-primary/50 transition-all">
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-transparent border-none focus:ring-0 text-sm text-on-surface min-h-[100px] placeholder:text-on-surface-variant/30 p-0 resize-none"
                placeholder="Ajouter une note interne..."
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="p-8 bg-surface-high/50 backdrop-blur-md">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="p-4 bg-surface-low rounded-xl border border-outline-variant/5">
              <span className="text-[10px] uppercase tracking-wider font-bold text-on-surface-variant block mb-1">
                Montant Total
              </span>
              <span className="text-xl font-mono font-bold text-white">
                {formatCurrency(prospect.totalChantier || prospect.devisAmount || 0)}
              </span>
            </div>
            {showCommission && (
              <div className="p-4 bg-surface-low rounded-xl border border-outline-variant/5">
                <span className="text-[10px] uppercase tracking-wider font-bold text-on-surface-variant block mb-1">
                  Commission (10%)
                </span>
                <span className="text-xl font-mono font-bold text-gradient">
                  {formatCurrency(prospect.commissionAmount || 0)}
                </span>
              </div>
            )}
          </div>
          <button className="w-full py-4 bg-gradient-brand text-white font-bold rounded-xl transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-primary/20">
            Enregistrer les modifications
          </button>
        </footer>
      </aside>
    </>
  );
}
