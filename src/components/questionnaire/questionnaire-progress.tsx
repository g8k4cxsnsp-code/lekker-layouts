"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuestionnaireProgressProps {
  currentStep: number;
  totalSteps: number;
  stepLabels: string[];
}

export function QuestionnaireProgress({
  currentStep,
  totalSteps,
  stepLabels,
}: QuestionnaireProgressProps) {
  return (
    <div className="mb-8">
      {/* Step indicators */}
      <div className="flex items-center justify-between">
        {Array.from({ length: totalSteps }, (_, i) => {
          const isCompleted = i < currentStep;
          const isCurrent = i === currentStep;

          return (
            <div key={i} className="flex flex-1 items-center">
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-colors",
                    isCompleted && "bg-primary text-primary-foreground",
                    isCurrent && "bg-primary text-primary-foreground ring-4 ring-primary/20",
                    !isCompleted && !isCurrent && "bg-muted text-muted-foreground"
                  )}
                >
                  {isCompleted ? <Check size={14} /> : i + 1}
                </div>
                <span
                  className={cn(
                    "mt-2 text-xs text-center max-w-[80px]",
                    isCurrent ? "font-medium text-foreground" : "text-muted-foreground"
                  )}
                >
                  {stepLabels[i]}
                </span>
              </div>

              {/* Connector line */}
              {i < totalSteps - 1 && (
                <div
                  className={cn(
                    "mx-2 h-0.5 flex-1",
                    i < currentStep ? "bg-primary" : "bg-border"
                  )}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
