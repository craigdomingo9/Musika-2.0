"use client";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import InputField from "@/components/universal/Form/Elements/InputField";
import { useToast } from "@/hooks/use-toast";
import CredentialsEndpoints from "@/services/api/marketplace/credentials";
import { setCookie } from "@/services/cookies";
import { constructBody } from "@/services/dashboard/forms/form_utils";
import { createLoginForm } from "@/services/marketplace/forms/login";
import { dangerToastFactory, successToastFactory } from "@/services/marketplace/toast";
import { useRouter } from "next/navigation";



function LoginForm() {
  const { toast } = useToast();
  const router = useRouter();

  const form = createLoginForm();

  async function LoginOnSubmit(values: any) {
    try {
      const body = constructBody(values);

      const apiServices = new CredentialsEndpoints();
      apiServices.isOnClient(window);

      const response = await apiServices.login(body);

      if (!response.ok) {
        console.log(response.data);
        return dangerToastFactory(toast, "Login failed. Try again later.");
      }

      successToastFactory(toast, "You logged in successfully.");

      const data = (await response.data);
      setCookie("token", data.token);
      setCookie("uuid", data.uuid);
      router.push('/');

    } catch (error: any) {
      console.log(error);
      dangerToastFactory(toast, "Login failed. Try again later.");
    }
  }

  return (
    <Form {...form}>
      <form 
        onSubmit={form.handleSubmit(LoginOnSubmit)} 
        className="space-y-2"
      >

        <InputField
          form={form}
          id="username"
          defaultValue=""
          fieldName="username" 
          description="" 
          label="username"
          placeholder="tkfashion"
          autoComplete="username"
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

        <div className="grid py-2">
          <Button type="submit" className="mx-auto w-full">
            Login
          </Button>
        </div>

      </form>
    </Form>
  )
}

export default LoginForm