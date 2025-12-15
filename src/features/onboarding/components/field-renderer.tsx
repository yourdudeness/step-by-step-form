import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Radio, RadioGroup } from "@/components/ui/radio";

import { UseFormReturn } from "react-hook-form";
import { FieldConfig } from "../types";
import { Checkbox } from "@/components/ui/checkbox";

type Props = {
  field: FieldConfig;
  form: UseFormReturn<any>;
};

export function FieldRenderer({ field, form }: Props) {
  switch (field.type) {
    case "text":
      return (
        <FormField
          control={form.control}
          name={field.id}
          render={({ field: controllerField }) => (
            <FormItem>
              <FormLabel>{field.label}</FormLabel>
              <FormControl>
                <Input
                  placeholder={field.placeholder}
                  type="text"
                  {...controllerField}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      );
    case "number":
      return (
        <FormField
          control={form.control}
          name={field.id}
          render={({ field: controllerField }) => (
            <FormItem>
              <FormLabel>{field.label}</FormLabel>
              <FormControl>
                <Input
                  placeholder={field.placeholder}
                  type="number"
                  {...controllerField}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      );
    case "password":
      return (
        <FormField
          control={form.control}
          name={field.id}
          render={({ field: controllerField }) => (
            <FormItem>
              <FormLabel>{field.label}</FormLabel>
              <FormControl>
                <Input
                  placeholder={field.placeholder}
                  type="password"
                  {...controllerField}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      );
    case "radio":
      return (
        <FormField
          control={form.control}
          name={field.id}
          render={({ field: controllerField }) => (
            <FormItem className="space-y-3">
              <FormLabel>{field.label}</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={controllerField.onChange}
                  value={controllerField.value}
                >
                  {field.options?.map((option: any) => (
                    <div
                      key={option.value}
                      className="flex items-center space-x-2"
                    >
                      <Radio value={option.value} id={option.value} />
                      <Label
                        htmlFor={option.value}
                        className="font-normal cursor-pointer"
                      >
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      );
    case "checkbox":
      return (
        <FormField
          control={form.control}
          name={field.id}
          render={({ field: controllerField }) => (
            <FormItem>
              <FormControl>
                  <Checkbox
                    checked={controllerField.value}
                    onCheckedChange={controllerField.onChange}
                    {...controllerField}
                  />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      );
    default:
      return null;
  }
}
