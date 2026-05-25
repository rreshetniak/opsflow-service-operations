import { cn } from "../utils/styles";
import PageHeader from "../components/ui/PageHeader";
import Card from "../components/ui/Card";
import { Moon, Sun } from "lucide-react";

function SettingsPage({ darkMode, setDarkMode }) {
  return (
    <div>
      <PageHeader
        darkMode={darkMode}
        title="Settings"
        subtitle="Application preferences, user experience settings and operational defaults."
      />
      <Card darkMode={darkMode} className="p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
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
          <button
            onClick={() => setDarkMode((value) => !value)}
            className="inline-flex items-center gap-2 rounded-2xl bg-indigo-600 px-4 py-3 text-sm font-bold text-white"
          >
            {darkMode ? <Sun size={17} /> : <Moon size={17} />}{" "}
            {darkMode ? "Use light theme" : "Use dark theme"}
          </button>
        </div>
      </Card>
    </div>
  );
}

export default SettingsPage;
