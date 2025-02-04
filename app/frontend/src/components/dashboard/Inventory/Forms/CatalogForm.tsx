import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import InputField from "@/components/universal/Form/Elements/InputField";
import TextareaField from "@/components/universal/Form/Elements/TextareaField";
import FormContainer from "@/components/universal/Form/FormContainer";
import { constructBody, createCatalogForm } from "@/services/dashboard/forms/catalogForm";
import { useCatalogDialogState, useCatalogMutation } from "../Dialogs/CatalogFormDialog";
import InventoryEndpoints from "@/services/api/dashboard/inventory";
import { successToast } from "@/services/marketplace/toast";
import { useToast } from "@/hooks/use-toast";
import { completeEntityAction } from "@/types/dashboard/factory";
import { useInventoryAction } from "../InventoryProducts";
import useUserProfile from "@/services/api/marketplace/hooks/useUserProfile";



function CatalogForm() {
  const form = createCatalogForm();
  
  const { entities: {action, object: catalog}, setEntities: setCatalogMutation } = useCatalogMutation();
  const { entities: inventoryState, setEntities: setInventoryAction } = useInventoryAction();
  const { setEntities: setDialog } = useCatalogDialogState();
  const { toast } = useToast();

  const { data: user } = useUserProfile();
  const businessId = user.business_profile?.id;

  
  async function CatalogOnSubmit(values: any) {
    if (!businessId) return;

    const apiServices = new InventoryEndpoints();
    apiServices.isOnClient(window);
    
    values = {...values, business: businessId}
  
    const body = constructBody(values)
    
    if (action == "Create") {
      const response = await apiServices.createCatalog(body)
      handleResponse(response);
    };
    if (action == "Update") {
      const response = await apiServices.updateCatalog(body, catalog?.id);
      handleResponse(response);
    }
  }


  const handleResponse = (response: GenericApiResponse<any>) => {
    if (response.ok) {
      successToast(toast, "Catalog", `${action.toLowerCase()}d`);
      setCatalogMutation(completeEntityAction());
      setDialog(false);
      setInventoryAction(!inventoryState);
    } else {
      console.log(response.data)
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