"use client";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import SaleProductCard from "./SaleProductCard";


type Props = {
  products: StandardProduct[];
}

function SaleProductListClient({products}: Props) {
  return (
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}>
          <CarouselContent className="h-40 sm:h-64 flex items-center">
            {products.map(product => (
              <CarouselItem key={product.uuid} className="max-w-72 sm:mx-2 sm:max-w-[375px]">
                <SaleProductCard product={product} />
              </CarouselItem>
            ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-2 outline-0" />
      <CarouselNext className="absolute right-2 outline-0" />
    </Carousel>
  )
}

export default SaleProductListClient