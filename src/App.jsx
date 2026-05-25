import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Sidebar from "./components/layout/Sidebar";
import Topbar from "./components/layout/Topbar";
import CreateOrderModal from "./components/orders/CreateOrderModal";

import DashboardPage from "./pages/DashboardPage";
import OrdersPage from "./pages/OrdersPage";
import InventoryPage from "./pages/InventoryPage";
import CustomersPage from "./pages/CustomersPage";
import ReportsPage from "./pages/ReportsPage";
import SettingsPage from "./pages/SettingsPage";

import PageHeader from "./components/ui/PageHeader";

import { initialOrders } from "./data/mockData";
import { cn } from "./utils/styles";

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
