import { cn } from "../../utils/styles";
import { Wrench } from "lucide-react";

function Logo({ darkMode }) {
  return (
    <div className="flex items-center gap-3">
      <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 via-blue-500 to-violet-600 shadow-lg shadow-indigo-900/20">
        <Wrench className="text-white" size={21} />
        <div className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-emerald-400 ring-2 ring-white/20" />
      </div>
      <div>
        <p
          className={cn(
            "text-xl font-bold tracking-tight",
            darkMode ? "text-white" : "text-slate-950",
          )}
        >
          OpsFlow
        </p>
        <p
          className={cn(
            "text-xs font-medium",
            darkMode ? "text-slate-400" : "text-slate-500",
          )}
        >
          Service Operations
        </p>
      </div>
    </div>
  );
}

export default Logo;
