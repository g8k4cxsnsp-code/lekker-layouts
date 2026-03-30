"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import type { QuestionField } from "@/data/products";

interface QuestionnaireFieldProps {
  field: QuestionField;
  value: string | string[];
  onChange: (fieldId: string, value: string | string[]) => void;
  error?: string;
}

export function QuestionnaireField({
  field,
  value,
  onChange,
  error,
}: QuestionnaireFieldProps) {
  const stringValue = typeof value === "string" ? value : "";
  const arrayValue = Array.isArray(value) ? value : [];

  return (
    <div className="space-y-2">
      <Label htmlFor={field.id}>
        {field.label}
        {field.required && <span className="ml-1 text-destructive">*</span>}
      </Label>

      {field.type === "text" && (
        <Input
          id={field.id}
          value={stringValue}
          onChange={(e) => onChange(field.id, e.target.value)}
          placeholder={field.placeholder}
          maxLength={field.maxLength}
          className="h-10"
          aria-invalid={!!error}
        />
      )}

      {field.type === "url" && (
        <Input
          id={field.id}
          type="url"
          value={stringValue}
          onChange={(e) => onChange(field.id, e.target.value)}
          placeholder={field.placeholder}
          className="h-10"
          aria-invalid={!!error}
        />
      )}

      {field.type === "textarea" && (
        <Textarea
          id={field.id}
          value={stringValue}
          onChange={(e) => onChange(field.id, e.target.value)}
          placeholder={field.placeholder}
          maxLength={field.maxLength}
          className="min-h-24"
          aria-invalid={!!error}
        />
      )}

      {field.type === "select" && field.options && (
        <select
          id={field.id}
          value={stringValue}
          onChange={(e) => onChange(field.id, e.target.value)}
          className={cn(
            "h-10 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm transition-colors outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30",
            !stringValue && "text-muted-foreground",
            error && "border-destructive"
          )}
          aria-invalid={!!error}
        >
          <option value="" disabled>
            Select an option...
          </option>
          {field.options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      )}

      {field.type === "multi-select" && field.options && (
        <div className="flex flex-wrap gap-2">
          {field.options.map((option) => {
            const isSelected = arrayValue.includes(option);
            return (
              <button
                key={option}
                type="button"
                onClick={() => {
                  const newValue = isSelected
                    ? arrayValue.filter((v) => v !== option)
                    : [...arrayValue, option];
                  onChange(field.id, newValue);
                }}
                className={cn(
                  "rounded-full border px-3 py-1.5 text-sm transition-colors",
                  isSelected
                    ? "border-primary bg-primary/10 text-primary font-medium"
                    : "border-border bg-card text-muted-foreground hover:border-primary/30 hover:text-foreground"
                )}
              >
                {option}
              </button>
            );
          })}
        </div>
      )}

      {field.helpText && (
        <p className="text-xs text-muted-foreground">{field.helpText}</p>
      )}

      {error && (
        <p className="text-xs text-destructive">{error}</p>
      )}
    </div>
  );
}
