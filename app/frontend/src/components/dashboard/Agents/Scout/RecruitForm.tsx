import FormContainer from "@/components/universal/Form/FormContainer";
import { useAgentMutation, useRecruitDrawerState } from "../Buttons/RecruitButton";
import { Form } from "@/components/ui/form";
import { constructBody, createRecruitAgentForm } from "@/services/dashboard/forms/recruitAgentForm";
import InputField from "@/components/universal/Form/Elements/InputField";
import { Button } from "@/components/ui/button";
import { roundNumber } from "@/lib/utils";
import { processingEntityAction } from "@/types/dashboard/factory";
import RelationshipEndpoints from "@/services/api/dashboard/relationships";
import { dangerToastFactory, successToast } from "@/services/marketplace/toast";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import useUserProfile from "@/services/api/marketplace/hooks/useUserProfile";





function RecruitForm() {
  const { data: user, isLoading } = useUserProfile();
  const business = user.business_profile;
  const { entities: {object: agent}, setEntities: setAgentMutation } = useAgentMutation();
  const { entities: open, setEntities: setOpen } = useRecruitDrawerState();
  const { toast } = useToast();
  const [isRecruiting, setIsRecruiting] = useState(false);
  
  const agentCommission = roundNumber(parseFloat(agent?.profile.minimum_commission_rate || "0")*100, 2)
  
  const form = createRecruitAgentForm(agentCommission.toString())


  
  async function onSubmit(values: any) {
    setAgentMutation(
      processingEntityAction<any>(
        "Make Offer", 
        agent
      )
    )
    setIsRecruiting(true);
    try {
      if (!business) return;
      
      const apiServices = new RelationshipEndpoints();
      apiServices.isOnClient(window);

      values = {
        ...values,
        business: business?.id,
        agent: agent?.id
      }
      // console.log(values)
  
      const body = constructBody(values);
      const response = await apiServices.makeBusinessOffer(body)
  
      if (!response.ok) {
        dangerToastFactory(toast, "Request failed to execute. Please try again later.")
        setIsRecruiting(false);
        return setOpen(!open);
      }
  
      successToast(toast, "Offer request", "sent");
      
      setIsRecruiting(false);
      setOpen(!open);
      


    } catch (error: unknown) {
      setIsRecruiting(false);
      dangerToastFactory(toast, "Request failed to execute. Please try again later.")
    } finally {
      setIsRecruiting(false);
    }
    
  }



  return (
    <FormContainer className="max-w-sm mb-2 mx-2">
      <Form {...form}>
      <form 
        onSubmit={form.handleSubmit(onSubmit)} 
        className="space-y-2"
      >
        <InputField
          form={form}
          type="number"
          defaultValue={agentCommission}
          fieldName="offered_commission"  
          label="Offered Commission %"
          placeholder={agentCommission.toString()}
          description="Commission rate you are offering."
          disabled={isLoading}
        />

        <div className="grid py-2">
          <Button 
            type="submit" 
            disabled={isLoading} 
            className="mx-auto w-full"
            >
              {isRecruiting && !isLoading && "Sending Request"}
              {!isRecruiting && !isLoading && "Send Request"}
              {isLoading && "Loading..."}
          </Button>
        </div>


      </form>
      </Form>
    </FormContainer>

  )
}

export default RecruitForm