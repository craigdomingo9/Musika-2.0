"use client";
import useSearchedProductsStore from "@/store/SearchedProducts";


type Props = {}

function Page({}: Props) {
  const {products} = useSearchedProductsStore();

  console.log(products);
  return (
    <div>Page</div>
  )
}

export default Page