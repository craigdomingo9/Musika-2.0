import FormContainer from "@/components/universal/Form/FormContainer";
import { useVariantDialogState, useVariantMutation } from "../Dialogs/VariantDialog";
import { Form } from "@/components/ui/form";
import InventoryEndpoints from "@/services/api/dashboard/inventory";
import InputField from "@/components/universal/Form/Elements/InputField";
import CheckBoxField from "@/components/universal/Form/Elements/CheckBoxField";
import { Button } from "@/components/ui/button";
import ImageSelectorField from "@/components/universal/Form/Elements/ImageSelectorField";
import { useProductMutation } from "../Dialogs/ProductDialog";
import { useAttributeMutation } from "./VariantsList";
import { dangerToast, dangerToastFactory, successToast } from "@/services/marketplace/toast";
import { useToast } from "@/hooks/use-toast";
import { completeEntityAction, createEntityAction, processingEntityAction } from "@/types/dashboard/factory";
import { useEffect } from "react";
import { useInventoryAction } from "../InventoryProducts";
import { createVariantfn, createVariantForm, updateVariantfn, uploadImage } from "@/services/dashboard/forms/variantForm";



function VariantForm() {
  const form = createVariantForm()
  const { toast } = useToast()
  
  const { entities: inventoryState, setEntities: setInventoryAction } = useInventoryAction();
  const { setEntities: setDialog } = useVariantDialogState();
  const { entities: {action, object: variant}, setEntities: setVariantMutation } = useVariantMutation();
  const { entities: {object: attribute} } = useAttributeMutation();
  const { entities: {object: product} } = useProductMutation();

  useEffect(() => {
    if (!action) setVariantMutation(
      createEntityAction("Create")
    );
  }, [])

  const onSubmit = async(values: any) => {
    setVariantMutation(
      processingEntityAction<any>(action,variant)
    )
    try {
      
      if (!product) return dangerToastFactory(toast, "Error. Please create product first.");
      
      values.product = product?.id
      let response;
      
      const apiServices = new InventoryEndpoints();
      apiServices.isOnClient(window);
      
      switch (action) {
        case "Create":
          response = await createVariantfn(values);
          break;
        case "Update":
          response = await updateVariantfn(values, variant, attribute);
          break;
        default:
          throw new Error(`Invalid action: ${action}`);
      }

      if (response.ok) {
        successToast(toast, "Product", `${action.toLowerCase()}d`)
        if (values.image) response = await uploadImage(values, variant, await response.data)

        if (!response.ok) dangerToast(toast, "Product Image", `${action.toLowerCase()}d`)
      }

      setVariantMutation(
        completeEntityAction<ProductVariant>()
      )
      setDialog(false);
      setInventoryAction(!inventoryState);

    } catch (error: unknown) {
      dangerToastFactory(toast, "Error. Try again later.")
      throw error;
    }
  }

  
  return (
    <>
      {/* <AttributeForm /> */}
      <FormContainer>
      <Form {...form}>
      <form 
        onSubmit={form.handleSubmit(onSubmit)} 
        className="space-y-2"
      >
        <div className="grid grid-cols-2 gap-x-2">
          <InputField
            form={form}
            defaultValue={action == "Update" && variant ? variant.attributes[0].name : ""}
            fieldName="name"  
            label="Name"
            placeholder="eg. Color"
          />
          <InputField
            form={form}
            defaultValue={action == "Update" && variant ? variant.attributes[0].value : ""}
            fieldName="value"  
            label="Value"
            placeholder="eg. White"
          />
        </div>

        <InputField
          form={form}
          defaultValue={action == "Update" && variant ? variant.price : ""}
          fieldName="price"  
          label="Price"
          placeholder="50"
        />

        <ImageSelectorField
          form={form} 
          defaultImage={action == "Update" && variant?.image?.image ? variant.image.image : ""}
          fieldName="image" 
          label="Image" 
          showPreview={false} 
        />

        <CheckBoxField
          form={form}
          defaultChecked={action == "Update" && variant ? variant.on_sale : false}
          fieldName="on_sale"  
          label="On Sale"
        />

        <InputField
          form={form}
          defaultValue={action == "Update" && variant ? variant.sale_price : ""}
          fieldName="sale_price"  
          label="Sale Price"
          placeholder="29.99"
        />

        <InputField
          form={form}
          defaultValue={action == "Update" && variant ? variant.stock_quantity : ""}
          fieldName="stock_quantity"  
          label="Quantity In Stock"
          placeholder="5"
        />

        <div className="grid py-2">
          <Button type="submit" className="mx-auto w-full">Save</Button>
        </div>

        </form>
        </Form>
      </FormContainer>
    </>
  )
}

export default VariantForm