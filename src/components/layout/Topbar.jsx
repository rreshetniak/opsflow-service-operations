import { cn } from "../../utils/styles";
import { Menu } from "lucide-react";
import { Search, Moon, Bell, ChevronDown, Sun } from "lucide-react";

function Topbar({ darkMode, setDarkMode, search, setSearch, setSidebarOpen }) {
  return (
    <header
      className={cn(
        "sticky top-0 z-30 border-b px-4 py-4 backdrop-blur-xl lg:px-7",
        darkMode
          ? "border-white/10 bg-[#0d1424]/85 text-white"
          : "border-slate-200 bg-white/85 text-slate-950",
      )}
    >
      <div className="flex items-center gap-3">
        <button
          className={cn(
            "rounded-xl p-2 lg:hidden",
            darkMode ? "hover:bg-white/10" : "hover:bg-slate-100",
          )}
          onClick={() => setSidebarOpen(true)}
        >
          <Menu size={22} />
        </button>

        <div
          className={cn(
            "flex h-11 min-w-0 flex-1 items-center gap-2 rounded-2xl px-3 ring-1 transition focus-within:ring-2",
            darkMode
              ? "bg-white/7 text-slate-400 ring-white/10 focus-within:ring-indigo-400/50"
              : "bg-slate-100 text-slate-500 ring-transparent focus-within:ring-indigo-500/30",
          )}
        >
          <Search size={18} />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search orders, customers, inventory..."
            className="w-full bg-transparent text-sm outline-none placeholder:text-inherit"
          />
          <span
            className={cn(
              "hidden rounded-lg px-2 py-1 text-xs font-semibold sm:inline-flex",
              darkMode
                ? "bg-white/7 text-slate-400"
                : "bg-white text-slate-400",
            )}
          >
            ⌘ K
          </span>
        </div>

        <button
          onClick={() => setDarkMode((value) => !value)}
          className={cn(
            "inline-flex h-11 w-11 items-center justify-center rounded-2xl ring-1 transition",
            darkMode
              ? "bg-white/7 text-amber-200 ring-white/10 hover:bg-white/10"
              : "bg-white text-slate-700 ring-slate-200 hover:bg-slate-50",
          )}
          aria-label="Toggle theme"
        >
          {darkMode ? <Sun size={19} /> : <Moon size={19} />}
        </button>

        <button
          className={cn(
            "relative hidden h-11 w-11 items-center justify-center rounded-2xl ring-1 sm:inline-flex",
            darkMode
              ? "bg-white/7 text-slate-300 ring-white/10"
              : "bg-white text-slate-700 ring-slate-200",
          )}
        >
          <Bell size={19} />
          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-500 text-[11px] font-bold text-white">
            3
          </span>
        </button>

        <button
          className={cn(
            "hidden items-center gap-3 rounded-2xl px-3 py-2 ring-1 xl:flex",
            darkMode ? "bg-white/7 ring-white/10" : "bg-white ring-slate-200",
          )}
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-orange-300 to-pink-500 text-sm font-bold text-white">
            M
          </div>
          <div className="text-left">
            <p className="text-sm font-bold">Michael Chen</p>
            <p
              className={cn(
                "text-xs",
                darkMode ? "text-slate-400" : "text-slate-500",
              )}
            >
              Operations Manager
            </p>
          </div>
          <ChevronDown
            size={16}
            className={darkMode ? "text-slate-500" : "text-slate-400"}
          />
        </button>
      </div>
    </header>
  );
}

export default Topbar;
