import { useMemo, useState } from "react";
import { Download, Plus, RotateCcw, SlidersHorizontal } from "lucide-react";

import OrdersTable from "../components/orders/OrdersTable";
import PageHeader from "../components/ui/PageHeader";
import { cn } from "../utils/styles";

const STATUS_FILTERS = [
  "All",
  "Assigned",
  "In Progress",
  "Waiting Parts",
  "Approval",
  "Completed",
];

const PRIORITY_FILTERS = ["All", "Critical", "High", "Medium", "Low"];

function escapeCsvValue(value) {
  const stringValue = String(value ?? "");
  return `"${stringValue.replaceAll('"', '""')}"`;
}

function buildOrdersCsv(orders) {
  const headers = [
    "Order ID",
    "Customer",
    "Location",
    "Asset",
    "Status",
    "Priority",
    "Owner",
    "Due",
    "Due Hint",
    "Value",
  ];

  const rows = orders.map((order) => [
    order.id,
    order.customer,
    order.location,
    order.asset,
    order.status,
    order.priority,
    order.owner,
    order.due,
    order.dueHint,
    order.value,
  ]);

  return [headers, ...rows]
    .map((row) => row.map(escapeCsvValue).join(","))
    .join("\n");
}

function OrdersPage({
  darkMode,
  orders,
  setCreateOpen,
  onUpdateStatus,
  onViewOrder,
}) {
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesStatus =
        statusFilter === "All" || order.status === statusFilter;

      const matchesPriority =
        priorityFilter === "All" || order.priority === priorityFilter;

      return matchesStatus && matchesPriority;
    });
  }, [orders, statusFilter, priorityFilter]);

  const hasActiveFilters = statusFilter !== "All" || priorityFilter !== "All";

  function resetFilters() {
    setStatusFilter("All");
    setPriorityFilter("All");
  }

  function handleExportCsv() {
    if (filteredOrders.length === 0) {
      return;
    }

    const csv = buildOrdersCsv(filteredOrders);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "opsflow-service-orders.csv";
    link.click();

    URL.revokeObjectURL(url);
  }

  return (
    <div>
      <PageHeader
        darkMode={darkMode}
        title="Service orders"
        subtitle="Manage service work, assignments, parts, approvals, SLA risk and customer communication from a single operational queue."
        actions={
          <div className="flex flex-wrap gap-2">
            <button
              onClick={handleExportCsv}
              disabled={filteredOrders.length === 0}
              className={cn(
                "inline-flex items-center gap-2 rounded-2xl px-4 py-3 text-sm font-bold ring-1 transition disabled:cursor-not-allowed disabled:opacity-50",
                darkMode
                  ? "bg-white/5 text-slate-200 ring-white/10 hover:bg-white/10"
                  : "bg-white text-slate-700 ring-slate-200 hover:bg-slate-50"
              )}
            >
              <Download size={17} /> Export CSV
            </button>

            <button
              onClick={() => setCreateOpen(true)}
              className="inline-flex items-center gap-2 rounded-2xl bg-indigo-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-indigo-500"
            >
              <Plus size={17} /> New order
            </button>
          </div>
        }
      />

      <div
        className={cn(
          "mb-6 rounded-3xl p-5 shadow-sm ring-1",
          darkMode ? "bg-white/[0.055] ring-white/10" : "bg-white ring-slate-200"
        )}
      >
        <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <SlidersHorizontal
                size={18}
                className={darkMode ? "text-indigo-300" : "text-indigo-600"}
              />
              <h2
                className={cn(
                  "font-bold",
                  darkMode ? "text-white" : "text-slate-950"
                )}
              >
                Order filters
              </h2>
            </div>

            <p
              className={cn(
                "mt-1 text-sm",
                darkMode ? "text-slate-400" : "text-slate-500"
              )}
            >
              Showing {filteredOrders.length} of {orders.length} service orders.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <label className="block">
              <span
                className={cn(
                  "text-xs font-bold uppercase tracking-wide",
                  darkMode ? "text-slate-500" : "text-slate-400"
                )}
              >
                Status
              </span>

              <select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
                className={cn(
                  "mt-2 h-11 w-full rounded-2xl px-3 text-sm font-semibold outline-none ring-1 transition",
                  darkMode
                    ? "bg-[#111827] text-white ring-white/10 focus:ring-indigo-400/50"
                    : "bg-slate-50 text-slate-950 ring-slate-200 focus:ring-indigo-500/30"
                )}
              >
                {STATUS_FILTERS.map((status) => (
                  <option key={status}>{status}</option>
                ))}
              </select>
            </label>

            <label className="block">
              <span
                className={cn(
                  "text-xs font-bold uppercase tracking-wide",
                  darkMode ? "text-slate-500" : "text-slate-400"
                )}
              >
                Priority
              </span>

              <select
                value={priorityFilter}
                onChange={(event) => setPriorityFilter(event.target.value)}
                className={cn(
                  "mt-2 h-11 w-full rounded-2xl px-3 text-sm font-semibold outline-none ring-1 transition",
                  darkMode
                    ? "bg-[#111827] text-white ring-white/10 focus:ring-indigo-400/50"
                    : "bg-slate-50 text-slate-950 ring-slate-200 focus:ring-indigo-500/30"
                )}
              >
                {PRIORITY_FILTERS.map((priority) => (
                  <option key={priority}>{priority}</option>
                ))}
              </select>
            </label>

            <button
              onClick={resetFilters}
              disabled={!hasActiveFilters}
              className={cn(
                "mt-5 inline-flex h-11 items-center justify-center gap-2 rounded-2xl px-4 text-sm font-bold ring-1 transition disabled:cursor-not-allowed disabled:opacity-50 sm:mt-6",
                darkMode
                  ? "bg-white/5 text-slate-200 ring-white/10 hover:bg-white/10"
                  : "bg-white text-slate-700 ring-slate-200 hover:bg-slate-50"
              )}
            >
              <RotateCcw size={16} /> Reset
            </button>
          </div>
        </div>
      </div>

      <OrdersTable
        orders={filteredOrders}
        darkMode={darkMode}
        compact
        onUpdateStatus={onUpdateStatus}
        onViewOrder={onViewOrder}
      />
    </div>
  );
}

export default OrdersPage;
