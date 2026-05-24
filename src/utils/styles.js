export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function statusStyles(status, darkMode) {
  const map = {
    "In Progress": darkMode
      ? "bg-blue-500/15 text-blue-200 ring-blue-400/20"
      : "bg-blue-50 text-blue-700 ring-blue-600/10",
    "Waiting Parts": darkMode
      ? "bg-amber-500/15 text-amber-200 ring-amber-400/20"
      : "bg-amber-50 text-amber-700 ring-amber-600/10",
    Approval: darkMode
      ? "bg-violet-500/15 text-violet-200 ring-violet-400/20"
      : "bg-violet-50 text-violet-700 ring-violet-600/10",
    Assigned: darkMode
      ? "bg-teal-500/15 text-teal-200 ring-teal-400/20"
      : "bg-teal-50 text-teal-700 ring-teal-600/10",
    Completed: darkMode
      ? "bg-emerald-500/15 text-emerald-200 ring-emerald-400/20"
      : "bg-emerald-50 text-emerald-700 ring-emerald-600/10",
  };
  return map[status] || map.Assigned;
}

export function priorityStyles(priority, darkMode) {
  const map = {
    Critical: darkMode
      ? "bg-red-500/15 text-red-200 ring-red-400/20"
      : "bg-red-50 text-red-700 ring-red-600/10",
    High: darkMode
      ? "bg-orange-500/15 text-orange-200 ring-orange-400/20"
      : "bg-orange-50 text-orange-700 ring-orange-600/10",
    Medium: darkMode
      ? "bg-yellow-500/15 text-yellow-200 ring-yellow-400/20"
      : "bg-yellow-50 text-yellow-700 ring-yellow-600/10",
    Low: darkMode
      ? "bg-emerald-500/15 text-emerald-200 ring-emerald-400/20"
      : "bg-emerald-50 text-emerald-700 ring-emerald-600/10",
  };
  return map[priority] || map.Medium;
}
