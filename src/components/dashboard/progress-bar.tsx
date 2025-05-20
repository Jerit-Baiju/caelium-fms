"use client";

import { cn } from "@/lib/utils";
import * as React from "react";

interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  variant?: "default" | "success" | "info" | "warning" | "danger";
}

export function ProgressBar({
  value,
  max = 100,
  variant = "default",
  className,
  ...props
}: ProgressBarProps) {
  const percentage = Math.min(Math.max(0, (value / max) * 100), 100);

  const variantStyles = {
    default: "bg-primary",
    success: "bg-emerald-500",
    info: "bg-blue-500",
    warning: "bg-amber-500",
    danger: "bg-red-500",
  };

  return (
    <div
      className={cn("w-full bg-muted rounded-full overflow-hidden", className)}
      {...props}
    >
      <div
        className={cn("h-full transition-all", variantStyles[variant])}
        style={{ width: `${percentage}%` }}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
      />
    </div>
  );
}
