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
import CreateOrderModal from "./components/orders/CreateOrderModal";
import DashboardPage from "./pages/DashboardPage";
import OrdersPage from "./pages/OrdersPage";
import InventoryPage from "./pages/InventoryPage";





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
