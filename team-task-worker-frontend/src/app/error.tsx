"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="state-page">
      <section className="state-card">
        <p className="eyebrow">Application error</p>
        <h1>Something went wrong</h1>
        <p>
          {error.message || "An unexpected error happened. Please try again."}
        </p>
        <button
          type="button"
          onClick={reset}
          className="primary-action"
        >
          Try again
        </button>
      </section>
    </main>
  );
}
