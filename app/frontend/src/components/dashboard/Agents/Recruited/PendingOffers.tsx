import createEntityStore from "@/store/dashboard/EntityStore";
import DrawerContainer from "../Scout/DrawerContainer"
import useFetchPendingOffers from "@/services/api/dashboard/hooks/business/agents/useFetchPendingOffers";
import { useEffect, useState } from "react";
import PendingOffersDrawerContent, { useOfferAction } from "./PendingOffersDrawerContent";


export const usePendingOfferDrawerState = createEntityStore(false);


function PendingOffers() {
  const { entities: action } = useOfferAction();
  const { entities: open, setEntities: setOpen } = usePendingOfferDrawerState();
  const { data: offers, isLoading, error } = useFetchPendingOffers(action);

  return (
    <div>

      {offers.length > 0 && (
        <>
          <div className="bg-orange-100 w-full p-2 text-xs text-opacity rounded-sm text-slate-600 shadow cursor-pointer hover:scale-[1.01] duration-300" onClick={() => setOpen(!open)}>
            You have pending {offers.length} offer{offers.length > 1 && "s"}.
            <span className="underline underline-offset-2">&nbsp;See More</span>
          </div>
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