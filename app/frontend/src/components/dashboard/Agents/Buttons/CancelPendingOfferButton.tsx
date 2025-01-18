import { Button } from "@/components/ui/button"
import { useIsMobile } from "@/hooks/use-mobile";
import RelationshipEndpoints from "@/services/api/dashboard/relationships";
import { useOfferAction } from "../Recruited/PendingOffersDrawerContent";
import { dangerToastFactory, successToastFactory } from "@/services/marketplace/toast";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";


type Props = {
  offer: BusinessOffer
}



function CancelPendingOfferButton({offer}: Props) {
  const isMobile = useIsMobile();
  const { entities: action, setEntities: setOfferAction } = useOfferAction();
  const { toast } = useToast();
  const [isCancelling, setIsCancelling] = useState(false);


  async function cancelPendingOffer() {
    setIsCancelling(true);
    try {
      const apiServices = new RelationshipEndpoints();
      apiServices.isOnClient(window);

      const response = await apiServices.cancelPendingOffer(offer.id)
  
      if (!response.ok) {
        setIsCancelling(false);
        return dangerToastFactory(toast, "Request failed to execute. Please try again later.")
      }
  
      successToastFactory(toast, "Offer has been cancelled. Scout for other agents.");
      
      setOfferAction(!action)

    } catch (error: unknown) {
      setIsCancelling(false);
      dangerToastFactory(toast, "Offer could not be cancelled. Please try again later.")
    } finally {
      setIsCancelling(false);
    }

  }

  return (
    <Button
      onClick={cancelPendingOffer}
    >
      {isCancelling ? "Cancelling..." : "Cancel"} {!isMobile && "Request"}
    </Button>
  )
}

export default CancelPendingOfferButton