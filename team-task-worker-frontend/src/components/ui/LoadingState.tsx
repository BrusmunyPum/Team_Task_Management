export function LoadingState({ label = "Loading workspace..." }: { label?: string }) {
  return (
    <section className="loading-state" aria-live="polite">
      <span className="loading-spinner" aria-hidden="true" />
      <p>{label}</p>
    </section>
  );
}
