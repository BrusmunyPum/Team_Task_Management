export function LoadingSpinner() {
  return (
    <span
      aria-label="Loading"
      className="skeleton"
      style={{ display: "inline-block", width: 42, height: 42, borderRadius: "50%" }}
    />
  );
}
