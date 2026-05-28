import { AlertTriangle, Trash2, X } from "lucide-react";

import { cn } from "../../utils/styles";

function DeleteOrderDialog({
  open,
  order,
  darkMode,
  onCancel,
  onConfirm,
}) {
  if (!open || !order) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm">
      <button
        type="button"
        className="absolute inset-0 cursor-default"
        onClick={onCancel}
        aria-label="Close delete confirmation"
      />

      <div
        className={cn(
          "relative w-full max-w-lg rounded-3xl p-6 shadow-2xl ring-1",
          darkMode
            ? "bg-[#111827] text-white ring-white/10"
            : "bg-white text-slate-950 ring-slate-200"
        )}
      >
        <div className="flex items-start justify-between gap-4">
          <div
            className={cn(
              "flex h-12 w-12 flex-none items-center justify-center rounded-2xl",
              darkMode
                ? "bg-red-500/15 text-red-300"
                : "bg-red-50 text-red-600"
            )}
          >
            <AlertTriangle size={22} />
          </div>

          <button
            type="button"
            onClick={onCancel}
            className={cn(
              "rounded-2xl p-2 transition",
              darkMode ? "hover:bg-white/10" : "hover:bg-slate-100"
            )}
            aria-label="Close dialog"
          >
            <X size={20} />
          </button>
        </div>

        <div className="mt-5">
          <h2 className="text-2xl font-bold tracking-tight">
            Delete service order?
          </h2>

          <p
            className={cn(
              "mt-2 text-sm leading-6",
              darkMode ? "text-slate-400" : "text-slate-500"
            )}
          >
            This action will remove the service order from the current demo data.
            You can restore demo data later from Settings.
          </p>
        </div>

        <div
          className={cn(
            "mt-5 rounded-2xl p-4 ring-1",
            darkMode
              ? "bg-white/5 ring-white/10"
              : "bg-slate-50 ring-slate-200"
          )}
        >
          <p className="font-bold">{order.id}</p>
          <p
            className={cn(
              "mt-1 text-sm",
              darkMode ? "text-slate-400" : "text-slate-500"
            )}
          >
            {order.customer} · {order.asset}
          </p>
        </div>

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            className={cn(
              "rounded-2xl px-5 py-3 text-sm font-bold ring-1 transition",
              darkMode
                ? "ring-white/10 hover:bg-white/5"
                : "ring-slate-200 hover:bg-slate-50"
            )}
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={() => onConfirm(order.id)}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-red-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-red-500"
          >
            <Trash2 size={17} />
            Delete order
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteOrderDialog;