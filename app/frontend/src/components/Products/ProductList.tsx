import ProductCard from "./ProductCard";


  
type Props = {
    products: Product[]
}

function ProductList({products}: Props) {

  return (
    <>
        {products.map((product) => (
            <ProductCard key={product.uuid} product={product} />
        ))}
    </>
  )
}

export default ProductList