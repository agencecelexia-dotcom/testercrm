"use client";

// Demo mode — no auth provider needed
export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
