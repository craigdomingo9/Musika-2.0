import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';


interface SearchedProducts {
  products: Product[],
  setProducts: (products: Product[]) => void,
}

const useSearchedProductsStore = create<SearchedProducts>()(
  devtools(
    persist(
      (set) => ({
        products: [],
        setProducts: (products) => set((state) => ({
          products: products
        }))
      }),
      { name: 'SearchedProductsStore'},
    )
  )
)

export default useSearchedProductsStore