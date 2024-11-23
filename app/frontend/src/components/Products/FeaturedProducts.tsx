import getFeaturedProducts from "@/lib/utils/Products/getFeaturedProducts";
import ProductList from "./ProductList";
import MoreProducts from "./MoreProducts";


async function FeaturedProducts() {
    const { results } = await getFeaturedProducts(1, false);

    return (
        <div className="mt-8">
            <header className="font-bold">Featured Products</header>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 mt-4">
                <ProductList products={results} />
                <MoreProducts />
            </div>
        </div>
    )
}

export default FeaturedProducts