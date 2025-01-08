import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import InputField from "@/components/universal/Form/Elements/InputField"
import TextareaField from "@/components/universal/Form/Elements/TextareaField"
import SelectField from "@/components/universal/Form/Elements/SelectField"
import FormContainer from "@/components/universal/Form/FormContainer"
import { constructBody, createProductForm } from "@/services/dashboard/forms/productForm"

import useFetchBusiness from "@/services/api/dashboard/hooks/business/useFetchBusiness"
import useFetchCategories from "@/services/api/marketplace/hooks/categories/useFetchCategories"
import InventoryEndpoints from "@/services/api/dashboard/inventory"
import useFetchInventory from "@/services/api/dashboard/hooks/business/inventory/useFetchInventory"
import { useProductDialogState, useProductMutation } from "../Dialogs/ProductDialog"
import { dangerToastFactory, successToast } from "@/services/marketplace/toast"
import { useToast } from "@/hooks/use-toast"
import { completeEntityAction, processingEntityAction } from "@/types/dashboard/factory"
import { useInventoryAction } from "../InventoryProducts"
import { useCatalogMutation } from "../Dialogs/CatalogFormDialog"


const apiServices = new InventoryEndpoints();
apiServices.isOnClient(window);


function ProductForm() {
  const form = createProductForm()
  
  const { entities: {object: catalog} } = useCatalogMutation();
  const { entities: inventoryState, setEntities: setInventoryAction } = useInventoryAction();
  const { entities: { action, object: product }, setEntities: setProductMutation } = useProductMutation();
  const { data: business } = useFetchBusiness();  
  const { setEntities: setDialog } = useProductDialogState();
  const { data: catalogs, isLoading, error } = useFetchInventory();
  const { data: categories } = useFetchCategories();
  const { toast } = useToast();
  
  const findCategoryById = (id: any) => categories.find(category => category.id == id)?.name
  const findCatalogById = (id: any) => catalogs.find(catalog => catalog.id == id)?.name


  async function onSubmit(values: any) {
    setProductMutation(
      processingEntityAction<any>(
        action, 
        product
      )
    )
    try {

      values = {
        ...values,
        business: business ? business.id : null,
        catalog: catalogs ? catalogs.find(catalog => catalog.name === values.catalog)?.id : null,
        category: categories ? categories.find(category => category.name === values.category)?.id : null,
      }
      const body = constructBody(values);
      
      let res;
      if (action == "Create") res = await apiServices.createProduct(body);
      if (action == "Update") res = await apiServices.updateProduct(body, product?.id);
      
      if (res.ok) {
        successToast(toast, "Product", `${action.toLowerCase()}d`);

        setProductMutation(
          completeEntityAction()
        )
        setDialog(false);
        setInventoryAction(!inventoryState);
      }
    } catch (error) {
      console.log(error)
      dangerToastFactory(toast, "Error. Try again later.")
    }


  }


  return (
    <FormContainer>
      <Form {...form}>
      <form 
        onSubmit={form.handleSubmit(onSubmit)} 
        className="space-y-2"
      >
        <InputField
          form={form}
          defaultValue={action == "Update" && product ? product.name : ""}
          fieldName="name"  
          label="Name"
          placeholder="Product's name..."
        />
        <TextareaField
          form={form}
          defaultValue={product ? product.description : ""}
          fieldName="description" 
          label="Description"
          placeholder="Description..."
        />
        <SelectField 
          form={form}
          defaultValue={action == "Update" ? findCatalogById(product?.catalog) : findCatalogById(catalog?.id)}
          fieldName="catalog"
          label="Catalog"
          selectionList={catalogs.map(catalog => catalog.name)}
          placeholder="Select the Catalog" 
        />
        <SelectField 
          form={form}
          defaultValue={findCategoryById(product?.category)}
          fieldName="category"
          label="Category"
          selectionList={categories.map(category => category.name)}
          placeholder="Select the Category" 
        />

        <div className="grid py-2">
          <Button type="submit" className="mx-auto w-full">Save</Button>
        </div>

      </form>
      </Form>
    </FormContainer>
  )
}

export default ProductForm