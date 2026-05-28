import {
  AlertTriangle,
  Boxes,
  CheckCircle2,
  ChevronRight,
  UserRound,
} from "lucide-react";

import Card from "../ui/Card";
import { activities } from "../../data/mockData";
import { cn } from "../../utils/styles";

const activityIconMap = {
  part: Boxes,
  status: CheckCircle2,
  order: UserRound,
  risk: AlertTriangle,
};

function getActivityIconStyle(type, darkMode) {
  const styles = {
    part: darkMode
      ? "bg-violet-500/15 text-violet-200"
      : "bg-violet-50 text-violet-700",

    status: darkMode
      ? "bg-emerald-500/15 text-emerald-200"
      : "bg-emerald-50 text-emerald-700",

    order: darkMode
      ? "bg-blue-500/15 text-blue-200"
      : "bg-blue-50 text-blue-700",

    risk: darkMode
      ? "bg-amber-500/15 text-amber-200"
      : "bg-amber-50 text-amber-700",
  };

  return styles[type] || styles.order;
}

function ActivityFeed({ darkMode, onViewAll }) {
  const visibleActivities = activities.slice(0, 5);

  const riskCount = activities.filter((activity) => activity.type === "risk").length;
  const statusUpdates = activities.filter(
    (activity) => activity.type === "status",
  ).length;

  return (
    <Card darkMode={darkMode} className="p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3
            className={cn(
              "text-lg font-bold",
              darkMode ? "text-white" : "text-slate-950",
            )}
          >
            Live Activity
          </h3>

          <p
            className={cn(
              "text-sm",
              darkMode ? "text-slate-400" : "text-slate-500",
            )}
          >
            Latest operational events
          </p>
        </div>

        <button
          type="button"
          onClick={onViewAll}
          className="text-sm font-bold text-indigo-500 transition hover:text-indigo-400"
        >
          View all
        </button>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <div
          className={cn(
            "rounded-2xl p-3 ring-1",
            darkMode ? "bg-white/5 ring-white/10" : "bg-slate-50 ring-slate-200",
          )}
        >
          <p
            className={cn(
              "text-xs font-bold uppercase tracking-wide",
              darkMode ? "text-slate-500" : "text-slate-400",
            )}
          >
            Events
          </p>
          <p className="mt-1 text-2xl font-bold">{activities.length}</p>
        </div>

        <div
          className={cn(
            "rounded-2xl p-3 ring-1",
            darkMode ? "bg-white/5 ring-white/10" : "bg-slate-50 ring-slate-200",
          )}
        >
          <p
            className={cn(
              "text-xs font-bold uppercase tracking-wide",
              darkMode ? "text-slate-500" : "text-slate-400",
            )}
          >
            Risks
          </p>
          <p className="mt-1 text-2xl font-bold text-amber-500">{riskCount}</p>
        </div>

        <div
          className={cn(
            "rounded-2xl p-3 ring-1",
            darkMode ? "bg-white/5 ring-white/10" : "bg-slate-50 ring-slate-200",
          )}
        >
          <p
            className={cn(
              "text-xs font-bold uppercase tracking-wide",
              darkMode ? "text-slate-500" : "text-slate-400",
            )}
          >
            Updates
          </p>
          <p className="mt-1 text-2xl font-bold text-emerald-500">
            {statusUpdates}
          </p>
        </div>
      </div>

      <div className="mt-5 divide-y divide-slate-100 dark:divide-white/10">
        {visibleActivities.map((item) => {
          const Icon = activityIconMap[item.type] || UserRound;

          return (
            <div
              key={`${item.title}-${item.time}`}
              className={cn(
                "flex gap-4 py-4 first:pt-0 last:pb-0",
                darkMode ? "border-white/10" : "border-slate-100",
              )}
            >
              <div
                className={cn(
                  "flex h-10 w-10 flex-none items-center justify-center rounded-2xl",
                  getActivityIconStyle(item.type, darkMode),
                )}
              >
                <Icon size={18} />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-4">
                  <p
                    className={cn(
                      "font-bold",
                      darkMode ? "text-white" : "text-slate-950",
                    )}
                  >
                    {item.title}
                  </p>

                  <span
                    className={cn(
                      "flex-none text-xs",
                      darkMode ? "text-slate-500" : "text-slate-400",
                    )}
                  >
                    {item.time}
                  </span>
                </div>

                <p
                  className={cn(
                    "mt-1 text-sm",
                    darkMode ? "text-slate-400" : "text-slate-500",
                  )}
                >
                  {item.subtitle}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <button
        type="button"
        onClick={onViewAll}
        className={cn(
          "mt-5 flex w-full items-center justify-between rounded-2xl px-4 py-3 text-sm font-bold ring-1 transition",
          darkMode
            ? "bg-white/5 text-indigo-300 ring-white/10 hover:bg-white/10"
            : "bg-slate-50 text-indigo-600 ring-slate-200 hover:bg-slate-100",
        )}
      >
        View all activity <ChevronRight size={16} />
      </button>
    </Card>
  );
}

export default ActivityFeed;