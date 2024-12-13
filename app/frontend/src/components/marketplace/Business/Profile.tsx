"use client";
import { useIsMobile } from "@/hooks/use-mobile";
import { truncationLength } from "@/lib/constants";
import { trunc } from "@/lib/utils";
import { BusinessEndpoints } from "@/services/api/endpoints/marketplace/business";
import { fixLogoImageUrl } from "@/services/marketplace/business";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

function Profile() {
  const [truncateDescription, setTruncateDescription] = useState<boolean>(true);
  const [business, setBusiness] = useState<Business>();
  const isMobile = useIsMobile();
  const { code } = useParams();

  useEffect(() => {
    const fetchBusiness = async() => {
      if (!code) return;

      const apiServices = new BusinessEndpoints();
      apiServices.isOnClient(window);

      const data = await apiServices.getBusiness(code.toString());

      const businessData = fixLogoImageUrl(window.location.href, data);

      setBusiness(businessData);
    }
    fetchBusiness();
  }, [])

  

  return (
    <div className="grid grid-cols-2 h-48 sm:mt-4">
      {business && (
        <>
          <div className="grid">
            <div className="shadow-2xl rounded-full m-auto h-32 w-32 sm:h-48 sm:w-48 lg:h-56 lg:w-56 flex justify-center place-items-center">
              <Image
                src={business.profile.logo}
                className="rounded-full min-h-full border max-h-32"
                width={400}
                height={400}
                alt={`${business.profile.name}'s Business Profile Picture`}
                unoptimized
                priority
              />
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
