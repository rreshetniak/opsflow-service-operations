import {
  Building2,
  CalendarClock,
  ClipboardList,
  Euro,
  UserRound,
  Wrench,
  X,
} from "lucide-react";

import Badge from "../ui/Badge";
import { formatCurrency } from "../../utils/format";
import { cn, priorityStyles, statusStyles } from "../../utils/styles";

const STATUS_OPTIONS = [
  "Assigned",
  "In Progress",
  "Waiting Parts",
  "Approval",
  "Completed",
];

function DetailRow({ icon: Icon, label, value, darkMode }) {
  return (
    <div
      className={cn(
        "flex items-start gap-3 rounded-2xl p-4 ring-1",
        darkMode ? "bg-white/5 ring-white/10" : "bg-slate-50 ring-slate-200"
      )}
    >
      <div
        className={cn(
          "flex h-10 w-10 flex-none items-center justify-center rounded-2xl",
          darkMode
            ? "bg-indigo-500/15 text-indigo-200"
            : "bg-indigo-50 text-indigo-700"
        )}
      >
        <Icon size={18} />
      </div>

      <div>
        <p
          className={cn(
            "text-xs font-semibold uppercase tracking-wide",
            darkMode ? "text-slate-500" : "text-slate-400"
          )}
        >
          {label}
        </p>
        <p
          className={cn(
            "mt-1 font-bold",
            darkMode ? "text-white" : "text-slate-950"
          )}
        >
          {value}
        </p>
      </div>
    </div>
  );
}

function OrderDetailsDrawer({
  order,
  open,
  onClose,
  darkMode,
  onUpdateStatus,
}) {
  if (!open || !order) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[90]">
      <button
        type="button"
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Close order details"
      />

      <aside
        className={cn(
          "absolute right-0 top-0 flex h-full w-full max-w-xl flex-col border-l shadow-2xl",
          darkMode
            ? "border-white/10 bg-[#0d1424] text-white"
            : "border-slate-200 bg-white text-slate-950"
        )}
      >
        <div
          className={cn(
            "flex items-start justify-between gap-4 border-b p-6",
            darkMode ? "border-white/10" : "border-slate-200"
          )}
        >
          <div>
            <p
              className={cn(
                "text-sm font-semibold",
                darkMode ? "text-slate-400" : "text-slate-500"
              )}
            >
              Service Order
            </p>
            <h2 className="mt-1 text-3xl font-bold tracking-tight">
              {order.id}
            </h2>
            <p
              className={cn(
                "mt-2 text-sm",
                darkMode ? "text-slate-400" : "text-slate-500"
              )}
            >
              {order.customer} · {order.asset}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className={cn(
              "rounded-2xl p-2 transition",
              darkMode ? "hover:bg-white/10" : "hover:bg-slate-100"
            )}
            aria-label="Close drawer"
          >
            <X size={22} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="mb-6 flex flex-wrap gap-3">
            <select
              value={order.status}
              onChange={(event) => onUpdateStatus(order.id, event.target.value)}
              className={cn(
                "h-9 cursor-pointer rounded-full px-3 text-xs font-semibold outline-none ring-1 ring-inset transition",
                statusStyles(order.status, darkMode)
              )}
            >
              {STATUS_OPTIONS.map((status) => (
                <option
                  key={status}
                  value={status}
                  className={
                    darkMode
                      ? "bg-[#111827] text-white"
                      : "bg-white text-slate-900"
                  }
                >
                  {status}
                </option>
              ))}
            </select>

            <Badge className={priorityStyles(order.priority, darkMode)}>
              {order.priority}
            </Badge>
          </div>

          <div className="grid gap-4">
            <DetailRow
              icon={Building2}
              label="Customer"
              value={`${order.customer} · ${order.location}`}
              darkMode={darkMode}
            />

            <DetailRow
              icon={Wrench}
              label="Asset"
              value={order.asset}
              darkMode={darkMode}
            />

            <DetailRow
              icon={UserRound}
              label="Owner"
              value={order.owner}
              darkMode={darkMode}
            />

            <DetailRow
              icon={CalendarClock}
              label="Due date"
              value={`${order.due} · ${order.dueHint}`}
              darkMode={darkMode}
            />

            <DetailRow
              icon={Euro}
              label="Estimated value"
              value={formatCurrency(order.value)}
              darkMode={darkMode}
            />
          </div>

          <div
            className={cn(
              "mt-6 rounded-3xl p-5 ring-1",
              darkMode ? "bg-white/5 ring-white/10" : "bg-slate-50 ring-slate-200"
            )}
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-500 text-white">
                <ClipboardList size={18} />
              </div>

              <div>
                <h3 className="font-bold">Activity timeline</h3>
                <p
                  className={cn(
                    "text-sm",
                    darkMode ? "text-slate-400" : "text-slate-500"
                  )}
                >
                  Basic operational events for this service order.
                </p>
              </div>
            </div>

            <div className="mt-5 space-y-4">
              {[
                "Order created",
                `Assigned to ${order.owner}`,
                `Current status: ${order.status}`,
              ].map((item) => (
                <div key={item} className="flex gap-3">
                  <div className="mt-1.5 h-2 w-2 rounded-full bg-indigo-500" />
                  <p
                    className={cn(
                      "text-sm font-medium",
                      darkMode ? "text-slate-300" : "text-slate-700"
                    )}
                  >
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}

export default OrderDetailsDrawer;