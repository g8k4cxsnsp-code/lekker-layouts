"use client";

import { useState, useEffect, useCallback } from "react";
import { ArrowLeft, ArrowRight, Loader2, AlertCircle } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { submitQuestionnaire } from "@/lib/webhooks";
import { SITE_CONFIG } from "@/lib/constants";
import { QuestionnaireSection } from "./questionnaire-section";
import { QuestionnaireProgress } from "./questionnaire-progress";
import { QuestionnaireSubmitted } from "./questionnaire-submitted";
import type { Product } from "@/data/products";

interface QuestionnaireFormProps {
  product: Product;
  customerName: string;
  customerEmail: string;
  orderId: string;
}

type FormState = "filling" | "submitting" | "submitted" | "error";

export function QuestionnaireForm({
  product,
  customerName,
  customerEmail,
  orderId,
}: QuestionnaireFormProps) {
  const sections = product.questionnaire;
  const isMultiStep = sections.length > 3;
  const [currentStep, setCurrentStep] = useState(0);
  const [formState, setFormState] = useState<FormState>("filling");
  const [errorMessage, setErrorMessage] = useState("");
  const [values, setValues] = useState<Record<string, string | string[]>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const storageKey = `questionnaire-${orderId}`;

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        setValues(parsed.values || {});
        if (typeof parsed.step === "number") setCurrentStep(parsed.step);
      }
    } catch {
      // Ignore parse errors
    }
  }, [storageKey]);

  // Save to localStorage on change
  const saveProgress = useCallback(() => {
    try {
      localStorage.setItem(
        storageKey,
        JSON.stringify({ values, step: currentStep })
      );
    } catch {
      // Ignore storage errors
    }
  }, [storageKey, values, currentStep]);

  useEffect(() => {
    const timer = setTimeout(saveProgress, 500);
    return () => clearTimeout(timer);
  }, [saveProgress]);

  const handleChange = (fieldId: string, value: string | string[]) => {
    setValues((prev) => ({ ...prev, [fieldId]: value }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[fieldId];
      return next;
    });
  };

  const validateSection = (sectionIndex: number): boolean => {
    const section = sections[sectionIndex];
    const newErrors: Record<string, string> = {};

    for (const field of section.fields) {
      if (!field.required) continue;

      const val = values[field.id];

      if (field.type === "multi-select") {
        if (!Array.isArray(val) || val.length === 0) {
          newErrors[field.id] = "Please select at least one option.";
        }
      } else {
        if (!val || (typeof val === "string" && !val.trim())) {
          newErrors[field.id] = "This field is required.";
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateAll = (): boolean => {
    const allErrors: Record<string, string> = {};

    for (const section of sections) {
      for (const field of section.fields) {
        if (!field.required) continue;
        const val = values[field.id];

        if (field.type === "multi-select") {
          if (!Array.isArray(val) || val.length === 0) {
            allErrors[field.id] = "Please select at least one option.";
          }
        } else {
          if (!val || (typeof val === "string" && !val.trim())) {
            allErrors[field.id] = "This field is required.";
          }
        }
      }
    }

    setErrors(allErrors);
    return Object.keys(allErrors).length === 0;
  };

  const handleNext = () => {
    if (validateSection(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, sections.length - 1));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async () => {
    const isValid = isMultiStep ? validateAll() : validateSection(0) && validateAll();
    if (!isValid) {
      if (isMultiStep) {
        // Find first section with errors and navigate there
        for (let i = 0; i < sections.length; i++) {
          const sectionFieldIds = sections[i].fields.map((f) => f.id);
          const hasError = sectionFieldIds.some((id) => errors[id]);
          if (hasError) {
            setCurrentStep(i);
            break;
          }
        }
      }
      return;
    }

    setFormState("submitting");
    setErrorMessage("");

    const result = await submitQuestionnaire({
      orderId,
      productSlug: product.slug,
      productName: product.name,
      customerName,
      customerEmail,
      responses: values,
      submittedAt: new Date().toISOString(),
    });

    if (result.success) {
      setFormState("submitted");
      localStorage.removeItem(storageKey);
    } else {
      setFormState("error");
      setErrorMessage(result.message || "Something went wrong. Please try again.");
    }
  };

  if (formState === "submitted") {
    return <QuestionnaireSubmitted product={product} email={customerEmail} />;
  }

  const stepLabels = sections.map((s) => s.title);

  return (
    <div>
      {/* Multi-step progress */}
      {isMultiStep && (
        <QuestionnaireProgress
          currentStep={currentStep}
          totalSteps={sections.length}
          stepLabels={stepLabels}
        />
      )}

      {/* Form sections */}
      <div className="rounded-xl border border-border bg-card p-6">
        {isMultiStep ? (
          <QuestionnaireSection
            section={sections[currentStep]}
            values={values}
            onChange={handleChange}
            errors={errors}
          />
        ) : (
          <div className="space-y-8">
            {sections.map((section) => (
              <QuestionnaireSection
                key={section.title}
                section={section}
                values={values}
                onChange={handleChange}
                errors={errors}
              />
            ))}
          </div>
        )}
      </div>

      {/* Error banner */}
      {formState === "error" && (
        <div className="mt-4 flex items-start gap-3 rounded-lg border border-destructive/30 bg-destructive/5 p-4">
          <AlertCircle size={18} className="mt-0.5 shrink-0 text-destructive" />
          <div className="text-sm">
            <p className="font-medium text-destructive">{errorMessage}</p>
            <p className="mt-1 text-muted-foreground">
              You can also{" "}
              <a
                href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(`Hi! I purchased the ${product.name} (Order #LL-${orderId}) but had trouble submitting my questionnaire. Can you help?`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary underline"
              >
                WhatsApp us
              </a>{" "}
              and we&apos;ll process your order manually.
            </p>
          </div>
        </div>
      )}

      {/* Navigation buttons */}
      <div className="mt-6 flex gap-3">
        {isMultiStep && currentStep > 0 && (
          <button
            type="button"
            onClick={handleBack}
            className={cn(buttonVariants({ variant: "outline", size: "lg" }), "gap-2")}
          >
            <ArrowLeft size={16} />
            Back
          </button>
        )}

        <div className="flex-1" />

        {isMultiStep && currentStep < sections.length - 1 ? (
          <button
            type="button"
            onClick={handleNext}
            className={cn(buttonVariants({ size: "lg" }), "gap-2")}
          >
            Next
            <ArrowRight size={16} />
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={formState === "submitting"}
            className={cn(
              buttonVariants({ size: "lg" }),
              "gap-2 glow-primary",
              formState === "submitting" && "opacity-70 cursor-not-allowed"
            )}
          >
            {formState === "submitting" ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Submitting...
              </>
            ) : formState === "error" ? (
              "Try Again"
            ) : (
              <>
                Submit
                <ArrowRight size={16} />
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
