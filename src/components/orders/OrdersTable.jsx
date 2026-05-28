import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  MoreHorizontal,
  Trash2,
} from "lucide-react";

import Card from "../ui/Card";
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

const PAGE_SIZE = 5;

function OrdersTable({
  orders,
  darkMode,
  compact = false,
  onUpdateStatus,
  onViewOrder,
  onDeleteOrder,
  showViewAll = true,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [openActionsOrderId, setOpenActionsOrderId] = useState(null);

  const totalPages = Math.max(1, Math.ceil(orders.length / PAGE_SIZE));

  useEffect(() => {
    setCurrentPage(1);
    setOpenActionsOrderId(null);
  }, [orders.length]);

  useEffect(() => {
    function handlePointerDown(event) {
      const clickedInsideActions = event.target.closest("[data-order-actions]");

      if (!clickedInsideActions) {
        setOpenActionsOrderId(null);
      }
    }

    function handleEscape(event) {
      if (event.key === "Escape") {
        setOpenActionsOrderId(null);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const visibleOrders = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return orders.slice(start, start + PAGE_SIZE);
  }, [orders, currentPage]);

  const startItem = orders.length === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1;
  const endItem = Math.min(currentPage * PAGE_SIZE, orders.length);

  const resultsLabel =
    orders.length === 0
      ? "No service orders found"
      : `Showing ${startItem} to ${endItem} of ${orders.length} orders`;

  function goToPreviousPage() {
    setCurrentPage((page) => Math.max(1, page - 1));
    setOpenActionsOrderId(null);
  }

  function goToNextPage() {
    setCurrentPage((page) => Math.min(totalPages, page + 1));
    setOpenActionsOrderId(null);
  }

  function toggleRowActions(orderId) {
    setOpenActionsOrderId((currentId) =>
      currentId === orderId ? null : orderId
    );
  }

  function handleViewDetails(orderId) {
    onViewOrder?.(orderId);
    setOpenActionsOrderId(null);
  }

  function handleDelete(order) {
    const confirmed = window.confirm(
      `Delete service order ${order.id} for ${order.customer}?`
    );

    if (!confirmed) {
      return;
    }

    onDeleteOrder?.(order.id);
    setOpenActionsOrderId(null);
  }

  return (
    <Card darkMode={darkMode} className="overflow-visible">
      <div
        className={cn(
          "flex items-center justify-between border-b px-5 py-5",
          darkMode ? "border-white/10" : "border-slate-200"
        )}
      >
        <div>
          <h2
            className={cn(
              "text-lg font-bold",
              darkMode ? "text-white" : "text-slate-950"
            )}
          >
            Service Orders
          </h2>

          <p
            className={cn(
              "text-sm",
              darkMode ? "text-slate-400" : "text-slate-500"
            )}
          >
            Critical operational work queue
          </p>
        </div>

        {showViewAll && (
          <Link
            to="/orders"
            className={cn(
              "hidden items-center gap-2 rounded-2xl px-4 py-2 text-sm font-bold ring-1 md:inline-flex",
              darkMode
                ? "bg-white/5 text-slate-200 ring-white/10 hover:bg-white/10"
                : "bg-white text-slate-700 ring-slate-200 hover:bg-slate-50"
            )}
          >
            View all orders <ChevronRight size={16} />
          </Link>
        )}
      </div>

      <div className="overflow-visible">
        <table className="min-w-full text-left text-sm">
          <thead
            className={
              darkMode
                ? "bg-white/[0.035] text-slate-400"
                : "bg-slate-50 text-slate-500"
            }
          >
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

          <tbody
            className={cn(
              "divide-y",
              darkMode ? "divide-white/10" : "divide-slate-100"
            )}
          >
            {visibleOrders.length === 0 ? (
              <tr>
                <td
                  colSpan={8}
                  className={cn(
                    "px-5 py-10 text-center text-sm font-medium",
                    darkMode ? "text-slate-400" : "text-slate-500"
                  )}
                >
                  No service orders match the current filters.
                </td>
              </tr>
            ) : (
              visibleOrders.map((order, index) => (
                <tr
                  key={order.id}
                  className={cn(
                    "transition",
                    darkMode ? "hover:bg-white/[0.035]" : "hover:bg-slate-50"
                  )}
                >
                  <td
                    className={cn("px-5 font-bold", compact ? "py-3" : "py-4")}
                  >
                    <button
                      type="button"
                      onClick={() => onViewOrder?.(order.id)}
                      className="font-bold text-indigo-500 transition hover:text-indigo-400 hover:underline"
                    >
                      {order.id}
                    </button>
                  </td>

                  <td className={cn("px-5", compact ? "py-3" : "py-4")}>
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          "flex h-9 w-9 items-center justify-center rounded-2xl text-sm font-bold text-white",
                          [
                            "bg-emerald-500",
                            "bg-blue-500",
                            "bg-violet-500",
                            "bg-teal-500",
                            "bg-orange-500",
                            "bg-pink-500",
                          ][index % 6]
                        )}
                      >
                        {order.customer.slice(0, 1)}
                      </div>

                      <div>
                        <p
                          className={cn(
                            "font-bold",
                            darkMode ? "text-slate-100" : "text-slate-900"
                          )}
                        >
                          {order.customer}
                        </p>

                        <p
                          className={cn(
                            "text-xs",
                            darkMode ? "text-slate-500" : "text-slate-400"
                          )}
                        >
                          {order.location} · {order.asset}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    {onUpdateStatus ? (
                      <select
                        value={order.status}
                        onChange={(event) =>
                          onUpdateStatus(order.id, event.target.value)
                        }
                        className={cn(
                          "h-8 cursor-pointer rounded-full px-3 text-xs font-semibold outline-none ring-1 ring-inset transition",
                          statusStyles(order.status, darkMode)
                        )}
                        aria-label={`Change status for ${order.id}`}
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
                    ) : (
                      <Badge className={statusStyles(order.status, darkMode)}>
                        {order.status}
                      </Badge>
                    )}
                  </td>

                  <td className="px-5 py-4">
                    <Badge className={priorityStyles(order.priority, darkMode)}>
                      {order.priority}
                    </Badge>
                  </td>

                  <td
                    className={cn(
                      "px-5",
                      compact ? "py-3" : "py-4",
                      darkMode ? "text-slate-300" : "text-slate-700"
                    )}
                  >
                    {order.owner}
                  </td>

                  <td className={cn("px-5", compact ? "py-3" : "py-4")}>
                    <p
                      className={cn(
                        "font-semibold",
                        order.dueHint === "Overdue"
                          ? "text-red-500"
                          : darkMode
                            ? "text-slate-200"
                            : "text-slate-900"
                      )}
                    >
                      {order.due}
                    </p>

                    <p
                      className={cn(
                        "text-xs",
                        order.dueHint === "Overdue"
                          ? "text-red-400"
                          : darkMode
                            ? "text-slate-500"
                            : "text-slate-400"
                      )}
                    >
                      {order.dueHint}
                    </p>
                  </td>

                  <td
                    className={cn(
                      "px-5 text-right font-bold",
                      compact ? "py-3" : "py-4",
                      darkMode ? "text-white" : "text-slate-950"
                    )}
                  >
                    {formatCurrency(order.value)}
                  </td>

                  <td className="px-5 py-4 text-right">
                    <div data-order-actions className="relative inline-flex">
                      <button
                        type="button"
                        onClick={() => toggleRowActions(order.id)}
                        className={cn(
                          "inline-flex h-9 w-9 items-center justify-center rounded-xl transition",
                          darkMode
                            ? "text-slate-400 hover:bg-white/10 hover:text-white"
                            : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                        )}
                        aria-label={`Open actions for ${order.id}`}
                      >
                        <MoreHorizontal size={18} />
                      </button>

                      {openActionsOrderId === order.id && (
                        <div
                          className={cn(
                            "absolute right-0 top-full z-50 mt-2 w-48 rounded-2xl p-2 text-left shadow-2xl ring-1",
                            darkMode
                              ? "bg-[#111827] ring-white/10"
                              : "bg-white ring-slate-200"
                          )}
                        >
                          <button
                            type="button"
                            onClick={() => handleViewDetails(order.id)}
                            className={cn(
                              "flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm font-bold transition",
                              darkMode
                                ? "hover:bg-white/5"
                                : "hover:bg-slate-50"
                            )}
                          >
                            <Eye size={16} />
                            View details
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDelete(order)}
                            className={cn(
                              "flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm font-bold text-red-500 transition",
                              darkMode
                                ? "hover:bg-white/5"
                                : "hover:bg-red-50"
                            )}
                          >
                            <Trash2 size={16} />
                            Delete order
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div
        className={cn(
          "flex flex-col justify-between gap-4 border-t px-5 py-4 sm:flex-row sm:items-center",
          darkMode ? "border-white/10" : "border-slate-200"
        )}
      >
        <p
          className={cn(
            "text-sm",
            darkMode ? "text-slate-400" : "text-slate-500"
          )}
        >
          {resultsLabel}
        </p>

        {orders.length > 0 && (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
              className={cn(
                "rounded-xl p-2 ring-1 transition disabled:cursor-not-allowed disabled:opacity-40",
                darkMode
                  ? "ring-white/10 hover:bg-white/5"
                  : "ring-slate-200 hover:bg-slate-50"
              )}
            >
              <ChevronLeft size={17} />
            </button>

            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (page) => (
                <button
                  type="button"
                  key={page}
                  onClick={() => {
                    setCurrentPage(page);
                    setOpenActionsOrderId(null);
                  }}
                  className={cn(
                    "h-9 w-9 rounded-xl text-sm font-bold ring-1 transition",
                    page === currentPage
                      ? "bg-indigo-600 text-white ring-indigo-600"
                      : darkMode
                        ? "ring-white/10 hover:bg-white/5"
                        : "ring-slate-200 hover:bg-slate-50"
                  )}
                >
                  {page}
                </button>
              )
            )}

            <button
              type="button"
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className={cn(
                "rounded-xl p-2 ring-1 transition disabled:cursor-not-allowed disabled:opacity-40",
                darkMode
                  ? "ring-white/10 hover:bg-white/5"
                  : "ring-slate-200 hover:bg-slate-50"
              )}
            >
              <ChevronRight size={17} />
            </button>
          </div>
        )}
      </div>
    </Card>
  );
}

export default OrdersTable;