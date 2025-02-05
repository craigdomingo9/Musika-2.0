import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"



export const loginFormSchema = z.object({
  username: z.string(),
  password: z.string()
  .min(8, 'Password must be at least 8 characters long')
  .max(100, 'Password must be no more than 100 characters long'),
})


export const createLoginForm = () => {
  return useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
  })
}
