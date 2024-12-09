import { useIsMobile } from '@/hooks/use-mobile';
import { truncationMinLength } from '@/lib/constants';
import { cn, trunc } from '@/lib/utils';
import Image from 'next/image'
import React from 'react'

type Props = {
  product: StandardProduct,
  isSale?: boolean
}

function ProductCardFace({product, isSale}: Props) {
  const baseUrl = new URL(window.location.href).origin;
  const isMobile = useIsMobile();
  return (
    <>
    <div>
      <Image
        className={cn("rounded-xl shadow sm:max-h-48", isSale && "sm:h-40")}
        src={`${baseUrl}${product.image.image}`}
        width={500}
        height={500}
        alt={product.image.alt_text}
        unoptimized
        priority
      />
    </div>
    <div className={cn("grid px-2 text-opacity pt-2",isSale && "max-h-10")}>
        <div className="content-start">
          <p className="font-semibold text-sm">{product.name}</p>
          <p className="sub-text">
            {(isMobile || !isSale) && (trunc(product.description, truncationMinLength))}
            {!isMobile && isSale && product.description}
            </p>
            
        </div>
        <div className="content-end flex items-end min-w-full pt-2">
          {product.on_sale ? (
            <>
              <p className="text-xs line-through pr-2 color-primary font-semibold">${product.price}</p>
              <p className="text-sm font-semibold text-opacity">${product.sale_price}</p>
            </>
          ): (
            <p className="text-sm font-semibold text-opacity">${product.price}</p>
          )}
        </div>
      </div>
    </>
  )
}

export default ProductCardFace