export default function DiscoverLoading() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6">
      <div className="mb-6">
        <div className="h-8 w-48 animate-pulse rounded-lg bg-muted mb-2" />
        <div className="h-10 w-full animate-pulse rounded-xl bg-muted" />
      </div>

      {/* Profile card skeletons */}
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-4 rounded-2xl border-2 border-primary/10 bg-card p-4"
          >
            <div className="h-12 w-12 shrink-0 animate-pulse rounded-full bg-muted" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-40 animate-pulse rounded bg-muted" />
              <div className="h-3 w-24 animate-pulse rounded bg-muted" />
            </div>
            <div className="h-9 w-24 animate-pulse rounded-xl bg-muted" />
          </div>
        ))}
      </div>
    </div>
  );
}
