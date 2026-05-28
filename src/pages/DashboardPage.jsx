import { Link } from "react-router";
import {
  AlertTriangle,
  ClipboardList,
  Filter,
  PackageCheck,
  Plus,
  ShieldCheck,
} from "lucide-react";

import ActivityFeed from "../components/dashboard/ActivityFeed";
import MetricCard from "../components/dashboard/MetricCard";
import WeeklyThroughputCard from "../components/dashboard/WeeklyThroughputCard";
import OrdersTable from "../components/orders/OrdersTable";
import PageHeader from "../components/ui/PageHeader";
import { formatCurrency } from "../utils/format";
import { cn } from "../utils/styles";

function calculateDashboardMetrics(orders) {
  const totalOrders = orders.length;
  const openOrders = orders.filter((order) => order.status !== "Completed");

  const activeWorkValue = openOrders.reduce(
    (sum, order) => sum + Number(order.value || 0),
    0,
  );

  const criticalOrders = openOrders.filter(
    (order) => order.priority === "Critical",
  ).length;

  const overdueOrders = orders.filter(
    (order) => order.dueHint === "Overdue",
  ).length;

  const slaCompliance =
    totalOrders === 0
      ? 100
      : Math.round(((totalOrders - overdueOrders) / totalOrders) * 1000) / 10;

  return {
    openOrdersCount: openOrders.length,
    activeWorkValue,
    criticalOrders,
    slaCompliance,
  };
}

function DashboardPage({
  darkMode,
  orders,
  setCreateOpen,
  onUpdateStatus,
  onViewOrder,
  onDeleteOrder,
  onViewActivity,
}) {
  const metrics = calculateDashboardMetrics(orders);

  return (
    <div>
      <PageHeader
        darkMode={darkMode}
        title="Service operations dashboard"
        subtitle="Overview of work orders, approvals, material usage, and SLA risks across your service organization."
        actions={
          <div className="flex flex-wrap gap-2">
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
              type="button"
              onClick={() => setCreateOpen(true)}
              className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-900/20 transition hover:from-indigo-500 hover:to-violet-500"
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
          value={metrics.openOrdersCount}
          change="live"
          darkMode={darkMode}
          accent="indigo"
        />

        <MetricCard
          icon={PackageCheck}
          label="Active Work Value"
          value={formatCurrency(metrics.activeWorkValue)}
          change="live"
          darkMode={darkMode}
          accent="violet"
        />

        <MetricCard
          icon={AlertTriangle}
          label="Critical Orders"
          value={metrics.criticalOrders}
          change="live"
          darkMode={darkMode}
          accent="blue"
        />

        <MetricCard
          icon={ShieldCheck}
          label="SLA Compliance"
          value={`${metrics.slaCompliance}%`}
          change="live"
          darkMode={darkMode}
          accent="emerald"
        />
      </div>

      <div className="mt-6 grid gap-6 min-[1800px]:grid-cols-[1fr_380px]">
        <OrdersTable
          orders={orders.slice(0, 5)}
          darkMode={darkMode}
          onUpdateStatus={onUpdateStatus}
          onViewOrder={onViewOrder}
          onDeleteOrder={onDeleteOrder}
        />

        <div className="grid gap-6 xl:grid-cols-2 min-[1800px]:block min-[1800px]:space-y-6">
          <WeeklyThroughputCard darkMode={darkMode} />

          <ActivityFeed darkMode={darkMode} onViewAll={onViewActivity} />
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;