import { FieldConfig, OptionsType } from "@/features/onboarding/types";
import { z } from "zod";

export const createValidationSchema = (fields: FieldConfig[]) => {
  const schemaShape: Record<string, any> = {};
  fields.forEach((field) => {
    switch (field.type) {
      case "text": {
        let schema = z.string();
        if (field.validation?.minLength) {
          schema = schema.min(field.validation.minLength, {
            message: `Минимум ${field.validation.minLength} символов`,
          });
        }
        if (field.validation?.maxLength) {
          schema = schema.max(field.validation.maxLength, {
            message: `Максимум ${field.validation.maxLength} символов`,
          });
        }
        if (field.validation?.required) {
          schema = schema.nonempty("Обязательное поле");
        }
        schemaShape[field.id] = schema;
        break;
      }
      case "number": {
        let schema = z.coerce.number({
          invalid_type_error: "Введите число",
        });
        if (field.validation?.min !== undefined) {
          schema = schema.int().min(field.validation.min, {
            message: `Минимум ${field.validation.min}`,
          });
        }
        if (field.validation?.max !== undefined) {
          schema = schema.int().max(field.validation.max, {
            message: `Максимум ${field.validation.max}`,
          });
        }
        schemaShape[field.id] = field.validation?.required
          ? schema
          : schema.optional();
        break;
      }
      case "radio": {
        if (field.options && field.options.length > 0) {
          schemaShape[field.id] = z.enum(
            field.options.map((opt: OptionsType) => opt.value) as [
              string,
              ...string[]
            ],
            {
              errorMap: () => ({ message: "Выберите один из вариантов" }),
            }
          );
        }
        break;
      }
      case "checkbox": {
        let schema = z.boolean({
          invalid_type_error: "Некорректное значение",
        });
        schemaShape[field.id] = field.validation?.required
          ? schema
          : schema.optional();
        break;
      }
      default:
        console.warn(`Unsupported field type: ${field.type}`);
    }
  });
  return z.object(schemaShape);
};
