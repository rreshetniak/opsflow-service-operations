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
import Card from "./components/ui/Card";
import PageHeader from "./components/ui/PageHeader";

import { 
  initialOrders,
  inventory,
  customers,
  activities,
  navItems,
  } from "./data/mockData";

import { formatCurrency } from "./utils/format";
import { cn, statusStyles, priorityStyles } from "./utils/styles";
import Badge from "./components/ui/Badge";
import Logo from "./components/layout/Logo";
import Sidebar from "./components/layout/Sidebar";
import Topbar from "./components/layout/Topbar";
import Sparkline from "./components/dashboard/Sparkline";
import MetricCard from "./components/dashboard/MetricCard";
import BarChart from "./components/dashboard/BarChart";
import ActivityFeed from "./components/dashboard/ActivityFeed";
import OrdersTable from "./components/orders/OrdersTable";



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
