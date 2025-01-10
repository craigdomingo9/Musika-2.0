import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"



type Props = {
  business: Business,
  LeftHalf: JSX.Element,
  RightHalf?: JSX.Element,
  Footer?: JSX.Element,
  defaultOpen?: boolean,
  className?: string,
}

function BusinessCard({
  business, 
  LeftHalf, 
  RightHalf, 
  Footer,
  defaultOpen,
  className
}: Props) {

  const avatarFallback = business.profile.name.split(" ").map(str => str.charAt(0) || "");

  return (
    <Collapsible defaultOpen={defaultOpen} className={cn("sm:mx-2 my-1", className)}>
      <CollapsibleTrigger className={cn("w-full cursor-pointer hover:scale-[1.01] duration-300 shadow h-24 rounded-tl-lg", !Footer && "rounded-bl-lg")}>
        <div className="flex items-start border-t rounded-l-lg">
          <div className="grid size-24">
            <Avatar className="m-auto size-14">
              <AvatarImage 
                src={business.profile.logo}
                alt={`Business: ${business.profile.name}`} 
              />
              <AvatarFallback>
                {avatarFallback}
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="w-full flex justify-between text-opacity mx-2">
            <div className="py-2 h-full">
              {LeftHalf}
            </div>
            {RightHalf}
          </div>
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent>
        {Footer && (
          <div className="h-12 flex w-full justify-between shadow-lg p-2 hover:scale-[1.01] duration-300">
            {Footer}
          </div>
        )}
      </CollapsibleContent>
    </Collapsible>
  )
}

export default BusinessCard