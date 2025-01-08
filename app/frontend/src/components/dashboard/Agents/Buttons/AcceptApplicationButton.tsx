import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast";
import RelationshipEndpoints from "@/services/api/dashboard/relationships";
import { dangerToastFactory, successToast } from "@/services/marketplace/toast";
import { useAgentMutation } from "./RecruitButton";
import { completeEntityAction, processingEntityAction } from "@/types/dashboard/factory";
import { useApplicationAction } from "../Applications/Applications";


type Props = {
  application: AgentApplication,
}

const apiServices = new RelationshipEndpoints();
apiServices.isOnClient(window);


function AcceptApplicationButton({application}: Props) {
  const { entities: action, setEntities: setApplicationAction } = useApplicationAction();
  const { setEntities: setAgentMutation } = useAgentMutation();
  const { toast } = useToast();


  async function acceptApplication() {
    setAgentMutation(
      processingEntityAction<any>(
        "Accept Application", 
        application.agent
      )
    )
    try {
      
      const response = await apiServices.acceptApplication(application.id)
  
      if (!response.ok) {
        return dangerToastFactory(toast, "Request failed to execute. Please try again later.")
      }
  
      successToast(toast, "Application", "accepted");

      setApplicationAction(!action);
      
      setAgentMutation(
        completeEntityAction()
      )

    } catch (error: unknown) {
      dangerToastFactory(toast, "Application could not be accepted. Please try again later.")
    }
  }


  return (
    <Button onClick={acceptApplication} className="bg-[--baseColor]">Accept</Button>
  )
}

export default AcceptApplicationButton