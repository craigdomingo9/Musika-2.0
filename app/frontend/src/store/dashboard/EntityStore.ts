import { create } from "zustand";




interface StoreState<T> {
  entities: T[];
  setEntities: (entities: T[]) => void;
}

const createEntityStore = <T>() => {
  const useEntityStore = create<StoreState<T>>(
    (set) => ({
      entities: [],
      setEntities: (entities) => set({ entities }),
    })
  );

  return useEntityStore;
};




export default createEntityStore

