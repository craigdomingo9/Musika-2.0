"use client";
import ProductFace from "./ProductFace";
import { useEffect } from "react";
import { useProductVariantCarouselStore } from "@/store/ProductVariantCarousel";
import ProductFaceSelector from "./ProductFaceSelector";
import ProductBody from "./ProductBody";
import ProductActions from "./ProductActions";
import { fixVariantImageUrl } from "@/services/marketplace/product";
import createEntityStore from "@/store/dashboard/EntityStore";

type Props = {
  product: Product,
  defaultVariant?: number,
  ag?: string
}

export const useReferrerAgent = createEntityStore<string | undefined>("");

function ProductClient({product, defaultVariant, ag}: Props) {
  const { entities: agent, setEntities: setAgent } = useReferrerAgent();
  const _product = fixVariantImageUrl(window.location.href, product);
  const {setSelectedVariant} = useProductVariantCarouselStore();
  

  useEffect(() => {
    setAgent(ag);
    if (!defaultVariant) return setSelectedVariant(_product.variants[0]);

    setSelectedVariant(product.variants.filter(_variant => _variant.id == defaultVariant)[0]);
  }, [agent])


  return (
    <div className="section-width">
      <div className="grid sm:flex sm:flex-col sm:items-center">
        <div className="grid">
          <ProductFace />
          <ProductFaceSelector product={_product} />
        </div>
        <div className="grid px-2 w-full sm:max-w-lg">
          <ProductBody product={product} />
          <ProductActions product={product} />
        </div>
      </div>
    </div>
  )
}

export default ProductClient