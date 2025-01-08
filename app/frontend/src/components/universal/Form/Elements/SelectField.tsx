import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";

type Props = {
  form: UseFormReturn<any, any, undefined>,
  defaultValue: any,
  fieldName: string,
  label: string,
  placeholder?: string,
  description?: string,
  selectionList: string[],
}

function SelectField({ form, defaultValue, fieldName, label, placeholder, description, selectionList}: Props) {
  const [fieldValue, setFieldValue] = useState<string>("");

  useEffect(() => {
    if (!form) return;
    if (!defaultValue) return setFieldValue(selectionList[0]);

    setFieldValue(defaultValue);
    form.setValue(fieldName, defaultValue.toString())
  }, [defaultValue])

  
  return (
    <>
      <FormField
        control={form.control}
        name={fieldName}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-opacity font-semibold">{label}</FormLabel>
              <FormControl>
                <Select 
                onValueChange={(value) => {
                    field.onChange;
                    form.setValue(`${fieldName}`, value);
                    setFieldValue(value);
                }}
                value={fieldValue}
                >
                  <FormControl>
                    <SelectTrigger>
                        <SelectValue placeholder={placeholder ? placeholder : "Choose your gender"} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {selectionList.map(item => (
                      <SelectItem key={item} value={item}>{item}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
            <FormMessage />
          </FormItem>
        )}
    />
    </>
  )
}

export default SelectField