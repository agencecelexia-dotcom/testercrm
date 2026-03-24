"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Role } from "@/lib/constants";
import { NAV_ITEMS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  LayoutDashboard,
  Users,
  Handshake,
  Receipt,
  Settings,
  Phone,
  FileText,
  UserSearch,
  BarChart3,
  UserCog,
  Wallet,
  Plus,
  type LucideIcon,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Map icon name strings from constants to actual Lucide components
// ---------------------------------------------------------------------------
const ICON_MAP: Record<string, LucideIcon> = {
  LayoutDashboard,
  Users,
  Handshake,
  Receipt,
  Settings,
  Phone,
  FileText,
  UserSearch,
  BarChart3,
  UserCog,
  Wallet,
};

interface SidebarProps {
  role: Role;
}

export function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname();
  const items = NAV_ITEMS[role];

  return (
    <aside className="fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-[#434655]/15 bg-[#081325]">
      {/* Brand */}
      <div className="flex flex-col gap-0.5 px-6 py-6">
        <h1 className="text-2xl font-black tracking-tighter bg-gradient-to-r from-[#2563EB] to-[#03B5D3] bg-clip-text text-transparent font-headline">
          Celexia
        </h1>
        <span className="text-[11px] font-medium tracking-wider uppercase text-[#c3c6d7]">
          CRM B2B Premium
        </span>
      </div>

      <Separator />

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="flex flex-col gap-1">
          {items.map((item) => {
            const Icon = ICON_MAP[item.icon];
            const isActive =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href + "/"));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-[#202A3D] text-[#2563EB] border-r-2 border-[#2563EB]"
                    : "text-[#C3C6D7] hover:text-white hover:bg-[#111C2E]"
                )}
              >
                {Icon && <Icon className="h-5 w-5 shrink-0" />}
                {item.label}
              </Link>
            );
          })}
        </nav>
      </ScrollArea>

      {/* Bottom action */}
      <div className="p-4">
        <Button className="w-full gap-2" size="default">
          <Plus className="h-4 w-4" />
          Nouvelle Action
        </Button>
      </div>
    </aside>
  );
}
