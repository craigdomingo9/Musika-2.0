import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import CredentialsEndpoints from "@/services/api/marketplace/credentials";



let username = 0;

export const setUsername = (username: string) => {
  username = username;
}

export const credentialsFormSchema = z.object({
  email: z.string().email("Invalid email address"),
    password: z.string()
    .min(8, 'Password must be at least 8 characters long')
    .max(100, 'Password must be no more than 100 characters long'),
    confirm_password: z.string()
    .min(8, 'Password must be at least 8 characters long')
    .max(100, 'Password must be no more than 100 characters long')
    })
    .refine(data => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
})


export const createCredentialsForm = () => {
  return useForm<z.infer<typeof credentialsFormSchema>>({
    resolver: zodResolver(credentialsFormSchema),
  })
}

function constructBody(values: Record<string, any>) {
  const formData = new FormData();

  formData.append('email', values.email)
  formData.append('password', values.password)

  return formData
}

export async function CredentialsOnSubmit(values: z.infer<typeof credentialsFormSchema>) {
  const body = constructBody(values);

  const apiServices = new CredentialsEndpoints();
  apiServices.isOnClient(window);
  apiServices.updateCredentials(body)
}


 