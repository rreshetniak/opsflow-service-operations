import {
  AlertTriangle,
  Boxes,
  CheckCircle2,
  ClipboardList,
  UserRound,
  X,
} from "lucide-react";

import { activities } from "../../data/mockData";
import { cn } from "../../utils/styles";

const activityIconMap = {
  part: Boxes,
  status: CheckCircle2,
  order: UserRound,
  risk: AlertTriangle,
};

function ActivityDrawer({ open, onClose, darkMode }) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[90]">
      <button
        type="button"
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Close activity drawer"
      />

      <aside
        className={cn(
          "absolute right-0 top-0 flex h-full w-full max-w-xl flex-col border-l shadow-2xl",
          darkMode
            ? "border-white/10 bg-[#0d1424] text-white"
            : "border-slate-200 bg-white text-slate-950"
        )}
      >
        <div
          className={cn(
            "flex items-start justify-between gap-4 border-b p-6",
            darkMode ? "border-white/10" : "border-slate-200"
          )}
        >
          <div>
            <p
              className={cn(
                "text-sm font-semibold",
                darkMode ? "text-slate-400" : "text-slate-500"
              )}
            >
              Operations
            </p>
            <h2 className="mt-1 text-3xl font-bold tracking-tight">
              Activity timeline
            </h2>
            <p
              className={cn(
                "mt-2 text-sm",
                darkMode ? "text-slate-400" : "text-slate-500"
              )}
            >
              Recent operational updates, workflow changes and service order
              events.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className={cn(
              "rounded-2xl p-2 transition",
              darkMode ? "hover:bg-white/10" : "hover:bg-slate-100"
            )}
            aria-label="Close drawer"
          >
            <X size={22} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-4">
            {activities.map((item) => {
              const Icon = activityIconMap[item.type] ?? ClipboardList;

              return (
                <div
                  key={`${item.title}-${item.time}`}
                  className={cn(
                    "rounded-3xl p-5 ring-1",
                    darkMode
                      ? "bg-white/5 ring-white/10"
                      : "bg-slate-50 ring-slate-200"
                  )}
                >
                  <div className="flex gap-4">
                    <div
                      className={cn(
                        "flex h-11 w-11 flex-none items-center justify-center rounded-2xl",
                        item.type === "risk"
                          ? "bg-amber-500/15 text-amber-500"
                          : item.type === "status"
                            ? "bg-emerald-500/15 text-emerald-500"
                            : item.type === "order"
                              ? "bg-blue-500/15 text-blue-500"
                              : "bg-violet-500/15 text-violet-500"
                      )}
                    >
                      <Icon size={19} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-4">
                        <h3
                          className={cn(
                            "font-bold",
                            darkMode ? "text-white" : "text-slate-950"
                          )}
                        >
                          {item.title}
                        </h3>
                        <span
                          className={cn(
                            "text-xs font-semibold",
                            darkMode ? "text-slate-500" : "text-slate-400"
                          )}
                        >
                          {item.time}
                        </span>
                      </div>

                      <p
                        className={cn(
                          "mt-1 text-sm",
                          darkMode ? "text-slate-400" : "text-slate-500"
                        )}
                      >
                        {item.subtitle}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </aside>
    </div>
  );
}

export default ActivityDrawer;