import { useMutationLog } from "@/app/dashboard/stores"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import InputField from "@/components/universal/Form/Elements/InputField"
import FormContainer from "@/components/universal/Form/FormContainer"
import { useToast } from "@/hooks/use-toast"
import OrderEndpoints from "@/services/api/dashboard/orders"
import { constructBody } from "@/services/dashboard/forms/form_utils"
import { createFulfillOrderForm } from "@/services/dashboard/forms/fulfillOrderForm"
import { dangerToastFactory, successToast } from "@/services/marketplace/toast"
import { completeEntityAction, processingEntityAction } from "@/types/dashboard/factory"
import { useOrderDrawerState } from "../Buttons/FulfillButton"
import { useOrderAction } from "../PendingOrders"

const apiServices = new OrderEndpoints();
type Props = {}

function FulfillOrderForm({}: Props) {
  const { entities: { object: order }, setEntities: setMutationLog } = useMutationLog();
  const { entities: open, setEntities: setOpen } = useOrderDrawerState();
  const { entities: action, setEntities: setOrderAction } = useOrderAction();
  const { toast } = useToast();
  const form = createFulfillOrderForm();
  
  async function OnSubmit(values: any) {
    apiServices.isOnClient(window);
    setMutationLog(
      processingEntityAction("Fulfill Order", order)
    )
    try {
      
      const body = constructBody(values);

      const response = await apiServices.fulfillOrder(body, order.id);
      console.log(values)

      if (!response.ok) {
        
        if (response.status === 403) return dangerToastFactory(toast, "You are not authorized to fulfill this order");
        if (response.status === 400) return dangerToastFactory(toast, "Invalid fulfillment code");
        
      }

      successToast(toast, "Order", "fulfilled");
      setOrderAction(!action);
      setOpen(!open);
      setMutationLog(
        completeEntityAction(order)
      );
    } catch (error: any) {
      dangerToastFactory(toast, error)
    }
  }

  return (
    <FormContainer className="max-w-sm mb-2 mx-2">
      <Form {...form}>
      <form 
        onSubmit={form.handleSubmit(OnSubmit)} 
        className="space-y-2"
      >
        <InputField
          form={form}
          fieldName="fulfillment_code"  
          label="Fulfillment Code"
          defaultValue=""
          placeholder="HDJLSNJL"
          description={`Enter a code provided by ${order.customer.full_name || "the customer"}.`}
        />

        <div className="grid py-2">
          <Button
            type="submit" 
            className="mx-auto w-full"
            >
              Submit
          </Button>
        </div>


      </form>
      </Form>
    </FormContainer>
  )
}

export default FulfillOrderForm