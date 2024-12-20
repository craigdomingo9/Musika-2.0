import { cn } from '@/lib/utils';
import { useProductVariantCarouselStore } from '@/store/ProductVariantCarousel';
import Image from 'next/image';
import React, { useEffect } from 'react'


type Props = {
  product: Product,
}

function ProductFaceSelector({product}: Props) {
  const variants = product.variants;
  const {selectedVariant, setSelectedVariant} = useProductVariantCarouselStore();

  useEffect(() => {}, [selectedVariant])

  return (
    <div className='flex gap-2 ml-2 mt-4 cursor-pointer justify-center'>
        {variants.map(variant => (
          <Image
          key={variant.id}
          className={cn(variant.id != selectedVariant?.id && 'sm:hover:opacity-30 duration-300','w-10 h-10 rounded-full border', variant.id == selectedVariant?.id && "ring-4 ring-[--baseColor]")}
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
