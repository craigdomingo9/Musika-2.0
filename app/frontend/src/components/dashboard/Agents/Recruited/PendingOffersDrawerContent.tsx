import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { usePendingOfferDrawerState } from "./PendingOffers";
import { format } from "date-fns";
import CancelPendingOfferButton from "../Buttons/CancelPendingOfferButton";
import { roundNumber } from "@/lib/utils";
import createEntityStore from "@/store/dashboard/EntityStore";


export const useOfferAction = createEntityStore(false);


function PendingOffersDrawerContent({offers}:{offers: BusinessOffer[]}) {
  const { entities: open, setEntities: setOpen } = usePendingOfferDrawerState();

  return (
    <div className="flex flex-col w-full justify-center items-center my-4">
      <div>
        <p className="py-2 font-semibold text-opacity text-md mb-4">Pending Offers</p>
      </div>
      <div className="w-full">
        {offers.map(pending_offer => (
          <div key={pending_offer.id} className="h-20 border m-2 flex rounded-l-full cursor-pointer hover:scale-[1.01] duration-300">
            <div className="grid">
              <Avatar className="m-auto ml-4 size-14">
                <AvatarImage 
                  src={pending_offer.agent.profile.profile_picture}
                  alt={`Agent: ${pending_offer.agent.first_name, pending_offer.agent.last_name}`} 
                />
                <AvatarFallback>
                  {(pending_offer.agent?.first_name?.charAt(0) || '') + 
                  (pending_offer.agent?.last_name?.charAt(0) || '')}
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="w-full flex justify-between ml-2">
              <div className="m-2">
                <p className="text-opacity font-semibold">{pending_offer.agent.first_name+" "+pending_offer.agent.last_name}</p>
                <p className="text-xs text-opacity pt-1">
                  Commission:&nbsp;
                  <span className="text-green-500">
                    {roundNumber(parseFloat(pending_offer.offered_commission)*100, 2)}%
                  </span>
                </p>
                <p className="text-xs sub-text">Offered on {format(new Date(pending_offer.created_at), "PP")}</p>

              </div>
              <div className="self-center mr-2">
                <CancelPendingOfferButton offer={pending_offer} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}


export default PendingOffersDrawerContent