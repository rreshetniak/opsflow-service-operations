import { cn } from "../../utils/styles";
import { activities } from "../../data/mockData";
import Card from "../ui/Card";
import {
  Boxes,
  CheckCircle2,
  UserRound,
  AlertTriangle,
  ChevronRight,
} from "lucide-react";

function ActivityFeed({ darkMode, onViewAll }) {
  const styleMap = {
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
  const iconMap = {
    part: Boxes,
    status: CheckCircle2,
    order: UserRound,
    risk: AlertTriangle,
  };

  return (
    <Card darkMode={darkMode} className="p-5">
      <div className="mb-5 flex items-center justify-between">
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
          className="text-sm font-bold text-indigo-500"
        >
          View all
        </button>
      </div>
      <div className="space-y-4">
        {activities.map((item) => {
          const Icon = iconMap[item.type];
          return (
            <div
              key={item.title}
              className={cn(
                "flex gap-3 border-b pb-4 last:border-0 last:pb-0",
                darkMode ? "border-white/10" : "border-slate-100",
              )}
            >
              <div
                className={cn(
                  "flex h-10 w-10 flex-none items-center justify-center rounded-2xl",
                  styleMap[item.type],
                )}
              >
                <Icon size={18} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <p
                    className={cn(
                      "text-sm font-bold",
                      darkMode ? "text-slate-100" : "text-slate-900",
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
          "mt-5 flex w-full items-center justify-between rounded-2xl px-4 py-3 text-sm font-bold ring-1",
          darkMode
            ? "bg-white/5 text-indigo-300 ring-white/10"
            : "bg-slate-50 text-indigo-600 ring-slate-200",
        )}
      >
        View all activity <ChevronRight size={16} />
      </button>
    </Card>
  );
}

export default ActivityFeed;
