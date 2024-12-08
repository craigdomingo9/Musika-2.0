"use client";
import { useProductVariantCarouselStore } from '@/store/ProductVariantCarousel';
import Image from 'next/image';
import { useEffect } from 'react';



function ProductFace() {
  const {selectedVariant} = useProductVariantCarouselStore();

  useEffect(() => {

  }, [selectedVariant])


  return (
    <>
      <div className='flex justify-center'>
        {selectedVariant && (
          <Image
          className='border max-h-[45vh] min-h-[45vh] object-scale-down place-content-center'
          src={selectedVariant.image.image}
          width={500}
          height={500}
          alt={selectedVariant.image.alt_text}
          unoptimized
          priority
          />
        )}
      </div>
    </>
  )
}

export default ProductFace