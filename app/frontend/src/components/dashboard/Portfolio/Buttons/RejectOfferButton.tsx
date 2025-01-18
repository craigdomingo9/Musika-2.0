import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast";
import { useRelationshipAction } from "../Relationships/Relationships";
import { useIsMobile } from "@/hooks/use-mobile";
import createEntityStore from "@/store/dashboard/EntityStore";
import AlertDialogContainer from "@/components/universal/Dialog/AlertDialogContainer";
import { useState } from "react";
import { useBusinessOfferMutation } from "../Relationships/BusinessOffers";
import { completeEntityAction, processingEntityAction } from "@/types/dashboard/factory";
import { dangerToastFactory, successToastFactory } from "@/services/marketplace/toast";
import RelationshipEndpoints from "@/services/api/dashboard/relationships";



type Props = {
  offer: BusinessOffer
}




function RejectOfferButton({offer}: Props) {
  const [isRejecting, setIsRejecting] = useState(false);
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const { entities: action, setEntities: setRelationshipAction } = useRelationshipAction();
  const { setEntities: setBusinessOfferMutation } = useBusinessOfferMutation();

  async function rejectBusinessOffer() {
    setIsRejecting(true);
    setBusinessOfferMutation(
      processingEntityAction("Reject Offer", offer)
    )
    try {
      const apiServices = new RelationshipEndpoints();
      apiServices.isOnClient(window);
      
      console.log("rejecting...", offer.business.profile.name)

      const response = await apiServices.rejectBusinessOffer(offer.id)
  
      if (!response.ok) {
        setIsRejecting(false);
        return dangerToastFactory(toast, "Request failed to execute. Please try again later.")
      }

      successToastFactory(toast, "Offer was rejected successfully.");
      
      setRelationshipAction(!action);

      setBusinessOfferMutation(
        completeEntityAction()
      )

    } catch (error: unknown) {
      setIsRejecting(false);
      dangerToastFactory(toast, "Offer could not be rejected. Please try again later.")
    } finally {
      setIsRejecting(false); 
    }

  }
  return (
    <>
      <Button 
        disabled={isRejecting}
        variant={"link"}
        className="text-red-500 underline underline-offset-2"
        onClick={rejectBusinessOffer}
      >
        {!isMobile && (isRejecting ? "Rejecting..." : "Reject")}
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
    </Button>
    </>
  )
}

export default RejectOfferButton