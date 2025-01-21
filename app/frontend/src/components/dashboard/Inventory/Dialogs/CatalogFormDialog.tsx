import { useEffect } from "react";
import CatalogForm from "../Forms/CatalogForm";
import createEntityStore from "@/store/dashboard/EntityStore";
import DialogContainer from "@/components/universal/Dialog/DialogContainer";
import { createEntityAction } from "@/types/dashboard/factory";

export const useCatalogDialogState = createEntityStore<boolean>(false);
export const useCatalogMutation = createEntityStore<EntityAction<EditableCatalog>>(createEntityAction<EditableCatalog>());


function CatalogFormDialog() {
  const { entities: dialog, setEntities: setDialog } = useCatalogDialogState();
  const { entities: catalogMutation} = useCatalogMutation();

  useEffect(() => {}, [catalogMutation])


  return (
    <DialogContainer 
      state={dialog} 
      title={`${catalogMutation.action} Catalog`} 
      onChange={() => setDialog(!dialog)}
      >
      <CatalogForm />
    </DialogContainer>
  )
}

export default CatalogFormDialog