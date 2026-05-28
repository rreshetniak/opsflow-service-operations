import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import {
  Bell,
  CheckCircle2,
  ChevronDown,
  LogOut,
  Menu,
  Moon,
  Search,
  Settings,
  Sun,
  UserRound,
} from "lucide-react";

import { cn } from "../../utils/styles";

const initialNotifications = [
  {
    id: "ntf-1",
    title: "SLA breach risk on SO-1046",
    text: "Critical service order is approaching the due date.",
    time: "9:15 AM",
    type: "risk",
  },
  {
    id: "ntf-2",
    title: "SO-1047 status updated",
    text: "Service order changed to Waiting Parts.",
    time: "9:58 AM",
    type: "status",
  },
  {
    id: "ntf-3",
    title: "New order created",
    text: "A new assigned service order was added to the queue.",
    time: "10:24 AM",
    type: "order",
  },
];

function Topbar({
  darkMode,
  setDarkMode,
  search,
  setSearch,
  setSidebarOpen,
}) {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifications, setNotifications] = useState(initialNotifications);

  const notificationsRef = useRef(null);
  const profileRef = useRef(null);

  const unreadCount = notifications.length;

  useEffect(() => {
    function handlePointerDown(event) {
      const clickedNotifications = notificationsRef.current?.contains(
        event.target,
      );

      const clickedProfile = profileRef.current?.contains(event.target);

      if (!clickedNotifications) {
        setNotificationsOpen(false);
      }

      if (!clickedProfile) {
        setProfileOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, []);

  useEffect(() => {
    function handleEscape(event) {
      if (event.key === "Escape") {
        setNotificationsOpen(false);
        setProfileOpen(false);
      }
    }

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  function toggleNotifications() {
    setNotificationsOpen((current) => !current);
    setProfileOpen(false);
  }

  function toggleProfile() {
    setProfileOpen((current) => !current);
    setNotificationsOpen(false);
  }

  function markAllAsRead() {
    setNotifications([]);
  }

  function closeMenus() {
    setNotificationsOpen(false);
    setProfileOpen(false);
  }

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
          type="button"
          className={cn(
            "rounded-xl p-2 lg:hidden",
            darkMode ? "hover:bg-white/10" : "hover:bg-slate-100",
          )}
          onClick={() => setSidebarOpen(true)}
          aria-label="Open sidebar"
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
          type="button"
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

        <div ref={notificationsRef} className="relative">
          <button
            type="button"
            onClick={toggleNotifications}
            className={cn(
              "relative inline-flex h-11 w-11 items-center justify-center rounded-2xl ring-1 transition",
              darkMode
                ? "bg-white/7 text-slate-300 ring-white/10 hover:bg-white/10"
                : "bg-white text-slate-700 ring-slate-200 hover:bg-slate-50",
            )}
            aria-label="Open notifications"
          >
            <Bell size={19} />

            {unreadCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-500 text-[11px] font-bold text-white">
                {unreadCount}
              </span>
            )}
          </button>

          {notificationsOpen && (
            <div
              className={cn(
                "absolute right-0 z-50 mt-3 w-[22rem] rounded-3xl p-3 shadow-2xl ring-1",
                darkMode
                  ? "bg-[#111827] ring-white/10"
                  : "bg-white ring-slate-200",
              )}
            >
              <div className="flex items-start justify-between gap-4 px-3 py-2">
                <div>
                  <p className="font-bold">Notifications</p>
                  <p
                    className={cn(
                      "text-sm",
                      darkMode ? "text-slate-400" : "text-slate-500",
                    )}
                  >
                    Latest operational updates
                  </p>
                </div>

                <button
                  type="button"
                  onClick={markAllAsRead}
                  disabled={notifications.length === 0}
                  className={cn(
                    "rounded-xl px-3 py-2 text-xs font-bold transition disabled:cursor-not-allowed disabled:opacity-50",
                    darkMode
                      ? "bg-white/5 text-indigo-300 hover:bg-white/10"
                      : "bg-indigo-50 text-indigo-600 hover:bg-indigo-100",
                  )}
                >
                  Mark all read
                </button>
              </div>

              <div className="mt-2 max-h-96 space-y-2 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div
                    className={cn(
                      "rounded-2xl p-5 text-center",
                      darkMode ? "bg-white/5" : "bg-slate-50",
                    )}
                  >
                    <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-500">
                      <CheckCircle2 size={18} />
                    </div>
                    <p className="mt-3 font-bold">All caught up</p>
                    <p
                      className={cn(
                        "mt-1 text-sm",
                        darkMode ? "text-slate-400" : "text-slate-500",
                      )}
                    >
                      There are no unread notifications.
                    </p>
                  </div>
                ) : (
                  notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={cn(
                        "rounded-2xl p-3 transition",
                        darkMode ? "hover:bg-white/5" : "hover:bg-slate-50",
                      )}
                    >
                      <div className="flex gap-3">
                        <div
                          className={cn(
                            "mt-0.5 flex h-9 w-9 flex-none items-center justify-center rounded-xl",
                            notification.type === "risk"
                              ? "bg-amber-500/15 text-amber-500"
                              : notification.type === "status"
                                ? "bg-emerald-500/15 text-emerald-500"
                                : "bg-indigo-500/15 text-indigo-500",
                          )}
                        >
                          <CheckCircle2 size={16} />
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-3">
                            <p className="text-sm font-bold">
                              {notification.title}
                            </p>

                            <span
                              className={cn(
                                "flex-none text-xs",
                                darkMode ? "text-slate-500" : "text-slate-400",
                              )}
                            >
                              {notification.time}
                            </span>
                          </div>

                          <p
                            className={cn(
                              "mt-1 text-xs",
                              darkMode ? "text-slate-400" : "text-slate-500",
                            )}
                          >
                            {notification.text}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        <div ref={profileRef} className="relative">
          <button
            type="button"
            onClick={toggleProfile}
            className={cn(
              "flex items-center gap-3 rounded-2xl px-3 py-2 ring-1 transition",
              darkMode
                ? "bg-white/7 ring-white/10 hover:bg-white/10"
                : "bg-white ring-slate-200 hover:bg-slate-50",
            )}
            aria-label="Open profile menu"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-orange-300 to-pink-500 text-sm font-bold text-white">
              M
            </div>

            <div className="hidden text-left md:block">
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

          {profileOpen && (
            <div
              className={cn(
                "absolute right-0 z-50 mt-3 w-72 rounded-3xl p-3 shadow-2xl ring-1",
                darkMode
                  ? "bg-[#111827] ring-white/10"
                  : "bg-white ring-slate-200",
              )}
            >
              <div
                className={cn(
                  "rounded-2xl p-4",
                  darkMode ? "bg-white/5" : "bg-slate-50",
                )}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-orange-300 to-pink-500 text-sm font-bold text-white">
                    M
                  </div>

                  <div>
                    <p className="font-bold">Michael Chen</p>
                    <p
                      className={cn(
                        "text-sm",
                        darkMode ? "text-slate-400" : "text-slate-500",
                      )}
                    >
                      Operations Manager
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-2 space-y-1">
                <button
                  type="button"
                  className={cn(
                    "flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-sm font-bold transition",
                    darkMode ? "hover:bg-white/5" : "hover:bg-slate-50",
                  )}
                >
                  <UserRound size={17} /> Profile overview
                </button>

                <Link
                  to="/settings"
                  onClick={closeMenus}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-sm font-bold transition",
                    darkMode ? "hover:bg-white/5" : "hover:bg-slate-50",
                  )}
                >
                  <Settings size={17} /> Account settings
                </Link>

                <button
                  type="button"
                  disabled
                  className={cn(
                    "flex w-full cursor-not-allowed items-center gap-3 rounded-2xl px-3 py-3 text-sm font-bold opacity-50",
                    darkMode ? "text-slate-400" : "text-slate-500",
                  )}
                >
                  <LogOut size={17} /> Sign out unavailable in demo
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Topbar;