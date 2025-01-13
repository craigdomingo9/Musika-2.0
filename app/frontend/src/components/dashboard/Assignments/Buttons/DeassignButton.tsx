import { Button } from "@/components/ui/button"
import { useAssignmentAction, useAssignmentDrawerState, useAssignmentMutation } from "../AgentAssignment";
import { useState } from "react";
import RelationshipEndpoints from "@/services/api/dashboard/relationships";
import { dangerToastFactory, successToast } from "@/services/marketplace/toast";
import { useToast } from "@/hooks/use-toast";
import { completeEntityAction, processingEntityAction } from "@/types/dashboard/factory";


const apiServices = new RelationshipEndpoints();
apiServices.isOnClient(window);


function DeassignButton() {
  const { entities: {object: assignment},setEntities: setAssignmentMutation } = useAssignmentMutation();
  const [isDeassigning, setIsDeassigning] = useState(false);
  const { entities: open, setEntities: setOpen } = useAssignmentDrawerState();
  const { entities: action, setEntities: setAssignmentAction } = useAssignmentAction();
	const { toast } = useToast();


  async function deAssign() {
    setIsDeassigning(true);
		setAssignmentMutation(
			processingEntityAction<any>("Deassign", assignment)
		)
    try {
			if (!assignment) return;

			const response = await apiServices.deassignAssigment(assignment?.id);

			if (!response.ok) {
				dangerToastFactory(toast, "Deassignment was not successful. Try again later.")
				setIsDeassigning(false);
				return
			}

			successToast(toast, "Product", "deassigned")
			setAssignmentAction(!action);
			setAssignmentMutation(
				completeEntityAction(assignment)
			)
			setOpen(!open);
      
    } catch (error: unknown) {
      setIsDeassigning(false)
    }
  }

  return (
    <Button 
      variant={"destructive"}
      onClick={deAssign}
    >{isDeassigning ? "Deassigning..." : "Deassign"}</Button>
  )
}

export default DeassignButton