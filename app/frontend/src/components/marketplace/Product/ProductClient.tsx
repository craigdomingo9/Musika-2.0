"use client";
import ProductDetailServices from "@/services/marketplace/productdetail";
import ProductFace from "./ProductFace";
import { useEffect, useState } from "react";
import { useProductVariantCarouselStore } from "@/store/ProductVariantCarousel";
import ProductFaceSelector from "./ProductFaceSelector";
import ProductBody from "./ProductBody";
import ProductActions from "./ProductActions";

type Props = {
  product: Product,
  defaultVariant?: number,
}

function ProductClient({product, defaultVariant}: Props) {

  const productServices = new ProductDetailServices(product);
  productServices.fixImageUrl(window.location.href);
  const _product = productServices.product();
  
  const {setSelectedVariant} = useProductVariantCarouselStore();


  useEffect(() => {
    if (!defaultVariant) return setSelectedVariant(_product.variants[0]);

    setSelectedVariant(product.variants.filter(_variant => _variant.id == defaultVariant)[0])
  }, [])


  return (
    <div className="section-width">
      <div className="grid sm:grid-cols-[60%_40%]">
        <div className="grid">
          <ProductFace />
          <ProductFaceSelector product={_product} />
        </div>
        <div className="grid mx-2">
          <ProductBody product={product} />
          <ProductActions />
        </div>
      </div>
    </div>
  )
}

export default ProductClient