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
import { useVariantMutation } from "../Dialogs/VariantDialog";
import { completeEntityAction, processingEntityAction } from "@/types/dashboard/factory";
import InventoryEndpoints from "@/services/api/dashboard/inventory";
import { dangerToastFactory, successToast } from "@/services/marketplace/toast";
import { useInventoryAction } from "../InventoryProducts";


type Props = {
  variant: ProductVariant,
}

const apiServices = new InventoryEndpoints();
apiServices.isOnClient(window);


function DeleteVariantButton({variant}: Props) {
  const { entities: inventoryState, setEntities: setInventoryAction } = useInventoryAction();
  const { setEntities: setVariantMutation } = useVariantMutation();
  const { toast } = useToast()

  async function deleteVariant() {
    setVariantMutation(
      processingEntityAction<any>("Delete",variant)
    )
    try {

      const response: GenericApiResponse<Product> = await apiServices.deleteVariant(variant.id);
      
      if (!response.ok) return dangerToastFactory(toast ,"Variant delete failed. Try again later")

      successToast(toast, "Variant", `deleted`);
      setVariantMutation(completeEntityAction<ProductVariant>());
      setInventoryAction(!inventoryState);
    } catch (error: unknown) {
      
    }
  }

  return (
    <AlertDialog>
    <AlertDialogTrigger asChild>
      <TrashIcon strokeWidth={1.5} />
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
          This will permanently delete this variant
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction 
          onClick={deleteVariant}
          >Continue</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
  )
}

export default DeleteVariantButton