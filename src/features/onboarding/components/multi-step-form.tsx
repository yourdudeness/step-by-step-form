"use client";
import { Form } from "@/components/ui/form";
import { createValidationSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FieldRenderer } from "./field-renderer";
import { Button } from "@/components/ui/button";

type Props = {
  formData: any;
};
const MultiStepForm = ({ formData }: Props) => {
  const [currentStep, setCurrentStep] = useState(0);
  const currentPage = formData.pages[currentStep];
  const maxStep = formData.pages.length;

  //   const schema = createValidationSchema(currentPage.fields);

  const form = useForm({
    // resolver: zodResolver(schema),
    defaultValues: {},
  });

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((state) => state - 1);
    }
  };

  const handleSubmit = () => {
    if (currentStep !== maxStep - 1) {
      setCurrentStep((state) => state + 1);
    }
  };
  return (
    <div>
      <Form {...form}>
        <form className="w-[300px] space-y-8">
          {currentPage.fields.map((field: []) => {
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
