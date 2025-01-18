import createEntityStore from "@/store/dashboard/EntityStore";
import DrawerContainer from "../../../universal/Drawer/DrawerContainer"
import useFetchPendingOffers from "@/services/api/dashboard/hooks/business/agents/useFetchPendingOffers";
import PendingOffersDrawerContent, { useOfferAction } from "./PendingOffersDrawerContent";
import Ribbon from "../../Ribbon";


export const usePendingOfferDrawerState = createEntityStore(false);


function PendingOffers() {
  const { entities: action } = useOfferAction();
  const { entities: open, setEntities: setOpen } = usePendingOfferDrawerState();
  const { data: offers, isLoading, error } = useFetchPendingOffers(action);

  return (
    <div>
      {offers.length > 0 && (
        <>
          <Ribbon onClick={() => setOpen(!open)}>
            You have pending {offers.length} offer{offers.length > 1 && "s"}.
            <span className="underline underline-offset-2">&nbsp;See More</span>
          </Ribbon>
          <DrawerContainer 
            open={open}
            setOpen={setOpen}
            Content={<PendingOffersDrawerContent offers={offers} />}
          />
        </>
      )}
    </div>
  )
}

export default PendingOffers