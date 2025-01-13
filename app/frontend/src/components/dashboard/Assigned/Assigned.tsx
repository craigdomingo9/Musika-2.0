"use client"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import useFetchBusinesses from "@/services/api/dashboard/hooks/agent/portfolio/useFetchBusinesses"
import SectionHeader from "../SectionHeader"
import Loading from "@/app/dashboard/loading";
import AssignedProducts from "./AssignedProducts"



function Assigned() {

  const { data: businesses, isLoading } = useFetchBusinesses();


  return (
    <div className="page-width">
      <SectionHeader 
        HeaderTitle="Assigned Products"
        SubText="Manage your assignments."
      />

      {isLoading ? (
        <Loading />
      ) : (
        <Accordion type="single" collapsible defaultValue="item-1" className="w-full">
          {businesses.map((business, index) => (
            <AccordionItem key={business.id} value={`item-${index}`}>
              <AccordionTrigger className="shadow px-2 flex justify-between rounded-md my-1"
                actionElements={
                  []
                }
                >
                <div className="flex justify-start items-center space-x-2">
                  <Avatar>
                    <AvatarImage 
                      src={business.profile.logo} 
                      alt="business" 
                    />
                    <AvatarFallback>
                      {business.profile.name.split(" ").map(str => str.charAt(0))}
                    </AvatarFallback>
                  </Avatar>
                  <p>
                    {business.profile.name}
                  </p>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <AssignedProducts 
                  businessCode={business.code} 
                />
              </AccordionContent>
            </AccordionItem>
          ))}
          
        </Accordion>
      )}

    </div>
  )
}

export default Assigned