import { cn } from "../../utils/styles";

function Sparkline({ darkMode, accent }) {
  const colorMap = {
    indigo: "stroke-indigo-500",
    violet: "stroke-violet-500",
    blue: "stroke-blue-500",
    emerald: "stroke-emerald-500",
  };
  return (
    <svg
      width="72"
      height="34"
      viewBox="0 0 72 34"
      fill="none"
      className="mt-2 opacity-90"
    >
      <path
        d="M2 27 C8 23 12 28 17 22 C22 17 27 20 33 15 C39 10 45 18 50 11 C55 4 61 8 70 2"
        className={cn(colorMap[accent], darkMode ? "opacity-90" : "opacity-80")}
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default Sparkline;
