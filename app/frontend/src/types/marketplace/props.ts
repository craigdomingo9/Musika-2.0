import { Dispatch, SetStateAction } from "react"





export type PageConfigProps = {
  label?: string,
  configKey?: string,
  config: Record<string, string | boolean>,
  setConfig: Dispatch<SetStateAction<Record<string, string | boolean>>>
}

