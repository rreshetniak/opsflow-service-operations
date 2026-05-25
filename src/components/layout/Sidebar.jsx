import { cn } from "../../utils/styles";
import Logo from "./Logo";
import { AnimatePresence } from "framer-motion";
import { X, Sparkles, ArrowUpRight } from "lucide-react";
import { navItems } from "../../data/mockData";


function Sidebar({ activePage, setActivePage, darkMode, sidebarOpen, setSidebarOpen }) {
  return (
    <>
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r p-4 transition-transform duration-300 lg:static lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
          darkMode ? "border-white/10 bg-[#0a0f1c]" : "border-slate-200 bg-white"
        )}
      >
        <div className="flex items-center justify-between px-1 py-2">
          <Logo darkMode={darkMode} />
          <button className={cn("rounded-xl p-2 lg:hidden", darkMode ? "hover:bg-white/10" : "hover:bg-slate-100")} onClick={() => setSidebarOpen(false)}>
            <X size={19} />
          </button>
        </div>

        <nav className="mt-8 space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActivePage(item.id);
                  setSidebarOpen(false);
                }}
                className={cn(
                  "group flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition",
                  active
                    ? darkMode
                      ? "bg-indigo-500/20 text-white ring-1 ring-indigo-400/20"
                      : "bg-slate-950 text-white shadow-sm"
                    : darkMode
                      ? "text-slate-400 hover:bg-white/7 hover:text-white"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
                )}
              >
                <Icon size={19} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="mt-auto space-y-4">
          <div
            className={cn(
              "rounded-3xl p-4 ring-1",
              darkMode
                ? "bg-gradient-to-br from-indigo-500/15 to-violet-500/10 ring-white/10"
                : "bg-gradient-to-br from-slate-950 to-indigo-950 text-white ring-transparent"
            )}
          >
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-500 text-white">
              <Sparkles size={19} />
            </div>
            <p className="font-bold">Need help?</p>
            <p className={cn("mt-1 text-sm", darkMode ? "text-slate-400" : "text-slate-300")}>Visit our help center or check implementation notes.</p>
            <button className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-blue-300">
              Open Help Center <ArrowUpRight size={15} />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;