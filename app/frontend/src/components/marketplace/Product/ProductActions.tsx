import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast";
import { purchaseProductActionLabel } from "@/lib/constants"
import { cn } from "@/lib/utils";
import CartServices from "@/services/marketplace/cart";
import { successfulCartAdditionToast } from "@/services/marketplace/toast";
import UseCartStore from "@/store/CartStore";
import { useProductVariantCarouselStore } from "@/store/ProductVariantCarousel"


type Props = {
  product: Product,
}


function ProductActions({product}: Props) {
  const cartServices = new CartServices();
  const {selectedVariant} = useProductVariantCarouselStore();
  const {addItemToStore} = UseCartStore();
  const { toast } = useToast();

  const addToCart = () => {
    if (!selectedVariant) return;
    
    cartServices.addProductToCart(product, selectedVariant, addItemToStore);
    successfulCartAdditionToast(toast);
  }

  if (selectedVariant)
  return (
    <div className="fixed sm:relative sm:mt-14 w-full bg-white bottom-2 grid grid-cols-[20%_80%]">
      <Button className="h-14 rounded-xl text-xs font-semibold outline-0 bg-slate-500" onClick={addToCart}>
        + Cart
      </Button>
      <Button className={cn("rounded-3xl ml-2 mr-3 sm:mr-0 h-14 font-extrabold outline-0")}>
        {purchaseProductActionLabel}
      </Button>
    </div>
  )
}

export default ProductActions
