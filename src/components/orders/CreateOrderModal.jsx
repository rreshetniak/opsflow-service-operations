import { cn } from "../../utils/styles";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";

function CreateOrderModal({ open, onClose, onCreate, darkMode }) {
  const [form, setForm] = useState({
    customer: "",
    asset: "",
    priority: "Medium",
    owner: "",
    value: "",
  });

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
    setForm({
      customer: "",
      asset: "",
      priority: "Medium",
      owner: "",
      value: "",
    });
    onClose();
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            className={cn(
              "w-full max-w-xl rounded-3xl p-6 shadow-2xl ring-1",
              darkMode
                ? "bg-[#111827] text-white ring-white/10"
                : "bg-white text-slate-950 ring-slate-200",
            )}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">
                  Create service order
                </h2>
                <p
                  className={cn(
                    "mt-1 text-sm",
                    darkMode ? "text-slate-400" : "text-slate-500",
                  )}
                >
                  Add a new operational work item to the queue.
                </p>
              </div>
              <button
                onClick={onClose}
                className={cn(
                  "rounded-xl p-2",
                  darkMode ? "hover:bg-white/10" : "hover:bg-slate-100",
                )}
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={submit} className="mt-6 space-y-4">
              {[
                ["customer", "Customer", "Acme Manufacturing"],
                ["asset", "Asset", "Hydraulic Press HP-420"],
                ["owner", "Owner", "Sarah Johnson"],
                ["value", "Estimated value", "3400"],
              ].map(([key, label, placeholder]) => (
                <label key={key} className="block">
                  <span
                    className={cn(
                      "text-sm font-bold",
                      darkMode ? "text-slate-200" : "text-slate-700",
                    )}
                  >
                    {label}
                  </span>
                  <input
                    value={form[key]}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        [key]: event.target.value,
                      }))
                    }
                    placeholder={placeholder}
                    className={cn(
                      "mt-2 h-12 w-full rounded-2xl px-4 text-sm outline-none ring-1 transition focus:ring-2",
                      darkMode
                        ? "bg-white/5 text-white ring-white/10 placeholder:text-slate-600 focus:ring-indigo-400/50"
                        : "bg-slate-50 text-slate-950 ring-slate-200 placeholder:text-slate-400 focus:ring-indigo-500/30",
                    )}
                  />
                </label>
              ))}
              <label className="block">
                <span
                  className={cn(
                    "text-sm font-bold",
                    darkMode ? "text-slate-200" : "text-slate-700",
                  )}
                >
                  Priority
                </span>
                <select
                  value={form.priority}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      priority: event.target.value,
                    }))
                  }
                  className={cn(
                    "mt-2 h-12 w-full rounded-2xl px-4 text-sm outline-none ring-1 transition focus:ring-2",
                    darkMode
                      ? "bg-white/5 text-white ring-white/10 focus:ring-indigo-400/50"
                      : "bg-slate-50 text-slate-950 ring-slate-200 focus:ring-indigo-500/30",
                  )}
                >
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                  <option>Critical</option>
                </select>
              </label>
              <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  className={cn(
                    "rounded-2xl px-5 py-3 text-sm font-bold ring-1",
                    darkMode
                      ? "ring-white/10 hover:bg-white/5"
                      : "ring-slate-200 hover:bg-slate-50",
                  )}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white hover:bg-indigo-500"
                >
                  Create order
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default CreateOrderModal;
