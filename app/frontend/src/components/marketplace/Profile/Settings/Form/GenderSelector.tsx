import { UseFormReturn } from 'react-hook-form'
import SelectField from './Elements/SelectField'
import { genders } from '@/lib/lists'

type Props<T extends string> = {
  form: UseFormReturn<any, any, undefined>,
}



function GenderSelector<T extends string>({form}: Props<T>) {
  return (
    <SelectField 
      fieldName="gender"
      form={form}
      label="Gender"
      selectionList={genders}
      description=""
      placeholder="Harare" 
    />
  )
}

export default GenderSelector