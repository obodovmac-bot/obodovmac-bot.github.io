const links = [
  { name: "VK", href: "http://vk.com/public165631424" },
  { name: "OK", href: "https://ok.ru/group/58731022581760" },
  { name: "MAX", href: "https://max.ru/id5262035360_gos" },
  { name: "Telegram", href: "https://t.me/GBPOYSO_NYI" },
] as const;

export function SchoolSocials() {
  return (
    <div className="mt-8">
      <p className="text-sm font-bold text-hero-muted">Мы есть также:</p>
      <ul className="mt-3 flex flex-wrap gap-2">
        {links.map((item) => (
          <li key={item.name}>
            <a
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/45 px-3 text-sm font-semibold text-on-hero"
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <SocialIcon name={item.name} />
              {item.name}
              <span className="sr-only">, откроется в новой вкладке</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialIcon({ name }: { name: (typeof links)[number]["name"] }) {
  if (name === "VK") {
    return (
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
        <path fill="currentColor" d="M4 7.5h2.4c.1 2.7 1.3 4.3 2.2 4.9V7.5H11v3.2c.9-.1 1.8-1.5 2.1-3.2h2.3c-.3 1.7-1.4 3.1-2.2 3.7.8.4 2.1 1.6 2.6 3.3h-2.5c-.4-1.3-1.4-2.3-2.3-2.5v2.5H9.4V12c-1 .2-2.2 1.4-2.6 2.5H4.4c.5-1.7 2-3.4 3.1-4.1C6.3 9.6 4.8 8.1 4 7.5Z" />
      </svg>
    );
  }
  if (name === "OK") {
    return (
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
        <circle cx="12" cy="8" r="3.2" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <path fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" d="M8.2 14.2c1 .8 2.3 1.2 3.8 1.2s2.8-.4 3.8-1.2M12 15.4V18M9.2 20.2 12 18l2.8 2.2" />
      </svg>
    );
  }
  if (name === "MAX") {
    return (
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
        <path fill="currentColor" d="M5 6.5A2.5 2.5 0 0 1 7.5 4h9A2.5 2.5 0 0 1 19 6.5v7A2.5 2.5 0 0 1 16.5 16H12l-3.2 3.2c-.6.6-1.6.2-1.6-.7V16H7.5A2.5 2.5 0 0 1 5 13.5v-7Z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path fill="currentColor" d="M20.5 5.2 3.7 11.6c-1.1.4-1.1 1.1-.2 1.4l4.3 1.3 1.7 5.1c.2.6.1.8.7.8.4 0 .6-.2.8-.4l2.4-2.3 4.4 3.2c.8.5 1.4.2 1.6-.7l2.9-13.6c.3-1.2-.4-1.7-1.4-1.2ZM9.2 14.2l8.7-5.5c.4-.3.8-.1.5.2l-7.4 6.7-.3 3.2-1.5-4.6Z" />
    </svg>
  );
}
