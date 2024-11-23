"use client";
import { useEffect, useState } from 'react';
import {
    Carousel,
    CarouselContent,
    CarouselItem
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { type CarouselApi } from "@/components/ui/carousel";
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { truncate } from '@/lib/utils/general';
import Link from 'next/link';

type Props = {
    product: Product,
}

function ProductCard({ product }: Props) {
    const [api, setApi] = useState<CarouselApi | null>(null);
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const [currentVariant, setCurrentVariant] = useState<ProductVariant>(product.variants[0]);

    useEffect(() => {
        if (!api) return;

        const handleSelect = () => {
            setCurrentVariant(product.variants[api.selectedScrollSnap()]);
        };

        api.on("select", handleSelect);
        
        return () => {
            api.off("select", handleSelect); // Cleanup event listener
        };
    }, [api, product.variants]);

    return (
        <Link 
            href={{
                pathname: "/product",
                query: { id: product.id },
            }} 
            key={product.uuid} 
            className="h-56 sm:h-64 xl:h-80 w-40 sm:w-48 xl:w-64 mx-2 border my-2 overflow-hidden"
        >
            <Carousel 
                setApi={setApi}
                opts={{ align: "start", loop: true }}
                plugins={[Autoplay({ delay: 4000 })]}
            >
                <CarouselContent>
                    {product.variants.map(variant => {
                        const imageUrl = `${apiUrl}${variant.images[0].image}`;
                        return (
                            <CarouselItem key={variant.id}>
                                <Image 
                                    src={imageUrl}
                                    width={400}
                                    height={400}
                                    alt={variant.images[0].alt_text}
                                    unoptimized
                                    priority
                                />
                            </CarouselItem>
                        );
                    })}
                </CarouselContent>
            </Carousel>
            <div className='w-full p-1'>
                <div className='flex justify-between'>
                    <p>{product.name}</p>
                    <div className='flex justify-end gap-1 py-1'>
                        <p className={cn('text-sm', { 'line-through text-xs': currentVariant.on_sale })}>
                            {currentVariant.price}
                        </p>
                        {currentVariant.on_sale && (
                            <p className='text-sm'>{currentVariant.sale_price}</p>
                        )}
                    </div>
                </div>
                <p className='text-xs'>{truncate(product.description, 20)}</p>
            </div>
        </Link>
    );
}

export default ProductCard;