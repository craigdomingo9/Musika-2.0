import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";

type Props = {
  form: UseFormReturn<any, any, undefined>,
  defaultValue: string,
  fieldName: string,
  label: string,
  placeholder?: string,
  description?: string,
  type?: string,
  id?: string,
  disabled?: boolean,
  autoComplete?: string
};


function InputField({ form, defaultValue, fieldName, label, placeholder, description, type, id, disabled, autoComplete }: Props) {
  const [fieldValue, setFieldValue] = useState<string>("");

  useEffect(() => {
    if (!form) return;
    if (!defaultValue) return setFieldValue("");

    setFieldValue(defaultValue.toString())
    form.setValue(fieldName, defaultValue.toString())
  }, [defaultValue])

  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={() => (
        <FormItem>
          <FormLabel className="text-opacity font-semibold">{label}</FormLabel>
          <FormControl>
            <Input 
            id={id ? id : ""}
            type={type ? type : "text"}
            className="text-sm" 
            placeholder={placeholder}
            value={fieldValue}
            onChange={(e) => {
              form.setValue(fieldName, e.target.value)
              setFieldValue(e.target.value)
            }}
            autoComplete={autoComplete}
            disabled={disabled}
          />
          </FormControl>
          {description && (
            <FormDescription className="text-xs">{description}</FormDescription>
          )}
          <FormMessage className="text-xs" />
        </FormItem>
      )}
    />
  );
}

export default InputField;