import { ExternalLink } from "lucide-react";

export function OfficialLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a className="official-link inline-flex items-center gap-1" href={href} target="_blank" rel="noopener noreferrer">
      {children}
      <ExternalLink aria-hidden size={16} />
      <span className="sr-only">, откроется официальный сайт</span>
    </a>
  );
}
