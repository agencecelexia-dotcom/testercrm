import { PrismaClient, Role, ProspectStatus, InvoiceStatus } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Clean existing data
  await prisma.prospect.deleteMany();
  await prisma.invoice.deleteMany();
  await prisma.clientProfile.deleteMany();
  await prisma.closerProfile.deleteMany();
  await prisma.user.deleteMany();

  const hashedPassword = await bcrypt.hash("admin123", 10);

  // 1. Create Agence user
  const agenceUser = await prisma.user.create({
    data: {
      email: "admin@agencecelexia.fr",
      password: hashedPassword,
      role: Role.AGENCE,
      name: "Admin Celexia",
      phone: "+33 6 00 00 00 01",
    },
  });
  console.log("✅ Agence user created:", agenceUser.email);

  // 2. Create Closers
  const closerRayan = await prisma.user.create({
    data: {
      email: "rayan@celexia.fr",
      password: hashedPassword,
      role: Role.CLOSER,
      name: "Rayan Benali",
      phone: "+33 6 12 34 56 78",
      closerProfile: { create: {} },
    },
    include: { closerProfile: true },
  });

  const closerAdrien = await prisma.user.create({
    data: {
      email: "adrien@celexia.fr",
      password: hashedPassword,
      role: Role.CLOSER,
      name: "Adrien Vasseur",
      phone: "+33 6 98 76 54 32",
      closerProfile: { create: {} },
    },
    include: { closerProfile: true },
  });
  console.log("✅ 2 Closers created");

  // 3. Create Clients
  const clientMetbach = await prisma.user.create({
    data: {
      email: "zachari@renovation-metbach.fr",
      password: hashedPassword,
      role: Role.CLIENT,
      name: "Zachari Metbach",
      phone: "+33 6 45 89 21 00",
      clientProfile: {
        create: {
          businessName: "Rénovation Metbach",
          siret: "123 456 789 00012",
          address: "15 rue des Artisans",
          city: "Strasbourg",
          postalCode: "67000",
          monthlyAdSpend: 1250,
          closerId: closerRayan.closerProfile!.id,
          isActive: true,
        },
      },
    },
    include: { clientProfile: true },
  });

  const clientAqualeo = await prisma.user.create({
    data: {
      email: "contact@aqualeo.fr",
      password: hashedPassword,
      role: Role.CLIENT,
      name: "Sarah Jenkins",
      phone: "+33 7 12 33 45 67",
      clientProfile: {
        create: {
          businessName: "Plomberie Aqualeo",
          siret: "987 654 321 00034",
          address: "8 avenue de la République",
          city: "Lyon",
          postalCode: "69001",
          monthlyAdSpend: 2400,
          closerId: closerRayan.closerProfile!.id,
          isActive: true,
        },
      },
    },
    include: { clientProfile: true },
  });

  const clientMabboux = await prisma.user.create({
    data: {
      email: "julien@mabboux-plomberie.fr",
      password: hashedPassword,
      role: Role.CLIENT,
      name: "Julien Mabboux",
      phone: "+33 6 99 88 77 66",
      clientProfile: {
        create: {
          businessName: "Mabboux Plomberie",
          siret: "456 789 123 00056",
          address: "22 chemin du Lac",
          city: "Annecy",
          postalCode: "74000",
          monthlyAdSpend: 800,
          closerId: closerAdrien.closerProfile!.id,
          isActive: true,
        },
      },
    },
    include: { clientProfile: true },
  });
  console.log("✅ 3 Clients created");

  // 4. Create Prospects for Rénovation Metbach
  const now = new Date();
  const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

  const metbachProspects = [
    {
      clientId: clientMetbach.clientProfile!.id,
      callerPhone: "+33 6 45 89 21 00",
      callerName: "Jean Dupont",
      callDate: new Date(thisMonth.getTime() + 12 * 86400000),
      callDuration: 245,
      status: ProspectStatus.DEVIS_ACCEPTE,
      isQualified: true,
      devisSent: true,
      devisSentDate: new Date(thisMonth.getTime() + 13 * 86400000),
      devisAmount: 12450,
      devisAccepted: true,
      devisAcceptedDate: new Date(thisMonth.getTime() + 15 * 86400000),
      commissionAmount: 1245,
      notes: "Client très motivé, travaux urgents sur toiture.",
    },
    {
      clientId: clientMetbach.clientProfile!.id,
      callerPhone: "+33 7 12 33 45 67",
      callerName: "Marie Lefebvre",
      callDate: new Date(thisMonth.getTime() + 11 * 86400000),
      callDuration: 180,
      status: ProspectStatus.DEVIS_ENVOYE,
      isQualified: true,
      devisSent: true,
      devisSentDate: new Date(thisMonth.getTime() + 12 * 86400000),
      devisAmount: 8900,
      notes: "Rénovation cuisine complète.",
    },
    {
      clientId: clientMetbach.clientProfile!.id,
      callerPhone: "+33 6 99 88 77 66",
      callerName: "Robert Bernard",
      callDate: new Date(thisMonth.getTime() + 10 * 86400000),
      callDuration: 45,
      status: ProspectStatus.NON_QUALIFIE,
      isQualified: false,
      unqualifiedReason: "Hors zone",
    },
    {
      clientId: clientMetbach.clientProfile!.id,
      callerPhone: "+33 6 54 32 10 98",
      callerName: "Sophie Morel",
      callDate: new Date(thisMonth.getTime() + 9 * 86400000),
      callDuration: 320,
      status: ProspectStatus.TERMINE,
      isQualified: true,
      devisSent: true,
      devisSentDate: new Date(thisMonth.getTime() + 10 * 86400000),
      devisAmount: 45000,
      devisAccepted: true,
      devisAcceptedDate: new Date(thisMonth.getTime() + 11 * 86400000),
      acompteReceived: 13500,
      acompteDate: new Date(thisMonth.getTime() + 13 * 86400000),
      soldeReceived: 31500,
      soldeDate: new Date(thisMonth.getTime() + 18 * 86400000),
      totalChantier: 45000,
      chantierDone: true,
      commissionAmount: 4500,
      commissionPaid: true,
    },
    {
      clientId: clientMetbach.clientProfile!.id,
      callerPhone: "+33 7 88 55 44 22",
      callerName: "Pierre Vallet",
      callDate: new Date(thisMonth.getTime() + 8 * 86400000),
      callDuration: 200,
      status: ProspectStatus.QUALIFIE,
      isQualified: true,
      devisAmount: 15200,
    },
    {
      clientId: clientMetbach.clientProfile!.id,
      callerPhone: "+33 6 11 22 33 44",
      callerName: "Alice Petit",
      callDate: new Date(thisMonth.getTime() + 5 * 86400000),
      callDuration: 90,
      status: ProspectStatus.A_TRAITER,
    },
    {
      clientId: clientMetbach.clientProfile!.id,
      callerPhone: "+33 6 55 66 77 88",
      callerName: "Thomas Laurent",
      callDate: new Date(thisMonth.getTime() + 3 * 86400000),
      callDuration: 150,
      status: ProspectStatus.ACOMPTE_RECU,
      isQualified: true,
      devisSent: true,
      devisSentDate: new Date(thisMonth.getTime() + 4 * 86400000),
      devisAmount: 22000,
      devisAccepted: true,
      devisAcceptedDate: new Date(thisMonth.getTime() + 5 * 86400000),
      acompteReceived: 6600,
      acompteDate: new Date(thisMonth.getTime() + 7 * 86400000),
      commissionAmount: 2200,
    },
  ];

  // Prospects for Plomberie Aqualeo
  const aqualeoProspects = [
    {
      clientId: clientAqualeo.clientProfile!.id,
      callerPhone: "+33 6 00 11 22 33",
      callerName: "Marc Lefebvre",
      callDate: new Date(thisMonth.getTime() + 14 * 86400000),
      callDuration: 180,
      status: ProspectStatus.TERMINE,
      isQualified: true,
      devisSent: true,
      devisSentDate: new Date(thisMonth.getTime() + 15 * 86400000),
      devisAmount: 6200,
      devisAccepted: true,
      devisAcceptedDate: new Date(thisMonth.getTime() + 16 * 86400000),
      acompteReceived: 1860,
      acompteDate: new Date(thisMonth.getTime() + 17 * 86400000),
      soldeReceived: 4340,
      soldeDate: new Date(thisMonth.getTime() + 20 * 86400000),
      totalChantier: 6200,
      chantierDone: true,
      commissionAmount: 620,
      commissionPaid: true,
    },
    {
      clientId: clientAqualeo.clientProfile!.id,
      callerPhone: "+33 7 44 55 66 77",
      callerName: "Nathalie Roux",
      callDate: new Date(thisMonth.getTime() + 10 * 86400000),
      callDuration: 130,
      status: ProspectStatus.QUALIFIE,
      isQualified: true,
      devisAmount: 3400,
    },
    {
      clientId: clientAqualeo.clientProfile!.id,
      callerPhone: "+33 6 88 99 00 11",
      callerName: "François Martin",
      callDate: new Date(thisMonth.getTime() + 7 * 86400000),
      callDuration: 60,
      status: ProspectStatus.NON_QUALIFIE,
      isQualified: false,
      unqualifiedReason: "Budget insuffisant",
    },
    {
      clientId: clientAqualeo.clientProfile!.id,
      callerPhone: "+33 6 22 33 44 55",
      callerName: "Isabelle Durand",
      callDate: new Date(thisMonth.getTime() + 5 * 86400000),
      callDuration: 210,
      status: ProspectStatus.DEVIS_ENVOYE,
      isQualified: true,
      devisSent: true,
      devisSentDate: new Date(thisMonth.getTime() + 6 * 86400000),
      devisAmount: 9800,
    },
    {
      clientId: clientAqualeo.clientProfile!.id,
      callerPhone: "+33 6 33 44 55 66",
      callerName: "Philippe Garnier",
      callDate: new Date(thisMonth.getTime() + 2 * 86400000),
      callDuration: 300,
      status: ProspectStatus.SOLDE_RECU,
      isQualified: true,
      devisSent: true,
      devisAmount: 15800,
      devisAccepted: true,
      acompteReceived: 4740,
      soldeReceived: 11060,
      totalChantier: 15800,
      commissionAmount: 1580,
    },
  ];

  // Prospects for Mabboux Plomberie
  const mabbouxProspects = [
    {
      clientId: clientMabboux.clientProfile!.id,
      callerPhone: "+33 6 77 88 99 00",
      callerName: "Claire Bertrand",
      callDate: new Date(thisMonth.getTime() + 13 * 86400000),
      callDuration: 170,
      status: ProspectStatus.DEVIS_ACCEPTE,
      isQualified: true,
      devisSent: true,
      devisAmount: 4500,
      devisAccepted: true,
      commissionAmount: 450,
    },
    {
      clientId: clientMabboux.clientProfile!.id,
      callerPhone: "+33 7 00 11 22 33",
      callerName: "David Moreau",
      callDate: new Date(thisMonth.getTime() + 8 * 86400000),
      callDuration: 95,
      status: ProspectStatus.A_TRAITER,
    },
    {
      clientId: clientMabboux.clientProfile!.id,
      callerPhone: "+33 6 44 55 66 77",
      callerName: "Émilie Richard",
      callDate: new Date(thisMonth.getTime() + 4 * 86400000),
      callDuration: 260,
      status: ProspectStatus.TERMINE,
      isQualified: true,
      devisSent: true,
      devisAmount: 8200,
      devisAccepted: true,
      acompteReceived: 2460,
      soldeReceived: 5740,
      totalChantier: 8200,
      chantierDone: true,
      commissionAmount: 820,
      commissionPaid: true,
    },
  ];

  // Last month prospects for historical data
  const lastMonthProspects = [
    {
      clientId: clientMetbach.clientProfile!.id,
      callerPhone: "+33 6 11 00 99 88",
      callerName: "Luc Fontaine",
      callDate: new Date(lastMonth.getTime() + 5 * 86400000),
      callDuration: 190,
      status: ProspectStatus.TERMINE,
      isQualified: true,
      devisSent: true,
      devisAmount: 18500,
      devisAccepted: true,
      acompteReceived: 5550,
      soldeReceived: 12950,
      totalChantier: 18500,
      chantierDone: true,
      commissionAmount: 1850,
      commissionPaid: true,
    },
    {
      clientId: clientAqualeo.clientProfile!.id,
      callerPhone: "+33 6 22 11 00 99",
      callerName: "Anne Girard",
      callDate: new Date(lastMonth.getTime() + 10 * 86400000),
      callDuration: 280,
      status: ProspectStatus.TERMINE,
      isQualified: true,
      devisSent: true,
      devisAmount: 28250,
      devisAccepted: true,
      acompteReceived: 8475,
      soldeReceived: 19775,
      totalChantier: 28250,
      chantierDone: true,
      commissionAmount: 2825,
      commissionPaid: true,
    },
    {
      clientId: clientMabboux.clientProfile!.id,
      callerPhone: "+33 7 33 22 11 00",
      callerName: "Bruno Lefèvre",
      callDate: new Date(lastMonth.getTime() + 15 * 86400000),
      callDuration: 150,
      status: ProspectStatus.TERMINE,
      isQualified: true,
      devisSent: true,
      devisAmount: 12100,
      devisAccepted: true,
      acompteReceived: 3630,
      soldeReceived: 8470,
      totalChantier: 12100,
      chantierDone: true,
      commissionAmount: 1210,
      commissionPaid: true,
    },
  ];

  const allProspects = [
    ...metbachProspects,
    ...aqualeoProspects,
    ...mabbouxProspects,
    ...lastMonthProspects,
  ];

  for (const prospect of allProspects) {
    await prisma.prospect.create({ data: prospect });
  }
  console.log(`✅ ${allProspects.length} Prospects created`);

  // 5. Create Invoices
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();
  const prevMonth = lastMonth.getMonth() + 1;
  const prevYear = lastMonth.getFullYear();

  const invoices = [
    {
      clientId: clientMetbach.clientProfile!.id,
      month: prevMonth,
      year: prevYear,
      totalRevenue: 18500,
      commission: 1850,
      status: InvoiceStatus.PAID,
    },
    {
      clientId: clientAqualeo.clientProfile!.id,
      month: prevMonth,
      year: prevYear,
      totalRevenue: 28250,
      commission: 2825,
      status: InvoiceStatus.PAID,
    },
    {
      clientId: clientMabboux.clientProfile!.id,
      month: prevMonth,
      year: prevYear,
      totalRevenue: 12100,
      commission: 1210,
      status: InvoiceStatus.PAID,
    },
    {
      clientId: clientMetbach.clientProfile!.id,
      month: currentMonth,
      year: currentYear,
      totalRevenue: 45000,
      commission: 4500,
      status: InvoiceStatus.PENDING,
    },
    {
      clientId: clientAqualeo.clientProfile!.id,
      month: currentMonth,
      year: currentYear,
      totalRevenue: 22000,
      commission: 2200,
      status: InvoiceStatus.SENT,
    },
  ];

  for (const invoice of invoices) {
    await prisma.invoice.create({ data: invoice });
  }
  console.log(`✅ ${invoices.length} Invoices created`);

  console.log("\n🎉 Seeding complete!");
  console.log("\n📋 Login credentials (all passwords: admin123):");
  console.log("   Agence:  admin@agencecelexia.fr");
  console.log("   Closer:  rayan@celexia.fr / adrien@celexia.fr");
  console.log("   Client:  zachari@renovation-metbach.fr / contact@aqualeo.fr / julien@mabboux-plomberie.fr");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
