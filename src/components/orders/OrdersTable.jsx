import { cn } from "../../utils/styles";
import Card from "../ui/Card";
import Badge from "../ui/Badge";
import { statusStyles } from "../../utils/styles";
import { ChevronRight, ChevronLeft, MoreHorizontal, Sun } from "lucide-react";
import { priorityStyles } from "../../utils/styles";
import { formatCurrency } from "../../utils/format";


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

export default OrdersTable;