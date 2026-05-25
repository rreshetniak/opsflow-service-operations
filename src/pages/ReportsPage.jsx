import { cn } from "../utils/styles";
import { AlertTriangle, CalendarClock, CheckCircle2, Gauge } from "lucide-react";
import BarChart from "../components/dashboard/BarChart";
import Card from "../components/ui/Card";
import PageHeader from "../components/ui/PageHeader";

function ReportsPage({ darkMode }) {
  return (
    <div>
      <PageHeader darkMode={darkMode} title="Reports" subtitle="Operational analytics for throughput, SLA compliance, technician workload and material utilization." />
      <div className="grid gap-6 xl:grid-cols-2">
        <Card darkMode={darkMode} className="p-5">
          <h3 className={cn("text-lg font-bold", darkMode ? "text-white" : "text-slate-950")}>Completed service orders</h3>
          <p className={cn("text-sm", darkMode ? "text-slate-400" : "text-slate-500")}>Weekly trend</p>
          <BarChart darkMode={darkMode} />
        </Card>
        <Card darkMode={darkMode} className="p-5">
          <h3 className={cn("text-lg font-bold", darkMode ? "text-white" : "text-slate-950")}>Risk indicators</h3>
          <div className="mt-5 space-y-4">
            {[
              [AlertTriangle, "7 overdue orders", "Immediate customer communication required", "red"],
              [CalendarClock, "12 due today", "Capacity review recommended", "amber"],
              [CheckCircle2, "94% SLA compliance", "Within operational target", "emerald"],
              [Gauge, "2.6 day average resolution", "Improved by 6%", "blue"],
            ].map(([Icon, title, text, color]) => (
              <div key={title} className={cn("flex items-center gap-3 rounded-2xl p-4 ring-1", darkMode ? "bg-white/5 ring-white/10" : "bg-slate-50 ring-slate-200")}>
                <div className={cn("flex h-10 w-10 items-center justify-center rounded-2xl", color === "red" ? "bg-red-500/15 text-red-500" : color === "amber" ? "bg-amber-500/15 text-amber-500" : color === "emerald" ? "bg-emerald-500/15 text-emerald-500" : "bg-blue-500/15 text-blue-500")}><Icon size={19} /></div>
                <div>
                  <p className={cn("font-bold", darkMode ? "text-white" : "text-slate-950")}>{title}</p>
                  <p className={cn("text-sm", darkMode ? "text-slate-400" : "text-slate-500")}>{text}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

export default ReportsPage;