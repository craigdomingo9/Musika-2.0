import Image from 'next/image'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import { cn } from '@/lib/utils';
import { PenBoxIcon } from 'lucide-react';
import { useProductDialogState, useProductMutation } from './Dialogs/ProductDialog';
import { createEntityAction } from '@/types/dashboard/factory';


type Props = {
  product: Product,
  isSale?: boolean
}

function ProductCardFace({product, isSale}: Props) {
  const { entities: productState, setEntities: setProductMutation} = useProductMutation();
  const { setEntities: setDialog } = useProductDialogState();


  return (
    <>
    <div>
      <>
        <Carousel 
          opts={{
            align: "start",
            loop: true,
          }}
          >
          <CarouselContent>
            {product.variants.map(variant => (
              <CarouselItem key={variant.id}>
                {variant.image?.image ? (
                  <Image
                    className={cn("rounded-tr-lg rounded-tl-lg shadow sm:max-h-48")}
                    src={variant.image.image}
                    width={500}
                    height={500}
                    alt={variant.image.alt_text}
                    unoptimized
                    priority
                  />
                ) : (
                  <div className={cn("flex justify-center items-center shadow min-h-40 sm:h-48")}>
                    <p className='text-xs'>No Image</p>
                  </div>
              )}
              </CarouselItem>
            ))}
          </CarouselContent>
          {product.variants.length > 1 && (
            <>
              <CarouselPrevious className='left-0 bg-transparent' />
              <CarouselNext className='right-0 bg-transparent' />
            </>
          )}
        </Carousel>
      </>
    </div>
    <div 
      className={cn("grid px-2 text-opacity pt-2",isSale && "max-h-10")}
      onClick={() => {
        setProductMutation(createEntityAction("Update", product, "init"));
        setDialog(true);
      }}
      >
      <div className="content-start">
        <p className="font-semibold text-sm">{product.name}</p>
        <p className='shadow flex w-full justify-center py-1 rounded-sm bg-blue-50 mt-2'>
          <PenBoxIcon strokeWidth={1.5} className='size-5' />
        </p>
      </div>
    </div>
    </>
  )
}

export default ProductCardFace