export function PageHeader({
  eyebrow,
  title,
  lead,
}: {
  eyebrow?: string;
  title: string;
  lead: string;
}) {
  return (
    <header className="border-b border-line bg-surface">
      <div className="wrap py-10 sm:py-12">
        {eyebrow ? <p className="text-sm font-bold text-accent">{eyebrow}</p> : null}
        <h1 className="mt-2 max-w-4xl text-3xl font-semibold tracking-tight text-ink sm:text-4xl">{title}</h1>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted sm:text-lg">{lead}</p>
      </div>
    </header>
  );
}
