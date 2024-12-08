import { create } from 'zustand';

interface CarouselApiState {
  selectedVariant: ProductVariant | undefined,
  setSelectedVariant: (variant: ProductVariant) => void,
}

export const useProductVariantCarouselStore = create<CarouselApiState>()(
  (set) => ({
    selectedVariant: undefined,
    setSelectedVariant: (variant: ProductVariant) => set({selectedVariant: variant}),
  })
);