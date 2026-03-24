import { DashboardShell } from "@/components/layout/dashboard-shell";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardShell role="CLIENT">{children}</DashboardShell>;
}
