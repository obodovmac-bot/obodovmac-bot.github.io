export function SectionTitle({
  eyebrow,
  title,
  text,
  id,
}: {
  eyebrow?: string;
  title: string;
  text?: string;
  id?: string;
}) {
  return (
    <div className="max-w-3xl">
      {eyebrow ? <p className="text-sm font-bold text-accent">{eyebrow}</p> : null}
      <h2 id={id} className="mt-1 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
        {title}
      </h2>
      {text ? <p className="mt-3 text-base leading-relaxed text-muted">{text}</p> : null}
    </div>
  );
}
