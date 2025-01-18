import { useToast } from "@/hooks/use-toast";
import RelationshipEndpoints from "@/services/api/dashboard/relationships";
import { useState } from "react";
import { useAssignmentAction } from "./AgentAssignment";
import { dangerToastFactory, successToast } from "@/services/marketplace/toast";
import { Button } from "@/components/ui/button";


type Props = {
  product: Product,
  agent: Agent,
}



function ProductToAssign({product, agent}: Props) {
  const { entities: action, setEntities: setAssignmentAction } = useAssignmentAction();
  const [isAssigning, setIsAssigning] = useState(false);
  const { toast } = useToast();

  async function addToAssignments(product: Product) {
    setIsAssigning(true);
    try {
      const apiServices = new RelationshipEndpoints();
      apiServices.isOnClient(window);
      
      const body = new FormData();
      body.set("product", product.id.toString())
      body.set("agent", agent.id.toString())

      const response = await apiServices.giveAssignment(body)

      if (!response.ok) {
        setIsAssigning(false);
        dangerToastFactory(toast ,"Product could not be assigned. Try again later.")
      }
      
      successToast(toast, "Product", "assigned");
      setAssignmentAction(!action)

    } catch (error:unknown) {
      dangerToastFactory(toast, "Product could not be assigned. Try again later.");
      setIsAssigning(false);
    }
    
  }

  return (
    <div className="flex px-4 w-full text-sm justify-between items-center border-b cursor-pointer hover:scale-[1.01] duration-300"
      onClick={() => addToAssignments(product)}
      >
      <p className="py-3">{product.name}</p>
      <Button className="text-sm">{isAssigning ? "Adding..." :"Add"}</Button>
    </div>
  )
}

export default ProductToAssign