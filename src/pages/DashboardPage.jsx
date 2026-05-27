import { cn } from "../utils/styles";
import { formatCurrency } from "../utils/format";
import PageHeader from "../components/ui/PageHeader";
import Card from "../components/ui/Card";
import MetricCard from "../components/dashboard/MetricCard";
import ActivityFeed from "../components/dashboard/ActivityFeed";
import OrdersTable from "../components/orders/OrdersTable";
import BarChart from "../components/dashboard/BarChart";
import {
  Filter,
  Plus,
  ClipboardList,
  PackageCheck,
  Clock3,
  ShieldCheck,
  ChevronDown,
} from "lucide-react";
import { Link } from "react-router";

function DashboardPage({
  darkMode,
  orders,
  setCreateOpen,
  onUpdateStatus,
  onViewOrder,
  onDeleteOrder,
  onViewActivity,
}) {
  const totalValue = orders.reduce((sum, order) => sum + order.value, 0);
  const openOrders = orders.filter(
    (order) => order.status !== "Completed",
  ).length;

  return (
    <div>
      <PageHeader
        darkMode={darkMode}
        title="Service operations dashboard"
        subtitle="Overview of work orders, approvals, material usage, and SLA risks across your service organization."
        actions={
          <div className="flex gap-2">
            <Link
              to="/orders"
              className={cn(
                "inline-flex items-center gap-2 rounded-2xl px-4 py-3 text-sm font-bold ring-1",
                darkMode
                  ? "bg-white/5 text-slate-200 ring-white/10 hover:bg-white/10"
                  : "bg-white text-slate-700 ring-slate-200 hover:bg-slate-50",
              )}
            >
              <Filter size={17} /> Filter
            </Link>

            <button
              onClick={() => setCreateOpen(true)}
              className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-900/20 hover:from-indigo-500 hover:to-violet-500"
            >
              <Plus size={17} /> Create order
            </button>
          </div>
        }
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          icon={ClipboardList}
          label="Open Orders"
          value={openOrders}
          change="12%"
          darkMode={darkMode}
          accent="indigo"
        />
        <MetricCard
          icon={PackageCheck}
          label="Parts Reserved"
          value={formatCurrency(totalValue)}
          change="8%"
          darkMode={darkMode}
          accent="violet"
        />
        <MetricCard
          icon={Clock3}
          label="Avg. Resolution"
          value="2.6 days"
          change="6%"
          trend="down"
          darkMode={darkMode}
          accent="blue"
        />
        <MetricCard
          icon={ShieldCheck}
          label="SLA Compliance"
          value="92.4%"
          change="4%"
          darkMode={darkMode}
          accent="emerald"
        />
      </div>

      <div className="mt-6 grid gap-6 2xl:grid-cols-[1fr_380px]">
        <OrdersTable
          orders={orders.slice(0, 5)}
          darkMode={darkMode}
          onUpdateStatus={onUpdateStatus}
          onViewOrder={onViewOrder}
          onDeleteOrder={onDeleteOrder}
        />
        <div className="space-y-6">
          <Card darkMode={darkMode} className="p-5">
            <div className="flex items-center justify-between">
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
                  Completed orders per weekday
                </p>
              </div>
              <button
                className={cn(
                  "inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-bold ring-1",
                  darkMode
                    ? "bg-white/5 ring-white/10"
                    : "bg-white ring-slate-200",
                )}
              >
                This week <ChevronDown size={15} />
              </button>
            </div>
            <BarChart darkMode={darkMode} />
          </Card>
          <ActivityFeed darkMode={darkMode} onViewAll={onViewActivity} />
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
