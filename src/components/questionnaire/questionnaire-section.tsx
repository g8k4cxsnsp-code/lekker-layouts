"use client";

import { QuestionnaireField } from "./questionnaire-field";
import type { QuestionnaireSection as QuestionnaireSecType } from "@/data/products";

interface QuestionnaireSectionProps {
  section: QuestionnaireSecType;
  values: Record<string, string | string[]>;
  onChange: (fieldId: string, value: string | string[]) => void;
  errors: Record<string, string>;
}

export function QuestionnaireSection({
  section,
  values,
  onChange,
  errors,
}: QuestionnaireSectionProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-heading text-lg font-semibold text-foreground">
          {section.title}
        </h3>
        {section.description && (
          <p className="mt-1 text-sm text-muted-foreground">
            {section.description}
          </p>
        )}
      </div>

      <div className="space-y-5">
        {section.fields.map((field) => (
          <QuestionnaireField
            key={field.id}
            field={field}
            value={values[field.id] ?? (field.type === "multi-select" ? [] : "")}
            onChange={onChange}
            error={errors[field.id]}
          />
        ))}
      </div>
    </div>
  );
}
