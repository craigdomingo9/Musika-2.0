import { create } from "zustand";
import { combine } from "zustand/middleware";



const usePageConfigStore = create(
  combine({ config: {} as Record<string, any> }, (set) => ({
    setConfig: (config: Record<string, any>) => set({ config }),
  })),
)

export default usePageConfigStore