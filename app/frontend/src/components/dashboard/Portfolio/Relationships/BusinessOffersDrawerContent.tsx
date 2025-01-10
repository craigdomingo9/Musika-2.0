import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { roundNumber } from "@/lib/utils"
import { format } from "date-fns"
import RejectOfferButton from "../Buttons/RejectOfferButton"
import AcceptOfferButton from "../Buttons/AcceptOfferButton"


type Props = {
  offers: BusinessOffer[]
}

function BusinessOffersDrawerContent({offers}: Props) {
  return (
    <div className="flex flex-col w-full justify-center items-center my-4">
      <div>
        <p className="py-2 font-semibold text-opacity text-md mb-4">Offers Received</p>
      </div>
      <div className="w-full">
        {offers.map(offer => (
          <div key={offer.id} className="h-20 border m-2 flex rounded-l-full cursor-pointer hover:scale-[1.01] duration-300">
            <div className="grid">
              <Avatar className="m-auto ml-4 size-14">
                <AvatarImage 
                  src={offer.business.profile.logo}
                  alt={`Business: ${offer.business.profile.name}`} 
                />
                <AvatarFallback>
                  {(offer.business.profile.name)}
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="w-full flex justify-between ml-2">
              <div className="m-2">
                <p className="text-opacity font-semibold text-sm sm:text-md">{offer.business.profile.name}</p>
                <p className="text-xs text-opacity pt-1">
                  Commission:&nbsp;
                  <span className="text-green-500">
                    {roundNumber(parseFloat(offer.offered_commission)*100, 2)}%
                  </span>
                </p>
                <p className="text-xs sub-text">Offered on {format(new Date(offer.created_at), "PP")}</p>

              </div>
              <div className="flex items-center">
                <AcceptOfferButton offer={offer} />
                <RejectOfferButton offer={offer} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BusinessOffersDrawerContent