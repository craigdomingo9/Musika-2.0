import { useEffect } from "react";
import ProductForm from "../Forms/ProductForm";
import createEntityStore from "@/store/dashboard/EntityStore";
import DialogContainer from "@/components/universal/Dialog/DialogContainer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import VariantsList from "../Forms/VariantsList";
import { createEntityAction } from "@/types/dashboard/factory";
import { useVariantMutation } from "./VariantDialog";
import DeleteProductButton from "../Buttons/DeleteProductButton";


export const useProductDialogState = createEntityStore<boolean>(false);
export const useProductMutation = createEntityStore<EntityAction<Product>>(createEntityAction<Product>());


function ProductDialog() {
  const { entities: dialog, setEntities: setDialog } = useProductDialogState();
  const { entities: {object: variant, state}, setEntities: setVariantMutation } = useVariantMutation();
  const { entities: {action}} = useProductMutation();

  useEffect(() => {}, [dialog])


  return (
    <DialogContainer 
      state={dialog} 
      title={`${action} Product`} 
      onChange={() => setDialog(!dialog)}
    >
      <Accordion type="single" collapsible defaultValue="product" className="w-full">
        <AccordionItem value="product">
          <AccordionTrigger>Product</AccordionTrigger>
          <AccordionContent>
            <ProductForm />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="variant">
          <AccordionTrigger>More</AccordionTrigger>
          <AccordionContent>
            <VariantsList />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <DeleteProductButton />
    </DialogContainer>
  )
}

export default ProductDialog