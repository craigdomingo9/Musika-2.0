import { Button } from '@/components/ui/button'
import AlertDialogContainer from '@/components/universal/Dialog/AlertDialogContainer'
import { useToast } from '@/hooks/use-toast';
import { dangerToastFactory, successToastFactory } from '@/services/marketplace/toast';
import { useState } from 'react';
import { useBusinessMutation, useRelationshipAction } from '../Relationships/Relationships';
import { completeEntityAction, processingEntityAction } from '@/types/dashboard/factory';
import RelationshipEndpoints from '@/services/api/dashboard/relationships';


type Props = {
  relationship: Relationship,
}

const apiServices = new RelationshipEndpoints();
apiServices.isOnClient(window);


function TerminateButton({relationship}: Props) {
  const [isTerminating, setIsTerminating] = useState(false);
  const { setEntities: setBusinessMutation } = useBusinessMutation();
  const { entities: action, setEntities: setRelationshipAction } = useRelationshipAction();
  const { toast } = useToast();

  async function terminateRelationship() {
    setIsTerminating(true);
    setBusinessMutation(
      processingEntityAction<any>(
        "Terminate", 
        relationship.business
      )
    )
    try {
      const response = await apiServices.terminateRelationship(relationship.id)
  
      if (!response.ok) {
        setIsTerminating(false);
        return dangerToastFactory(toast, "Request failed to execute. Please try again later.")
      }
  
      successToastFactory(toast, "Relationship has been terminated. Apply to other businesses.");
      
      setRelationshipAction(!action);

      setBusinessMutation(
        completeEntityAction()
      )
      
    } catch (error) {
      setIsTerminating(false)
      dangerToastFactory(toast, "Relationship could not be terminated. Please try again later.")
      
    } finally {
      setIsTerminating(false);
    }
  }

  return (
    <AlertDialogContainer
        Trigger={
          <Button variant={"link"} className="underline underline-offset-2 text-red-500" disabled={isTerminating}>
            {isTerminating ? "Terminating..." : "Terminate"}
          </Button>
        }
        title="Terminate Relationship"
        description={<>This action cannot be undone. This will permanently terminate your relationship with &nbsp;<span className="font-semibold">{relationship?.business?.profile.name}</span></>}
        actionFunction={terminateRelationship}
        proceedText="Terminate"
        cancelText="Cancel"
      />
  )
}

export default TerminateButton