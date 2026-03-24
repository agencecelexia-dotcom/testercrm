import { DashboardShell } from "@/components/layout/dashboard-shell";

export default function CloserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardShell role="CLOSER">{children}</DashboardShell>;
}
