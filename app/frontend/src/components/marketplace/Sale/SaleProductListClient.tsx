"use client";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import SaleProductCard from "./SaleProductCard";
import { correctImageUrl } from "@/services/utils";


type Props = {
  products: StandardProduct[];
}

function SaleProductListClient({products}: Props) {

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
      <Carousel
        className="sm:mx-4"
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
      <div className="[&>button]:sm:h-5/6 [&>button]:outline-0 [&>button]:absolute [&>button]:sm:rounded-md">
        <CarouselPrevious className="left-2 sm:-left-8 sm:rounded-r-none" />
        <CarouselNext className="right-2 sm:-right-9 sm:rounded-l-none" />
      </div>
    </Carousel>
  )
}

export default SaleProductListClient