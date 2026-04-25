import Link from "next/link";

export default function NotFound() {
  return (
    <main className="state-page">
      <section className="state-card">
        <p className="eyebrow">404</p>
        <h1>Page not found</h1>
        <p>
          The page you are looking for does not exist.
        </p>
        <Link href="/dashboard" className="primary-action">
          Back to dashboard
        </Link>
      </section>
    </main>
  );
}
