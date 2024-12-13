"use client";
import { Checkbox } from "@/components/ui/checkbox"
import usePageConfigStore from "@/store/PageConfigStore";


type Props = {
  label: string,
  configKey: string,
  defaultValue?: any,
}

function CheckFilter({label, configKey, defaultValue=null}: Props) {
  const {config, setConfig} = usePageConfigStore();
  if (!configKey) return;

  const handleChange = () => {
    setConfig({ ...config, [configKey]: (!config[configKey] ? true: "") });
  };

  return (
    <div className="ps-2">
      <label
        htmlFor={label}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {label}
      </label>
      <Checkbox 
        id={label}
        checked={config[configKey] as boolean}
        onCheckedChange={handleChange}
        className="ml-2" />
    </div>
  )
}

export default CheckFilter