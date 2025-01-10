import { Button } from "@/components/ui/button";
import { roundNumber, trunc } from "@/lib/utils";
import { format } from "date-fns";
import BusinessCard from "../BusinessCard";
import { useIsMobile } from "@/hooks/use-mobile";
import ApplyButton from "../Buttons/ApplyButton";


type Props = {
  business: Business,
  defaultOpen?: boolean,
}



function LeftHalfContent(business: Business) {
  const profile = business.profile;
  const publishedDate = format(new Date(business.created_at), "PP");
  const isMobile = useIsMobile();

  return (
    <div className="grid text-start">
      <p className="font-semibold text-opacity pb-1">{profile.name}</p>
      <p className="sub-text text-start pb-1">
        {isMobile ? 
          trunc(profile.description, 40): 
          trunc(profile.description, 60)
        }
      </p>
      <p className="sub-text">Joined on {publishedDate}</p>
    </div>
  )
}

export function FooterContent(business: Business){
  return (
    <>
      <a href={`/b/${business.code}/`} target="_blank" className="flex">
        <Button variant={"link"} className="underline underline-offset-2 text-[--baseColor]">View Store</Button>
      </a>
      <ApplyButton business={business} />
    </>
  )
}





function BusinessItem({business, defaultOpen}: Props) {
  // console.log(relationship);

  return (
    <BusinessCard
      business={business}
      LeftHalf={LeftHalfContent(business)}
      Footer={FooterContent(business)}
      defaultOpen={defaultOpen}
      className="my-3"
    />
  )
}

export default BusinessItem