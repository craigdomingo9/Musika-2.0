import { Button } from "@/components/ui/button"
import { useIsMobile } from "@/hooks/use-mobile"
import { useToast } from "@/hooks/use-toast";
import RelationshipEndpoints from "@/services/api/dashboard/relationships";
import { dangerToastFactory, successToastFactory } from "@/services/marketplace/toast";
import { useState } from "react";
import { useApplicationAction } from "../Applications/Applications";



type Props = {
  application: AgentApplication,
}

const apiServices = new RelationshipEndpoints();
apiServices.isOnClient(window);


function CancelPendingApplicationButton({application}: Props) {
  const isMobile = useIsMobile();
  const [isCancelling, setIsCancelling] = useState(false);
  const { toast } = useToast();
  const { entities: action, setEntities: setApplicationAction } = useApplicationAction();


  async function cancelPendingApplication() {
    setIsCancelling(true);
    try {

      const response = await apiServices.cancelPendingApplication(application.id)
  
      if (!response.ok) {
        setIsCancelling(false);
        return dangerToastFactory(toast, "Request failed to execute. Please try again later.")
      }
  
      successToastFactory(toast, "Application has been cancelled. Make more applications.");
      
      setApplicationAction(!action)

    } catch (error: unknown) {
      setIsCancelling(false);
      dangerToastFactory(toast, "Application could not be cancelled. Please try again later.")
    } finally {
      setIsCancelling(false);
    }

  }

  return (
    <Button 
      onClick={cancelPendingApplication}
    >
      {isCancelling ? "Cancelling..." : "Cancel"} {!isMobile && "Application"}
    </Button>
  )
}

export default CancelPendingApplicationButton