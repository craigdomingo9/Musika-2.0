import { create } from 'zustand';
import { combine, devtools, persist } from 'zustand/middleware';



const useSearchedProductsStore = create(
  devtools(
    persist(
      combine({products: [] as Product[]}, (set) => ({
        setProducts: (products: Product[]) => set({ products }),
      })),
      { name: 'SearchedProductsStore'},
    )
  )
)

export default useSearchedProductsStore