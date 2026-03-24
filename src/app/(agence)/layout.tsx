import { DashboardShell } from "@/components/layout/dashboard-shell";

export default function AgenceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardShell role="AGENCE">{children}</DashboardShell>;
}
