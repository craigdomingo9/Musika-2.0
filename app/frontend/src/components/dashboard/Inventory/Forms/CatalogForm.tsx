import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import InputField from "@/components/universal/Form/Elements/InputField";
import TextareaField from "@/components/universal/Form/Elements/TextareaField";
import FormContainer from "@/components/universal/Form/FormContainer";
import { constructBody, createCatalogForm } from "@/services/dashboard/forms/catalogForm";
import useFetchBusiness from "@/services/api/dashboard/hooks/business/useFetchBusiness";
import { useCatalogDialogState, useCatalogMutation } from "../Dialogs/CatalogFormDialog";
import { testBusinessId } from "@/lib/constants"
import InventoryEndpoints from "@/services/api/dashboard/inventory";
import { successToast } from "@/services/marketplace/toast";
import { useToast } from "@/hooks/use-toast";
import { completeEntityAction } from "@/types/dashboard/factory";
import { useInventoryAction } from "../InventoryProducts";


const apiServices = new InventoryEndpoints();
apiServices.isOnClient(window);

function CatalogForm() {
  const form = createCatalogForm();
  
  const { entities: {action, object: catalog}, setEntities: setCatalogMutation } = useCatalogMutation();
  const { data: business } = useFetchBusiness();
  const { toast } = useToast();
  const { setEntities: setDialog } = useCatalogDialogState();
  const { entities: inventoryState, setEntities: setInventoryAction } = useInventoryAction();

  async function CatalogOnSubmit(values: any) {
    values = {...values, business: testBusinessId}
  
    const body = constructBody(values)
    
    let response;
    
    if (action == "Create") response = await apiServices.createCatalog(body)
    if (action == "Update") response = await apiServices.updateCatalog(body, catalog?.id)

    if (response.ok) {
      successToast(toast, "Catalog", `${action.toLowerCase()}d`);
      setCatalogMutation(completeEntityAction());
      setDialog(false);
      setInventoryAction(!inventoryState);
    }
    
  }



  return (
    <FormContainer>
      <Form {...form}>
      <form 
        onSubmit={form.handleSubmit(CatalogOnSubmit)} 
        className="space-y-2"
      >
        <InputField
          form={form}
          defaultValue={catalog?.name}
          fieldName="name" 
          description="" 
          label="Name"
          placeholder="Catalog's name..."
        />
        <TextareaField
          form={form}
          defaultValue={catalog?.description}
          fieldName="description" 
          description="" 
          label="Description"
          placeholder="Catalog's description(optional)..."
        />
        <div className="grid py-2">
          <Button type="submit" className="mx-auto w-full">Save</Button>
        </div>

      </form>
      </Form>
    </FormContainer>
  )
}

export default CatalogForm