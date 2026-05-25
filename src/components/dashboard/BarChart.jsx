import { cn } from "../../utils/styles";
import { motion } from "framer-motion";

function BarChart({ darkMode }) {
  const bars = [40, 58, 72, 90, 52, 24, 14];
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return (
    <div className="mt-5">
      <div
        className={cn(
          "grid h-44 grid-cols-7 items-end gap-3 border-b pb-3",
          darkMode ? "border-white/10" : "border-slate-200",
        )}
      >
        {bars.map((height, index) => (
          <div
            key={days[index]}
            className="flex h-full flex-col items-center justify-end gap-2"
          >
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: `${height}%` }}
              transition={{ duration: 0.45, delay: index * 0.04 }}
              className="w-full rounded-t-xl bg-gradient-to-t from-indigo-600 to-blue-400 shadow-lg shadow-indigo-900/20"
            />
            <span
              className={cn(
                "text-xs",
                darkMode ? "text-slate-500" : "text-slate-400",
              )}
            >
              {days[index]}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div>
          <p
            className={cn(
              "text-sm",
              darkMode ? "text-slate-400" : "text-slate-500",
            )}
          >
            Total completed
          </p>
          <p
            className={cn(
              "mt-1 text-3xl font-bold",
              darkMode ? "text-white" : "text-slate-950",
            )}
          >
            363
          </p>
        </div>
        <p className="text-sm font-semibold text-emerald-500">
          ↑ 15% vs last week
        </p>
      </div>
    </div>
  );
}

export default BarChart;
