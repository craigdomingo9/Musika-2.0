"use client";

import { useEffect } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

import useFetchInventory from "@/services/api/dashboard/hooks/business/inventory/useFetchInventory";
import ProductCardFace from "./ProductCardFace";
import CreateCatalogButton from "./Buttons/CreateCatalogButton";
import CreateProductButton from "./Buttons/CreateProductButton";
import { createEntityAction } from "@/types/dashboard/factory";
import DeleteCatalogButton from "./Buttons/DeleteCatalogButton";
import { useCatalogMutation } from "./Dialogs/CatalogFormDialog";
import createEntityStore from "@/store/dashboard/EntityStore";
import EditCatalogButton from "./Buttons/EditCatalogButton";
import Loading from "@/app/dashboard/loading";

export const useInventoryAction = createEntityStore<boolean>(false);



function InventoryProducts() {

  const { entities: catalogState, setEntities: setCatalogMutation} = useCatalogMutation();
  const { entities: inventoryState } = useInventoryAction();

  const { data, isLoading, error } = useFetchInventory(inventoryState);

  useEffect(() => {
    // console.log(data)
  }, [data])


  return (
    <div className="mb-8 flex page-width">
      {isLoading ? (
        <Loading />
      ) : (
        <Accordion type="single" collapsible className="w-full">
          {data && data.map((catalog, index) => (
            <AccordionItem key={catalog.id} value={`catalog-${index}`}>
              <div className="w-full">
                <div 
                  onClick={() => {
                    setCatalogMutation(createEntityAction("", catalog))
                  }}
                  className="my-1"
                >
                  <AccordionTrigger className="shadow rounded-lg pr-2 flex justify-between min-w-full">
                    <p className="px-2">{catalog.name}</p>
                  </AccordionTrigger>
                  <hr />
                </div>

                <AccordionContent>
                  <div className="min-w-full grid grid-cols-2 pb-2 md:grid-cols-3 items-center space-y-2 overflow-x-hidden">
                    {catalog.products.map(product => (
                      <div 
                        key={product.uuid} 
                        className="shadow-lg rounded-lg m-auto w-36 sm:w-48 sm:max-h-[17.25rem] py-1 cursor-pointer"
                      >
                        <ProductCardFace product={product} />
                      </div>
                    ))}
                    <CreateProductButton />

                    <div className="grid my-4 shadow-lg border rounded-lg h-36">
                      <EditCatalogButton />
                      <DeleteCatalogButton />
                    </div>
                  </div>

                </AccordionContent>
                
              </div>
            </AccordionItem>
          ))}
          <CreateCatalogButton />
        </Accordion>
      )}
      
    </div>
  )
}

export default InventoryProducts