import { useState } from "react";
import {
  DatabaseBackup,
  Moon,
  RotateCcw,
  ShieldCheck,
  Sun,
  X,
} from "lucide-react";

import Card from "../components/ui/Card";
import PageHeader from "../components/ui/PageHeader";
import { cn } from "../utils/styles";

function ResetDemoDataDialog({ open, darkMode, onCancel, onConfirm }) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm">
      <button
        type="button"
        className="absolute inset-0 cursor-default"
        onClick={onCancel}
        aria-label="Close reset confirmation"
      />

      <div
        className={cn(
          "relative w-full max-w-lg rounded-3xl p-6 shadow-2xl ring-1",
          darkMode
            ? "bg-[#111827] text-white ring-white/10"
            : "bg-white text-slate-950 ring-slate-200",
        )}
      >
        <div className="flex items-start justify-between gap-4">
          <div
            className={cn(
              "flex h-12 w-12 flex-none items-center justify-center rounded-2xl",
              darkMode
                ? "bg-indigo-500/15 text-indigo-200"
                : "bg-indigo-50 text-indigo-700",
            )}
          >
            <DatabaseBackup size={22} />
          </div>

          <button
            type="button"
            onClick={onCancel}
            className={cn(
              "rounded-2xl p-2 transition",
              darkMode ? "hover:bg-white/10" : "hover:bg-slate-100",
            )}
            aria-label="Close dialog"
          >
            <X size={20} />
          </button>
        </div>

        <div className="mt-5">
          <h2 className="text-2xl font-bold tracking-tight">
            Reset demo data?
          </h2>

          <p
            className={cn(
              "mt-2 text-sm leading-6",
              darkMode ? "text-slate-400" : "text-slate-500",
            )}
          >
            This will restore the original demo service orders and remove local
            changes such as created orders, deleted orders and status updates.
          </p>
        </div>

        <div
          className={cn(
            "mt-5 rounded-2xl p-4 ring-1",
            darkMode
              ? "bg-white/5 ring-white/10"
              : "bg-slate-50 ring-slate-200",
          )}
        >
          <p className="font-bold">Demo data will be restored</p>
          <p
            className={cn(
              "mt-1 text-sm",
              darkMode ? "text-slate-400" : "text-slate-500",
            )}
          >
            Theme preference will stay unchanged.
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
                : "ring-slate-200 hover:bg-slate-50",
            )}
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-indigo-500"
          >
            <RotateCcw size={17} />
            Reset demo data
          </button>
        </div>
      </div>
    </div>
  );
}

function SettingsPage({
  darkMode,
  setDarkMode,
  onResetDemoData,
  ordersCount,
}) {
  const [resetDialogOpen, setResetDialogOpen] = useState(false);
  const [resetCompleted, setResetCompleted] = useState(false);

  function handleOpenResetDialog() {
    setResetCompleted(false);
    setResetDialogOpen(true);
  }

  function handleCancelReset() {
    setResetDialogOpen(false);
  }

  function handleConfirmReset() {
    onResetDemoData?.();
    setResetDialogOpen(false);
    setResetCompleted(true);
  }

  return (
    <div>
      <PageHeader
        darkMode={darkMode}
        title="Settings"
        subtitle="Application preferences, demo data controls and operational defaults."
      />

      <div className="grid gap-6 xl:grid-cols-2">
        <Card darkMode={darkMode} className="p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "flex h-11 w-11 items-center justify-center rounded-2xl",
                    darkMode
                      ? "bg-amber-500/15 text-amber-200"
                      : "bg-amber-50 text-amber-700",
                  )}
                >
                  {darkMode ? <Moon size={20} /> : <Sun size={20} />}
                </div>

                <div>
                  <h3
                    className={cn(
                      "font-bold",
                      darkMode ? "text-white" : "text-slate-950",
                    )}
                  >
                    Appearance
                  </h3>

                  <p
                    className={cn(
                      "text-sm",
                      darkMode ? "text-slate-400" : "text-slate-500",
                    )}
                  >
                    Switch between light and dark theme.
                  </p>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setDarkMode((value) => !value)}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-indigo-500"
            >
              {darkMode ? <Sun size={17} /> : <Moon size={17} />}
              {darkMode ? "Use light theme" : "Use dark theme"}
            </button>
          </div>
        </Card>

        <Card darkMode={darkMode} className="p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "flex h-11 w-11 items-center justify-center rounded-2xl",
                    darkMode
                      ? "bg-indigo-500/15 text-indigo-200"
                      : "bg-indigo-50 text-indigo-700",
                  )}
                >
                  <DatabaseBackup size={20} />
                </div>

                <div>
                  <h3
                    className={cn(
                      "font-bold",
                      darkMode ? "text-white" : "text-slate-950",
                    )}
                  >
                    Demo data
                  </h3>

                  <p
                    className={cn(
                      "text-sm",
                      darkMode ? "text-slate-400" : "text-slate-500",
                    )}
                  >
                    Restore original service orders and clear local changes.
                  </p>
                </div>
              </div>

              <div
                className={cn(
                  "mt-5 rounded-2xl p-4 ring-1",
                  darkMode
                    ? "bg-white/5 ring-white/10"
                    : "bg-slate-50 ring-slate-200",
                )}
              >
                <p
                  className={cn(
                    "text-sm font-semibold",
                    darkMode ? "text-slate-300" : "text-slate-700",
                  )}
                >
                  Current local orders
                </p>

                <p
                  className={cn(
                    "mt-1 text-3xl font-bold",
                    darkMode ? "text-white" : "text-slate-950",
                  )}
                >
                  {ordersCount}
                </p>
              </div>

              {resetCompleted && (
                <div
                  className={cn(
                    "mt-4 flex items-center gap-2 rounded-2xl p-3 text-sm font-bold",
                    darkMode
                      ? "bg-emerald-500/10 text-emerald-200"
                      : "bg-emerald-50 text-emerald-700",
                  )}
                >
                  <ShieldCheck size={17} />
                  Demo data has been restored.
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={handleOpenResetDialog}
              className={cn(
                "inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-bold ring-1 transition",
                darkMode
                  ? "bg-white/5 text-slate-200 ring-white/10 hover:bg-white/10"
                  : "bg-white text-slate-700 ring-slate-200 hover:bg-slate-50",
              )}
            >
              <RotateCcw size={17} />
              Reset demo data
            </button>
          </div>
        </Card>
      </div>

      <ResetDemoDataDialog
        open={resetDialogOpen}
        darkMode={darkMode}
        onCancel={handleCancelReset}
        onConfirm={handleConfirmReset}
      />
    </div>
  );
}

export default SettingsPage;