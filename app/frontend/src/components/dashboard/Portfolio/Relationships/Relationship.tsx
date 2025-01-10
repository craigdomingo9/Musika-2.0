import { Button } from "@/components/ui/button";
import BusinessRelationshipCard from "../BusinessCard";
import { roundNumber } from "@/lib/utils";
import { format } from "date-fns";
import TerminateButton from "../Buttons/TerminateButton";
import BusinessCard from "../BusinessCard";


type Props = {
  relationship: Relationship,
  defaultOpen?: boolean,
}



function LeftHalfContent(relationship: Relationship) {
  const profile = relationship.business.profile;
  const publishedDate = format(new Date(relationship.created_at), "PP");
  const commission = roundNumber(parseFloat(relationship.commission_rate)*100, 2)
  
  return (
    <div className="grid text-start">
      <p className="font-semibold text-opacity place-self-start pb-1">{profile.name}</p>
      <p className="sub-text">Connected on {publishedDate}</p>
      <p className="text-opacity text-xs font-semibold mt-1">
        <span className="sub-text-opacity ">Commission: </span>
        {commission}%
      </p>
    </div>
  )
}

function RightHalfContent(relationship: Relationship) {
  return (
    <div>
    </div>
  )
}

export function FooterContent(relationship: Relationship){
  return (
    <>
      <div className="flex">
        <Button variant={"link"} className="underline underline-offset-2 text-[--baseColor]">Discuss</Button>
        {/* <Separator orientation="vertical" />
        <Button variant={"link"} className="underline underline-offset-2 text-[--baseColor]">Assign</Button> */}
      </div>
      <TerminateButton relationship={relationship} />
    </>
  )
}





function Relationship({relationship, defaultOpen}: Props) {
  // console.log(relationship);

  return (
    <BusinessCard
      business={relationship.business}
      LeftHalf={LeftHalfContent(relationship)}
      RightHalf={RightHalfContent(relationship)}
      Footer={FooterContent(relationship)}
      defaultOpen={defaultOpen}
    />
  )
}

export default Relationship