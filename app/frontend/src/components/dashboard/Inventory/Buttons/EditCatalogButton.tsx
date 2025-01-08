import { createEntityAction } from "@/types/dashboard/factory";
import { useCatalogDialogState, useCatalogMutation } from "../Dialogs/CatalogFormDialog";
import { PenIcon } from "lucide-react";

function EditCatalogButton() {
  const { setEntities: setDialog } = useCatalogDialogState();
  const { entities: {object: catalog}, setEntities: setCatalogMutation } = useCatalogMutation();
  

  return (
    <div
      className="h-18 my-2 shadow-lg rounded-lg m-auto w-36 sm:w-48 sm:max-h-[17.25rem] py-1 cursor-pointer flex justify-center items-center bg-blue-50 hover:scale-[1.01] duration-300"
      onClick={() => {
        setCatalogMutation(createEntityAction("Update", catalog))
        setDialog(true);
      }}
    >
      <PenIcon />
    </div>
  )
}

export default EditCatalogButton