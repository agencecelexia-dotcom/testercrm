import * as React from "react";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";

export interface KpiCardProps {
  title: string;
  value: string;
  trend: number;
  trendUp: boolean;
  icon: React.ReactNode;
  className?: string;
}

export function KpiCard({
  title,
  value,
  trend,
  trendUp,
  icon,
  className,
}: KpiCardProps) {
  return (
    <div
      className={cn(
        "group rounded-xl bg-[#202a3d]/60 backdrop-blur-xl border border-[#434655]/10 p-6 shadow-lg transition-transform duration-200 hover:scale-[1.02]",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-[#c3c6d7]">{title}</p>
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#152032] text-[#2563eb]">
          {icon}
        </div>
      </div>

      <div className="mt-3">
        <p className="text-2xl font-bold text-white font-[family-name:var(--font-jetbrains-mono)]">
          {value}
        </p>
      </div>

      <div className="mt-2 flex items-center gap-1.5">
        {trendUp ? (
          <TrendingUp className="h-4 w-4 text-emerald-400" />
        ) : (
          <TrendingDown className="h-4 w-4 text-red-400" />
        )}
        <span
          className={cn(
            "text-sm font-medium",
            trendUp
              ? "bg-gradient-to-r from-emerald-400 to-[#03b5d3] bg-clip-text text-transparent"
              : "text-red-400"
          )}
        >
          {trendUp ? "+" : ""}
          {trend}%
        </span>
        <span className="text-xs text-[#c3c6d7]">vs mois dernier</span>
      </div>
    </div>
  );
}
