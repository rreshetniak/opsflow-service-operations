import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

import { cn } from "../../utils/styles";

const initialForm = {
  customer: "",
  location: "",
  asset: "",
  priority: "Medium",
  owner: "",
  value: "",
};

export default function CreateOrderModal({
  open,
  onClose,
  onCreate,
  darkMode,
}) {
  const [form, setForm] = useState(initialForm);

  function updateField(field, value) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const order = {
      id: `SO-${Math.floor(1050 + Math.random() * 900)}`,
      customer: form.customer.trim() || "New Customer GmbH",
      location: form.location.trim() || "Berlin, DE",
      asset: form.asset.trim() || "Industrial Asset",
      status: "Assigned",
      priority: form.priority,
      owner: form.owner.trim() || "Michael Chen",
      due: "Jun 10, 2026",
      dueHint: "17 days left",
      value: Number(form.value || 2500),
    };

    onCreate(order);
    setForm(initialForm);
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
                : "bg-white text-slate-950 ring-slate-200"
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
                    darkMode ? "text-slate-400" : "text-slate-500"
                  )}
                >
                  Add a new operational work item to the service queue.
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                className={cn(
                  "rounded-xl p-2 transition",
                  darkMode ? "hover:bg-white/10" : "hover:bg-slate-100"
                )}
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span
                    className={cn(
                      "text-sm font-bold",
                      darkMode ? "text-slate-200" : "text-slate-700"
                    )}
                  >
                    Customer
                  </span>
                  <input
                    value={form.customer}
                    onChange={(event) =>
                      updateField("customer", event.target.value)
                    }
                    placeholder="Acme Manufacturing"
                    className={cn(
                      "mt-2 h-12 w-full rounded-2xl px-4 text-sm outline-none ring-1 transition focus:ring-2",
                      darkMode
                        ? "bg-white/5 text-white ring-white/10 placeholder:text-slate-500 focus:ring-indigo-400/50"
                        : "bg-slate-50 text-slate-950 ring-slate-200 placeholder:text-slate-400 focus:ring-indigo-500/30"
                    )}
                  />
                </label>

                <label className="block">
                  <span
                    className={cn(
                      "text-sm font-bold",
                      darkMode ? "text-slate-200" : "text-slate-700"
                    )}
                  >
                    Location
                  </span>
                  <input
                    value={form.location}
                    onChange={(event) =>
                      updateField("location", event.target.value)
                    }
                    placeholder="Berlin, DE"
                    className={cn(
                      "mt-2 h-12 w-full rounded-2xl px-4 text-sm outline-none ring-1 transition focus:ring-2",
                      darkMode
                        ? "bg-white/5 text-white ring-white/10 placeholder:text-slate-500 focus:ring-indigo-400/50"
                        : "bg-slate-50 text-slate-950 ring-slate-200 placeholder:text-slate-400 focus:ring-indigo-500/30"
                    )}
                  />
                </label>
              </div>

              <label className="block">
                <span
                  className={cn(
                    "text-sm font-bold",
                    darkMode ? "text-slate-200" : "text-slate-700"
                  )}
                >
                  Asset
                </span>
                <input
                  value={form.asset}
                  onChange={(event) => updateField("asset", event.target.value)}
                  placeholder="Hydraulic Press HP-420"
                  className={cn(
                    "mt-2 h-12 w-full rounded-2xl px-4 text-sm outline-none ring-1 transition focus:ring-2",
                    darkMode
                      ? "bg-white/5 text-white ring-white/10 placeholder:text-slate-500 focus:ring-indigo-400/50"
                      : "bg-slate-50 text-slate-950 ring-slate-200 placeholder:text-slate-400 focus:ring-indigo-500/30"
                  )}
                />
              </label>

              <div className="grid gap-4 sm:grid-cols-3">
                <label className="block">
                  <span
                    className={cn(
                      "text-sm font-bold",
                      darkMode ? "text-slate-200" : "text-slate-700"
                    )}
                  >
                    Priority
                  </span>
                  <select
                    value={form.priority}
                    onChange={(event) =>
                      updateField("priority", event.target.value)
                    }
                    className={cn(
                      "mt-2 h-12 w-full rounded-2xl px-4 text-sm outline-none ring-1 transition focus:ring-2",
                      darkMode
                        ? "bg-[#111827] text-white ring-white/10 focus:ring-indigo-400/50"
                        : "bg-slate-50 text-slate-950 ring-slate-200 focus:ring-indigo-500/30"
                    )}
                  >
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                    <option>Critical</option>
                  </select>
                </label>

                <label className="block">
                  <span
                    className={cn(
                      "text-sm font-bold",
                      darkMode ? "text-slate-200" : "text-slate-700"
                    )}
                  >
                    Owner
                  </span>
                  <input
                    value={form.owner}
                    onChange={(event) => updateField("owner", event.target.value)}
                    placeholder="Sarah Johnson"
                    className={cn(
                      "mt-2 h-12 w-full rounded-2xl px-4 text-sm outline-none ring-1 transition focus:ring-2",
                      darkMode
                        ? "bg-white/5 text-white ring-white/10 placeholder:text-slate-500 focus:ring-indigo-400/50"
                        : "bg-slate-50 text-slate-950 ring-slate-200 placeholder:text-slate-400 focus:ring-indigo-500/30"
                    )}
                  />
                </label>

                <label className="block">
                  <span
                    className={cn(
                      "text-sm font-bold",
                      darkMode ? "text-slate-200" : "text-slate-700"
                    )}
                  >
                    Value
                  </span>
                  <input
                    type="number"
                    min="0"
                    value={form.value}
                    onChange={(event) => updateField("value", event.target.value)}
                    placeholder="3400"
                    className={cn(
                      "mt-2 h-12 w-full rounded-2xl px-4 text-sm outline-none ring-1 transition focus:ring-2",
                      darkMode
                        ? "bg-white/5 text-white ring-white/10 placeholder:text-slate-500 focus:ring-indigo-400/50"
                        : "bg-slate-50 text-slate-950 ring-slate-200 placeholder:text-slate-400 focus:ring-indigo-500/30"
                    )}
                  />
                </label>
              </div>

              <div
                className={cn(
                  "rounded-2xl p-4 text-sm",
                  darkMode
                    ? "bg-indigo-500/10 text-indigo-100"
                    : "bg-indigo-50 text-indigo-800"
                )}
              >
                New orders are created with status <strong>Assigned</strong> and
                immediately appear at the top of the service order queue.
              </div>

              <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={onClose}
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
                  type="submit"
                  className="rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-indigo-500"
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