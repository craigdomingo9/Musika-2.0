import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast";
import { useState } from "react"
import { useRelationshipAction } from "../Relationships/Relationships";
import RelationshipEndpoints from "@/services/api/dashboard/relationships";
import { useBusinessOfferMutation } from "../Relationships/BusinessOffers";
import { completeEntityAction, processingEntityAction } from "@/types/dashboard/factory";
import { dangerToastFactory, successToastFactory } from "@/services/marketplace/toast";

type Props = {
  offer: BusinessOffer
}


const apiServices = new RelationshipEndpoints();
apiServices.isOnClient(window);


function AcceptOfferButton({offer}: Props) {
  const [isAccepting, setIsAccepting] = useState(false);
  const { toast } = useToast();
  const { entities: action, setEntities: setRelationshipAction } = useRelationshipAction();
  const { setEntities: setBusinessOfferMutation } = useBusinessOfferMutation();

  async function acceptBusinessOffer() {
    setIsAccepting(true);
    setBusinessOfferMutation(
      processingEntityAction("Accept Offer", offer)
    )
    try {

      const response = await apiServices.acceptBusinessOffer(offer.id)
  
      if (!response.ok) {
        setIsAccepting(false);
        return dangerToastFactory(toast, "Request failed to execute. Please try again later.")
      }

      successToastFactory(toast, "Offer was accepted successfully. New relationship has been formed.");
      
      setRelationshipAction(!action);

      setBusinessOfferMutation(
        completeEntityAction()
      )
    } catch (error: unknown) {
      setIsAccepting(false);
      dangerToastFactory(toast, "Offer could not be accepted. Please try again later.")
    } finally {
      setIsAccepting(false);
    }
  }


  return (
    <Button 
      className="text-xs sm:text-sm bg-green-400"
      onClick={acceptBusinessOffer}
    >
      Accept
    </Button>
  )
}

export default AcceptOfferButton