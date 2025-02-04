"use client";
import FeaturedProductCard from "./FeaturedProductCard";
import { correctImageUrl } from "@/services/utils";

type Props = {
  products: StandardProduct[];
}

function FeaturedProductListClient({products}: Props) {

  products = products.map(product => ({
    ...product,
    image: {
      ...product.image,
      image: correctImageUrl(
        product.image.image,
        window.location.href
      )
    }
  }))
  
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 items-center space-y-2 overflow-x-hidden">
      {products.map(product => (
        <FeaturedProductCard key={product.uuid} product={product} />
      ))}
      
    </div>
  )
}

export default FeaturedProductListClient
