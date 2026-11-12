import Link from "next/link";
import { cn } from "@/lib/cn";

type ButtonProps = {
  href?: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "hero" | "hero-quiet";
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  ariaExpanded?: boolean;
  ariaControls?: string;
  ariaLabel?: string;
};

const variants = {
  primary: "btn btn-primary",
  secondary: "btn btn-secondary",
  ghost: "btn btn-ghost",
  hero: "btn btn-hero",
  "hero-quiet": "btn btn-hero-quiet",
};

export function Button({
  href,
  children,
  variant = "primary",
  className,
  type = "button",
  onClick,
  ariaExpanded,
  ariaControls,
  ariaLabel,
}: ButtonProps) {
  const classes = cn(variants[variant], className);
  if (href) {
    return (
      <Link href={href} className={classes} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }
  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      aria-expanded={ariaExpanded}
      aria-controls={ariaControls}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
