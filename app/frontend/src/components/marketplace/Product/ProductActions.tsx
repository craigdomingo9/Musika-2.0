import { Button } from "@/components/ui/button"
import { purchaseProductActionLabel } from "@/lib/constants"
import { cn } from "@/lib/utils";
import { useProductVariantCarouselStore } from "@/store/ProductVariantCarousel"

function ProductActions() {
  const {selectedVariant} = useProductVariantCarouselStore();

  if (selectedVariant)
  return (
    <div className="fixed sm:relative sm:mt-14 w-full bg-white bottom-2 grid grid-cols-[20%_80%]">
      <Button className="h-14 rounded-xl text-xs font-semibold outline-0 bg-slate-500">
        + Cart
      </Button>
      <Button className={cn("rounded-3xl ml-2 mr-3 sm:mr-0 h-14 font-extrabold outline-0")}>
        {purchaseProductActionLabel}
      </Button>
    </div>
  )
}

export default ProductActions
