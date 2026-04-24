"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-white">
      <section className="max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center shadow-lg">
        <p className="text-sm font-medium text-red-400">Application Error</p>

        <h1 className="mt-3 text-2xl font-bold">Something went wrong</h1>

        <p className="mt-3 text-sm leading-6 text-slate-400">
          {error.message || "An unexpected error happened. Please try again."}
        </p>

        <button
          type="button"
          onClick={reset}
          className="mt-6 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500"
        >
          Try again
        </button>
      </section>
    </main>
  );
}