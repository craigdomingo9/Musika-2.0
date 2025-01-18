import useFetchPendingOffers from "@/services/api/dashboard/hooks/agent/portfolio/useFetchPendingOffers";
import { useRelationshipAction } from "./Relationships";
import DrawerContainer from "../../../universal/Drawer/DrawerContainer";
import Ribbon from "../../Ribbon";
import createEntityStore from "@/store/dashboard/EntityStore";
import BusinessOffersDrawerContent from "./BusinessOffersDrawerContent";
import { createEntityAction } from "@/types/dashboard/factory";


export const useBusinessOffersDrawerState = createEntityStore(false);
export const useBusinessOfferMutation = createEntityStore(createEntityAction<BusinessOffer>());


function BusinessOffers() {
  const { entities: action } = useRelationshipAction();
  const { data: business_offers } = useFetchPendingOffers(action);
  const { entities: open, setEntities: setOpen } = useBusinessOffersDrawerState();


  return (
    <div>
      {business_offers.length > 0 && (
        <>
          <Ribbon className="bg-green-400 text-white text-sm" onClick={() => setOpen(!open)}>
            You have been sent {business_offers.length} offer{business_offers.length > 1 && "s"}.
            <span className="underline underline-offset-2">&nbsp;See More</span>
          </Ribbon>
          <DrawerContainer 
            open={open}
            setOpen={setOpen}
            Content={<BusinessOffersDrawerContent offers={business_offers} />}
          />
        </>
      )}
    </div>
  )
}

export default BusinessOffers