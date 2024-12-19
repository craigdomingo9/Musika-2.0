import { UseFormReturn } from "react-hook-form"
import { cities } from "@/lib/lists"
import SelectField from "@/components/universal/Form/Elements/SelectField"

type Props = {
  form: UseFormReturn<any, any, undefined>,
  defaultValue: string,
}

function CitySelector({form, defaultValue}: Props) {
  return (
    <SelectField 
      form={form}
      defaultValue={defaultValue}
      fieldName="city"
      label="City"
      selectionList={cities}
      description=""
      placeholder="Harare" 
    />
  )
}

export default CitySelector