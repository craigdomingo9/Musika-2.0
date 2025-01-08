import { createEntityAction } from "@/types/dashboard/factory";
import { useCatalogDialogState, useCatalogMutation } from "../Dialogs/CatalogFormDialog";

function CreateCatalogButton() {
  const { setEntities: setDialog } = useCatalogDialogState();
  const { setEntities: setCatalogMutation } = useCatalogMutation();
  

  return (
    <div 
    onClick={() => {
      setCatalogMutation(createEntityAction("Create"))
      setDialog(true);
    }}
    className="shadow p-4 text-sm text-white font-semibold bg-[--baseColor] hover:bg-green-300 hover:scale-105 duration-300 text-center cursor-pointer my-4"
    >
      Create Catalog
    </div>
  )
}

export default CreateCatalogButton