"use client";

import { ProductEndpoints } from "@/services/api/endpoints/marketplace/product";
import CatalogServices from "@/services/marketplace/catalog";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ProductCardFace from "../ProductCardFace";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Link from "next/link";
import { fixProductImageUrl } from "@/services/marketplace/productImageUrl";


function ProductSection() {
  const { code } = useParams();
  const [catalogs, setCatalogs] = useState<Catalog[]>();


  useEffect(() => {
    const fetchBusinessProducts = async() => {
      if (!code) return;

      const apiServices = new ProductEndpoints();
      apiServices.isOnClient(window);

      const data = await apiServices.getCatalogs({business: code});

      const catalogServices = new CatalogServices(data);
      let catalogData = catalogServices.splitVariants();

      catalogData = catalogData.map(catalog => {
        return {
          ...catalog,
          products: fixProductImageUrl(window.location.href, catalog.products)
        }
      })

      setCatalogs(catalogData);
    }
    fetchBusinessProducts()
  }, [])


  return (
    <div className="sm:mt-5 mb-8 lg:my-14 flex">
      <Accordion type="single" defaultValue="catalog-0" collapsible className="w-full">
      {catalogs && catalogs.map((catalog, index) => (
        <AccordionItem key={catalog.id} value={`catalog-${index}`}>
          <div className="w-full">
            <AccordionTrigger className="shadow pr-2">
              <p className="text-opacity text-sm font-semibold px-2">{catalog.name}</p>
            </AccordionTrigger>
            <AccordionContent>
              <div className="min-w-full grid grid-cols-2 pb-2 md:grid-cols-3 items-center space-y-2 overflow-x-hidden">
                {catalog.products.map(product => (
                  <Link href={{
                    pathname: '/product',
                    query: {
                      id: product.id,
                      v: product.variant_id,
                    }
                  }} key={product.uuid} className="shadow-lg rounded-lg m-auto w-36 sm:w-48 sm:max-h-[17.25rem] py-1">
                    <ProductCardFace product={product} />
                  </Link>
                ))}
              </div>
            </AccordionContent>
          </div>
        </AccordionItem>
      ))}
          
          
      </Accordion>
      
    </div>
  )
}

export default ProductSection
