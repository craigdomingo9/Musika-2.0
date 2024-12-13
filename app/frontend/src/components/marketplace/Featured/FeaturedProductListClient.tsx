"use client";
import { fixProductImageUrl } from "@/services/marketplace/product";
import FeaturedProductCard from "./FeaturedProductCard";

type Props = {
  products: StandardProduct[];
}

function FeaturedProductListClient({products}: Props) {

  products = fixProductImageUrl(window.location.href, products);
  
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 items-center space-y-2 overflow-x-hidden">
      {products.map(product => (
        <FeaturedProductCard key={product.uuid} product={product} />
      ))}
      
    </div>
  )
}

export default FeaturedProductListClient
