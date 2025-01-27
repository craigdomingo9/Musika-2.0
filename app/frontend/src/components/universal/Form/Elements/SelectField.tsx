import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
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
  selectClassName?: string,
  reRenderState?: any,
}

function SelectField({ 
  form, 
  defaultValue, 
  fieldName, 
  label, 
  placeholder, 
  description, 
  selectionList, 
  selectClassName, 
  reRenderState
}: Props) {
  const [fieldValue, setFieldValue] = useState<string>(defaultValue || selectionList[0]);

  useEffect(() => {
    if (!form) return;

    // Ensure defaultValue is a string before setting
    const stringDefaultValue = defaultValue ? defaultValue.toString() : defaultValue; 

    form.setValue(fieldName, stringDefaultValue); 
  }, [defaultValue, reRenderState])
  
  
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
                    <SelectTrigger className={cn("", selectClassName)}>
                        <SelectValue placeholder={placeholder ? placeholder : "Choose"} />
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