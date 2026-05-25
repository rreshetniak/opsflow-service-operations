import { cn } from "../utils/styles";
import OrdersTable from "../components/orders/OrdersTable";
import PageHeader from "../components/ui/PageHeader";
import { Download, Plus } from "lucide-react";

function OrdersPage({ darkMode, orders, setCreateOpen }) {
  return (
    <div>
      <PageHeader
        darkMode={darkMode}
        title="Service orders"
        subtitle="Manage service work, assignments, parts, approvals, SLA risk and customer communication from a single operational queue."
        actions={
          <div className="flex gap-2">
            <button
              className={cn(
                "inline-flex items-center gap-2 rounded-2xl px-4 py-3 text-sm font-bold ring-1",
                darkMode
                  ? "bg-white/5 text-slate-200 ring-white/10"
                  : "bg-white text-slate-700 ring-slate-200",
              )}
            >
              <Download size={17} /> Export
            </button>
            <button
              onClick={() => setCreateOpen(true)}
              className="inline-flex items-center gap-2 rounded-2xl bg-indigo-600 px-4 py-3 text-sm font-bold text-white"
            >
              <Plus size={17} /> New order
            </button>
          </div>
        }
      />
      <OrdersTable orders={orders} darkMode={darkMode} compact />
    </div>
  );
}

export default OrdersPage;
