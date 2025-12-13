import { z } from "zod";

export const createValidationSchema = (fields: any[]) => {
  const schemaShape: Record<string, any> = {};
  fields.forEach((field) => {

    switch (field.type) {
      case "text": {
        let schema = z.string();
        if (field.validation?.minLength) {
          schema = schema.min(field.validation.minLength);
        }
        if (field.validation?.maxLength) {
          schema = schema.max(field.validation.maxLength);
        }
        if (field.validation?.required) {
          schema = schema.nonempty("This field is required");
        }
        schemaShape[field.id] = schema;
        break;
      }
      case "number": {
        let schema = z.coerce.number();
        if (field.validation?.min !== undefined) {
          schema = schema.int().min(field.validation.min);
        }
        if (field.validation?.max !== undefined) {
          schema = schema.int().max(field.validation.max);
        }
        schemaShape[field.id] = field.validation?.required ? schema : schema.optional();
        break;
      }
      case "radio": {
        schemaShape[field.id] = z.enum(
          field.options.map((opt: any) => opt.value)
        );
        break;
      }
      case "checkbox": {
        let schema = z.boolean();
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
