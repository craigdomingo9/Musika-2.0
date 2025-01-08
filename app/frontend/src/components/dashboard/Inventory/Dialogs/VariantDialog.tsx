import { useEffect } from "react";

import DialogContainer from "@/components/universal/Dialog/DialogContainer";
import createEntityStore from "@/store/dashboard/EntityStore";
import VariantForm from "../Forms/VariantForm";
import { createEntityAction } from "@/types/dashboard/factory";


export const useVariantDialogState = createEntityStore<boolean>(false);
export const useVariantMutation = createEntityStore<EntityAction<ProductVariant>>(createEntityAction<ProductVariant>());


function VariantDialog() {

  const { entities: dialog, setEntities: setDialog } = useVariantDialogState();
  const { entities: {action} } = useVariantMutation();

  useEffect(() => {
  }, [dialog])

  return (
    <DialogContainer 
      state={dialog} 
      title={`${action} Variant`} 
      onChange={() => setDialog(!dialog)}
    >
      <VariantForm />
    </DialogContainer>
  )
}

export default VariantDialog