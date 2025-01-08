import useFetchVariants from "@/services/api/dashboard/hooks/business/inventory/useFetchVariants"
import { useProductMutation } from "../Dialogs/ProductDialog";
import { useEffect } from "react";
import { useVariantDialogState, useVariantMutation } from "../Dialogs/VariantDialog";
import { createEntityAction } from "@/types/dashboard/factory";
import createEntityStore from "@/store/dashboard/EntityStore";
import CreateVariantButton from "../Buttons/CreateVariantButton";
import Image from "next/image";
import DeleteVariantButton from "../Buttons/DeleteVariantButton";


export const useAttributeMutation = createEntityStore<EntityAction<ProductAttribute>>(createEntityAction<ProductAttribute>());


function VariantsList() {
  const { entities: variantState, setEntities: setVariantMutation } = useVariantMutation();
  const { entities: {object: product} } = useProductMutation();
  const { data: variants } = useFetchVariants({ product: product?.id }, variantState);
  
  const { setEntities: setDialog } = useVariantDialogState();
  const { setEntities: setAttributeMutation } = useAttributeMutation();


  useEffect(() => {
  }, [product, variantState])

  return (
    <div>
      {variants.map((variant, index) => (
        <div key={variant.id}>
          {variant.attributes.map((attr) => (
            <div 
              key={attr.id}
              >
              <div className="li-item flex">
                <div className="flex">
                  <p
                    onClick={() => {
                      setVariantMutation(createEntityAction("Update", variant));
                      setAttributeMutation(createEntityAction("Update", attr));
                      setDialog(true);
                    }}
                  >
                    {index+1}. {attr.value} {attr.name}: ${variant.price}
                  </p>
                  <div className="ml-1">
                  {variant.image?.image ? (
                    <Image
                      className="size-6"
                      src={variant.image.image}
                      width={500}
                      height={500}
                      alt={variant.image.alt_text}
                      unoptimized
                      priority
                    />
                  ) : (
                    <div className="size-6"></div>
                  )}
                  </div>
                </div>

                <div className="flex max-w-fit">
                  
                  <DeleteVariantButton variant={variant} />
                </div>

              </div>
              <hr />
            </div>
          ))}
        </div>
      ))}
      <CreateVariantButton />
    </div>
  )
}

export default VariantsList