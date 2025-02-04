"use client";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import InputField from "@/components/universal/Form/Elements/InputField";
import FormContainer from "@/components/universal/Form/FormContainer";
import useUserProfile from "@/services/api/marketplace/hooks/useUserProfile";
import { createCredentialsForm, CredentialsOnSubmit, setUsername } from "@/services/marketplace/forms/credentials";




function CredentialsForm() {
  const {data, error, isLoading} = useUserProfile();
  setUsername(data.username);

  const form = createCredentialsForm();



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
            <Button type="submit" className="mx-auto w-full">Submit</Button>
          </div>
        </form>
        </Form>
      )}
    </FormContainer>
  )
}

export default CredentialsForm
