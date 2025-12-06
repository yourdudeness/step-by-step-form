import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type Props = {
  field: any;
};

export function FieldRenderer({ field }: Props) {
  switch (field.type) {
    case "text":
      return (
        <FormItem>
          <FormLabel>{field.label}</FormLabel>
          <FormControl>
            <Input
              placeholder={field.placeholder}
              type='text'
              {...field}
            />
          </FormControl>
        </FormItem>
      );
    case "password":
      return (
        <FormItem>
          <FormLabel>{field.label}</FormLabel>
          <FormControl>
            <Input
              placeholder={field.placeholder}
              type='password'
              {...field}
            />
          </FormControl>
        </FormItem>
      );
    case "checkbox":
      return <input type="checkbox" {...field} />;
    default:
      return null;
  }
}
