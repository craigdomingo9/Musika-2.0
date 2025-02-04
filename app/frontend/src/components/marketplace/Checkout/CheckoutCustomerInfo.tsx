"use client";
import Loading from "@/app/dashboard/loading";
import { Form } from "@/components/ui/form";
import InputField from "@/components/universal/Form/Elements/InputField"
import PhoneNumberField from "@/components/universal/Form/Elements/PhoneNumberField";
import { createCheckoutForm } from "@/services/dashboard/forms/checkoutForm";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import UseCartStore from "@/store/CartStore";
import { constructBody } from "@/services/dashboard/forms/form_utils";
import ProfileEndpoints from "@/services/api/marketplace/profile";
import { dangerToastFactory, successToastFactory } from "@/services/marketplace/toast";
import { useToast } from "@/hooks/use-toast";
import OrderEndpoints from "@/services/api/dashboard/orders";
import { useRouter } from "next/navigation";
import useUserProfile from "@/services/api/marketplace/hooks/useUserProfile";

const orderApiServices = new OrderEndpoints();
const userApiServices = new ProfileEndpoints();

function CheckoutCustomerInfo() {
  const { data: user, isLoading } = useUserProfile();
  const [isPurchasing, setIsPurchasing] = useState(false);
  const { items, resetCart } = UseCartStore();
  const { toast } = useToast();
  const form = createCheckoutForm();
  const router = useRouter();


  async function onSubmit(values: any) {
    orderApiServices.isOnClient(window);
    userApiServices.isOnClient(window);

    setIsPurchasing(true);
    try {

      const body = constructBody(values);
      const response = await userApiServices.updateProfile(body, user.id);

      if (!response.ok) {
        return dangerToastFactory(toast, "Failed to purchase product. Please try again later.");
      }
      
      items.forEach(async(product) => {
        console.log(product.referrerAgent)
        const data = {
          customer: user.id,
          agent: product.referrerAgent,
          product: product.variant_id,
          quantity: product.quantity,
        }
        const body = constructBody(data);
        
        const orderResponse = await orderApiServices.placeOrder(body);

        if (!orderResponse.ok) {
          console.log(orderResponse)
          return dangerToastFactory(toast, `Failed to purchase ${product.name}. Please try again later.`);
        }
      });
      
      successToastFactory(toast, "Orders have been placed successfully.");
      resetCart();
      router.push('/');
      
    } catch (error) {
      setIsPurchasing(false);
      dangerToastFactory(toast, "Failed to purchase product. Please try again later.");
    } finally {
      setIsPurchasing(false);
    }
  }

  return (
    <div>

      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="mx-2 text-md text-opacity font-semibold mb-2 underline">Your Details</div>
          <Form {...form}>
            <form 
              onSubmit={form.handleSubmit(onSubmit)}
              className="mx-2 text-opacity"
            >
              <div className="grid grid-cols-2 gap-x-2">
                <InputField 
                  defaultValue={user.first_name}
                  fieldName="first_name"
                  label="First Name"
                  form={form}
                />
                <InputField 
                  defaultValue={user.last_name}
                  fieldName="last_name"
                  label="Last Name"
                  form={form}
                />
              </div>

              <PhoneNumberField 
                defaultValue={user.phone_number}
                fieldName="phone_number"
                label="Phone Number"
                description="Phone number will be used to contact you"
                form={form}
                countryCode={user.country_code}
              />

              <InputField 
                defaultValue={user.address}
                fieldName="address"
                label="Home Address"
                form={form}
              />

              <div className="grid py-2">
                <Button
                  type='submit'
                  disabled={items.length === 0}
                >
                  {isPurchasing ? "Purchasing..." : "Purchase"}
                </Button>
              </div>

            </form>
          </Form>
        </>
      )}

    </div>
  )
}

export default CheckoutCustomerInfo