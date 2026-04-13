export default function PremiumLoading() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6">
      <div className="mb-6 text-center">
        <div className="mx-auto h-8 w-48 animate-pulse rounded-lg bg-muted mb-2" />
        <div className="mx-auto h-4 w-64 animate-pulse rounded bg-muted" />
      </div>

      <div className="rounded-2xl border-2 border-primary/10 bg-card p-6 space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="h-5 w-5 shrink-0 animate-pulse rounded bg-muted" />
            <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
          </div>
        ))}
        <div className="h-12 w-full animate-pulse rounded-xl bg-muted mt-4" />
      </div>
    </div>
  );
}
