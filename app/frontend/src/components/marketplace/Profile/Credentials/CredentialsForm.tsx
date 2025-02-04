"use client";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import InputField from "@/components/universal/Form/Elements/InputField";
import FormContainer from "@/components/universal/Form/FormContainer";
import { useToast } from "@/hooks/use-toast";
import CredentialsEndpoints from "@/services/api/marketplace/credentials";
import useUserProfile from "@/services/api/marketplace/hooks/useUserProfile";
import { createCredentialsForm } from "@/services/marketplace/forms/credentials";
import { dangerToastFactory, successToast } from "@/services/marketplace/toast";
import { useState } from "react";




function CredentialsForm() {
  const {data, error, isLoading} = useUserProfile();
  const [IsUpdating, setIsUpdating] = useState(false);
  const { toast } = useToast();

  const form = createCredentialsForm();

  
  function constructBody(values: Record<string, any>) {
    const formData = new FormData();

    formData.append('email', values.email)
    formData.append('password', values.password)

    return formData
  }

  async function CredentialsOnSubmit(values: any) {
    setIsUpdating(true);
    try {
      const body = constructBody(values);

      const apiServices = new CredentialsEndpoints();
      apiServices.isOnClient(window);

      const response = await apiServices.updateCredentials(body);

      if (!response.ok) {
        console.log(response.data);
        setIsUpdating(false);
        return dangerToastFactory(toast, "Credentials failed to update. Try again later.");
      }

      successToast(toast, "Credentials", "updated");
      setIsUpdating(false);
      
    } catch (error: any) {
      console.log(error);
      setIsUpdating(false);
      dangerToastFactory(toast, "Credentials failed to update. Try again later.");
    }
  }


  return (
    <FormContainer HeaderTitle="Secure your account.">
      {data && (
        <Form {...form}>
        <form 
          onSubmit={form.handleSubmit(CredentialsOnSubmit)} 
          className="space-y-2"
        >
          <InputField
            form={form}
            id="email"
            defaultValue={data.email}
            fieldName="email" 
            description="" 
            label="Email"
            placeholder="example@example.com"
            autoComplete="email"
            disabled
          />
          <InputField
            form={form}
            id="password"
            defaultValue=""
            fieldName="password" 
            description="" 
            label="Password"
            type="password"
            placeholder="********"
            autoComplete="new-password"
          />
          <InputField
            form={form}
            id="confirm_password"
            defaultValue=""
            fieldName="confirm_password" 
            description="" 
            label="Confirm Password"
            type="password"
            placeholder="********"
            autoComplete="new-password"
          />
          <div className="grid py-2">
            <Button type="submit" className="mx-auto w-full">
              {IsUpdating ? "Updating..." : "Update"}
            </Button>
          </div>
        </form>
        </Form>
      )}
    </FormContainer>
  )
}

export default CredentialsForm
