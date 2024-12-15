import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";

type Props = {
  form: UseFormReturn<any, any, undefined>,
  fieldName: string,
  label: string,
  placeholder?: string,
  description?: string,
  selectionList: string[],
}

function SelectField({ form, fieldName, label, placeholder, description, selectionList}: Props) {
  return (
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
              }}
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
  )
}

export default SelectField