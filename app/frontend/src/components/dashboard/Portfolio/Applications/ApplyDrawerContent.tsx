import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useApplicationMutation } from "../Buttons/ApplyButton";
import ApplyForm from "./ApplyForm";


function ApplyDrawerContent() {
  const { entities: {object: business} } = useApplicationMutation();

  const avatarFallback = business?.profile.name.split(" ").map(str => str.charAt(0) || "");

  return (
    <div>
      <div className="flex flex-col w-full justify-center items-center my-4">
        <Avatar className="size-24 md:size-48 border">
          {business?.profile && (
            <AvatarImage 
              src={business.profile.logo}
              alt={`Agent: ${business.profile.name}`} 
            />
          )}
          <AvatarFallback>
            {avatarFallback}
          </AvatarFallback>
        </Avatar>
        <p className="py-2 font-semibold text-opacity">{business?.profile.name}</p>
      </div>
      <div>
        <ApplyForm />
      </div>
    </div>
  )
}

export default ApplyDrawerContent