import { Button } from "@/components/ui/button"
import { useProductDialogState, useProductMutation } from "../Dialogs/ProductDialog";
import { completeEntityAction, createEntityAction, processingEntityAction } from "@/types/dashboard/factory";
import InventoryEndpoints from "@/services/api/dashboard/inventory";
import { dangerToastFactory, successToast } from "@/services/marketplace/toast";
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
import { useEffect } from "react";




function DeleteProductButton() {
  const { setEntities: setDialog } = useProductDialogState();
  const { entities: {action, object: product}, setEntities: setProductMutation} = useProductMutation();
  const { toast } = useToast();

  async function deleteProduct() {
    if (!product) return;
    
    setProductMutation(processingEntityAction("Delete", product));
    
    const apiServices = new InventoryEndpoints();
    apiServices.isOnClient(window);

    const response: GenericApiResponse<Product> = await apiServices.deleteProduct(product?.id);

    if (!response.ok) return dangerToastFactory(toast ,"Product delete failed. Try again later")

    successToast(toast, "Product", `${action.toLowerCase()}d`);
    setProductMutation(completeEntityAction<Product>());
    setDialog(false);
  } 

  useEffect(() => {}, [action])

  if (action == "Update")
  return (
    
      <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button 
          variant="destructive"
        >Delete</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this product
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction 
            onClick={() => {
              setProductMutation(
                createEntityAction("Delete", product)
              );
              deleteProduct()
            }}
            >Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteProductButton