import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { roundNumber } from "@/lib/utils"
import { format } from "date-fns"
import CancelPendingApplicationButton from "../Buttons/CancelPendingApplicationButton"



type Props = {
  applications: AgentApplication[]

}

function PendingApplicationsDrawerContent({applications}: Props) {
  return (
    <div className="flex flex-col w-full justify-center items-center my-4">
      <div>
        <p className="py-2 font-semibold text-opacity text-md mb-4">Pending Applications</p>
      </div>
      <div className="w-full">
        {applications.map(application => (
          <div key={application.id} className="h-20 border m-2 flex rounded-l-full cursor-pointer hover:scale-[1.01] duration-300">
            <div className="grid">
              <Avatar className="m-auto ml-4 size-14">
                <AvatarImage 
                  src={application.business.profile.logo}
                  alt={`Business: ${application.business.profile.name}`} 
                />
                <AvatarFallback>
                  {(application.business.profile.name)}
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="w-full flex justify-between ml-2">
              <div className="m-2">
                <p className="text-opacity font-semibold">{application.business.profile.name}</p>
                <p className="text-xs text-opacity pt-1">
                  Commission:&nbsp;
                  <span className="text-green-500">
                    {roundNumber(parseFloat(application.commission_rate)*100, 2)}%
                  </span>
                </p>
                <p className="text-xs sub-text">Applied on {format(new Date(application.created_at), "PP")}</p>

              </div>
              <div className="self-center mr-2">
                <CancelPendingApplicationButton application={application} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PendingApplicationsDrawerContent