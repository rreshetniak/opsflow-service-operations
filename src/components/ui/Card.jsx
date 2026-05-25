import { cn } from "../../utils/styles";

function Card({ children, darkMode, className = "" }) {
  return (
    <div
      className={cn(
        "rounded-3xl shadow-sm ring-1",
        darkMode ? "bg-white/[0.055] ring-white/10" : "bg-white ring-slate-200",
        className,
      )}
    >
      {children}
    </div>
  );
}

export default Card;