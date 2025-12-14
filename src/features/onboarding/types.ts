export type ValidationConfig = {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
};

export type VisibleConditionType = {
  fieldId: string;
  operator: "eq" | "neq" | "gt" | "lt";
  value: string | boolean;
};

export type FieldConfig = {
  id: string;
  label: string;
  placeholder?: string;
  type: "text" | "number" | "password" | "radio" | "checkbox";
  options?: { value: string; label: string }[];
  validation?: ValidationConfig;
  visibilityCondition?: VisibleConditionType;
};

export type FormDataPages = {
  id: string;
  title: string;
  fields: FieldConfig[];
};



export type FormDataConfig = {
  title: string;
  pages: FormDataPages[];
};
