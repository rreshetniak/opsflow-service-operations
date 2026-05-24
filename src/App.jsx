import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  AlertTriangle,
  ArrowUpRight,
  BarChart3,
  Bell,
  Boxes,
  Building2,
  CalendarClock,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  Clock3,
  Download,
  Filter,
  Gauge,
  Home,
  LayoutDashboard,
  Menu,
  Moon,
  MoreHorizontal,
  PackageCheck,
  Plus,
  Search,
  Settings,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Sun,
  UserRound,
  Users,
  Wrench,
  X,
} from "lucide-react";

import { 
  initialOrders,
  inventory,
  customers,
  activities,
  navItems,
  } from "./data/mockData";

import { formatCurrency } from "./utils/format";
//import { cn, statusStyles, priorityStyles } from "./utils/styles";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

// function formatCurrency(value) {
//   return new Intl.NumberFormat("en-US", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(value);
// }

function statusStyles(status, darkMode) {
  const map = {
    "In Progress": darkMode ? "bg-blue-500/15 text-blue-200 ring-blue-400/20" : "bg-blue-50 text-blue-700 ring-blue-600/10",
    "Waiting Parts": darkMode ? "bg-amber-500/15 text-amber-200 ring-amber-400/20" : "bg-amber-50 text-amber-700 ring-amber-600/10",
    Approval: darkMode ? "bg-violet-500/15 text-violet-200 ring-violet-400/20" : "bg-violet-50 text-violet-700 ring-violet-600/10",
    Assigned: darkMode ? "bg-teal-500/15 text-teal-200 ring-teal-400/20" : "bg-teal-50 text-teal-700 ring-teal-600/10",
    Completed: darkMode ? "bg-emerald-500/15 text-emerald-200 ring-emerald-400/20" : "bg-emerald-50 text-emerald-700 ring-emerald-600/10",
  };
  return map[status] || map.Assigned;
}

function priorityStyles(priority, darkMode) {
  const map = {
    Critical: darkMode ? "bg-red-500/15 text-red-200 ring-red-400/20" : "bg-red-50 text-red-700 ring-red-600/10",
    High: darkMode ? "bg-orange-500/15 text-orange-200 ring-orange-400/20" : "bg-orange-50 text-orange-700 ring-orange-600/10",
    Medium: darkMode ? "bg-yellow-500/15 text-yellow-200 ring-yellow-400/20" : "bg-yellow-50 text-yellow-700 ring-yellow-600/10",
    Low: darkMode ? "bg-emerald-500/15 text-emerald-200 ring-emerald-400/20" : "bg-emerald-50 text-emerald-700 ring-emerald-600/10",
  };
  return map[priority] || map.Medium;
}

function Badge({ children, className }) {
  return <span className={cn("inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset", className)}>{children}</span>;
}

function Logo({ darkMode }) {
  return (
    <div className="flex items-center gap-3">
      <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 via-blue-500 to-violet-600 shadow-lg shadow-indigo-900/20">
        <Wrench className="text-white" size={21} />
        <div className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-emerald-400 ring-2 ring-white/20" />
      </div>
      <div>
        <p className={cn("text-xl font-bold tracking-tight", darkMode ? "text-white" : "text-slate-950")}>OpsFlow</p>
        <p className={cn("text-xs font-medium", darkMode ? "text-slate-400" : "text-slate-500")}>Service Operations</p>
      </div>
    </div>
  );
}

function Sidebar({ activePage, setActivePage, darkMode, sidebarOpen, setSidebarOpen }) {
  return (
    <>
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r p-4 transition-transform duration-300 lg:static lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
          darkMode ? "border-white/10 bg-[#0a0f1c]" : "border-slate-200 bg-white"
        )}
      >
        <div className="flex items-center justify-between px-1 py-2">
          <Logo darkMode={darkMode} />
          <button className={cn("rounded-xl p-2 lg:hidden", darkMode ? "hover:bg-white/10" : "hover:bg-slate-100")} onClick={() => setSidebarOpen(false)}>
            <X size={19} />
          </button>
        </div>

        <nav className="mt-8 space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActivePage(item.id);
                  setSidebarOpen(false);
                }}
                className={cn(
                  "group flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition",
                  active
                    ? darkMode
                      ? "bg-indigo-500/20 text-white ring-1 ring-indigo-400/20"
                      : "bg-slate-950 text-white shadow-sm"
                    : darkMode
                      ? "text-slate-400 hover:bg-white/7 hover:text-white"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
                )}
              >
                <Icon size={19} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="mt-auto space-y-4">
          <div
            className={cn(
              "rounded-3xl p-4 ring-1",
              darkMode
                ? "bg-gradient-to-br from-indigo-500/15 to-violet-500/10 ring-white/10"
                : "bg-gradient-to-br from-slate-950 to-indigo-950 text-white ring-transparent"
            )}
          >
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-500 text-white">
              <Sparkles size={19} />
            </div>
            <p className="font-bold">Need help?</p>
            <p className={cn("mt-1 text-sm", darkMode ? "text-slate-400" : "text-slate-300")}>Visit our help center or check implementation notes.</p>
            <button className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-blue-300">
              Open Help Center <ArrowUpRight size={15} />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

function Topbar({ darkMode, setDarkMode, search, setSearch, setSidebarOpen }) {
  return (
    <header
      className={cn(
        "sticky top-0 z-30 border-b px-4 py-4 backdrop-blur-xl lg:px-7",
        darkMode ? "border-white/10 bg-[#0d1424]/85 text-white" : "border-slate-200 bg-white/85 text-slate-950"
      )}
    >
      <div className="flex items-center gap-3">
        <button className={cn("rounded-xl p-2 lg:hidden", darkMode ? "hover:bg-white/10" : "hover:bg-slate-100")} onClick={() => setSidebarOpen(true)}>
          <Menu size={22} />
        </button>

        <div
          className={cn(
            "flex h-11 min-w-0 flex-1 items-center gap-2 rounded-2xl px-3 ring-1 transition focus-within:ring-2",
            darkMode ? "bg-white/7 text-slate-400 ring-white/10 focus-within:ring-indigo-400/50" : "bg-slate-100 text-slate-500 ring-transparent focus-within:ring-indigo-500/30"
          )}
        >
          <Search size={18} />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search orders, customers, inventory..."
            className="w-full bg-transparent text-sm outline-none placeholder:text-inherit"
          />
          <span className={cn("hidden rounded-lg px-2 py-1 text-xs font-semibold sm:inline-flex", darkMode ? "bg-white/7 text-slate-400" : "bg-white text-slate-400")}>⌘ K</span>
        </div>

        <button
          onClick={() => setDarkMode((value) => !value)}
          className={cn(
            "inline-flex h-11 w-11 items-center justify-center rounded-2xl ring-1 transition",
            darkMode ? "bg-white/7 text-amber-200 ring-white/10 hover:bg-white/10" : "bg-white text-slate-700 ring-slate-200 hover:bg-slate-50"
          )}
          aria-label="Toggle theme"
        >
          {darkMode ? <Sun size={19} /> : <Moon size={19} />}
        </button>

        <button className={cn("relative hidden h-11 w-11 items-center justify-center rounded-2xl ring-1 sm:inline-flex", darkMode ? "bg-white/7 text-slate-300 ring-white/10" : "bg-white text-slate-700 ring-slate-200")}>
          <Bell size={19} />
          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-500 text-[11px] font-bold text-white">3</span>
        </button>

        <button className={cn("hidden items-center gap-3 rounded-2xl px-3 py-2 ring-1 xl:flex", darkMode ? "bg-white/7 ring-white/10" : "bg-white ring-slate-200")}>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-orange-300 to-pink-500 text-sm font-bold text-white">M</div>
          <div className="text-left">
            <p className="text-sm font-bold">Michael Chen</p>
            <p className={cn("text-xs", darkMode ? "text-slate-400" : "text-slate-500")}>Operations Manager</p>
          </div>
          <ChevronDown size={16} className={darkMode ? "text-slate-500" : "text-slate-400"} />
        </button>
      </div>
    </header>
  );
}

function MetricCard({ icon: Icon, label, value, change, trend = "up", darkMode, accent = "indigo" }) {
  const accentMap = {
    indigo: darkMode ? "bg-indigo-500/15 text-indigo-200" : "bg-indigo-50 text-indigo-700",
    violet: darkMode ? "bg-violet-500/15 text-violet-200" : "bg-violet-50 text-violet-700",
    blue: darkMode ? "bg-blue-500/15 text-blue-200" : "bg-blue-50 text-blue-700",
    emerald: darkMode ? "bg-emerald-500/15 text-emerald-200" : "bg-emerald-50 text-emerald-700",
  };

  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.18 }}
      className={cn(
        "rounded-3xl p-5 shadow-sm ring-1",
        darkMode ? "bg-white/[0.055] ring-white/10" : "bg-white ring-slate-200"
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className={cn("flex h-12 w-12 items-center justify-center rounded-2xl", accentMap[accent])}>
          <Icon size={21} />
        </div>
        <Sparkline darkMode={darkMode} accent={accent} />
      </div>
      <p className={cn("mt-4 text-sm font-medium", darkMode ? "text-slate-400" : "text-slate-500")}>{label}</p>
      <p className={cn("mt-1 text-3xl font-bold tracking-tight", darkMode ? "text-white" : "text-slate-950")}>{value}</p>
      <p className={cn("mt-4 flex items-center gap-1 text-sm font-semibold", trend === "up" ? "text-emerald-500" : "text-emerald-500")}>
        {trend === "up" ? "↑" : "↓"} {change}
        <span className={cn("font-medium", darkMode ? "text-slate-500" : "text-slate-400")}>vs last 7 days</span>
      </p>
    </motion.div>
  );
}

function Sparkline({ darkMode, accent }) {
  const colorMap = {
    indigo: "stroke-indigo-500",
    violet: "stroke-violet-500",
    blue: "stroke-blue-500",
    emerald: "stroke-emerald-500",
  };
  return (
    <svg width="72" height="34" viewBox="0 0 72 34" fill="none" className="mt-2 opacity-90">
      <path
        d="M2 27 C8 23 12 28 17 22 C22 17 27 20 33 15 C39 10 45 18 50 11 C55 4 61 8 70 2"
        className={cn(colorMap[accent], darkMode ? "opacity-90" : "opacity-80")}
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function BarChart({ darkMode }) {
  const bars = [40, 58, 72, 90, 52, 24, 14];
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return (
    <div className="mt-5">
      <div className={cn("grid h-44 grid-cols-7 items-end gap-3 border-b pb-3", darkMode ? "border-white/10" : "border-slate-200")}>
        {bars.map((height, index) => (
          <div key={days[index]} className="flex h-full flex-col items-center justify-end gap-2">
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: `${height}%` }}
              transition={{ duration: 0.45, delay: index * 0.04 }}
              className="w-full rounded-t-xl bg-gradient-to-t from-indigo-600 to-blue-400 shadow-lg shadow-indigo-900/20"
            />
            <span className={cn("text-xs", darkMode ? "text-slate-500" : "text-slate-400")}>{days[index]}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div>
          <p className={cn("text-sm", darkMode ? "text-slate-400" : "text-slate-500")}>Total completed</p>
          <p className={cn("mt-1 text-3xl font-bold", darkMode ? "text-white" : "text-slate-950")}>363</p>
        </div>
        <p className="text-sm font-semibold text-emerald-500">↑ 15% vs last week</p>
      </div>
    </div>
  );
}

function Card({ children, darkMode, className = "" }) {
  return (
    <div className={cn("rounded-3xl shadow-sm ring-1", darkMode ? "bg-white/[0.055] ring-white/10" : "bg-white ring-slate-200", className)}>
      {children}
    </div>
  );
}

function ActivityFeed({ darkMode }) {
  const styleMap = {
    part: darkMode ? "bg-violet-500/15 text-violet-200" : "bg-violet-50 text-violet-700",
    status: darkMode ? "bg-emerald-500/15 text-emerald-200" : "bg-emerald-50 text-emerald-700",
    order: darkMode ? "bg-blue-500/15 text-blue-200" : "bg-blue-50 text-blue-700",
    risk: darkMode ? "bg-amber-500/15 text-amber-200" : "bg-amber-50 text-amber-700",
  };
  const iconMap = { part: Boxes, status: CheckCircle2, order: UserRound, risk: AlertTriangle };

  return (
    <Card darkMode={darkMode} className="p-5">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h3 className={cn("text-lg font-bold", darkMode ? "text-white" : "text-slate-950")}>Live Activity</h3>
          <p className={cn("text-sm", darkMode ? "text-slate-400" : "text-slate-500")}>Latest operational events</p>
        </div>
        <button className="text-sm font-bold text-indigo-500">View all</button>
      </div>
      <div className="space-y-4">
        {activities.map((item) => {
          const Icon = iconMap[item.type];
          return (
            <div key={item.title} className={cn("flex gap-3 border-b pb-4 last:border-0 last:pb-0", darkMode ? "border-white/10" : "border-slate-100")}>
              <div className={cn("flex h-10 w-10 flex-none items-center justify-center rounded-2xl", styleMap[item.type])}>
                <Icon size={18} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <p className={cn("text-sm font-bold", darkMode ? "text-slate-100" : "text-slate-900")}>{item.title}</p>
                  <span className={cn("flex-none text-xs", darkMode ? "text-slate-500" : "text-slate-400")}>{item.time}</span>
                </div>
                <p className={cn("mt-1 text-sm", darkMode ? "text-slate-400" : "text-slate-500")}>{item.subtitle}</p>
              </div>
            </div>
          );
        })}
      </div>
      <button className={cn("mt-5 flex w-full items-center justify-between rounded-2xl px-4 py-3 text-sm font-bold ring-1", darkMode ? "bg-white/5 text-indigo-300 ring-white/10" : "bg-slate-50 text-indigo-600 ring-slate-200")}>
        View all activity <ChevronRight size={16} />
      </button>
    </Card>
  );
}

function OrdersTable({ orders, darkMode, compact = false }) {
  return (
    <Card darkMode={darkMode} className="overflow-hidden">
      <div className={cn("flex items-center justify-between border-b px-5 py-5", darkMode ? "border-white/10" : "border-slate-200")}>
        <div>
          <h2 className={cn("text-lg font-bold", darkMode ? "text-white" : "text-slate-950")}>Service Orders</h2>
          <p className={cn("text-sm", darkMode ? "text-slate-400" : "text-slate-500")}>Critical operational work queue</p>
        </div>
        <button className={cn("hidden items-center gap-2 rounded-2xl px-4 py-2 text-sm font-bold ring-1 md:inline-flex", darkMode ? "bg-white/5 text-slate-200 ring-white/10 hover:bg-white/10" : "bg-white text-slate-700 ring-slate-200 hover:bg-slate-50")}>
          View all orders <ChevronRight size={16} />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className={darkMode ? "bg-white/[0.035] text-slate-400" : "bg-slate-50 text-slate-500"}>
            <tr>
              <th className="px-5 py-3 font-semibold">Order</th>
              <th className="px-5 py-3 font-semibold">Customer</th>
              <th className="px-5 py-3 font-semibold">Status</th>
              <th className="px-5 py-3 font-semibold">Priority</th>
              <th className="px-5 py-3 font-semibold">Owner</th>
              <th className="px-5 py-3 font-semibold">Due</th>
              <th className="px-5 py-3 text-right font-semibold">Value</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody className={cn("divide-y", darkMode ? "divide-white/10" : "divide-slate-100")}>
            {orders.map((order, index) => (
              <tr key={order.id} className={cn("transition", darkMode ? "hover:bg-white/[0.035]" : "hover:bg-slate-50")}>
                <td className={cn("px-5 font-bold text-indigo-500", compact ? "py-3" : "py-4")}>{order.id}</td>
                <td className={cn("px-5", compact ? "py-3" : "py-4")}>
                  <div className="flex items-center gap-3">
                    <div className={cn("flex h-9 w-9 items-center justify-center rounded-2xl text-sm font-bold text-white", ["bg-emerald-500", "bg-blue-500", "bg-violet-500", "bg-teal-500", "bg-orange-500", "bg-pink-500"][index % 6])}>
                      {order.customer.slice(0, 1)}
                    </div>
                    <div>
                      <p className={cn("font-bold", darkMode ? "text-slate-100" : "text-slate-900")}>{order.customer}</p>
                      <p className={cn("text-xs", darkMode ? "text-slate-500" : "text-slate-400")}>{order.location} · {order.asset}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4"><Badge className={statusStyles(order.status, darkMode)}>{order.status}</Badge></td>
                <td className="px-5 py-4"><Badge className={priorityStyles(order.priority, darkMode)}>{order.priority}</Badge></td>
                <td className={cn("px-5", compact ? "py-3" : "py-4", darkMode ? "text-slate-300" : "text-slate-700")}>{order.owner}</td>
                <td className={cn("px-5", compact ? "py-3" : "py-4")}>
                  <p className={cn("font-semibold", order.dueHint === "Overdue" ? "text-red-500" : darkMode ? "text-slate-200" : "text-slate-900")}>{order.due}</p>
                  <p className={cn("text-xs", order.dueHint === "Overdue" ? "text-red-400" : darkMode ? "text-slate-500" : "text-slate-400")}>{order.dueHint}</p>
                </td>
                <td className={cn("px-5 text-right font-bold", compact ? "py-3" : "py-4", darkMode ? "text-white" : "text-slate-950")}>{formatCurrency(order.value)}</td>
                <td className="px-5 py-4 text-right"><MoreHorizontal size={18} className={darkMode ? "text-slate-500" : "text-slate-400"} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={cn("flex flex-col justify-between gap-4 border-t px-5 py-4 sm:flex-row sm:items-center", darkMode ? "border-white/10" : "border-slate-200")}>
        <p className={cn("text-sm", darkMode ? "text-slate-400" : "text-slate-500")}>Showing 1 to {orders.length} of {orders.length} orders</p>
        <div className="flex items-center gap-2">
          <button className={cn("rounded-xl p-2 ring-1", darkMode ? "ring-white/10 hover:bg-white/5" : "ring-slate-200 hover:bg-slate-50")}><ChevronLeft size={17} /></button>
          {[1, 2, 3].map((page) => (
            <button key={page} className={cn("h-9 w-9 rounded-xl text-sm font-bold ring-1", page === 1 ? "bg-indigo-600 text-white ring-indigo-600" : darkMode ? "ring-white/10 hover:bg-white/5" : "ring-slate-200 hover:bg-slate-50")}>{page}</button>
          ))}
          <button className={cn("rounded-xl p-2 ring-1", darkMode ? "ring-white/10 hover:bg-white/5" : "ring-slate-200 hover:bg-slate-50")}><ChevronRight size={17} /></button>
        </div>
      </div>
    </Card>
  );
}

function PageHeader({ darkMode, title, subtitle, actions }) {
  return (
    <div className="mb-7 flex flex-col justify-between gap-4 xl:flex-row xl:items-end">
      <div>
        <div className={cn("mb-3 inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-bold ring-1", darkMode ? "bg-indigo-500/10 text-indigo-200 ring-indigo-400/20" : "bg-indigo-50 text-indigo-700 ring-indigo-200")}>
          <Sparkles size={15} /> SaaS-ready operations platform
        </div>
        <h1 className={cn("text-3xl font-bold tracking-tight lg:text-4xl", darkMode ? "text-white" : "text-slate-950")}>{title}</h1>
        <p className={cn("mt-2 max-w-3xl text-base", darkMode ? "text-slate-400" : "text-slate-500")}>{subtitle}</p>
      </div>
      {actions}
    </div>
  );
}

function DashboardPage({ darkMode, orders, setCreateOpen }) {
  const totalValue = orders.reduce((sum, order) => sum + order.value, 0);
  const openOrders = orders.filter((order) => order.status !== "Completed").length;

  return (
    <div>
      <PageHeader
        darkMode={darkMode}
        title="Service operations dashboard"
        subtitle="Overview of work orders, approvals, material usage, and SLA risks across your service organization."
        actions={
          <div className="flex gap-2">
            <button className={cn("inline-flex items-center gap-2 rounded-2xl px-4 py-3 text-sm font-bold ring-1", darkMode ? "bg-white/5 text-slate-200 ring-white/10 hover:bg-white/10" : "bg-white text-slate-700 ring-slate-200 hover:bg-slate-50")}>
              <Filter size={17} /> Filter
            </button>
            <button onClick={() => setCreateOpen(true)} className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-900/20 hover:from-indigo-500 hover:to-violet-500">
              <Plus size={17} /> Create order
            </button>
          </div>
        }
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard icon={ClipboardList} label="Open Orders" value={openOrders} change="12%" darkMode={darkMode} accent="indigo" />
        <MetricCard icon={PackageCheck} label="Parts Reserved" value={formatCurrency(totalValue)} change="8%" darkMode={darkMode} accent="violet" />
        <MetricCard icon={Clock3} label="Avg. Resolution" value="2.6 days" change="6%" trend="down" darkMode={darkMode} accent="blue" />
        <MetricCard icon={ShieldCheck} label="SLA Compliance" value="92.4%" change="4%" darkMode={darkMode} accent="emerald" />
      </div>

      <div className="mt-6 grid gap-6 2xl:grid-cols-[1fr_380px]">
        <OrdersTable orders={orders.slice(0, 5)} darkMode={darkMode} />
        <div className="space-y-6">
          <Card darkMode={darkMode} className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className={cn("text-lg font-bold", darkMode ? "text-white" : "text-slate-950")}>Weekly throughput</h3>
                <p className={cn("text-sm", darkMode ? "text-slate-400" : "text-slate-500")}>Completed orders per weekday</p>
              </div>
              <button className={cn("inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-bold ring-1", darkMode ? "bg-white/5 ring-white/10" : "bg-white ring-slate-200")}>
                This week <ChevronDown size={15} />
              </button>
            </div>
            <BarChart darkMode={darkMode} />
          </Card>
          <ActivityFeed darkMode={darkMode} />
        </div>
      </div>
    </div>
  );
}

function OrdersPage({ darkMode, orders, setCreateOpen }) {
  return (
    <div>
      <PageHeader
        darkMode={darkMode}
        title="Service orders"
        subtitle="Manage service work, assignments, parts, approvals, SLA risk and customer communication from a single operational queue."
        actions={
          <div className="flex gap-2">
            <button className={cn("inline-flex items-center gap-2 rounded-2xl px-4 py-3 text-sm font-bold ring-1", darkMode ? "bg-white/5 text-slate-200 ring-white/10" : "bg-white text-slate-700 ring-slate-200")}><Download size={17} /> Export</button>
            <button onClick={() => setCreateOpen(true)} className="inline-flex items-center gap-2 rounded-2xl bg-indigo-600 px-4 py-3 text-sm font-bold text-white"><Plus size={17} /> New order</button>
          </div>
        }
      />
      <OrdersTable orders={orders} darkMode={darkMode} compact />
    </div>
  );
}

function InventoryPage({ darkMode }) {
  return (
    <div>
      <PageHeader darkMode={darkMode} title="Inventory" subtitle="Track reserved parts, low-stock items and material availability for active service orders." />
      <Card darkMode={darkMode} className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className={darkMode ? "bg-white/[0.035] text-slate-400" : "bg-slate-50 text-slate-500"}>
              <tr>
                <th className="px-5 py-3 font-semibold">SKU</th>
                <th className="px-5 py-3 font-semibold">Material</th>
                <th className="px-5 py-3 font-semibold">Available</th>
                <th className="px-5 py-3 font-semibold">Reserved</th>
                <th className="px-5 py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className={cn("divide-y", darkMode ? "divide-white/10" : "divide-slate-100")}>
              {inventory.map((item) => (
                <tr key={item.sku} className={darkMode ? "hover:bg-white/[0.035]" : "hover:bg-slate-50"}>
                  <td className="px-5 py-4 font-bold text-indigo-500">{item.sku}</td>
                  <td className={cn("px-5 py-4 font-bold", darkMode ? "text-white" : "text-slate-950")}>{item.name}</td>
                  <td className={cn("px-5 py-4", darkMode ? "text-slate-300" : "text-slate-700")}>{item.stock}</td>
                  <td className={cn("px-5 py-4", darkMode ? "text-slate-300" : "text-slate-700")}>{item.reserved}</td>
                  <td className="px-5 py-4">
                    <Badge className={item.status === "Critical" ? priorityStyles("Critical", darkMode) : item.status === "Low Stock" ? priorityStyles("High", darkMode) : statusStyles("Completed", darkMode)}>{item.status}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

function CustomersPage({ darkMode }) {
  return (
    <div>
      <PageHeader darkMode={darkMode} title="Customers" subtitle="Monitor customers, account health, open work volume and SLA performance." />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {customers.map((customer) => (
          <Card key={customer.name} darkMode={darkMode} className="p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500 text-white"><Building2 size={21} /></div>
              <div>
                <h3 className={cn("font-bold", darkMode ? "text-white" : "text-slate-950")}>{customer.name}</h3>
                <p className={cn("text-sm", darkMode ? "text-slate-400" : "text-slate-500")}>{customer.segment}</p>
              </div>
            </div>
            <div className="mt-5 grid grid-cols-3 gap-3 text-sm">
              <div><p className={cn("text-xs", darkMode ? "text-slate-500" : "text-slate-400")}>Orders</p><p className="font-bold">{customer.openOrders}</p></div>
              <div><p className={cn("text-xs", darkMode ? "text-slate-500" : "text-slate-400")}>SLA</p><p className="font-bold">{customer.sla}</p></div>
              <div><p className={cn("text-xs", darkMode ? "text-slate-500" : "text-slate-400")}>Revenue</p><p className="font-bold">{customer.revenue}</p></div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

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

function SettingsPage({ darkMode, setDarkMode }) {
  return (
    <div>
      <PageHeader darkMode={darkMode} title="Settings" subtitle="Application preferences, user experience settings and operational defaults." />
      <Card darkMode={darkMode} className="p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className={cn("font-bold", darkMode ? "text-white" : "text-slate-950")}>Appearance</h3>
            <p className={cn("text-sm", darkMode ? "text-slate-400" : "text-slate-500")}>Switch between light and dark theme.</p>
          </div>
          <button onClick={() => setDarkMode((value) => !value)} className="inline-flex items-center gap-2 rounded-2xl bg-indigo-600 px-4 py-3 text-sm font-bold text-white">
            {darkMode ? <Sun size={17} /> : <Moon size={17} />} {darkMode ? "Use light theme" : "Use dark theme"}
          </button>
        </div>
      </Card>
    </div>
  );
}

function CreateOrderModal({ open, onClose, onCreate, darkMode }) {
  const [form, setForm] = useState({ customer: "", asset: "", priority: "Medium", owner: "", value: "" });

  function submit(event) {
    event.preventDefault();
    const nextId = `SO-${1050 + Math.floor(Math.random() * 100)}`;
    onCreate({
      id: nextId,
      customer: form.customer || "New Customer GmbH",
      location: "Berlin, DE",
      asset: form.asset || "Industrial Asset",
      status: "Assigned",
      priority: form.priority,
      owner: form.owner || "Michael Chen",
      due: "Jun 10, 2026",
      dueHint: "17 days left",
      value: Number(form.value || 2500),
    });
    setForm({ customer: "", asset: "", priority: "Medium", owner: "", value: "" });
    onClose();
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            className={cn("w-full max-w-xl rounded-3xl p-6 shadow-2xl ring-1", darkMode ? "bg-[#111827] text-white ring-white/10" : "bg-white text-slate-950 ring-slate-200")}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">Create service order</h2>
                <p className={cn("mt-1 text-sm", darkMode ? "text-slate-400" : "text-slate-500")}>Add a new operational work item to the queue.</p>
              </div>
              <button onClick={onClose} className={cn("rounded-xl p-2", darkMode ? "hover:bg-white/10" : "hover:bg-slate-100")}><X size={20} /></button>
            </div>
            <form onSubmit={submit} className="mt-6 space-y-4">
              {[
                ["customer", "Customer", "Acme Manufacturing"],
                ["asset", "Asset", "Hydraulic Press HP-420"],
                ["owner", "Owner", "Sarah Johnson"],
                ["value", "Estimated value", "3400"],
              ].map(([key, label, placeholder]) => (
                <label key={key} className="block">
                  <span className={cn("text-sm font-bold", darkMode ? "text-slate-200" : "text-slate-700")}>{label}</span>
                  <input
                    value={form[key]}
                    onChange={(event) => setForm((current) => ({ ...current, [key]: event.target.value }))}
                    placeholder={placeholder}
                    className={cn("mt-2 h-12 w-full rounded-2xl px-4 text-sm outline-none ring-1 transition focus:ring-2", darkMode ? "bg-white/5 text-white ring-white/10 placeholder:text-slate-600 focus:ring-indigo-400/50" : "bg-slate-50 text-slate-950 ring-slate-200 placeholder:text-slate-400 focus:ring-indigo-500/30")}
                  />
                </label>
              ))}
              <label className="block">
                <span className={cn("text-sm font-bold", darkMode ? "text-slate-200" : "text-slate-700")}>Priority</span>
                <select
                  value={form.priority}
                  onChange={(event) => setForm((current) => ({ ...current, priority: event.target.value }))}
                  className={cn("mt-2 h-12 w-full rounded-2xl px-4 text-sm outline-none ring-1 transition focus:ring-2", darkMode ? "bg-white/5 text-white ring-white/10 focus:ring-indigo-400/50" : "bg-slate-50 text-slate-950 ring-slate-200 focus:ring-indigo-500/30")}
                >
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                  <option>Critical</option>
                </select>
              </label>
              <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
                <button type="button" onClick={onClose} className={cn("rounded-2xl px-5 py-3 text-sm font-bold ring-1", darkMode ? "ring-white/10 hover:bg-white/5" : "ring-slate-200 hover:bg-slate-50")}>Cancel</button>
                <button type="submit" className="rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white hover:bg-indigo-500">Create order</button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function OpsFlowApp() {
  const [darkMode, setDarkMode] = useState(false);
  const [activePage, setActivePage] = useState("dashboard");
  const [search, setSearch] = useState("");
  const [orders, setOrders] = useState(initialOrders);
  const [createOpen, setCreateOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const filteredOrders = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return orders;
    return orders.filter((order) =>
      [order.id, order.customer, order.asset, order.status, order.priority, order.owner, order.location].some((value) => String(value).toLowerCase().includes(query))
    );
  }, [orders, search]);

  const page = useMemo(() => {
    const props = { darkMode, orders: filteredOrders, setCreateOpen, setDarkMode };
    if (activePage === "orders") return <OrdersPage {...props} />;
    if (activePage === "inventory") return <InventoryPage darkMode={darkMode} />;
    if (activePage === "customers") return <CustomersPage darkMode={darkMode} />;
    if (activePage === "reports") return <ReportsPage darkMode={darkMode} />;
    if (activePage === "settings") return <SettingsPage darkMode={darkMode} setDarkMode={setDarkMode} />;
    return <DashboardPage {...props} />;
  }, [activePage, darkMode, filteredOrders]);

  return (
    <div className={cn("min-h-screen", darkMode ? "bg-[#070b14] text-white" : "bg-slate-100 text-slate-950")}>
      <div className="flex min-h-screen">
        <Sidebar activePage={activePage} setActivePage={setActivePage} darkMode={darkMode} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="min-w-0 flex-1">
          <Topbar darkMode={darkMode} setDarkMode={setDarkMode} search={search} setSearch={setSearch} setSidebarOpen={setSidebarOpen} />
          <main className="p-4 lg:p-7">
            <AnimatePresence mode="wait">
              <motion.div key={activePage + darkMode} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.22 }}>
                {page}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
      <CreateOrderModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onCreate={(order) => setOrders((current) => [order, ...current])}
        darkMode={darkMode}
      />
    </div>
  );
}
