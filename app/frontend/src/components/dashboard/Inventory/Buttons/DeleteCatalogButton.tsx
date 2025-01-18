import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { TrashIcon } from "lucide-react";
import { useCatalogMutation } from "../Dialogs/CatalogFormDialog";
import InventoryEndpoints from "@/services/api/dashboard/inventory";
import { completeEntityAction, processingEntityAction } from "@/types/dashboard/factory";
import { dangerToastFactory, successToast } from "@/services/marketplace/toast";
import { useInventoryAction } from "../InventoryProducts";





function DeleteCatalogButton() {
  const { entities: {object: catalog}, setEntities: setCatalogMutation } = useCatalogMutation();
  const { entities: inventoryState, setEntities: setInventoryAction } = useInventoryAction();
  const { toast } = useToast();
  
  async function deleteCatalog() {
    if (!catalog) return;

    setCatalogMutation(processingEntityAction("Delete", catalog));

    const apiServices = new InventoryEndpoints();
    apiServices.isOnClient(window);
    
    const response: GenericApiResponse<Product> = await apiServices.deleteCatalog(catalog?.id);
    
    if (!response.ok) return dangerToastFactory(toast ,"Product delete failed. Try again later")

    successToast(toast, "Catalog", `deleted`);
    setCatalogMutation(completeEntityAction<EditableCatalog>());
    setInventoryAction(!inventoryState);
  } 
  

  return (
    <AlertDialog>
    <AlertDialogTrigger asChild>
      <div
        className="h-18 my-2 shadow-lg rounded-lg m-auto w-36 sm:w-48 sm:max-h-[17.25rem] py-1 cursor-pointer flex justify-center items-center bg-red-50 hover:scale-[1.01] duration-300"
      >
        <TrashIcon />
      </div>
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
          This will permanently delete the <span className="font-semibold">{catalog?.name}</span> catalog
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction 
          onClick={deleteCatalog}
          >Continue</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
  )
}

export default DeleteCatalogButton