import { useMemo, useState } from "react";
import { ArrowDownRight, ArrowUpRight, ChevronDown } from "lucide-react";

import Card from "../ui/Card";
import { cn } from "../../utils/styles";

const throughputData = {
  thisWeek: {
    label: "This week",
    subtitle: "Completed orders per weekday",
    total: 363,
    trend: 15,
    bars: [
      { label: "Mon", value: 40 },
      { label: "Tue", value: 58 },
      { label: "Wed", value: 72 },
      { label: "Thu", value: 90 },
      { label: "Fri", value: 52 },
      { label: "Sat", value: 24 },
      { label: "Sun", value: 14 },
    ],
  },

  lastWeek: {
    label: "Last week",
    subtitle: "Completed orders per weekday",
    total: 316,
    trend: -4,
    bars: [
      { label: "Mon", value: 36 },
      { label: "Tue", value: 48 },
      { label: "Wed", value: 62 },
      { label: "Thu", value: 75 },
      { label: "Fri", value: 51 },
      { label: "Sat", value: 27 },
      { label: "Sun", value: 17 },
    ],
  },

  thisMonth: {
    label: "This month",
    subtitle: "Completed orders by week",
    total: 1428,
    trend: 11,
    bars: [
      { label: "W1", value: 318 },
      { label: "W2", value: 376 },
      { label: "W3", value: 342 },
      { label: "W4", value: 392 },
    ],
  },
};

function WeeklyThroughputCard({ darkMode }) {
  const [period, setPeriod] = useState("thisWeek");

  const selectedData = throughputData[period];

  const maxValue = useMemo(() => {
    return Math.max(...selectedData.bars.map((bar) => bar.value));
  }, [selectedData]);

  const averageCompleted = Math.round(selectedData.total / selectedData.bars.length);

  const peakBar = selectedData.bars.reduce((max, bar) =>
    bar.value > max.value ? bar : max,
  );

  const trendPositive = selectedData.trend >= 0;

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
            Weekly throughput
          </h3>

          <p
            className={cn(
              "text-sm",
              darkMode ? "text-slate-400" : "text-slate-500",
            )}
          >
            {selectedData.subtitle}
          </p>
        </div>

        <label className="relative">
          <select
            value={period}
            onChange={(event) => setPeriod(event.target.value)}
            className={cn(
              "h-10 appearance-none rounded-2xl px-4 pr-9 text-sm font-bold outline-none ring-1 transition",
              darkMode
                ? "bg-[#111827] text-white ring-white/10 hover:bg-white/10"
                : "bg-white text-slate-900 ring-slate-200 hover:bg-slate-50",
            )}
          >
            {Object.entries(throughputData).map(([key, value]) => (
              <option
                key={key}
                value={key}
                className={
                  darkMode ? "bg-[#111827] text-white" : "bg-white text-slate-900"
                }
              >
                {value.label}
              </option>
            ))}
          </select>

          <ChevronDown
            size={15}
            className={cn(
              "pointer-events-none absolute right-3 top-1/2 -translate-y-1/2",
              darkMode ? "text-slate-500" : "text-slate-400",
            )}
          />
        </label>
      </div>

      <div
        className={cn(
          "mt-5 grid h-40 items-end gap-3 border-b pb-3",
          selectedData.bars.length === 4 ? "grid-cols-4" : "grid-cols-7",
          darkMode ? "border-white/10" : "border-slate-200",
        )}
      >
        {selectedData.bars.map((bar) => {
          const height = Math.max(14, Math.round((bar.value / maxValue) * 100));

          return (
            <div
              key={bar.label}
              className="flex h-full flex-col items-center justify-end gap-2"
            >
              <div className="flex w-full flex-1 items-end">
                <div
                  className="w-full rounded-t-xl bg-gradient-to-t from-indigo-600 to-blue-400 shadow-lg shadow-indigo-900/20 transition-all duration-300"
                  style={{ height: `${height}%` }}
                  title={`${bar.label}: ${bar.value} completed orders`}
                />
              </div>

              <span
                className={cn(
                  "text-xs",
                  darkMode ? "text-slate-500" : "text-slate-400",
                )}
              >
                {bar.label}
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <div
          className={cn(
            "rounded-2xl p-4 ring-1",
            darkMode ? "bg-white/5 ring-white/10" : "bg-slate-50 ring-slate-200",
          )}
        >
          <p
            className={cn(
              "text-xs font-bold uppercase tracking-wide",
              darkMode ? "text-slate-500" : "text-slate-400",
            )}
          >
            Total completed
          </p>

          <p
            className={cn(
              "mt-2 text-3xl font-bold tracking-tight",
              darkMode ? "text-white" : "text-slate-950",
            )}
          >
            {selectedData.total}
          </p>

          <p
            className={cn(
              "mt-2 inline-flex items-center gap-1 text-sm font-bold",
              trendPositive ? "text-emerald-500" : "text-red-500",
            )}
          >
            {trendPositive ? (
              <ArrowUpRight size={16} />
            ) : (
              <ArrowDownRight size={16} />
            )}
            {Math.abs(selectedData.trend)}% vs last period
          </p>
        </div>

        <div
          className={cn(
            "rounded-2xl p-4 ring-1",
            darkMode ? "bg-white/5 ring-white/10" : "bg-slate-50 ring-slate-200",
          )}
        >
          <p
            className={cn(
              "text-xs font-bold uppercase tracking-wide",
              darkMode ? "text-slate-500" : "text-slate-400",
            )}
          >
            Avg. completed
          </p>

          <p
            className={cn(
              "mt-2 text-3xl font-bold tracking-tight",
              darkMode ? "text-white" : "text-slate-950",
            )}
          >
            {averageCompleted}
          </p>

          <p
            className={cn(
              "mt-2 text-sm font-semibold",
              darkMode ? "text-slate-400" : "text-slate-500",
            )}
          >
            per {period === "thisMonth" ? "week" : "day"}
          </p>
        </div>

        <div
          className={cn(
            "rounded-2xl p-4 ring-1 sm:col-span-2",
            darkMode ? "bg-white/5 ring-white/10" : "bg-slate-50 ring-slate-200",
          )}
        >
          <p
            className={cn(
              "text-xs font-bold uppercase tracking-wide",
              darkMode ? "text-slate-500" : "text-slate-400",
            )}
          >
            Peak throughput
          </p>

          <div className="mt-2 flex items-end justify-between gap-4">
            <p
              className={cn(
                "text-3xl font-bold tracking-tight",
                darkMode ? "text-white" : "text-slate-950",
              )}
            >
              {peakBar.value}
            </p>

            <p
              className={cn(
                "text-sm font-semibold",
                darkMode ? "text-slate-400" : "text-slate-500",
              )}
            >
              highest on {peakBar.label}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default WeeklyThroughputCard;