import { FieldConfig } from "@/features/onboarding/types";

type Props = {
  fields: FieldConfig[];
  valuesForm: Record<string, any>;
};

export const checkVisibilityCondition = ({ fields, valuesForm }: Props) => {
  return fields.filter((field) => {
    if (!field.visibilityCondition) {
      return true;
    }
    const { fieldId, operator, value } = field.visibilityCondition;
    const fieldValue = valuesForm[fieldId];

    switch (operator) {
      case "eq": {
        return fieldValue === value;
      }
      default:
        return true;
    }
  });
};
