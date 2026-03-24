"use client";

import { Bell, Search } from "lucide-react";
import { useSession } from "next-auth/react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

function getInitials(name?: string | null): string {
  if (!name) return "U";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

const ROLE_LABELS: Record<string, string> = {
  AGENCE: "Agence",
  CLIENT: "Client",
  CLOSER: "Closer",
};

export function Header() {
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-[#434655]/15 bg-[#081325]/80 backdrop-blur-xl px-6">
      {/* Search */}
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#c3c6d7]/50" />
        <Input
          placeholder="Rechercher..."
          className="pl-9 bg-[#111c2e] border-[#434655]/15"
        />
      </div>

      <div className="ml-auto flex items-center gap-4">
        {/* Notification bell */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5 text-[#c3c6d7]" />
          <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#2563eb] text-[10px] font-bold text-white">
            3
          </span>
        </Button>

        {/* User */}
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user?.image ?? undefined} alt={user?.name ?? "User"} />
            <AvatarFallback className="text-xs">
              {getInitials(user?.name)}
            </AvatarFallback>
          </Avatar>
          <div className="hidden flex-col md:flex">
            <span className="text-sm font-medium text-white leading-tight">
              {user?.name ?? "Utilisateur"}
            </span>
            <span className="text-xs text-[#c3c6d7]">
              {user?.role ? ROLE_LABELS[user.role] ?? user.role : ""}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
