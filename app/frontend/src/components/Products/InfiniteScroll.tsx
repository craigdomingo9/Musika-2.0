"use client";
import getFeaturedProducts from '@/lib/utils/Products/getFeaturedProducts';
import { Dispatch, SetStateAction, useEffect, useState } from 'react'


type Props = {
    page: number,
    setPage: Dispatch<SetStateAction<number>>,
    products: Product[],
    setProducts: Dispatch<SetStateAction<Product[]>>
}


function InfiniteScroll({page, setPage, products, setProducts}: Props) {
    const [loading, setLoading] = useState<boolean>(false);
    const [hasMore, setHasMore] = useState(true);
    

    const loadMoreProducts = async () => {
        if (loading || !hasMore) return;

        setLoading(true);

        try {
            const data = await getFeaturedProducts(page, true);
            data.results.forEach((result) => {
                const existingProduct = products.find((product) => product.uuid === result.uuid);
                if (!existingProduct) {
                    setProducts((prev) => [...prev, result]);
                }
            });
            
            setHasMore(data.results.length > 0);
            setPage((prev) => prev + 1);

        } catch (error) {
            console.error('Failed to load products', error);
        } finally {
            setLoading(false); // Set loading false after fetch completes
        }

        console.log("Loading brody")

    }

    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
            loadMoreProducts();
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);

    }, [])

    if (loading) {
        return <div>Loading...</div>;
    }
      

  return (
    <>
        {products.map((product) => (
            <p key={`${product.uuid}`}  className="py-10">{product.name}</p>
        ))}
    </>
  )
}

export default InfiniteScroll