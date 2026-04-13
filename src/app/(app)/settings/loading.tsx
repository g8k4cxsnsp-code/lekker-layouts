export default function SettingsLoading() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6">
      <div className="mb-6">
        <div className="h-8 w-32 animate-pulse rounded-lg bg-muted" />
      </div>

      <div className="space-y-6 rounded-2xl border-2 border-primary/10 bg-card p-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="h-4 w-24 animate-pulse rounded bg-muted" />
            <div className="h-10 w-full animate-pulse rounded-xl bg-muted" />
          </div>
        ))}
        <div className="h-10 w-32 animate-pulse rounded-xl bg-muted" />
      </div>
    </div>
  );
}
