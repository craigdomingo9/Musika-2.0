import { create } from 'zustand';
import { combine } from 'zustand/middleware';



export const useProductVariantCarouselStore = create(
  combine({selectedVariant: undefined as ProductVariant | undefined}, (set) => ({
    setSelectedVariant: (variant: ProductVariant) => set({selectedVariant: variant})
  })
  )
);