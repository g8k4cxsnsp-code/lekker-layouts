export default function FeedLoading() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6">
      {/* Composer skeleton */}
      <div className="mb-6 rounded-2xl border-2 border-primary/10 bg-card p-4">
        <div className="flex items-start gap-3">
          <div className="h-10 w-10 shrink-0 animate-pulse rounded-full bg-muted" />
          <div className="h-20 flex-1 animate-pulse rounded-xl bg-muted" />
        </div>
      </div>

      {/* Post skeletons */}
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="mb-4 rounded-2xl border-2 border-primary/10 bg-card p-5"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 shrink-0 animate-pulse rounded-full bg-muted" />
            <div className="space-y-2">
              <div className="h-4 w-32 animate-pulse rounded bg-muted" />
              <div className="h-3 w-20 animate-pulse rounded bg-muted" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="h-3 w-full animate-pulse rounded bg-muted" />
            <div className="h-3 w-4/5 animate-pulse rounded bg-muted" />
            <div className="h-3 w-3/5 animate-pulse rounded bg-muted" />
          </div>
          <div className="mt-4 flex gap-4">
            <div className="h-8 w-16 animate-pulse rounded-lg bg-muted" />
            <div className="h-8 w-16 animate-pulse rounded-lg bg-muted" />
          </div>
        </div>
      ))}
    </div>
  );
}
