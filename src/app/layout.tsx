import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Celexia | CRM B2B Premium",
  description: "Celexia CRM — Plateforme de gestion commerciale B2B pour agences LSA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="dark">
      <body className="font-body antialiased bg-background text-foreground min-h-screen">
        {children}
      </body>
    </html>
  );
}
