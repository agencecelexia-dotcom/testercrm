import { z } from 'zod'

// ---------------------------------------------------------------------------
// Login
// ---------------------------------------------------------------------------
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'L\'adresse e-mail est requise')
    .email('Adresse e-mail invalide'),
  password: z
    .string()
    .min(1, 'Le mot de passe est requis'),
})

export type LoginInput = z.infer<typeof loginSchema>

// ---------------------------------------------------------------------------
// Prospect update
// ---------------------------------------------------------------------------
export const prospectUpdateSchema = z.object({
  callerPhone: z.string().min(1, 'Le numéro de téléphone est requis').optional(),
  callerName: z.string().nullable().optional(),
  callDate: z.coerce.date().optional(),
  callDuration: z.coerce.number().int().nonnegative().nullable().optional(),
  callRecordingUrl: z.string().url('URL invalide').nullable().optional(),

  status: z
    .enum([
      'A_TRAITER',
      'NON_QUALIFIE',
      'QUALIFIE',
      'DEVIS_ENVOYE',
      'DEVIS_ACCEPTE',
      'ACOMPTE_RECU',
      'SOLDE_RECU',
      'TERMINE',
    ])
    .optional(),
  isQualified: z.boolean().nullable().optional(),
  unqualifiedReason: z.string().nullable().optional(),

  devisSent: z.boolean().optional(),
  devisSentDate: z.coerce.date().nullable().optional(),
  devisAmount: z.coerce.number().nonnegative().nullable().optional(),
  devisAccepted: z.boolean().nullable().optional(),
  devisAcceptedDate: z.coerce.date().nullable().optional(),

  acompteReceived: z.coerce.number().nonnegative().nullable().optional(),
  acompteDate: z.coerce.date().nullable().optional(),
  soldeReceived: z.coerce.number().nonnegative().nullable().optional(),
  soldeDate: z.coerce.date().nullable().optional(),

  totalChantier: z.coerce.number().nonnegative().nullable().optional(),
  chantierDone: z.boolean().optional(),

  commissionAmount: z.coerce.number().nonnegative().nullable().optional(),
  commissionPaid: z.boolean().optional(),

  notes: z.string().nullable().optional(),
})

export type ProspectUpdateInput = z.infer<typeof prospectUpdateSchema>

// ---------------------------------------------------------------------------
// Client creation
// ---------------------------------------------------------------------------
export const clientCreateSchema = z.object({
  // User fields
  name: z.string().min(1, 'Le nom est requis'),
  email: z.string().email('Adresse e-mail invalide'),
  password: z.string().min(8, 'Le mot de passe doit contenir au moins 8 caractères'),
  phone: z.string().nullable().optional(),

  // ClientProfile fields
  businessName: z.string().min(1, 'Le nom de l\'entreprise est requis'),
  siret: z
    .string()
    .regex(/^\d{14}$/, 'Le SIRET doit contenir 14 chiffres')
    .nullable()
    .optional(),
  address: z.string().nullable().optional(),
  city: z.string().nullable().optional(),
  postalCode: z
    .string()
    .regex(/^\d{5}$/, 'Le code postal doit contenir 5 chiffres')
    .nullable()
    .optional(),
  adAccountId: z.string().nullable().optional(),
  monthlyAdSpend: z.coerce.number().nonnegative().optional(),
  closerId: z.string().cuid().nullable().optional(),
})

export type ClientCreateInput = z.infer<typeof clientCreateSchema>
