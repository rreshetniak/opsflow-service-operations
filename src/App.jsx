import React, { useMemo, useState, useEffect } from "react";
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

import { Navigate, Route, Routes } from "react-router";

import OrderDetailsDrawer from "./components/orders/OrderDetailsDrawer";

const ORDERS_STORAGE_KEY = "opsflow-orders";

export default function OpsFlowApp() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("opsflow-theme");
    return savedTheme === "dark";
  });
  const [search, setSearch] = useState("");
  const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem(ORDERS_STORAGE_KEY);

    if (!savedOrders) {
      return initialOrders;
    }

    try {
      return JSON.parse(savedOrders);
    } catch {
      return initialOrders;
    }
  });
  const [createOpen, setCreateOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  useEffect(() => {
    localStorage.setItem("opsflow-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
  }, [orders]);

  const filteredOrders = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return orders;
    return orders.filter((order) =>
      [
        order.id,
        order.customer,
        order.asset,
        order.status,
        order.priority,
        order.owner,
        order.location,
      ].some((value) => String(value).toLowerCase().includes(query)),
    );
  }, [orders, search]);

  const selectedOrder = useMemo(() => {
    return orders.find((order) => order.id === selectedOrderId) || null;
  }, [orders, selectedOrderId]);

  function handleViewOrder(orderId) {
    setSelectedOrderId(orderId);
  }

  function handleCloseOrderDetails() {
    setSelectedOrderId(null);
  }

  function handleUpdateOrderStatus(orderId, nextStatus) {
    setOrders((currentOrders) =>
      currentOrders.map((order) => {
        if (order.id !== orderId) {
          return order;
        }

        return {
          ...order,
          status: nextStatus,
          dueHint: nextStatus === "Completed" ? "Completed" : order.dueHint,
        };
      }),
    );
  }

  const pageProps = {
    darkMode,
    orders: filteredOrders,
    setCreateOpen,
    setDarkMode,
    onUpdateStatus: handleUpdateOrderStatus,
    onViewOrder: handleViewOrder,
  };

  return (
    <div
      className={cn(
        "min-h-screen",
        darkMode ? "bg-[#070b14] text-white" : "bg-slate-100 text-slate-950",
      )}
    >
      <div className="flex min-h-screen">
        <Sidebar
          darkMode={darkMode}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        <div className="min-w-0 flex-1">
          <Topbar
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            search={search}
            setSearch={setSearch}
            setSidebarOpen={setSidebarOpen}
          />
          <main className="p-4 lg:p-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={darkMode ? "dark" : "light"}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.22 }}
              >
                <Routes>
                  <Route path="/" element={<DashboardPage {...pageProps} />} />
                  <Route
                    path="/orders"
                    element={<OrdersPage {...pageProps} />}
                  />
                  <Route
                    path="/inventory"
                    element={<InventoryPage darkMode={darkMode} />}
                  />
                  <Route
                    path="/customers"
                    element={<CustomersPage darkMode={darkMode} />}
                  />
                  <Route
                    path="/reports"
                    element={<ReportsPage darkMode={darkMode} />}
                  />
                  <Route
                    path="/settings"
                    element={
                      <SettingsPage
                        darkMode={darkMode}
                        setDarkMode={setDarkMode}
                      />
                    }
                  />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
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

      <OrderDetailsDrawer
        order={selectedOrder}
        open={Boolean(selectedOrder)}
        onClose={handleCloseOrderDetails}
        darkMode={darkMode}
        onUpdateStatus={handleUpdateOrderStatus}
      />
    </div>
  );
}
