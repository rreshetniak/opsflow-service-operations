import { cn } from "../../utils/styles";
import { Sparkles } from "lucide-react";

function PageHeader({ darkMode, title, subtitle, actions }) {
  return (
    <div className="mb-7 flex flex-col justify-between gap-4 xl:flex-row xl:items-end">
      <div>
        <div
          className={cn(
            "mb-3 inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-bold ring-1",
            darkMode
              ? "bg-indigo-500/10 text-indigo-200 ring-indigo-400/20"
              : "bg-indigo-50 text-indigo-700 ring-indigo-200",
          )}
        >
          <Sparkles size={15} /> SaaS-ready operations platform
        </div>
        <h1
          className={cn(
            "text-3xl font-bold tracking-tight lg:text-4xl",
            darkMode ? "text-white" : "text-slate-950",
          )}
        >
          {title}
        </h1>
        <p
          className={cn(
            "mt-2 max-w-3xl text-base",
            darkMode ? "text-slate-400" : "text-slate-500",
          )}
        >
          {subtitle}
        </p>
      </div>
      {actions}
    </div>
  );
}

export default PageHeader;
