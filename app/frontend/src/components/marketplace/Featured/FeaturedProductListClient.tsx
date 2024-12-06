"use client";
import FeaturedProductCard from "./FeaturedProductCard";

type Props = {
  products: SplitProduct[];
}

function FeaturedProductListClient({products}: Props) {
  
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 items-center space-y-2 overflow-x-hidden">
      {products.map(product => (
        <FeaturedProductCard key={product.uuid} product={product} />
      ))}
    </div>
  )
}

export default FeaturedProductListClient
