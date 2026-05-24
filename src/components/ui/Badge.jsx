import { cn } from "../../utils/styles";

function Badge({ children, className }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset",
        className,
      )}
    >
      {children}
    </span>
  );
}

export default Badge