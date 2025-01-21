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
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
        <path className="text-[--baseColor]" strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    </div>
  )
}

export default CreateProductButton