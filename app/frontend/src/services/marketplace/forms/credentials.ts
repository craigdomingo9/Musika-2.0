import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"



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


 