"use client";
import { Form } from "@/components/ui/form";
import { createValidationSchema } from "@/lib/validation";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { FieldRenderer } from "./field-renderer";
import { Button } from "@/components/ui/button";
import { FieldConfig, FormDataConfig } from "../types";
import { checkVisibilityCondition } from "@/lib/visibilityCondition";
import { useOnboardingStore } from "@/app/onboarding/store";
import { submitOnboarding } from "@/lib/api";

type Props = {
  formData: FormDataConfig;
};

const MultiStepForm = ({ formData }: Props) => {
  const [currentStep, setCurrentStep] = useState(0);
  const currentPage = formData.pages[currentStep];
  const {
    formData: savedData,
    _hasHydrated,
    setFormData,
    clearFormData,
  } = useOnboardingStore();
  const maxStep = formData.pages.length;

  const form = useForm<Record<string, unknown>>({
    defaultValues: {},
    mode: "onChange",
  });

  const valuesForm = useWatch({ control: form.control });

  const visibleFields = useMemo(() => {
    return checkVisibilityCondition({ fields: currentPage.fields, valuesForm });
  }, [currentPage.fields, valuesForm]);

  useEffect(() => {
    if (_hasHydrated && Object.keys(savedData).length > 0) {
      form.reset(savedData);
    }
  }, [_hasHydrated]);

  const validateVisibleFields = async () => {
    visibleFields.forEach((f) => form.clearErrors(f.id));
    const schema = createValidationSchema(visibleFields);
    const allValues = form.getValues();
    const visibleData = Object.fromEntries(
      visibleFields.map((field) => [field.id, allValues[field.id]])
    );
    const result = schema.safeParse(visibleData);

    if (result.success) return true;

    for (const issue of result.error.issues) {
      const fieldName = issue.path?.[0];
      if (typeof fieldName === "string") {
        form.setError(fieldName as any, {
          type: "manual",
          message: issue.message,
        });
      }
    }

    return false;
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((state) => state - 1);
    }
  };

  const handleSubmit = async () => {
    const ok = await validateVisibleFields();
    if (!ok) return;
    const currentFormData = form.getValues();
    console.log(currentFormData, "currentFormData");

    if (currentStep < maxStep - 1) {
      setFormData(currentFormData);
      setCurrentStep((s) => s + 1);
    } else {
      setFormData(currentFormData);
      try {
        const result = await submitOnboarding(currentFormData);
        console.log(result, "result");
        clearFormData();
        form.reset({});
        setCurrentStep(0);
      } catch (error) {
        console.error("Ошибка сети", error);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">{formData.title}</h2>
        <p className="text-sm text-gray-500 mt-1">
          Шаг {currentStep + 1} из {maxStep}: {currentPage.title}
        </p>
      </div>

      <Form {...form}>
        <form className="w-[400px] space-y-6">
          {visibleFields.map((field: FieldConfig) => (
            <FieldRenderer key={field.id} form={form} field={field} />
          ))}

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              onClick={handleBack}
              disabled={currentStep === 0}
              variant="outline"
              className="flex-1"
            >
              Назад
            </Button>

            <Button type="button" onClick={handleSubmit} className="flex-1">
              {currentStep < maxStep - 1 ? "Далее" : "Отправить"}
            </Button>
          </div>
        </form>
      </Form>

      <div className="flex gap-2 justify-center">
        {formData.pages.map((_, index) => (
          <div
            key={index}
            className={`h-2 w-2 rounded-full transition-colors ${
              index === currentStep
                ? "bg-blue-600"
                : index < currentStep
                ? "bg-blue-300"
                : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default MultiStepForm;
