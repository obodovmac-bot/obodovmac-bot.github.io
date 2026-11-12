import Link from "next/link";

export default function NotFound() {
  return (
    <div className="wrap py-20">
      <p className="text-sm font-bold text-accent">404</p>
      <h1 className="mt-2 text-3xl font-semibold">Такой страницы нет</h1>
      <p className="mt-3 max-w-xl text-muted">Проверьте адрес или вернитесь к разделам сайта. Поиск поможет найти новость или программу.</p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link className="btn btn-primary" href="/">На главную</Link>
        <Link className="btn btn-secondary" href="/search">Открыть поиск</Link>
      </div>
    </div>
  );
}
