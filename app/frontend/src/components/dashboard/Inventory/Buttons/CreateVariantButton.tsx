import { Button } from "@/components/ui/button";
import { createEntityAction } from "@/types/dashboard/factory";
import { useVariantDialogState, useVariantMutation } from "../Dialogs/VariantDialog";
import { useAttributeMutation } from "../Forms/VariantsList";


function CreateVariantButton() {
  const { setEntities: setDialog } = useVariantDialogState();
  const { setEntities: setVariantMutation } = useVariantMutation();
  const { setEntities: setAttributeMutation } = useAttributeMutation();

  return (
    <Button 
      className="my-2 w-full"
      onClick={() => {
        setVariantMutation(createEntityAction("Create"));
        setAttributeMutation(createEntityAction("Create"))
        setDialog(true);
      }}
      >Add Variant</Button>
  )
}

export default CreateVariantButton