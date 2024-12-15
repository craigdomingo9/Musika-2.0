import { UseFormReturn } from "react-hook-form"
import SelectField from "./Elements/SelectField"
import { cities } from "@/lib/lists"

type Props<T extends string> = {
  form: UseFormReturn<any, any, undefined>,
}

function CitySelector<T extends string>({form}: Props<T>) {
  return (
    <SelectField 
      fieldName="city"
      form={form}
      label="City"
      selectionList={cities}
      description=""
      placeholder="Harare" 
    />
  )
}

export default CitySelector