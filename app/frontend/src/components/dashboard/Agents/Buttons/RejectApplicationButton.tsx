import { Button } from "@/components/ui/button"
import RelationshipEndpoints from "@/services/api/dashboard/relationships";
import { useAgentMutation } from "./RecruitButton";
import { useToast } from "@/hooks/use-toast";
import { completeEntityAction, processingEntityAction } from "@/types/dashboard/factory";
import { dangerToastFactory, successToast } from "@/services/marketplace/toast";
import { useApplicationAction } from "../Applications/Applications";

type Props = {
  application: AgentApplication,
}



function RejectApplicationButton({application}: Props) {
  const { entities: action, setEntities: setApplicationAction } = useApplicationAction();

  const { setEntities: setAgentMutation } = useAgentMutation();
  const { toast } = useToast();


  async function rejectApplication() {
    setAgentMutation(
      processingEntityAction<any>(
        "Reject Application", 
        application.agent
      )
    )
    try {
      const apiServices = new RelationshipEndpoints();
      apiServices.isOnClient(window);
      
      const response = await apiServices.rejectApplication(application.id)
  
      if (!response.ok) {
        return dangerToastFactory(toast, "Request failed to execute. Please try again later.")
      }
  
      successToast(toast, "Application", "rejected");

      setApplicationAction(!action);
      
      setAgentMutation(
        completeEntityAction()
      )

    } catch (error: unknown) {
      dangerToastFactory(toast, "Application could not be rejected. Please try again later.")
    }
  }

  return (
    <Button onClick={rejectApplication} variant={"link"} className="underline underline-offset-2 text-red-500 mx-2">Reject</Button>
  )
}

export default RejectApplicationButton