"use client";
import getFeaturedProducts from '@/lib/utils/Products/getFeaturedProducts';
import { useEffect, useState } from 'react'
import ProductList from './ProductList';
import { BeatLoader } from 'react-spinners'

function MoreProducts() {
    const [page, setPage] = useState<number>(2);
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [hasMore, setHasMore] = useState<boolean>(true);

    const loadMoreProducts = async () => {
        if (loading || !hasMore) return; // Prevent duplicate requests

        setLoading(true);

        try {
            const data = await getFeaturedProducts(page, true);
            const newProducts = data.results;
            setHasMore(data.next ? true: false);

            if (newProducts.length > 1 && data.next) {
                setProducts((prev) => [...prev, ...newProducts]);
                
                setPage(page + 1);
            } else {
                setHasMore(false); // No more products to load
            }
        } catch (error) {
            console.error("Failed to load products:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const handleScroll = () => {
            const scrolledToBottom = window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 5;
            if (scrolledToBottom && hasMore) {
                loadMoreProducts();
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);

    }, [loading, hasMore])



    return (
        <>
            {loading && (
                <div className='col-span-2 h-20 sm:col-span-3 md:col-span-4 text-center'>
                    <BeatLoader />
                </div>
            )}
            <ProductList products={products} />
            <p className='col-span-2 sm:col-span-3 md:col-span-4 text-center'>{!hasMore && "No more products"}</p>
        </>
    )
}

export default MoreProducts