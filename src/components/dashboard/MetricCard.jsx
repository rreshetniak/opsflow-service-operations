import Sparkline from "./Sparkline";
import { cn } from "../../utils/styles";

export function MetricCard({
  icon: Icon,
  label,
  value,
  change,
  trend = "up",
  darkMode,
  accent = "indigo",
}) {
  const accentMap = {
    indigo: darkMode
      ? "bg-indigo-500/15 text-indigo-200"
      : "bg-indigo-50 text-indigo-700",

    violet: darkMode
      ? "bg-violet-500/15 text-violet-200"
      : "bg-violet-50 text-violet-700",

    blue: darkMode
      ? "bg-blue-500/15 text-blue-200"
      : "bg-blue-50 text-blue-700",

    emerald: darkMode
      ? "bg-emerald-500/15 text-emerald-200"
      : "bg-emerald-50 text-emerald-700",
  };

  return (
    <div
      className={cn(
        "rounded-3xl p-5 shadow-sm ring-1 transition hover:-translate-y-1",
        darkMode ? "bg-white/[0.055] ring-white/10" : "bg-white ring-slate-200"
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div
          className={cn(
            "flex h-12 w-12 items-center justify-center rounded-2xl",
            accentMap[accent]
          )}
        >
          <Icon size={21} />
        </div>

        <Sparkline darkMode={darkMode} accent={accent} />
      </div>

      <p
        className={cn(
          "mt-4 text-sm font-medium",
          darkMode ? "text-slate-400" : "text-slate-500"
        )}
      >
        {label}
      </p>

      <p
        className={cn(
          "mt-1 text-3xl font-bold tracking-tight",
          darkMode ? "text-white" : "text-slate-950"
        )}
      >
        {value}
      </p>

      <p className="mt-4 flex items-center gap-1 text-sm font-semibold text-emerald-500">
        {trend === "up" ? "↑" : "↓"} {change}
        <span
          className={cn(
            "font-medium",
            darkMode ? "text-slate-500" : "text-slate-400"
          )}
        >
          vs last 7 days
        </span>
      </p>
    </div>
  );
}

export default MetricCard;