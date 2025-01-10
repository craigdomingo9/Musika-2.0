import useFetchAgent from "@/services/api/dashboard/hooks/agent/useFetchAgent";
import { useApplicationMutation, useApplyDrawerState } from "../Buttons/ApplyButton";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import FormContainer from "@/components/universal/Form/FormContainer";
import { Form } from "@/components/ui/form";
import { constructBody, createApplicationForm } from "@/services/dashboard/forms/applicationForm";
import InputField from "@/components/universal/Form/Elements/InputField";
import { roundNumber } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { completeEntityAction, processingEntityAction } from "@/types/dashboard/factory";
import RelationshipEndpoints from "@/services/api/dashboard/relationships";
import { dangerToastFactory, successToast } from "@/services/marketplace/toast";
import { useApplicationAction } from "./Applications";


const apiServices = new RelationshipEndpoints();
apiServices.isOnClient(window);



function ApplyForm() {
  const { data: agent, isLoading } = useFetchAgent();
  const { entities: {object: business}, setEntities: setApplicationMutation } = useApplicationMutation();
  const { entities: open, setEntities: setOpen } = useApplyDrawerState();
  const { entities: action, setEntities: setApplicationAction } = useApplicationAction();
  const { toast } = useToast();
  const [isApplying, setIsApplying] = useState(false);


  const agentCommission = roundNumber(parseFloat(agent?.profile && agent?.profile.minimum_commission_rate || "0")*100, 2)

  const form = createApplicationForm(agentCommission.toString());

  async function onSubmit(values: any) {
    setApplicationMutation(
      processingEntityAction<any>(
        "Apply", 
        business
      )
    )
    setIsApplying(true);
    try {
      values = {
        ...values,
        business: business?.id,
        agent: agent?.id
      }

      const body = constructBody(values);
      const response = await apiServices.makeApplication(body)

      if (!response.ok) {
        dangerToastFactory(toast, "Request failed to execute. Please try again later.")
        setIsApplying(false);
        return setOpen(!open);
      }
  
      successToast(toast, "Application", "sent");
      
      setIsApplying(false);
      setOpen(!open);
      setApplicationAction(!action);


    } catch (error: unknown) {
      setIsApplying(false);
      dangerToastFactory(toast, "Request failed to execute. Please try again later.")
    } finally {
      setIsApplying(false);
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
          fieldName="commission_rate"  
          label="Commission Rate %"
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
              {isApplying && !isLoading && "Applying"}
              {!isApplying && !isLoading && "Apply"}
              {isLoading && "Loading..."}
          </Button>
        </div>


      </form>
      </Form>
    </FormContainer>
  )
}

export default ApplyForm