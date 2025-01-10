import { Button } from "@/components/ui/button"
import AlertDialogContainer from "@/components/universal/Dialog/AlertDialogContainer"
import { useEffect, useState } from "react"
import { useAgentMutation } from "./RecruitButton";
import { useToast } from "@/hooks/use-toast";
import { completeEntityAction, processingEntityAction } from "@/types/dashboard/factory";
import RelationshipEndpoints from "@/services/api/dashboard/relationships";
import { dangerToastFactory, successToast, successToastFactory } from "@/services/marketplace/toast";
import { useRelationshipAction } from "../Recruited/RecruitedAgents";



const apiServices = new RelationshipEndpoints();
apiServices.isOnClient(window);


function TerminateButton({relationship}: {relationship: Relationship}) {
  const { entities: action, setEntities: setRelationshipAction } = useRelationshipAction();
  const { setEntities: setAgentMutation } = useAgentMutation();
  const { toast } = useToast();
  const [isTerminating, setIsTerminating] = useState(false);

  async function terminateRelationship() {
    setIsTerminating(true);
    setAgentMutation(
      processingEntityAction<any>(
        "Terminate Relationship", 
        relationship.agent
      )
    )
    try {
      
      const response = await apiServices.terminateRelationship(relationship.id)
  
      if (!response.ok) {
        setIsTerminating(false);
        return dangerToastFactory(toast, "Request failed to execute. Please try again later.")
      }
  
      successToastFactory(toast, "Relationship has been terminated. Scout for other agents.");
      
      setRelationshipAction(!action);

      setAgentMutation(
        completeEntityAction()
      )

    } catch (error: unknown) {
      setIsTerminating(false);
      dangerToastFactory(toast, "Relationship could not be terminated. Please try again later.")
    } finally {
      setIsTerminating(false); // Ensure loading state is reset even on errors
    }
  }


  useEffect(() => {}, [relationship])


  return (
    <>
      <AlertDialogContainer
        Trigger={
          <Button variant={"link"} className="underline underline-offset-2 text-red-500" disabled={isTerminating}>
            {isTerminating ? "Terminating..." : "Terminate"}
          </Button>
        }
        title="Terminate Relationship"
        description={<>This action cannot be undone. This will permanently terminate your relationship with &nbsp;<span className="font-semibold">{relationship?.agent?.first_name} {relationship?.agent?.last_name}</span></>}
        actionFunction={terminateRelationship}
        proceedText="Terminate"
        cancelText="Cancel"
      />
    </>
  )
}

export default TerminateButton