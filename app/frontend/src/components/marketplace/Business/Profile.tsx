"use client";
import { useIsMobile } from "@/hooks/use-mobile";
import { truncationLength } from "@/lib/constants";
import { trunc } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import useUserProfile from "@/services/api/marketplace/hooks/useUserProfile";



function Profile() {
  const [truncateDescription, setTruncateDescription] = useState<boolean>(true);
  const isMobile = useIsMobile();
  const { data: user } = useUserProfile();
  const business = user.business_profile;
  const initials = business?.profile?.name
    ?.split(" ")
    .map((str) => str.charAt(0).toUpperCase())
    .join("");

  return (
    <div className="grid grid-cols-2 h-48 sm:mt-4">
      {business && (
        <>
          <div className="grid">
            <div className="shadow-2xl rounded-full m-auto h-32 w-32 sm:h-48 sm:w-48 lg:h-56 lg:w-56 flex justify-center place-items-center">
              <Avatar className="size-full">
                <AvatarImage
                  src={business.profile.logo}
                  alt={`Logo for ${business.profile.name}`} 
                />
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
            </div>
          </div>
          <div className="grid">
            <div className="my-auto h-32 w-full grid">
              <div className="px-1 my-auto">
                <p className="font-semibold text-opacity text-sm sm:text-lg">{business.profile.name}</p>
                <p className="text-[.65rem] text-opacity sm:text-xs">{business.profile.categories}</p>
                <p className="sub-text sm:text-[.7rem]" onClick={() => setTruncateDescription(!truncateDescription)}>
                  {
                    !isMobile ? business.profile.description :
                    trunc(
                      business.profile.description, 
                      truncateDescription ? truncationLength : undefined
                    )
                  }
                  
                  {isMobile && (
                    <span className="text-blue-900 opacity-100">
                      Read {truncateDescription ? "More" : "Less"}
                    </span>
                  )}
                </p>
                <p></p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Profile
