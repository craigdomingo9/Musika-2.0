import createEntityStore from "@/store/dashboard/EntityStore";
import { createEntityAction } from "@/types/dashboard/factory";

export const useMutationLog = createEntityStore(
  createEntityAction<any>()
);
