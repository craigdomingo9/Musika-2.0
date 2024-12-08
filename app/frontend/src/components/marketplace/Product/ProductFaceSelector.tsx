import { cn } from '@/lib/utils';
import { useProductVariantCarouselStore } from '@/store/ProductVariantCarousel';
import Image from 'next/image';
import React, { useEffect } from 'react'


type Props = {
  product: Product,
}

function ProductFaceSelector({product}: Props) {
  const variants = product.variants;
  // console.log(product)
  const {selectedVariant, setSelectedVariant} = useProductVariantCarouselStore();

  useEffect(() => {}, [selectedVariant])

  return (
    <div className='flex gap-2 ml-2 mt-4 cursor-pointer justify-center'>
        {variants.map(variant => (
          <Image
          key={variant.id}
          className={cn('w-10 sm:hover:opacity-30 h-10 rounded-full border', variant.id == selectedVariant?.id && "ring-4 ring-[--baseColor]")}
          onClick={() => {
            setSelectedVariant(variant);
          }}
          src={variant.image.image}
          width={500}
          height={500}
          alt={variant.image.alt_text}
          unoptimized
          priority
          />
        ))}
      </div>
  )
}

export default ProductFaceSelector
