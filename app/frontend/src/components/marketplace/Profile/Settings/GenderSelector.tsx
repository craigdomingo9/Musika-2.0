import { UseFormReturn } from 'react-hook-form'
import { genders } from '@/lib/lists'
import SelectField from '@/components/universal/Form/Elements/SelectField'

type Props = {
  form: UseFormReturn<any, any, undefined>,
  defaultValue: string
}

function GenderSelector({form, defaultValue}: Props) {
  return (
    <SelectField 
      form={form}
      defaultValue={defaultValue}
      fieldName="gender"
      label="Gender"
      selectionList={genders}
      description=""
      placeholder="Male" 
    />
  )
}

export default GenderSelector