"use client";

import { useState } from "react";
interface TemplatePreviewFrameProps {
  src: string;
  title: string;
}

export function TemplatePreviewFrame({ src, title }: TemplatePreviewFrameProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* Loading skeleton */}
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      )}
      {/* Scaled-down iframe with fade-in */}
      <div
      >
        <iframe
          src={src}
          title={`${title} preview`}
          className="pointer-events-none origin-top-left"
          style={{
            width: "1280px",
            height: "800px",
            transform: "scale(0.375)",
            transformOrigin: "top left",
          }}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          tabIndex={-1}
        />
      </div>
    </div>
  );
}
