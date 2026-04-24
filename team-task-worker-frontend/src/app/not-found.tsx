import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-white">
      <section className="max-w-md text-center">
        <p className="text-sm font-semibold text-blue-400">404</p>

        <h1 className="mt-3 text-3xl font-bold">Page not found</h1>

        <p className="mt-3 text-sm leading-6 text-slate-400">
          The page you are looking for does not exist.
        </p>

        <Link
          href="/"
          className="mt-6 inline-flex rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500"
        >
          Back to home
        </Link>
      </section>
    </main>
  );
}