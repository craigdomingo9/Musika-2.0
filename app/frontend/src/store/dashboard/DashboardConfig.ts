import { create } from "zustand";
import { combine, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";



const useDashboardConfigStore = create(
  persist(
    immer(
      combine(
        {
          config: {} as Record<string, any>
        },
        (set) => (
          {
            setConfig: (key: string, value: any) =>
              set((state) => ({
                config: {
                  ...state.config,
                  [key]: value,
                },
              })),
          }
        )
      )
    ), { name: "Dashboard Settings"}
    )
)

export default useDashboardConfigStore