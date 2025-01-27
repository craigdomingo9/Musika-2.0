import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast";
import { purchaseProductActionLabel } from "@/lib/constants"
import { cn } from "@/lib/utils";
import CartServices from "@/services/marketplace/cart";
import { successfulCartAdditionToast } from "@/services/marketplace/toast";
import UseCartStore from "@/store/CartStore";
import { useProductVariantCarouselStore } from "@/store/ProductVariantCarousel"
import { ShoppingCart } from "lucide-react";
import { useReferrerAgent } from "./ProductClient";
import Link from "next/link";


type Props = {
  product: Product,
}


function ProductActions({product}: Props) {
  const cartServices = new CartServices();
  const {selectedVariant} = useProductVariantCarouselStore();
  const {addItemToStore} = UseCartStore();
  const { toast } = useToast();
  const { entities: agent } = useReferrerAgent();

  const addToCart = () => {
    if (!selectedVariant) return;
    
    cartServices.addProductToCart(
      product, 
      agent,
      selectedVariant, 
      addItemToStore
    );
    successfulCartAdditionToast(toast);
  }

  if (selectedVariant)
  return (
    <div className="fixed sm:relative sm:mt-14 w-full bg-white bottom-2 grid grid-cols-[20%_80%]">
      <Button className="h-14 rounded-xl text-xs font-semibold outline-0 bg-slate-500" onClick={addToCart}>
        <ShoppingCart />+
      </Button>
      <Link 
        href={'/checkout'}
      >
        <Button 
          onClick={addToCart} 
          className={cn("rounded-3xl ml-2 mr-3 sm:mr-0 h-14 w-[17rem] sm:w-full font-extrabold outline-0")}
        >
          {purchaseProductActionLabel}
        </Button>
      </Link>
    </div>
  )
}

export default ProductActions
