import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";

type Props<T extends string> = {
  form: UseFormReturn<any, any, undefined>,
  fieldName: T,
  label: string,
  placeholder?: string,
  description?: string,
};

function InputField<T extends string>({ form, fieldName, label, placeholder, description }: Props<T>) {
  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-opacity font-semibold">{label}</FormLabel>
          <FormControl>
            <Input className="text-sm" placeholder={placeholder} {...field} />
          </FormControl>
          {description && (
            <FormDescription>{description}</FormDescription>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default InputField;