"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

interface UserAvatarProps {
  src?: string | null;
  name?: string | null;
  size?: "xs" | "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  xs: "h-7 w-7 text-xs",
  sm: "h-10 w-10 text-sm",
  md: "h-12 w-12 text-lg",
  lg: "h-16 w-16 text-2xl sm:h-20 sm:w-20",
};

const imageSizes = {
  xs: 28,
  sm: 40,
  md: 48,
  lg: 80,
};

export function UserAvatar({ src, name, size = "sm", className }: UserAvatarProps) {
  const initial = name?.[0]?.toUpperCase() || "?";

  if (src) {
    return (
      <div
        className={cn(
          "relative shrink-0 overflow-hidden rounded-full",
          sizeClasses[size],
          className
        )}
      >
        <Image
          src={src}
          alt={name || "Avatar"}
          width={imageSizes[size]}
          height={imageSizes[size]}
          className="h-full w-full object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full bg-primary/10 font-bold text-primary",
        sizeClasses[size],
        className
      )}
    >
      {initial}
    </div>
  );
}
