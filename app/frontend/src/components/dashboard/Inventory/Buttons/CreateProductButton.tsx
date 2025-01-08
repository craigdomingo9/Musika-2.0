import { PlusIcon } from "lucide-react"
import { useProductDialogState, useProductMutation } from "../Dialogs/ProductDialog";
import { createEntityAction } from "@/types/dashboard/factory";

function CreateProductButton() {
  const { setEntities: setDialog } = useProductDialogState();
  const { setEntities: setProductMutation } = useProductMutation();

  return (
    <div 
      onClick={() => {
        setProductMutation(createEntityAction("Create"))
        setDialog(true);
      }} 
      className="h-36 my-2 shadow-lg rounded-lg m-auto w-36 sm:w-48 sm:max-h-[17.25rem] py-1 cursor-pointer flex justify-center items-center bg-green-50 hover:scale-[1.01] duration-300"
    >
      <PlusIcon />
    </div>
  )
}

export default CreateProductButton