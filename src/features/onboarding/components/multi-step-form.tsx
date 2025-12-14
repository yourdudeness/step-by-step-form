"use client";
import { Form } from "@/components/ui/form";
import { createValidationSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { FieldRenderer } from "./field-renderer";
import { Button } from "@/components/ui/button";
import { FieldConfig, FormDataConfig } from "../types";
import { checkVisibilityCondition } from "@/lib/visibilityCondition";

type Props = {
  formData: FormDataConfig;
};

const MultiStepForm = ({ formData }: Props) => {
  const [currentStep, setCurrentStep] = useState(0);
  const currentPage = formData.pages[currentStep];
  const maxStep = formData.pages.length;

  const schema = createValidationSchema(currentPage.fields);

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {},
    mode: "onChange",
  });

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((state) => state - 1);
    }
  };

  const handleSubmit = async () => {
    const isValid = await form.trigger();
    if (currentStep !== maxStep - 1 && isValid) {
      setCurrentStep((state) => state + 1);
    }
  };

  const valuesForm = useWatch({ control: form.control });

  checkVisibilityCondition({ fields: currentPage.fields, valuesForm });

  console.log("Form Values:", valuesForm);

  return (
    <div>
      <Form {...form}>
        <form className="w-[300px] space-y-8">
          {currentPage.fields.map((field: FieldConfig) => {
            return <FieldRenderer key={field.id} form={form} field={field} />;
          })}
        </form>
      </Form>
      <div>
        <Button onClick={handleBack} disabled={currentStep === 0}>
          Back
        </Button>
        <Button onClick={handleSubmit}>
          {currentStep < maxStep - 1 ? "Next" : "Send"}
        </Button>
      </div>
    </div>
  );
};

export default MultiStepForm;
