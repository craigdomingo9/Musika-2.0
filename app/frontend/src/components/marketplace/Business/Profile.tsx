"use client";
import { useIsMobile } from "@/hooks/use-mobile";
import { truncationLength } from "@/lib/constants";
import { trunc } from "@/lib/utils";
import useFetchBusiness from "@/services/api/marketplace/hooks/business/useFetchBusiness";
import Image from "next/image";
import { useState } from "react";



function Profile() {
  const [truncateDescription, setTruncateDescription] = useState<boolean>(true);
  const isMobile = useIsMobile();
  const { data, isLoading, error } = useFetchBusiness();


  return (
    <div className="grid grid-cols-2 h-48 sm:mt-4">
      {data.code && (
        <>
          <div className="grid">
            <div className="shadow-2xl rounded-full m-auto h-32 w-32 sm:h-48 sm:w-48 lg:h-56 lg:w-56 flex justify-center place-items-center">
              <Image
                src={data.profile.logo}
                className="rounded-full min-h-full border max-h-32"
                width={400}
                height={400}
                alt={`${data.profile.name}'s Business Profile Picture`}
                unoptimized
                priority
              />
            </div>
          </div>
          <div className="grid">
            <div className="my-auto h-32 w-full grid">
              <div className="px-1 my-auto">
                <p className="font-semibold text-opacity text-sm sm:text-lg">{data.profile.name}</p>
                <p className="text-[.65rem] text-opacity sm:text-xs">{data.profile.categories}</p>
                <p className="sub-text sm:text-[.7rem]" onClick={() => setTruncateDescription(!truncateDescription)}>
                  {
                    !isMobile ? data.profile.description :
                    trunc(
                      data.profile.description, 
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
